// 子知识点 · 把"枢纽星"细分成可操作的"子点"
// 每个 sub-topic: { name, summary, detail }
// 命中 BANK 用专属内容，未命中走默认兜底（仍然合法、可用）。

const CHEM_SUBNODE_BANK = {
  'matter-change': [
    { name:'物理变化', summary:'没有新物质生成', detail:'状态、形状改变属于物理变化，如水结冰、玻璃破碎、酒精挥发。物理性质（颜色、状态、熔点等）可以直接观察。' },
    { name:'化学变化', summary:'有新物质生成', detail:'化学变化常伴随发光、放热、变色、放气、产生沉淀等现象，但**判断依据只有一条：是否生成新物质**。' },
    { name:'两类性质', summary:'物理性质 vs 化学性质', detail:'物理性质不需发生化学变化就能表现（颜色、密度）；化学性质必须通过化学变化才表现出来（可燃性、氧化性）。' },
  ],
  'molecule-atom': [
    { name:'分子', summary:'保持化学性质的最小粒子', detail:'分子由原子构成，能保持物质的化学性质。水分子保持水的性质，水分子被分解后就不再是"水"。' },
    { name:'原子', summary:'化学变化中的最小粒子', detail:'化学变化中原子的种类、数目、质量都不变。它是连接微观与守恒思想的关键。' },
    { name:'反应的微观图像', summary:'分子分→原子→重组成新分子', detail:'化学反应可以画成：原料分子被拆成原子，原子按新方式组合成新分子。这个图像解释了为什么质量守恒。' },
  ],
  'element': [
    { name:'元素 vs 原子', summary:'宏观种类 vs 微观个数', detail:'元素是宏观概念（讲组成、只论种类），原子是微观概念（讲个数）。说"水含氢氧两种元素"对，说"含 2 个氢元素"错。' },
    { name:'元素符号', summary:'用 1~2 个字母代表一种元素', detail:'第一个字母大写、第二个字母小写。如 H 表示氢元素或一个氢原子，Cl 是氯。' },
    { name:'地壳元素丰度', summary:'氧、硅、铝、铁……', detail:'地壳中含量最多的元素是氧（约一半），其次是硅、铝、铁。这是矿物、土壤、岩石的化学基础。' },
  ],
  'atom-structure': [
    { name:'原子核', summary:'质子 + 中子', detail:'原子核体积极小但占据原子绝大部分质量。质子数（核电荷数）决定元素种类。' },
    { name:'核外电子分层', summary:'2、8、8……', detail:'电子按能量高低分层排布。原子结构示意图用"洋葱圈"画出每层电子数。' },
    { name:'最外层电子与性质', summary:'决定得失电子倾向', detail:'最外层 8 电子（稀有气体）稳定；少于 4 易失电子（金属性强），多于 4 易得电子（非金属性强）。' },
  ],
  'formula-valence': [
    { name:'化学式的含义', summary:'宏观、微观、量', detail:'化学式既表示物质、表示组成（哪些元素），也表示一个分子的原子组成，还可以表示物质的质量比。' },
    { name:'化合价规则', summary:'代数和为 0', detail:'化合物中正、负化合价代数和为零，常用来书写或检验化学式。单质中元素化合价为 0。' },
    { name:'书写步骤', summary:'排顺序→标价→交叉→检验', detail:'金属/正价在前、非金属/负价在后；正负化合价用交叉法写成下标；最后约分并验算。' },
  ],
  'chemical-equation': [
    { name:'反应物与生成物', summary:'左边反应物、右边生成物', detail:'用化学式准确表示参加反应的物质和生成的物质，错写化学式不能通过配平掩盖。' },
    { name:'配平', summary:'两边各种原子个数相等', detail:'只能改系数、不能改下标。常用方法：最小公倍数法、奇数配偶法、观察法。' },
    { name:'条件与状态符号', summary:'条件、↑、↓ 不能漏', detail:'反应条件（加热Δ、点燃、催化剂等）标在等号上方；气体生成物加 ↑，沉淀加 ↓。' },
  ],
  'mass-conservation': [
    { name:'宏观表述', summary:'反应前后总质量相等', detail:'参加反应各物质质量总和等于生成物质量总和。"参加反应"是定语，没反应的不计入。' },
    { name:'微观依据', summary:'原子三不变', detail:'反应前后原子的种类、数目、质量都不变，因此宏观质量必然守恒。' },
    { name:'常见易错情境', summary:'敞口体系易误判', detail:'敞口反应有气体进出，称量结果可能与"守恒"不一致；在密闭容器中称量才直观验证。' },
  ],
  'oxygen': [
    { name:'物理性质', summary:'无色无味、密度略大于空气', detail:'不易溶于水，所以可用排水法收集；常温常压下密度略大于空气，也可向上排空气法。' },
    { name:'化学性质', summary:'比较活泼，支持燃烧', detail:'能与多种物质发生氧化反应：木炭、硫、磷、铁丝在氧气中都比在空气中燃烧更剧烈。' },
    { name:'制取', summary:'实验室常用 H₂O₂ 或 KMnO₄', detail:'$2H_2O_2 \\xrightarrow{MnO_2} 2H_2O + O_2\\uparrow$ 或 $2KMnO_4 \\xrightarrow{\\Delta} K_2MnO_4 + MnO_2 + O_2\\uparrow$。工业制氧靠分离液态空气。' },
  ],
  'co2': [
    { name:'物理性质', summary:'无色无味、密度比空气大', detail:'能溶于水，约 1 体积水溶 1 体积 CO₂。固态 CO₂（干冰）升华吸热，可用于人工降雨和食品冷藏。' },
    { name:'化学性质', summary:'与水、石灰水反应', detail:'$CO_2 + H_2O \\to H_2CO_3$（碳酸使石蕊变红）；$CO_2 + Ca(OH)_2 \\to CaCO_3\\downarrow + H_2O$（检验 CO₂）。' },
    { name:'用途与争议', summary:'灭火、光合、温室效应', detail:'灭火利用其密度大、不支持燃烧；它是光合作用原料，也是主要温室气体——同一物质，立场不同。' },
  ],
  'metal-activity': [
    { name:'活动性顺序', summary:'K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au', detail:'排在前面的金属活动性更强。**(H) 是分界线**：之前的能与稀酸反应放氢气。' },
    { name:'与酸反应', summary:'排氢前的金属能置换酸中氢', detail:'$Zn + 2HCl \\to ZnCl_2 + H_2\\uparrow$；铜、银等排氢后金属不能与稀盐酸、稀硫酸反应。' },
    { name:'与盐溶液反应', summary:'前面金属换出后面金属', detail:'$Fe + CuSO_4 \\to FeSO_4 + Cu$；但 K、Ca、Na 太活泼，先与水反应，不用于盐溶液置换。' },
  ],
  'acid': [
    { name:'共同性质', summary:'电离出 H⁺', detail:'酸的通性都来自 H⁺：使紫色石蕊变红、与活泼金属反应、与碱中和、与某些盐反应。' },
    { name:'常见酸', summary:'盐酸、硫酸、硝酸', detail:'盐酸 HCl 是胃酸主要成分；稀硫酸用于工业和化学计算；浓硫酸有吸水性和脱水性。' },
    { name:'稀释要点', summary:'酸入水，不可水入酸', detail:'浓硫酸稀释时必须把酸沿器壁慢慢倒入水中并不断搅拌——反之则会因放热剧烈而飞溅，非常危险。' },
  ],
  'base': [
    { name:'共同性质', summary:'电离出 OH⁻', detail:'碱的通性都来自 OH⁻：使紫色石蕊变蓝、使无色酚酞变红、与酸中和、与某些盐反应。' },
    { name:'常见碱', summary:'NaOH、Ca(OH)₂、氨水', detail:'氢氧化钠（烧碱）有强腐蚀性；氢氧化钙（熟石灰）微溶，俗称石灰水，用于检验 CO₂；氨水有刺激性气味。' },
    { name:'与酸的区分', summary:'酚酞是利器', detail:'无色酚酞遇酸不变色、遇碱变红，是区分酸碱溶液最直接的指示剂。' },
  ],
  'ph': [
    { name:'pH 量程', summary:'通常 0~14', detail:'$pH<7$ 显酸性，$pH=7$ 中性，$pH>7$ 显碱性，越偏离 7 酸或碱越强。' },
    { name:'测定方法', summary:'pH 试纸 + 比色卡', detail:'用玻璃棒蘸取待测液滴在 pH 试纸上，再与标准比色卡对比。**不要把试纸直接伸入待测液**。' },
    { name:'生活中的 pH', summary:'胃液、土壤、雨水……', detail:'胃液 pH 约 1~2；土壤偏酸偏碱都影响作物；正常雨水 pH 约 5.6，更低则属酸雨。' },
  ],
  'mass-fraction': [
    { name:'公式与单位', summary:'分子分母都是质量', detail:'$w = \\dfrac{m_{溶质}}{m_{溶液}}\\times100\\%$，溶液质量 = 溶质 + 溶剂。' },
    { name:'配制溶液', summary:'计算→称量→量取→溶解', detail:'先算出需要的溶质和水的质量，称量固体、量取水（约 1 g/mL），在烧杯中搅拌溶解。' },
    { name:'稀释计算', summary:'溶质质量不变', detail:'稀释前后溶质质量相等：$m_{溶液1} \\cdot w_1 = m_{溶液2} \\cdot w_2$。' },
  ],
};

function defaultSubnodes(node) {
  const prereqText = (node.prereqs || [])
    .map(id => window.CHEM_NODE_BY_ID[id]?.name)
    .filter(Boolean)
    .join('、') || '观察和实验';
  return [
    { name:'核心定义', summary:'先说清它是什么', detail:`${node.name}的核心是：${node.concept}。学习时先抓定义中的关键词，再结合实验或符号理解。` },
    { name:'典型情境', summary:'从生活或实验识别它', detail:`可以从这个例子入手：${node.example} 看到类似情境时，先判断它是否符合${node.name}的条件。` },
    { name:'前后联系', summary:'它在知识网中的位置', detail:`${node.name}通常需要先掌握${prereqText}。学会后，再把它用于解释更复杂的反应、计算或实验。` },
  ];
}

window.CHEM_SUBNODES = Object.fromEntries(
  window.CHEM_NODES.map(node => [node.id, CHEM_SUBNODE_BANK[node.id] || defaultSubnodes(node)])
);
