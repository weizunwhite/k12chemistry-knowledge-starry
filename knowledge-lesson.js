// 完整学习内容（深度版）— 化学
// 结构：intro[] / formulas[{name,latex,note}] / methods[] / worked[] / pitfalls[] / exercises[]
// 课程由 makeLesson 生成器统一产出：通用框架 + 各 BANK 的学科化内容，未命中 BANK 的节点走默认兜底。

const CHEM_FORMULA_BANK = {
  'mass-density': [
    { name:'密度', latex:'\\rho=\\dfrac{m}{V}', note:'$m$ 是质量，$V$ 是体积；常用单位 $\\text{g/cm}^3$。' },
  ],
  'formula-valence': [
    { name:'化合价规则', latex:'\\text{化合物中正、负化合价代数和}=0', note:'用来书写和检验化学式，如 $\\text{Na}^{+1}\\text{Cl}^{-1}\\to\\text{NaCl}$。' },
  ],
  'mass-conservation': [
    { name:'质量守恒', latex:'\\sum m_{\\text{反应物}}=\\sum m_{\\text{生成物}}', note:'微观依据：反应前后原子的种类、数目、质量都不变。' },
  ],
  'relative-molecular-mass': [
    { name:'相对分子质量', latex:'M_r=\\sum(\\text{相对原子质量}\\times\\text{原子个数})', note:'如水 $\\text{H}_2\\text{O}$：$2\\times1+16=18$。' },
  ],
  'formula-calc': [
    { name:'元素质量分数', latex:'w=\\dfrac{\\text{相对原子质量}\\times\\text{原子个数}}{M_r}\\times100\\%', note:'分子是该元素在化学式中贡献的总质量。' },
    { name:'元素质量比', latex:'m_A:m_B=(A_r\\cdot a):(B_r\\cdot b)', note:'$a,b$ 是化学式中各元素的原子个数。' },
  ],
  'mass-fraction': [
    { name:'溶质质量分数', latex:'w=\\dfrac{m_{\\text{溶质}}}{m_{\\text{溶液}}}\\times100\\%', note:'$m_{\\text{溶液}}=m_{\\text{溶质}}+m_{\\text{溶剂}}$。' },
  ],
  'solubility': [
    { name:'溶解度的含义', latex:'S=\\dfrac{m_{\\text{溶质}}}{100\\,\\text{g 溶剂}}\\ (\\text{饱和、指定温度})', note:'必须指明温度，多数固体溶解度随温度升高而增大。' },
  ],
  'ph': [
    { name:'pH 与酸碱性', latex:'pH<7\\ \\text{酸性};\\ pH=7\\ \\text{中性};\\ pH>7\\ \\text{碱性}', note:'越偏离 7，酸性或碱性越强。' },
  ],
  'chemical-equation': [
    { name:'书写三步', latex:'\\text{写正确化学式}\\to\\text{配平}\\to\\text{标条件与}\\uparrow\\downarrow', note:'配平后等号两边每种原子个数必须相等。' },
  ],
  'equation-calc': [
    { name:'质量比', latex:'m_A:m_B=(M_{rA}\\cdot a):(M_{rB}\\cdot b)', note:'$a,b$ 为配平后的化学计量数（系数）。' },
  ],
  'air': [
    { name:'空气主要成分（体积分数）', latex:'\\text{N}_2\\approx78\\%,\\ \\text{O}_2\\approx21\\%', note:'其余约 1% 为稀有气体、二氧化碳等。' },
  ],
};

const CHEM_PITFALL_BANK = {
  'matter-change': ['**判断依据只有一条**：有没有生成新物质，而不是发不发光、放不放热。', '**爆炸不一定是化学变化**：气球爆炸是物理变化，火药爆炸才是化学变化。'],
  'molecule-atom': ['**化学变化中分子变、原子不变**：分子可以再分，原子在化学变化中不能再分。', '**分子不一定比原子大**：不能用大小区分分子和原子，要看是否「保持化学性质」。'],
  'element': ['**元素只论种类、不论个数**：不能说「水里有 2 个氢元素」，应说「含氢、氧两种元素」。', '**元素 ≠ 原子**：元素是宏观概念（讲组成），原子是微观概念（讲个数）。'],
  'formula-valence': ['**化合价标在元素正上方、先正后负**，与离子符号写法不同。', '**单质中元素化合价为 0**，如 $\\text{O}_2$、$\\text{Fe}$。'],
  'chemical-equation': ['**配平不能改下标只能改系数**：把 $\\text{H}_2\\text{O}$ 改成 $\\text{H}_2\\text{O}_2$ 就改变了物质。', '**条件、↑、↓ 别漏标**：气体生成物标 ↑，溶液中沉淀标 ↓。'],
  'mass-conservation': ['**「质量不变」要在密闭体系看**：敞口反应有气体逸出或进入，称量会变。', '**只对参加反应的物质成立**，没参加反应的杂质不计入。'],
  'oxidation-combustion': ['**着火点是物质固有属性，不能「降低着火点」灭火**，只能降温到着火点以下。', '**缓慢氧化也是氧化**：铁生锈、食物腐败都是缓慢氧化，不一定发光。'],
  'oxygen': ['**带火星木条复燃才说明是氧气**，燃着的木条不熄灭不能作为充分证据。', '**催化剂只改变速率**，反应前后质量和化学性质都不变，不是反应物。'],
  'co2': ['**CO₂ 不能用排水法收集**（能溶于水），只能向上排空气法。', '**CO₂ 本身不能燃烧也不支持燃烧**，但能使紫色石蕊变红（生成碳酸）。'],
  'metal-activity': ['**排在氢后的金属（铜、银等）不与稀酸反应放氢气**。', '**很活泼的金属（K、Ca、Na）不用于置换盐溶液中的金属**，它们会先与水反应。'],
  'acid': ['**酸的通性来自 H⁺**，但浓硫酸有特殊性（吸水、脱水），稀释要把酸沿器壁倒入水中。', '**石蕊「遇酸变红」**，酚酞遇酸不变色（保持无色），别记反。'],
  'base': ['**碱使酚酞变红、使石蕊变蓝**，注意与酸的颜色变化区分。', '**不是所有碱都溶于水**：氢氧化钠、氢氧化钙溶（微溶），多数金属氢氧化物难溶。'],
  'ph': ['**pH 越小酸性越强**，不要以为数越大越「厉害」。', '**测 pH 用 pH 试纸不能直接伸入待测液**：应用玻璃棒蘸取滴在试纸上再比色。'],
  'solution': ['**溶液一定均一、稳定，但不一定无色**（如硫酸铜溶液是蓝色）。', '**饱和不等于浓**：少量易溶物可成不饱和的浓溶液，难溶物也可成饱和的稀溶液。'],
  'mass-fraction': ['**分母是溶液质量，不是溶剂质量**：溶液质量 = 溶质 + 溶剂。', '**稀释时溶质质量不变**，这是稀释计算的突破口。'],
  'equation-calc': ['**先配平再计算**：质量比要用配平后的系数。', '**单位要统一**，气体常给体积，必要时先换算成质量。'],
};

// 关键节点的示意图（内联 SVG），由 node-detail 的「图示」区渲染
const CHEM_FIGURE_BANK = {
  'atom-structure': '<svg viewBox="0 0 240 210" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="105" r="92" fill="none" stroke="#2563eb" stroke-opacity="0.35" stroke-width="1.2"/><circle cx="120" cy="105" r="58" fill="none" stroke="#2563eb" stroke-opacity="0.45" stroke-width="1.2"/><circle cx="120" cy="105" r="15" fill="rgba(37,99,235,0.25)" stroke="#2563eb" stroke-width="2"/><text x="120" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11">+11</text><circle cx="120" cy="47" r="3.5" fill="#93c5fd"/><circle cx="142" cy="105" r="3.5" fill="#93c5fd"/><circle cx="120" cy="13" r="3.5" fill="#60a5fa"/><text x="120" y="200" text-anchor="middle" fill="#94a3b8" font-size="12">钠原子：核内 11 质子，核外 2 / 8 / 1 电子</text></svg>',
  'ph': '<svg viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="phg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="50%" stop-color="#22c55e"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient></defs><rect x="20" y="40" width="240" height="22" rx="4" fill="url(#phg)"/><text x="20" y="80" fill="#fca5a5" font-size="12">0</text><text x="134" y="80" fill="#86efac" font-size="12">7</text><text x="248" y="80" fill="#93c5fd" font-size="12">14</text><text x="50" y="100" fill="#fca5a5" font-size="12">酸性</text><text x="125" y="100" fill="#86efac" font-size="12">中性</text><text x="218" y="100" fill="#93c5fd" font-size="12">碱性</text><text x="140" y="28" text-anchor="middle" fill="#e2e8f0" font-size="12">pH 越小越酸，越大越碱</text></svg>',
  'metal-activity': '<svg viewBox="0 0 300 110" xmlns="http://www.w3.org/2000/svg"><line x1="16" y1="55" x2="284" y2="55" stroke="#16a34a" stroke-width="2"/><path d="M284 55 l-10 -5 v10 z" fill="#16a34a"/><text x="20" y="40" fill="#86efac" font-size="11">活动性强</text><text x="240" y="40" fill="#94a3b8" font-size="11">活动性弱</text><text x="16" y="78" fill="#e2e8f0" font-size="11">K Ca Na Mg Al Zn Fe</text><text x="170" y="78" fill="#fca5a5" font-size="11">(H)</text><text x="196" y="78" fill="#e2e8f0" font-size="11">Cu Hg Ag Pt Au</text><text x="150" y="100" text-anchor="middle" fill="#94a3b8" font-size="11">排在 (H) 前的金属才能置换出酸中的氢</text></svg>',
  'molecule-atom': '<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="55" r="13" fill="#60a5fa"/><circle cx="60" cy="45" r="8" fill="#f87171"/><circle cx="60" cy="68" r="8" fill="#f87171"/><text x="50" y="100" text-anchor="middle" fill="#94a3b8" font-size="11">水分子 H₂O</text><text x="120" y="60" fill="#e2e8f0" font-size="20">→</text><text x="120" y="40" fill="#94a3b8" font-size="10">通电分解</text><circle cx="190" cy="40" r="8" fill="#f87171"/><circle cx="210" cy="40" r="8" fill="#f87171"/><circle cx="185" cy="75" r="6" fill="#60a5fa"/><circle cx="200" cy="75" r="6" fill="#60a5fa"/><circle cx="215" cy="75" r="6" fill="#60a5fa"/><circle cx="230" cy="75" r="6" fill="#60a5fa"/><text x="205" y="105" text-anchor="middle" fill="#94a3b8" font-size="11">原子重新组合成 O₂、H₂</text></svg>',
};

// 关键计算节点的具体例题（覆盖生成的通用例题）
const CHEM_WORKED_BANK = {
  'chemical-equation': [{ title:'例题 · 配平化学方程式', problem:'配平：___ Al + ___ O₂ → ___ Al₂O₃', steps:['先看两边原子：Al₂O₃ 中有 2 个 Al、3 个 O。', '用最小公倍数配氧：O₂ 系数 3、Al₂O₃ 系数 2（右边 6 个 O）。', '再配铝：右边 4 个 Al，故 Al 系数 4。', '结果：4Al + 3O₂ —点燃→ 2Al₂O₃，两边各 4 个 Al、6 个 O，已配平。'] }],
  'relative-molecular-mass': [{ title:'例题 · 求相对分子质量', problem:'求二氧化碳 CO₂ 的相对分子质量。（C：12，O：16）', steps:['数原子：1 个 C，2 个 O。', '代入：$M_r = 12\\times1 + 16\\times2$', '$= 12 + 32 = 44$。'] }],
  'formula-calc': [{ title:'例题 · 求元素质量分数', problem:'求水 H₂O 中氢元素的质量分数。（H：1，O：16）', steps:['相对分子质量：$M_r = 1\\times2 + 16 = 18$。', '氢的总质量贡献：$1\\times2 = 2$。', '质量分数：$w(H) = \\dfrac{2}{18}\\times100\\% \\approx 11.1\\%$。'] }],
  'mass-fraction': [{ title:'例题 · 配制溶液', problem:'要配制 100 g 溶质质量分数为 16% 的氯化钠溶液，需要氯化钠和水各多少克？', steps:['溶质质量：$m_{溶质} = 100\\,g \\times 16\\% = 16\\,g$。', '溶剂质量：$m_{水} = 100 - 16 = 84\\,g$。', '故需称量 16 g 氯化钠，量取 84 g（约 84 mL）水。'] }],
  'equation-calc': [{ title:'例题 · 根据方程式计算', problem:'电解 36 g 水，最多能得到氧气多少克？（H：1，O：16）', steps:['写出并配平：2H₂O —通电→ 2H₂↑ + O₂↑。', '质量比 H₂O∶O₂ = (2×18)∶(32) = 36∶32。', '设氧气质量为 x：$\\dfrac{36}{32} = \\dfrac{36\\,g}{x}$。', '解得 $x = 32\\,g$，即最多得到 32 g 氧气。'] }],
};

function nodePrereqNames(node) {
  return (node.prereqs || [])
    .map(id => window.CHEM_NODE_BY_ID[id]?.name)
    .filter(Boolean);
}

function defaultPitfalls(node) {
  const prereqs = nodePrereqNames(node);
  return [
    `**只背结论不看条件**：${node.name}的结论通常有适用范围，离开条件就可能出错。`,
    `**名称、符号、单位容易混**：化学表达要同时注意物质名称、化学符号和数量关系，涉及反应时还要注意条件和配平。`,
    prereqs.length ? `**前置没打牢**：${prereqs.join('、')}不熟时，学习${node.name}容易把概念混在一起。` : `**忽略实验依据**：入门知识要回到观察、实验和证据。`,
  ];
}

function defaultFormulas(node) {
  return [
    { name:'核心思路', latex:'\\text{现象}\\rightarrow\\text{微观/符号}\\rightarrow\\text{规律}\\rightarrow\\text{解释}', note:`${node.name}先抓现象，再用微观模型或化学符号表达。` },
  ];
}

function makeLesson(node) {
  const prereqs = nodePrereqNames(node);
  const formulas = CHEM_FORMULA_BANK[node.id] || defaultFormulas(node);
  const firstFormula = formulas[0]?.latex || '\\text{现象}\\rightarrow\\text{解释}';
  const prereqLine = prereqs.length ? `它的前置知识是 **${prereqs.join('、')}**，这些内容提供了必要的概念、符号或实验基础。` : '它是整张星图的入口知识，可以从生活现象和课堂实验开始。';

  return {
    figure: CHEM_FIGURE_BANK[node.id],
    intro: [
      `**${node.name}**：${node.concept}。`,
      node.explanation,
      `${prereqLine}学习时要同时抓住三个层次：看到什么现象、用什么符号或微观模型描述、用什么规律解释。`,
    ],
    formulas,
    methods: [
      {
        name:'三步学习法',
        when:`遇到关于「${node.name}」的概念题、实验题或计算题时`,
        steps:[
          '先确定研究对象和情境：是哪种物质、哪个反应、哪个实验条件。',
          '再找对应概念、符号或公式：能用公式就统一单位后代入；不能用公式就用微观模型或化学性质解释。',
          '最后回到题意检查：结果是否有单位、化学式与方程式是否配平、结论是否符合实验现象。',
        ],
        example:{
          problem:`用「${node.name}」解释一个现象`,
          solution:[
            `现象：${node.example}`,
            `用到的核心关系：$${firstFormula}$。`,
            `解释时先说清条件，再说明${node.name}怎样影响结果。`,
          ],
        },
      },
    ],
    worked: CHEM_WORKED_BANK[node.id] || [
      {
        title:'例题 · 从现象到规律',
        problem:`请用「${node.name}」解释：${node.example}`,
        steps:[
          `第一步，找研究对象：题目围绕的是${node.name}相关的物质、反应或实验。`,
          `第二步，调出概念：${node.concept}。`,
          `第三步，联系规律：可参考 $${firstFormula}$，并说明条件是否满足。`,
          '第四步，写出结论：用一句话回答现象为什么会发生，避免只列符号不解释。',
        ],
      },
    ],
    pitfalls: CHEM_PITFALL_BANK[node.id] || defaultPitfalls(node),
    exercises: [
      {
        problem:`判断：学习「${node.name}」时，只要记住结论，不需要说明条件。`,
        hint:'想一想化学规律是否都有适用范围。',
        answer:'错误。化学结论几乎都有适用条件，很多易错题正是把条件换掉后让原结论失效。',
      },
      {
        problem:`写出「${node.name}」最核心的一个关键词、化学式或公式。`,
        hint:'可以从定义或公式卡片中找。',
        answer:`核心可写为：${node.concept}。若需要公式，可用 $${firstFormula}$。`,
      },
      {
        problem:`为什么「${node.name}」在知识星图中要接在它的前置知识之后？`,
        hint:'看它依赖哪些概念、符号或实验。',
        answer: prereqs.length
          ? `因为它需要先用到 ${prereqs.join('、')} 中的概念或方法，前置不清楚，后面的现象解释和计算就会缺少依据。`
          : '因为它是入口知识，用来建立后续学习所需的实验意识和基本语言。',
      },
    ],
  };
}

window.CHEM_LESSON = Object.fromEntries(
  window.CHEM_NODES.map(node => [node.id, makeLesson(node)])
);
