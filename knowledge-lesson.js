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
// 暴露给 node-detail 做兜底：lessons/*.js 分片整条覆盖小课时会丢掉 figure 字段，
// 渲染时若小课本身没有 figure，就回退到这里查
window.CHEM_FIGURE_BANK = CHEM_FIGURE_BANK;

// 关键计算节点的具体例题（覆盖生成的通用例题）
const CHEM_WORKED_BANK = {
  'chemical-equation': [{ title:'例题 · 配平化学方程式', problem:'配平：___ Al + ___ O₂ → ___ Al₂O₃', steps:['先看两边原子：Al₂O₃ 中有 2 个 Al、3 个 O。', '用最小公倍数配氧：O₂ 系数 3、Al₂O₃ 系数 2（右边 6 个 O）。', '再配铝：右边 4 个 Al，故 Al 系数 4。', '结果：4Al + 3O₂ —点燃→ 2Al₂O₃，两边各 4 个 Al、6 个 O，已配平。'] }],
  'relative-molecular-mass': [{ title:'例题 · 求相对分子质量', problem:'求二氧化碳 CO₂ 的相对分子质量。（C：12，O：16）', steps:['数原子：1 个 C，2 个 O。', '代入：$M_r = 12\\times1 + 16\\times2$', '$= 12 + 32 = 44$。'] }],
  'formula-calc': [{ title:'例题 · 求元素质量分数', problem:'求水 H₂O 中氢元素的质量分数。（H：1，O：16）', steps:['相对分子质量：$M_r = 1\\times2 + 16 = 18$。', '氢的总质量贡献：$1\\times2 = 2$。', '质量分数：$w(H) = \\dfrac{2}{18}\\times100\\% \\approx 11.1\\%$。'] }],
  'mass-fraction': [{ title:'例题 · 配制溶液', problem:'要配制 100 g 溶质质量分数为 16% 的氯化钠溶液，需要氯化钠和水各多少克？', steps:['溶质质量：$m_{溶质} = 100\\,g \\times 16\\% = 16\\,g$。', '溶剂质量：$m_{水} = 100 - 16 = 84\\,g$。', '故需称量 16 g 氯化钠，量取 84 g（约 84 mL）水。'] }],
  'equation-calc': [{ title:'例题 · 根据方程式计算', problem:'电解 36 g 水，最多能得到氧气多少克？（H：1，O：16）', steps:['写出并配平：2H₂O —通电→ 2H₂↑ + O₂↑。', '质量比 H₂O∶O₂ = (2×18)∶(32) = 36∶32。', '设氧气质量为 x：$\\dfrac{36}{32} = \\dfrac{36\\,g}{x}$。', '解得 $x = 32\\,g$，即最多得到 32 g 氧气。'] }],
};

// 「先想一想」引入题：每个知识点讲解前先抛一道诊断/观察题，让学生先意识到本节在考察什么
const CHEM_WARMUP_BANK = {
  'matter-change': { q: '蜡烛燃烧时，既会熔化滴下蜡油，又会冒烟发光。这两件事是同一类变化吗？怎么区分？', hint: '判断标准只有一条：有没有生成新物质。', answer: '熔化是物理变化（只是状态变了），燃烧是化学变化（生成了新物质）。**有没有新物质生成**是区分物理变化和化学变化的唯一依据。本节学物质的变化与性质。' },
  'pure-mixture': { q: '矿泉水瓶上写着含有钙、镁、钠等多种成分，那它还算"纯净"的水吗？', hint: '"纯净"在化学里指只由一种物质组成。', answer: '不算——它含多种物质，是**混合物**。只由一种物质组成的才叫**纯净物**（如蒸馏水）。区分二者是研究空气、溶液的基础。' },
  'molecule-atom': { q: '电解水能得到氢气和氧气，可水里明明没有这两种气体，它们是凭空出现的吗？', hint: '想想水分子被"拆"开后会发生什么。', answer: '不是凭空——水分子被分成氢、氧**原子**，原子再重新组合成氢气和氧气分子。化学变化中分子可分、原子不变。本节学分子和原子。' },
  'element': { q: '金刚石最硬、石墨很软还能导电，可它们都"由碳组成"，这说得通吗？', hint: '"由什么组成"说的是元素种类。', answer: '说得通——它们都只含碳**元素**，差别在原子的排列方式。元素是质子数相同的一类原子的总称，只论种类不论排列。本节学元素。' },
  'atom-structure': { q: '原子整体不带电，可它内部却有带正电的质子和带负电的电子，怎么做到"不显电性"的？', hint: '数一数正负电荷的数目。', answer: '因为**质子数 = 核外电子数**，正负电荷恰好抵消。原子由原子核（质子+中子）和核外电子构成，最外层电子数决定化学性质。本节学原子结构。' },
  'ion': { q: '钠原子很活泼、容易"丢"掉一个电子，丢了之后它还是中性的原子吗？', hint: '少了一个负电荷，整体带什么电？', answer: '不是了——它带正电，变成了**离子**（Na⁺）。原子得失电子后形成带电的离子，离子也是构成物质的基本粒子。本节学离子。' },
  'formula-valence': { q: '钠和氯结合成食盐写作 NaCl，可钙和氯结合却是 CaCl₂，为什么钙后面要带个"2"？', hint: '每种元素能"抓住"几个，是有数的。', answer: '因为化合价不同——钙是 +2、氯是 −1，要让正负化合价代数和为零，就得 1 个钙配 2 个氯。化合价决定化学式怎么写。本节学化学式与化合价。' },
  'chemical-equation': { q: '"氢气燃烧生成水"写成 $H_2 + O_2 \\to H_2O$ 对吗？数一数两边的氧原子。', hint: '左边 2 个氧，右边只有 1 个，跑哪去了？', answer: '不对——原子不会凭空消失，必须**配平**：$2H_2 + O_2 \\to 2H_2O$。化学方程式要遵守质量守恒、要配平。本节学化学方程式。' },
  'mass-conservation': { q: '木柴烧成一小撮灰，质量明显变小了，这是不是说明燃烧"消灭"了一部分物质？', hint: '别忘了还跑掉了看不见的气体。', answer: '没有消灭——跑掉的二氧化碳、水蒸气也有质量。把它们算进来，反应前后**总质量不变**。这就是**质量守恒定律**，微观上是原子种类、数目不变。' },
  'reaction-types': { q: '$C+O_2\\to CO_2$ 是"多变一"，$2H_2O_2\\to 2H_2O+O_2$ 是"一变多"，化学反应能不能也分分类？', hint: '按反应物、生成物的"个数"和"换不换成分"来分。', answer: '能——化合、分解、置换、复分解四种**基本反应类型**。判断类型有助于预测产物。本节学基本反应类型。' },
  'oxidation-combustion': { q: '同样是铁，在潮湿空气里慢慢生锈，在纯氧里却剧烈燃烧、火星四射，差别在哪？', hint: '都是和氧结合，只是"快慢"不同。', answer: '两者都是**氧化反应**，区别在剧烈程度——燃烧是剧烈的发光发热的氧化。燃烧需要可燃物、氧气、达到着火点三个条件。本节学氧化反应与燃烧。' },
  'air': { q: '空气看起来"空空如也"，可它真的是一种单一的气体吗？怎么证明里面有氧气、又有多少？', hint: '用红磷烧掉氧气，看水会不会被"吸"进来。', answer: '空气是**混合物**——红磷燃烧耗尽氧气后，水面上升约 1/5，证明氧气约占空气体积的 21%。本节学空气的成分。' },
  'oxygen': { q: '要检验一瓶无色气体是不是氧气，你会怎么做？凑近闻一闻可靠吗？', hint: '氧气最大的本事是"助燃"。', answer: '用**带火星的木条**伸进去，若复燃就是氧气（氧气支持燃烧）。闻气味既不可靠也不安全。本节学氧气的性质与制取。' },
  'co2': { q: '同样无色无味的二氧化碳，怎么和氧气区分开？有没有一种一看就明白的检验方法？', hint: '让它和澄清石灰水见个面。', answer: '把气体通入**澄清石灰水**，变浑浊的就是二氧化碳（$CO_2+Ca(OH)_2\\to CaCO_3\\downarrow+H_2O$）。本节学二氧化碳的性质。' },
  'water': { q: '古人把水当作一种"基本元素"，可电解水却能得到两种气体，水到底是不是"纯粹"的一种东西？', hint: '电解的产物告诉你水由什么组成。', answer: '水其实由**氢、氧两种元素**组成（电解得氢气、氧气，体积比约 2∶1）。本节还学沉淀、过滤、吸附、蒸馏等净水方法。' },
  'carbon': { q: '最硬的金刚石和能写字的石墨，价格天差地别，却都是"碳"，凭什么性质差这么多？', hint: '同样的原子，排列方式不同。', answer: '因为碳原子的**排列结构**不同——这正是"结构决定性质"。碳充分燃烧生成 CO₂，不充分燃烧生成有毒的 CO。本节学碳和碳的氧化物。' },
  'metals': { q: '铁、铜、铝都能导电、有光泽、能拉成丝，这些"金属脾气"有什么共性？又为什么菜刀多用合金而非纯铁？', hint: '合金往往比纯金属更硬、更耐用。', answer: '金属大多有金属光泽、导电导热、有延展性；**合金**（金属混入其他元素）性能常优于纯金属。本节学金属与金属材料。' },
  'metal-activity': { q: '把铁钉泡进硫酸铜溶液，过一会儿铁钉上镀了一层红色的铜，铜从哪来的？反过来铜能把铁换出来吗？', hint: '谁更"活泼"，谁就能把对方挤出来。', answer: '铁比铜活泼，把铜从溶液里置换出来（$Fe+CuSO_4\\to FeSO_4+Cu$），反过来不行。金属按活泼程度排成**活动性顺序**。本节学金属活动性顺序。' },
  'solution': { q: '把糖放进水里搅一搅就"看不见"了，糖真的消失了吗？这杯糖水上下一样甜吗？', hint: '糖以极小的粒子均匀分散开了。', answer: '糖没消失，而是均匀分散成了**溶液**——溶液的特征是**均一、稳定**。理解溶液是学溶解度、酸碱盐的前提。本节学溶液。' },
  'acid': { q: '盐酸、硫酸、醋，味道都酸、都能让紫色石蕊变红，这些"酸"为什么有共同的脾气？', hint: '它们在水里都电离出了同一种离子。', answer: '因为它们都能电离出**氢离子 H⁺**——酸的通性都来自它。酸能使石蕊变红、与活泼金属反应、与碱中和。本节学酸。' },
  'base': { q: '氢氧化钠、石灰水都滑滑的、都能让无色酚酞变红，这些"碱"的共同脾气又来自什么？', hint: '和酸对应，它们电离出的是另一种离子。', answer: '来自**氢氧根离子 OH⁻**。碱能使石蕊变蓝、使酚酞变红、与酸中和。本节学碱。' },
  'salt': { q: '食盐是"盐"，可化学里碳酸钙、硫酸铜也叫"盐"，难道它们都是咸的吗？', hint: '化学里的"盐"不是按味道定义的。', answer: '不是按味道——**盐**是由金属离子（或铵根）和酸根离子构成的一大类化合物。它能与酸、碱、盐、金属反应。本节学盐。' },
  'neutralization': { q: '胃酸过多会难受，吃一点含碱的胃药就缓解了，酸和碱碰到一起发生了什么？', hint: 'H⁺ 遇到 OH⁻ 会怎样？', answer: '酸和碱反应生成**盐和水**（中和反应），实质是 H⁺ + OH⁻ → 水。它还用于改良酸性土壤、处理污水。本节学中和反应。' },
  'ph': { q: '同样是酸，柠檬汁和盐酸的"酸"程度一样吗？有没有一个数字能一眼看出酸碱强弱？', hint: '有个 0~14 的指标。', answer: '有——用 **pH** 表示：pH<7 酸性、=7 中性、>7 碱性，越偏离 7 越强。本节学溶液酸碱度 pH 及其测定。' },
  'relative-atomic-mass': { q: '一个原子的真实质量小到约 $10^{-26}$ 千克，写计算时这么小的数太麻烦了，有没有更省事的表示法？', hint: '用"相对"的办法——找个标准来比。', answer: '有——以碳-12 原子质量的 1/12 为标准，其他原子与之相比，就是**相对原子质量**（一个比值，没有单位）。它是一切化学计算的基础数据。' },
  'relative-molecular-mass': { q: '已经知道每个原子的相对质量，那一个水分子 H₂O 的相对质量该怎么算？', hint: '把每种原子的相对质量乘以个数再相加。', answer: '把化学式里各原子的相对原子质量相加：$2\\times1+16=18$，就是**相对分子质量**。它是算元素含量、参与方程式计算的桥梁。' },
  'formula-calc': { q: '化肥袋上常标"含氮量"，面对一种化肥的化学式，你能算出它含氮的百分比吗？', hint: '氮的总质量 ÷ 整个化学式的相对分子质量。', answer: '能——这就是**元素质量分数** $w=\\dfrac{\\text{该元素质量}}{M_r}\\times100\\%$。本节学根据化学式计算（相对分子质量、质量比、质量分数）。' },
  'solubility': { q: '同样一杯水，夏天能溶更多的糖，冬天却容易"溶不下"，物质的"溶解本领"和什么有关？', hint: '温度是个关键变量。', answer: '和**温度**密切相关——溶解度是一定温度下 100 g 溶剂里达到饱和时溶解的质量，多数固体随温度升高而增大。本节学溶解度。' },
  'mass-fraction': { q: '医院的生理盐水标着"0.9%"，这个百分数到底在说什么？是 0.9 克盐吗？', hint: '它说的是盐占整杯溶液的比例。', answer: '它是**溶质质量分数**：溶质质量 ÷ 溶液质量 ×100%。0.9% 表示每 100 g 盐水含 0.9 g 盐。本节学溶质质量分数与配制、稀释计算。' },
  'equation-calc': { q: '已知电解一定质量的水，能不能在不做实验的情况下，算出会生成多少克氧气？', hint: '配平的方程式里，各物质有固定的质量比。', answer: '能——配平后各物质"相对分子质量×系数"之比就是质量比，据此由一种物质算出另一种。本节学根据化学方程式计算。' },
  'lab-basics': { q: '给试管里的液体加热，能不能像烧水一样对着底部猛烧？为什么常听到"炸裂"的警告？', hint: '受热不均会怎样？', answer: '不能——要先预热、再用外焰、液体不超 1/3，否则受热不均易炸裂。规范操作是化学实验安全的第一课。本节学化学实验基本操作。' },
  'gas-prep': { q: '实验室既要制氧气又要制二氧化碳，凭什么决定用什么装置、又用什么方法收集？', hint: '看反应要不要加热、看气体的密度和溶解性。', answer: '发生装置看反应条件（是否加热），收集方法看气体性质（密度、溶解性）。氧气可排水法，CO₂ 只能向上排空气法。本节学常见气体的制取。' },
  'substance-id': { q: '两瓶无色液体，一瓶稀盐酸、一瓶氢氧化钠溶液，不尝不摸，你怎么把它们区分开？', hint: '找一种现象明显、又互不干扰的试剂。', answer: '滴入紫色石蕊：变红的是盐酸、变蓝的是氢氧化钠。利用特征反应区分、确认物质，就是**检验与鉴别**。本节学物质的检验与鉴别。' },
  'salt-purification': { q: '一包混了泥沙的粗盐，怎么把白白的食盐从里面"提"出来？泥沙又怎么除掉？', hint: '食盐能溶于水、泥沙不能——这是突破口。', answer: '按"溶解→过滤→蒸发结晶"三步：溶解让盐溶、泥沙不溶，过滤除泥沙，蒸发得精盐。本节学粗盐提纯。' },
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
    warmup: CHEM_WARMUP_BANK[node.id],
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
