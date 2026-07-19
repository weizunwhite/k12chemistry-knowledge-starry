const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const ctx = { window: {} };
vm.createContext(ctx);

for (const file of ['knowledge-data.js', 'knowledge-history.js', 'knowledge-lesson.js', 'knowledge-subnodes.js', 'knowledge-quiz-seed.js', 'chem-media.js']) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) continue;
  vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: file });
}
// 分片：lessons/（整条覆盖 CHEM_LESSON 条目）与 quiz/（追加合并进 CHEM_QUIZ_SEED）
for (const dir of ['lessons', 'quiz']) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const file of fs.readdirSync(full).sort()) {
    if (!file.endsWith('.js')) continue;
    vm.runInContext(fs.readFileSync(path.join(full, file), 'utf8'), ctx, { filename: `${dir}/${file}` });
  }
}

const w = ctx.window;
const errors = [];
const warn = [];

function fail(message) {
  errors.push(message);
}

function warning(message) {
  warn.push(message);
}

const themes = w.CHEM_THEMES || {};
const nodes = w.CHEM_NODES || [];
const edges = w.CHEM_EDGES || [];
const edgeWhy = w.CHEM_EDGE_WHY || {};
const lessons = w.CHEM_LESSON || {};
const histories = w.CHEM_HISTORY || {};
const subnodes = w.CHEM_SUBNODES || {};
const grades = w.CHEM_NODE_GRADE || {};
const gradeRank = w.CHEM_GRADE_RANK || {};

const ids = new Set();
for (const node of nodes) {
  if (!node.id) fail(`Node without id: ${JSON.stringify(node)}`);
  if (ids.has(node.id)) fail(`Duplicate node id: ${node.id}`);
  ids.add(node.id);

  for (const field of ['name', 'theme', 'level', 'concept', 'explanation', 'example']) {
    if (node[field] === undefined || node[field] === '') fail(`Node ${node.id} missing ${field}`);
  }
  if (!themes[node.theme]) fail(`Node ${node.id} has unknown theme: ${node.theme}`);
  for (const prereq of node.prereqs || []) {
    if (!ids.has(prereq) && !nodes.some(n => n.id === prereq)) fail(`Node ${node.id} references missing prereq: ${prereq}`);
  }
  for (const connection of node.connections || []) {
    if (!ids.has(connection) && !nodes.some(n => n.id === connection)) fail(`Node ${node.id} references missing connection: ${connection}`);
  }
}

const edgeKeys = new Set();
for (const edge of edges) {
  if (!ids.has(edge.from)) fail(`Edge references missing source: ${edge.from}`);
  if (!ids.has(edge.to)) fail(`Edge references missing target: ${edge.to}`);
  edgeKeys.add(`${edge.from}->${edge.to}`);
}

for (const edge of edges) {
  const whyKey = `${edge.from}→${edge.to}`;
  if (!edgeWhy[whyKey]) fail(`Missing edge explanation: ${whyKey}`);
}
for (const key of Object.keys(edgeWhy)) {
  const normalized = key.replace('→', '->');
  if (!edgeKeys.has(normalized)) warning(`Unused edge explanation: ${key}`);
}

for (const node of nodes) {
  if (!lessons[node.id]) fail(`Missing lesson: ${node.id}`);
  if (!histories[node.id]) fail(`Missing history: ${node.id}`);
  if (!subnodes[node.id]) fail(`Missing subnodes: ${node.id}`);
}

for (const [nodeId, items] of Object.entries(subnodes)) {
  if (!ids.has(nodeId)) fail(`Subnodes use unknown node id: ${nodeId}`);
  if (!Array.isArray(items) || items.length === 0) fail(`Subnodes for ${nodeId} must be a non-empty array`);
  for (const [idx, item] of (items || []).entries()) {
    for (const field of ['name', 'summary', 'detail']) {
      if (!item[field]) fail(`Subnode ${nodeId}[${idx}] missing ${field}`);
    }
  }
}

// ── 年级标注校验（学段切换依赖：每个节点必须有年级，且年级在 rank 表里）──
for (const node of nodes) {
  const g = grades[node.id];
  if (!g) fail(`Node ${node.id} missing grade in CHEM_NODE_GRADE`);
  else if (!gradeRank[g]) fail(`Node ${node.id} grade "${g}" not in CHEM_GRADE_RANK`);
}
for (const nodeId of Object.keys(grades)) {
  if (!ids.has(nodeId)) warning(`CHEM_NODE_GRADE has unknown node id: ${nodeId}`);
}

// ── 题库格式校验 ──
const quiz = w.CHEM_QUIZ_SEED || {};
for (const [nodeId, items] of Object.entries(quiz)) {
  if (!ids.has(nodeId)) fail(`Quiz uses unknown node id: ${nodeId}`);
  if (!Array.isArray(items) || items.length === 0) { fail(`Quiz for ${nodeId} must be a non-empty array`); continue; }
  for (const [idx, item] of items.entries()) {
    if (typeof item.q !== 'string' || !item.q) fail(`Quiz ${nodeId}[${idx}] missing q`);
    if (!Array.isArray(item.options) || item.options.length !== 4) fail(`Quiz ${nodeId}[${idx}] must have 4 options`);
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) fail(`Quiz ${nodeId}[${idx}] correct out of range: ${item.correct}`);
    if (typeof item.explanation !== 'string' || !item.explanation) fail(`Quiz ${nodeId}[${idx}] missing explanation`);
  }
}

// ── 示意图格式校验（化学的图库在 knowledge-lesson.js 暴露的 CHEM_FIGURE_BANK，小课分片可自带 figure）──
const figureBank = w.CHEM_FIGURE_BANK || {};
for (const [nodeId, svg] of Object.entries(figureBank)) {
  if (!ids.has(nodeId)) fail(`Figure uses unknown node id: ${nodeId}`);
  if (typeof svg !== 'string' || !/^<svg[^>]*viewBox/.test(svg) || !svg.trim().endsWith('</svg>')) fail(`Figure ${nodeId} is not a well-formed inline <svg>`);
}
for (const node of nodes) {
  const fig = lessons[node.id] && lessons[node.id].figure;
  if (fig && (typeof fig !== 'string' || !/^<svg[^>]*viewBox/.test(fig) || !fig.trim().endsWith('</svg>'))) {
    fail(`Lesson figure ${node.id} is not a well-formed inline <svg>`);
  }
}

// ── 配图校验：CHEM_MEDIA 键↔public/media 文件双向、>5KB、credit 非空 ──
// skip 节点不写入注册表，故自动豁免；仅校验已登记条目
const media = w.CHEM_MEDIA || {};
let mediaCount = 0;
if (media && typeof media === 'object') {
  mediaCount = Object.keys(media).length;
  for (const [id, m] of Object.entries(media)) {
    if (!ids.has(id)) fail(`Media uses unknown node id: ${id}`);
    if (!m || !m.file || !m.title) { fail(`Media ${id} missing file/title`); continue; }
    if (!m.credit) fail(`Media ${id} missing credit (版权来源必填)`);
    // file 约定为 media/xxx.jpg（public 下相对路径）
    const rel = String(m.file).replace(/^\//, '');
    const abs = path.join(root, 'public', rel);
    if (!fs.existsSync(abs)) fail(`Media ${id} file not found: public/${rel}`);
    else if (fs.statSync(abs).size < 5 * 1024) fail(`Media ${id} file too small (<5KB): public/${rel}`);
  }
  // 反向：media 目录里不该有未登记的孤儿文件
  const mediaDir = path.join(root, 'public/media');
  if (fs.existsSync(mediaDir)) {
    const registered = new Set(
      Object.values(media).map(m => path.basename(String(m.file || '')))
    );
    for (const f of fs.readdirSync(mediaDir)) {
      if (f.startsWith('_') || f.startsWith('.')) continue;
      if (!registered.has(f)) warning(`Orphan media file (not in CHEM_MEDIA): public/media/${f}`);
    }
  }
}

// ── 内容覆盖率报告（不阻塞，只提醒缺口在哪）──
function coverage(label, has) {
  const missing = nodes.filter(n => !has(n)).map(n => n.id);
  const pct = ((nodes.length - missing.length) / nodes.length * 100).toFixed(0);
  const head = `${label}: ${nodes.length - missing.length}/${nodes.length} (${pct}%)`;
  return missing.length ? `${head} — 缺: ${missing.join(', ')}` : head;
}
const coverageReport = [
  coverage('quiz≥1 ', n => Array.isArray(quiz[n.id]) && quiz[n.id].length > 0),
  coverage('quiz≥2 ', n => Array.isArray(quiz[n.id]) && quiz[n.id].length >= 2),
  coverage('warmup ', n => lessons[n.id] && lessons[n.id].warmup),
  coverage('figure ', n => figureBank[n.id] || (lessons[n.id] && lessons[n.id].figure)),
  coverage('media  ', n => !!(media[n.id] && media[n.id].file)),
];

if (warn.length) {
  console.warn(warn.map(msg => `WARN ${msg}`).join('\n'));
}

if (errors.length) {
  console.error(errors.map(msg => `ERROR ${msg}`).join('\n'));
  process.exit(1);
}

console.log('内容覆盖率:\n  ' + coverageReport.join('\n  '));
const quizTotal = Object.values(quiz).reduce((s, v) => s + v.length, 0);
console.log(`Data OK: ${nodes.length} nodes, ${edges.length} edges, ${Object.keys(lessons).length} lessons, ${Object.keys(quiz).length} quiz nodes / ${quizTotal} questions, ${Object.keys(figureBank).length} bank figures.`);
console.log(`Media: ${mediaCount}/${nodes.length} nodes have images.`);
