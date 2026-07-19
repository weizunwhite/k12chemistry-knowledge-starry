# k12chemistry 配图任务报告（GROK-MEDIA）

**日期**：2026-07-19  
**范围**：只做配图相关（计划 + 空注册表接线 + 详情渲染 + 校验）；不下载图片；不 commit/push。

---

## 1. 规模

| 项 | 数量 |
|----|------|
| 知识节点总数 | **61** |
| 选图计划条数 | **61**（覆盖全部节点） |
| 拟配图（非 skip） | **58** |
| skip | **3** |
| 当前注册表条目 | **0**（空表，待外部下载填充） |

---

## 2. skip 清单及理由

| 节点 id | 名称 | 理由 |
|---------|------|------|
| `formula-calc` | 根据化学式计算 | 纯计算技能节点，无合适实物/实验现象照片；宁缺毋滥 |
| `mass-fraction` | 溶质质量分数 | 纯定量计算，无独立视觉现象；宁缺毋滥 |
| `equation-calc` | 根据化学方程式计算 | 纯定量技能，无合适配图；宁缺毋滥 |

选图方向：元素单质与矿物、经典实验现象（焰色/沉淀/电解）、化学家肖像（拉瓦锡/门捷列夫/阿伏伽德罗等）、工业与生活场景。素材仅限 Wikimedia Commons 公版/CC。

---

## 3. 交付物位置

| 交付 | 路径 |
|------|------|
| 选图计划 | `/tmp/k12chemistry-media-plan.json` |
| 空注册表 | `chem-media.js` → `window.CHEM_MEDIA = {}` |
| 加载接线 | `src/main.jsx`（与其他 knowledge-*.js 同级 `await import`） |
| 详情配图区块 | `node-detail.jsx`（`nd-media`：图 + 中文图题 + credit 小字） |
| 样式 | `index.html`（`.nd-media*`） |
| 校验 | `scripts/validate-data.cjs`（键↔文件双向、>5KB、credit 非空；skip 不入表故豁免） |

---

## 4. 改动文件清单

| 文件 | 变更 |
|------|------|
| `chem-media.js` | **新建** 空注册表 |
| `src/main.jsx` | 加载 `chem-media.js` |
| `node-detail.jsx` | 读取 `CHEM_MEDIA`，有条目则渲染配图区块 |
| `index.html` | 配图区块样式 |
| `scripts/validate-data.cjs` | 加载 chem-media + 媒体校验 + 覆盖率 media 行 |
| `GROK-MEDIA-REPORT.md` | **本报告** |

**未改动**：lessons/quiz/depth/figure 数据与既有渲染逻辑；未删/重命名现有文件。

---

## 5. 约定（供外部下载器）

- 注册表：`window.CHEM_MEDIA[id] = { file, title, credit }`
- `file` 形如 `media/<节点id>.jpg`，落盘 `public/media/`
- 图片路径前端按 `/media/xxx.jpg`（public）
- skip 节点**不要**写入 `CHEM_MEDIA`
- 填充后 `credit` 必填；文件 >5KB

---

## 6. 验收命令

```bash
npm run validate:data
npm run build
# 或
npm run check
```

预期：空注册表时 `Media: 0/61`；校验与 build 均通过。
