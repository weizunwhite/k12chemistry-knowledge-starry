// 新手欢迎浮层 — 年级选择 + 快速标记已掌握的知识点
// 仅在首次使用时显示（localStorage 无 chemistry-user-profile）

function OnboardingWelcome({ onComplete }) {
  const [step, setStep] = useState(1);       // 1=学段选择, 2=快速标记
  const [grade, setGrade] = useState(null);   // '上'|'下'|'g1'|'g2'|'g3'|'free'
  const [marked, setMarked] = useState({});

  // 学段值 → 累进 rank：初中九上/九下 = 1/2，高中三年 = 4/5/6（与 main.jsx 的 stageFilter 阈值 4 对齐）
  const GRADE_VALUE_RANK = { '上': 1, '下': 2, 'g1': 4, 'g2': 5, 'g3': 6 };
  const gradeRank = GRADE_VALUE_RANK[grade] || 9;
  const markableNodes = React.useMemo(() => {
    if (!grade || grade === 'free') return [];
    const G = window.CHEM_NODE_GRADE || {}, R = window.CHEM_GRADE_RANK || {};
    return window.CHEM_NODES.filter(n => (R[G[n.id]] || 9) <= gradeRank);
  }, [grade, gradeRank]);

  // 按主题分组显示
  const groupedNodes = React.useMemo(() => {
    const groups = {};
    markableNodes.forEach(n => {
      if (!groups[n.theme]) groups[n.theme] = [];
      groups[n.theme].push(n);
    });
    return groups;
  }, [markableNodes]);

  // 选择年级
  const handleGradeSelect = (g) => {
    setGrade(g);
    if (g === 'free') {
      // 自由探索模式直接完成
      const profile = { grade: g, gradeRank: 0, createdAt: Date.now() };
      onComplete(profile, null);
    } else {
      setStep(2);
    }
  };

  // 切换标记状态
  const toggleMark = (id) => {
    setMarked(m => ({ ...m, [id]: !m[id] }));
  };

  // 完成标记
  const handleFinish = () => {
    const profile = { grade, gradeRank: GRADE_VALUE_RANK[grade] || 0, createdAt: Date.now() };
    const masteredMap = Object.keys(marked).reduce((acc, id) => {
      if (marked[id]) acc[id] = true;
      return acc;
    }, {});
    onComplete(profile, Object.keys(masteredMap).length > 0 ? masteredMap : null);
  };

  // 跳过标记（新手）
  const handleSkip = () => {
    const profile = { grade, gradeRank: GRADE_VALUE_RANK[grade] || 0, createdAt: Date.now() };
    onComplete(profile, null);
  };

  const gradeLabels = {
    '上': '九年级 · 上',
    '下': '九年级 · 下',
    'g1': '高一',
    'g2': '高二',
    'g3': '高三',
  };
  const gradeShort = { '上': '九上', '下': '九下' };

  return (
    <div className="ob-overlay">
      <div className="ob-card">
        {step === 1 && (
          <>
            <div className="ob-glyph">✦</div>
            <h1 className="ob-title">欢迎来到知识星空</h1>
            <p className="ob-desc">
              初中与高中化学知识点，按「依赖关系」连成星座。
              <br />选择你的学段，我来推荐学习路线（初中学段默认只看初中，高中年级自动开启初高中融合）。
            </p>
            <div className="ob-grades">
              {['上', '下'].map(g => (
                <button key={g} className="ob-gradeBtn" onClick={() => handleGradeSelect(g)}>
                  <span className="ob-gradeNum">{gradeShort[g]}</span>
                  <span className="ob-gradeLabel">{gradeLabels[g]}</span>
                </button>
              ))}
            </div>
            <div className="ob-grades" style={{ marginTop: 8 }}>
              {['g1', 'g2', 'g3'].map(g => (
                <button key={g} className="ob-gradeBtn" onClick={() => handleGradeSelect(g)}>
                  <span className="ob-gradeNum" style={{ fontSize: '1.15rem' }}>{gradeLabels[g]}</span>
                  <span className="ob-gradeLabel">高中</span>
                </button>
              ))}
            </div>
            <button className="ob-freeBtn" onClick={() => handleGradeSelect('free')}>
              自由探索 · 全部知识点
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="ob-stepTitle">
              {gradeLabels[grade]}，这些知识点你已经会了吗？
            </h2>
            <p className="ob-stepDesc">点击标记已掌握的知识点，帮助我更精准地推荐（也可以跳过）</p>

            <div className="ob-nodeGrid">
              {Object.entries(groupedNodes).map(([theme, nodes]) => {
                const t = window.CHEM_THEMES[theme];
                return (
                  <div key={theme} className="ob-themeGroup">
                    <div className="ob-themeName" style={{ color: t.color }}>{t.short}</div>
                    <div className="ob-themeNodes">
                      {nodes.map(n => (
                        <button
                          key={n.id}
                          className={'ob-nodeBtn' + (marked[n.id] ? ' ob-marked' : '')}
                          style={{
                            borderColor: marked[n.id] ? t.color : 'rgba(255,255,255,0.15)',
                            background: marked[n.id] ? t.color + '22' : 'transparent',
                          }}
                          onClick={() => toggleMark(n.id)}
                        >
                          {marked[n.id] && <span className="ob-check">✓</span>}
                          {n.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ob-actions">
              <button className="ob-skipBtn" onClick={handleSkip}>
                跳过，我是新手
              </button>
              <button className="ob-doneBtn" onClick={handleFinish}>
                完成标记，开始探索
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

window.OnboardingWelcome = OnboardingWelcome;
