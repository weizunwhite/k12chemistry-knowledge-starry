// 初中化学知识体系 — 全骨架
// 用「依赖关系」组织，不分先后年级，只看知识依赖
// theme: matter（物质构成）| reaction（化学反应）| substances（常见物质）| quantitative（定量化学）| experiment（实验与方法）
// level: 在依赖图中的深度（用于星空自动布局和学习推荐）

window.CHEM_THEMES = {
  matter:       { name: '物质构成',   short: '构成', color: '#2563eb', soft: '#dbeafe', deep: '#1e40af' },
  reaction:     { name: '化学反应',   short: '反应', color: '#ea580c', soft: '#ffedd5', deep: '#9a3412' },
  substances:   { name: '常见物质',   short: '物质', color: '#16a34a', soft: '#dcfce7', deep: '#15803d' },
  quantitative: { name: '定量化学',   short: '定量', color: '#7c3aed', soft: '#ede9fe', deep: '#5b21b6' },
  experiment:   { name: '实验与方法', short: '实验', color: '#0d9488', soft: '#ccfbf1', deep: '#0f766e' },
};

// 节点：每个知识点
// {id, name, theme, level, prereqs[], concept, explanation, example, connections[]}
window.CHEM_NODES = [
  // ───── 物质构成 ─────
  { id:'matter-change', name:'物质的变化与性质', theme:'matter', level:1, prereqs:[],
    concept:'物理变化没有新物质生成，化学变化（化学反应）有新物质生成',
    explanation:'区分物理变化和化学变化是化学的第一道门：判断的唯一标准是「有没有生成新物质」。物理性质（颜色、状态、熔点）不需要发生化学变化就能表现，化学性质（可燃性、氧化性）必须通过化学变化才表现出来。',
    example:'水结冰、蜡熔化是物理变化；木炭燃烧、铁生锈是化学变化（生成了新物质）。',
    connections:['pure-mixture','molecule-atom','oxidation-combustion'] },
  { id:'pure-mixture', name:'纯净物与混合物', theme:'matter', level:2, prereqs:['matter-change'],
    concept:'纯净物只由一种物质组成；混合物由两种或多种物质混合而成',
    explanation:'纯净物有固定的组成和性质，可以用化学式表示；混合物没有固定组成，各成分保持各自性质。区分它们是研究空气、溶液、合金等的基础。',
    example:'蒸馏水是纯净物；空气、海水、合金都是混合物。',
    connections:['air','water','solution'] },
  { id:'molecule-atom', name:'分子和原子', theme:'matter', level:2, prereqs:['matter-change'],
    concept:'分子是保持物质化学性质的最小粒子；原子是化学变化中的最小粒子',
    explanation:'物质由微观粒子构成。化学变化中分子可以分成原子、原子再重新组合成新分子——而原子本身不变。这个微观图像是理解化学反应、质量守恒的根基。',
    example:'水分子由氢原子和氧原子构成；电解水时水分子分成氢、氧原子，重组为氢气和氧气分子。',
    connections:['element','atom-structure','mass-conservation'] },
  { id:'element', name:'元素', theme:'matter', level:3, prereqs:['molecule-atom'],
    concept:'具有相同核电荷数（质子数）的一类原子的总称',
    explanation:'元素是「种类」概念，只论种类不论个数。地壳中含量最多的元素是氧。元素周期表把已知元素按规律排列，是化学的「字典」。',
    example:'氢、氧、碳、铁都是元素；水（H₂O）由氢、氧两种元素组成。',
    connections:['formula-valence','metals','relative-atomic-mass'] },
  { id:'atom-structure', name:'原子结构', theme:'matter', level:3, prereqs:['molecule-atom'],
    concept:'原子由居于中心的原子核（质子+中子）和核外电子构成',
    explanation:'质子带正电、中子不带电、电子带负电。质子数 = 核外电子数，所以原子整体不显电性。核外电子分层排布，最外层电子数决定元素的化学性质。',
    example:'钠原子核内有 11 个质子，核外 11 个电子，最外层 1 个电子，容易失去，化学性质活泼。',
    connections:['ion','relative-atomic-mass'] },
  { id:'ion', name:'离子', theme:'matter', level:4, prereqs:['atom-structure'],
    concept:'原子得到或失去电子后形成的带电粒子',
    explanation:'原子失去电子带正电（阳离子），得到电子带负电（阴离子）。离子是构成物质的又一种基本粒子，氯化钠就由钠离子和氯离子构成。',
    example:'钠原子失去 1 个电子变成 Na⁺；氯原子得到 1 个电子变成 Cl⁻；两者结合成氯化钠。',
    connections:['formula-valence','acid','base'] },
  { id:'formula-valence', name:'化学式与化合价', theme:'matter', level:4, prereqs:['element','ion'],
    concept:'化学式用元素符号表示物质组成；化合价表示原子相互化合的数目关系',
    explanation:'化学式是物质的「身份证」，既表示物质又表示组成。化合价用来书写和检验化学式：化合物中正负化合价代数和为零。',
    example:'水的化学式 H₂O；钠为 +1 价、氯为 −1 价，所以氯化钠是 NaCl；钙 +2、氯 −1，氯化钙是 CaCl₂。',
    connections:['chemical-equation','relative-molecular-mass'] },

  // ───── 化学反应 ─────
  { id:'chemical-equation', name:'化学方程式', theme:'reaction', level:5, prereqs:['formula-valence'],
    concept:'用化学式表示化学反应的式子，遵守质量守恒，要配平',
    explanation:'化学方程式表示「反应物、生成物、条件」三件事，并通过配平体现质量守恒——等号两边每种原子的个数必须相等。它是定量研究化学反应的语言。',
    example:'碳燃烧：C + O₂ —点燃→ CO₂。两边碳、氧原子个数都相等，已配平。',
    connections:['reaction-types','equation-calc'] },
  { id:'mass-conservation', name:'质量守恒定律', theme:'reaction', level:5, prereqs:['molecule-atom'],
    concept:'参加化学反应的各物质质量总和，等于反应后生成的各物质质量总和',
    explanation:'微观上：化学反应前后原子的种类、数目、质量都不变，所以总质量守恒。它是配平化学方程式和一切化学计算的依据。',
    example:'铁在氧气中燃烧后质量增大，是因为结合了氧；若在密闭容器中称量，反应前后总质量不变。',
    connections:['chemical-equation','equation-calc'] },
  { id:'reaction-types', name:'基本反应类型', theme:'reaction', level:6, prereqs:['chemical-equation'],
    concept:'化合、分解、置换、复分解四种基本反应类型',
    explanation:'化合是「多变一」，分解是「一变多」，置换是单质与化合物反应生成另一单质和化合物，复分解是两种化合物互换成分。判断类型有助于预测产物。',
    example:'化合：C+O₂→CO₂；分解：2H₂O₂→2H₂O+O₂↑；置换：Fe+CuSO₄→FeSO₄+Cu；复分解：HCl+NaOH→NaCl+H₂O。',
    connections:['metal-activity','neutralization'] },
  { id:'oxidation-combustion', name:'氧化反应与燃烧', theme:'reaction', level:5, prereqs:['matter-change'],
    concept:'物质与氧发生的反应叫氧化反应；燃烧是剧烈的发光发热的氧化反应',
    explanation:'燃烧需要同时满足三个条件：可燃物、与氧气（或空气）接触、温度达到着火点。理解燃烧条件就能解释灭火原理（破坏任一条件即可）。',
    example:'木柴燃烧是剧烈氧化；铁生锈是缓慢氧化。灭火：用水降温、用锅盖隔绝空气、清除可燃物。',
    connections:['oxygen','carbon'] },

  // ───── 常见物质 ─────
  { id:'air', name:'空气', theme:'substances', level:3, prereqs:['pure-mixture'],
    concept:'空气是混合物，按体积约含氮气 78%、氧气 21%',
    explanation:'空气的成分是定量研究气体的起点。氧气支持燃烧和呼吸，氮气性质稳定常作保护气。测定空气中氧气含量的实验是经典探究。',
    example:'红磷在密闭装置中燃烧消耗氧气，水面上升约 1/5，说明氧气约占空气体积的 21%。',
    connections:['oxygen','co2'] },
  { id:'oxygen', name:'氧气', theme:'substances', level:4, prereqs:['air','oxidation-combustion'],
    concept:'无色无味的气体，化学性质比较活泼，支持燃烧和供给呼吸',
    explanation:'氧气是初中接触的第一种重点单质。它能与许多物质发生氧化反应。实验室常用过氧化氢或高锰酸钾分解制取，工业上分离液态空气获得。',
    example:'带火星的木条伸入氧气中复燃，可用来检验氧气；铁丝在氧气中剧烈燃烧、火星四射。',
    connections:['gas-prep','carbon'] },
  { id:'co2', name:'二氧化碳', theme:'substances', level:4, prereqs:['air'],
    concept:'无色无味的气体，密度比空气大，能溶于水，不支持燃烧',
    explanation:'二氧化碳与水反应生成碳酸，使紫色石蕊变红；与澄清石灰水反应变浑浊（检验方法）。它既是光合作用原料，也是主要温室气体。',
    example:'向澄清石灰水中通入 CO₂，石灰水变浑浊：CO₂+Ca(OH)₂→CaCO₃↓+H₂O，用来检验 CO₂。',
    connections:['gas-prep','substance-id'] },
  { id:'water', name:'水的组成与净化', theme:'substances', level:3, prereqs:['pure-mixture'],
    concept:'水由氢、氧两种元素组成；净化方法有沉淀、过滤、吸附、蒸馏',
    explanation:'电解水实验证明水由氢、氧元素组成（正氧负氢，体积比 1∶2）。净化按净化程度从低到高：沉淀→过滤→吸附→蒸馏，蒸馏得到的水最纯。',
    example:'电解水：2H₂O —通电→ 2H₂↑+O₂↑，负极氢气、正极氧气，体积比约 2∶1。',
    connections:['solution','salt-purification'] },
  { id:'carbon', name:'碳和碳的氧化物', theme:'substances', level:5, prereqs:['oxygen'],
    concept:'碳单质（金刚石、石墨、C₆₀）与一氧化碳、二氧化碳的性质',
    explanation:'同种元素可组成性质迥异的单质（金刚石硬、石墨软导电）——这是「结构决定性质」。碳充分燃烧生成 CO₂，不充分燃烧生成有毒的 CO。',
    example:'金刚石和石墨都由碳元素组成，但因原子排列不同，硬度和导电性差别巨大。',
    connections:['substance-id'] },
  { id:'metals', name:'金属与金属材料', theme:'substances', level:5, prereqs:['element'],
    concept:'金属的物理性质（导电导热、延展性、金属光泽）和合金',
    explanation:'金属大多有金属光泽、能导电导热、有延展性。合金是金属与其他元素熔合形成的混合物，性能往往优于纯金属（更硬、更耐腐蚀）。',
    example:'铁是用量最大的金属；生铁和钢都是铁合金；黄铜是铜锌合金，比纯铜更硬。',
    connections:['metal-activity'] },
  { id:'metal-activity', name:'金属活动性顺序', theme:'substances', level:6, prereqs:['metals','reaction-types'],
    concept:'金属按活动性由强到弱排列：K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au',
    explanation:'活动性顺序用来判断金属能否与酸、与盐溶液反应：排在氢前的金属能置换出酸中的氢；排在前面的金属能把后面的金属从其盐溶液中置换出来。',
    example:'铁能与硫酸铜溶液反应：Fe+CuSO₄→FeSO₄+Cu（铁在铜前）；铜不能与稀盐酸反应（铜在氢后）。',
    connections:['substance-id'] },
  { id:'solution', name:'溶液', theme:'substances', level:4, prereqs:['water'],
    concept:'一种或几种物质分散到另一种物质里形成的均一、稳定的混合物',
    explanation:'溶液由溶质和溶剂组成（溶剂常为水）。溶液的基本特征是均一、稳定。理解溶液是学习溶解度、溶质质量分数和酸碱盐的前提。',
    example:'食盐水中食盐是溶质、水是溶剂；糖水、稀盐酸都是溶液。',
    connections:['solubility','mass-fraction','acid','base'] },
  { id:'acid', name:'酸', theme:'substances', level:6, prereqs:['solution','ion'],
    concept:'电离时生成的阳离子全部是氢离子（H⁺）的化合物',
    explanation:'酸有共同的化学性质，因为它们都能电离出 H⁺：能使紫色石蕊变红、与活泼金属反应放氢气、与碱中和、与某些盐反应。常见酸有盐酸、硫酸。',
    example:'稀盐酸与锌反应：Zn+2HCl→ZnCl₂+H₂↑；稀盐酸使紫色石蕊试液变红。',
    connections:['salt','neutralization','ph','substance-id'] },
  { id:'base', name:'碱', theme:'substances', level:6, prereqs:['solution','ion'],
    concept:'电离时生成的阴离子全部是氢氧根离子（OH⁻）的化合物',
    explanation:'碱也有共同性质，因为都能电离出 OH⁻：能使紫色石蕊变蓝、使无色酚酞变红、与酸中和、与某些盐反应。常见碱有氢氧化钠、氢氧化钙。',
    example:'氢氧化钠使无色酚酞变红；与盐酸中和：NaOH+HCl→NaCl+H₂O。',
    connections:['salt','neutralization','ph'] },
  { id:'salt', name:'盐', theme:'substances', level:7, prereqs:['acid','base'],
    concept:'由金属离子（或铵根）和酸根离子构成的化合物',
    explanation:'盐不一定是「咸的」——它是一大类化合物。盐能与酸、碱、其他盐以及金属发生复分解或置换反应，是物质鉴别和制备的核心。',
    example:'氯化钠、碳酸钙、硫酸铜都是盐；碳酸钙与盐酸反应：CaCO₃+2HCl→CaCl₂+H₂O+CO₂↑。',
    connections:['substance-id'] },
  { id:'neutralization', name:'中和反应', theme:'substances', level:7, prereqs:['acid','base'],
    concept:'酸与碱作用生成盐和水的反应',
    explanation:'中和反应的实质是 H⁺ 和 OH⁻ 结合生成水。它在生活中应用广泛：用熟石灰改良酸性土壤、用胃药中和过多胃酸。',
    example:'盐酸与氢氧化钠：HCl+NaOH→NaCl+H₂O。可借助酚酞由红变无色判断恰好中和。',
    connections:['ph'] },
  { id:'ph', name:'溶液酸碱度 pH', theme:'substances', level:7, prereqs:['acid','base'],
    concept:'用 pH 表示溶液的酸碱度，范围通常 0~14',
    explanation:'pH<7 显酸性，pH=7 中性，pH>7 显碱性，越偏离 7 酸碱性越强。用 pH 试纸或 pH 计测定，广泛用于农业、医疗和环境监测。',
    example:'胃液 pH 约 1~2（强酸性），纯水 pH=7，肥皂水 pH>7（碱性）。用 pH 试纸测定要与标准比色卡对照。',
    connections:['substance-id'] },

  // ───── 定量化学 ─────
  { id:'relative-atomic-mass', name:'相对原子质量', theme:'quantitative', level:4, prereqs:['atom-structure'],
    concept:'以碳-12 原子质量的 1/12 作标准，其他原子质量与之相比所得的比值',
    explanation:'原子真实质量极小，使用不便，于是用「相对」质量。相对原子质量没有单位（是比值），约等于质子数加中子数。它是一切化学计算的基础数据。',
    example:'氢的相对原子质量约为 1，氧约为 16，碳约为 12，铁约为 56。',
    connections:['relative-molecular-mass'] },
  { id:'relative-molecular-mass', name:'相对分子质量', theme:'quantitative', level:5, prereqs:['formula-valence','relative-atomic-mass'],
    concept:'化学式中各原子的相对原子质量的总和',
    explanation:'把化学式里每种原子的相对原子质量乘以个数再相加，就得到相对分子质量。它是计算元素质量分数、参与化学方程式计算的桥梁。',
    example:'水 H₂O：2×1+16=18；二氧化碳 CO₂：12+16×2=44。',
    connections:['formula-calc','equation-calc'] },
  { id:'formula-calc', name:'根据化学式计算', theme:'quantitative', level:6, prereqs:['relative-molecular-mass'],
    concept:'利用化学式计算相对分子质量、元素质量比和元素质量分数',
    explanation:'三类常见计算：相对分子质量、化合物中各元素的质量比、某元素的质量分数。它把化学式从「符号」变成可以算出含量的「数据」。',
    example:'水中氢、氧质量比 = (2×1)∶16 = 1∶8；氧的质量分数 = 16/18 ≈ 88.9%。',
    connections:[] },
  { id:'solubility', name:'溶解度', theme:'quantitative', level:5, prereqs:['solution'],
    concept:'一定温度下，某固态物质在 100 g 溶剂里达到饱和时所溶解的质量',
    explanation:'溶解度描述「溶解能力」，必须指明温度。多数固体溶解度随温度升高而增大。溶解度曲线用来分析结晶、升降温的影响。',
    example:'20°C 时氯化钠的溶解度约 36 g，表示 100 g 水最多溶解约 36 g 食盐达到饱和。',
    connections:['salt-purification'] },
  { id:'mass-fraction', name:'溶质质量分数', theme:'quantitative', level:6, prereqs:['solution'],
    concept:'溶质质量与溶液质量之比，常用百分数表示',
    explanation:'溶质质量分数 = 溶质质量 / 溶液质量 ×100%，其中溶液质量 = 溶质质量 + 溶剂质量。它是配制一定浓度溶液、稀释计算的核心。',
    example:'把 20 g 食盐溶于 80 g 水，溶质质量分数 = 20/(20+80) ×100% = 20%。',
    connections:[] },
  { id:'equation-calc', name:'根据化学方程式计算', theme:'quantitative', level:7, prereqs:['chemical-equation','relative-molecular-mass'],
    concept:'利用化学方程式中各物质的质量比进行定量计算',
    explanation:'配平后的化学方程式中，各物质的「相对分子质量×系数」之比就是它们的质量比。据此可由一种物质的质量求出另一种物质的质量，是初中化学计算的压轴。',
    example:'电解水 2H₂O→2H₂↑+O₂↑：H₂O 与 O₂ 的质量比 = (2×18)∶32 = 36∶32 = 9∶8。',
    connections:[] },

  // ───── 实验与方法 ─────
  { id:'lab-basics', name:'化学实验基本操作', theme:'experiment', level:1, prereqs:[],
    concept:'药品取用、加热、仪器使用与安全规范',
    explanation:'规范操作是化学实验安全和成功的前提：固体粉末用药匙、液体用量筒、加热用酒精灯外焰、闻气味要扇闻。错误操作可能造成危险或实验失败。',
    example:'取用液体时标签朝向手心、瓶塞倒放；给试管加热前要先预热，防止受热不均炸裂。',
    connections:['gas-prep','salt-purification'] },
  { id:'gas-prep', name:'常见气体的制取', theme:'experiment', level:5, prereqs:['oxygen','co2','lab-basics'],
    concept:'实验室制取氧气、二氧化碳的原理、装置与收集方法',
    explanation:'选择发生装置看反应条件（是否加热），选择收集方法看气体性质（密度、溶解性）。氧气可用排水法或向上排空气法，二氧化碳只能向上排空气法。',
    example:'制 O₂：2H₂O₂ —MnO₂→ 2H₂O+O₂↑；制 CO₂：CaCO₃+2HCl→CaCl₂+H₂O+CO₂↑。',
    connections:['substance-id'] },
  { id:'substance-id', name:'物质的检验与鉴别', theme:'experiment', level:6, prereqs:['acid','base','co2'],
    concept:'利用特征反应和现象区分、确认不同物质',
    explanation:'检验是「确认是不是它」，鉴别是「区分谁是谁」。要选择现象明显、互不干扰的特征反应：如用石灰水检验 CO₂，用石蕊/酚酞区分酸碱。',
    example:'区分稀盐酸和氢氧化钠溶液：滴入紫色石蕊，变红的是盐酸，变蓝的是氢氧化钠。',
    connections:[] },
  { id:'salt-purification', name:'粗盐提纯', theme:'experiment', level:5, prereqs:['solution','lab-basics'],
    concept:'通过溶解、过滤、蒸发把粗盐中的不溶性杂质除去',
    explanation:'粗盐提纯是综合实验：溶解（让食盐溶解、杂质不溶）、过滤（除去不溶物）、蒸发结晶（得到精盐）。过滤要「一贴二低三靠」，蒸发要用玻璃棒搅拌防飞溅。',
    example:'溶解粗盐→过滤除去泥沙→蒸发结晶得到较纯的氯化钠。过滤时漏斗下端紧靠烧杯内壁。',
    connections:[] },
];

// 推导：边集合（由 prereqs 自动生成）
window.CHEM_EDGES = window.CHEM_NODES.flatMap(n =>
  (n.prereqs || []).map(p => ({ from: p, to: n.id }))
);

// 节点查询
window.CHEM_NODE_BY_ID = Object.fromEntries(window.CHEM_NODES.map(n => [n.id, n]));

// 每条边的「教学理由」——为什么先学 A 才能学 B（自动生成中性表述）
function edgeReason(fromId, toId) {
  const from = window.CHEM_NODE_BY_ID[fromId];
  const to = window.CHEM_NODE_BY_ID[toId];
  if (!from || !to) return '';
  const cross = from.theme === to.theme ? '' : '跨主题地';
  return `${from.name}提供了${to.name}所需的概念、符号或实验基础，先理解它，才能${cross}把${to.name}里的物质、反应和计算说清楚。`;
}

window.CHEM_EDGE_WHY = Object.fromEntries(
  window.CHEM_EDGES.map(e => [`${e.from}→${e.to}`, edgeReason(e.from, e.to)])
);

// 年级标注（人教版：初中化学集中在九年级，分九年级上 / 九年级下）；用于详情页标签与新手引导筛选
window.CHEM_NODE_GRADE = {
  // 九年级上：物质构成、空气氧气、水、化学方程式、碳、燃烧、质量守恒、实验基础、定量基础
  'matter-change':'九年级上','pure-mixture':'九年级上','molecule-atom':'九年级上','element':'九年级上','atom-structure':'九年级上','ion':'九年级上','formula-valence':'九年级上',
  'chemical-equation':'九年级上','mass-conservation':'九年级上','oxidation-combustion':'九年级上',
  'air':'九年级上','oxygen':'九年级上','co2':'九年级上','water':'九年级上','carbon':'九年级上',
  'relative-atomic-mass':'九年级上','relative-molecular-mass':'九年级上','formula-calc':'九年级上',
  'lab-basics':'九年级上','gas-prep':'九年级上',
  // 九年级下：金属、溶液、酸碱盐、pH、相关计算与鉴别
  'reaction-types':'九年级下','metals':'九年级下','metal-activity':'九年级下','solution':'九年级下',
  'acid':'九年级下','base':'九年级下','salt':'九年级下','neutralization':'九年级下','ph':'九年级下',
  'solubility':'九年级下','mass-fraction':'九年级下','equation-calc':'九年级下',
  'substance-id':'九年级下','salt-purification':'九年级下',
};
window.CHEM_GRADE_RANK = { '九年级上':1, '九年级下':2 };
