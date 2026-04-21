# Spec Design — RP Scoring 2.0

## 專案概覽

純前端 HTML/CSS/JS 專案，無後端、無框架依賴。  
目標：在手機和桌機上流暢運作的 RP 計分工具，支援三語言。

---

## 架構設計

```
rp-scoring/
├── index.html          # 單頁 HTML，結構極簡
├── css/style.css       # 所有樣式，CSS 變數驅動主題
├── js/script.js        # 所有邏輯：i18n、Prelim、Final、複製
├── article/
│   ├── rp-scoring.md           # stepswing.com 文章（規則說明）
│   └── rp-scoring-original.md  # rp-scoring.com 文章（原版規則）
└── agent-code/
    ├── check-story.md   # 驗收情境清單
    ├── spec-design.md   # 本文件
    └── memory.md        # 開發記憶與決策紀錄
```

---

## 設計決策

### 1. 無框架（Vanilla JS）
- 理由：此工具無狀態管理需求、無路由、無複雜組件樹
- 直接 DOM 操作即可，避免引入 React/Vue 等框架增加載入成本
- 手機環境下 JS bundle 越小越好

### 2. i18n 策略
- 使用純 JS 物件 `I18N = { zh: {...}, en: {...}, ko: {...} }`
- `t(key, vars)` 函式做字串替換，支援 `{n}`, `{j}` 等佔位符
- 語言存於 `localStorage('rp_lang')`，頁面重載後保持
- 不使用 i18n 函式庫，保持零依賴

### 3. 手機優化
- Sticky topbar：語言切換和標題固定在頂部
- 所有按鈕 `min-height: 44px`（Apple HIG 建議觸控目標）
- 表格加 `overflow-x: auto` + `-webkit-overflow-scrolling: touch` 水平捲動
- `input type="number"` 在 iOS 自動觸發數字鍵盤
- `maximum-scale=1` 防止 iOS 自動縮放但不鎖縮放

### 4. UI 風格
- CSS 變數統一顏色系統（`--primary`, `--bg`, `--card` 等）
- 卡片式佈局 (`card` class)，圓角 + 淺陰影
- 無動畫效果（除 transition 0.15s），不增加手機負擔
- 現代簡潔：灰底白卡，藍色主色調

### 5. 複製功能（TSV）
- 使用 `navigator.clipboard.writeText(tsv)` 
- TSV（Tab Separated Values）：複製後可直接貼入 Google Sheet / Excel
- 標題列 + 資料列格式，每個欄位 Tab 分隔，每列換行
- 按鈕按下後暫時顯示「已複製！」2秒反饋

---

## Prelim 邏輯規格

### 輸入
- 評審數、Maybe 層級（M1~M5）、每評審 Y 數量、各 M 層數量
- 每位評審的 Y 編號和 M1~Mn 編號（逗號分隔字串）

### 驗證
1. Y 數量 = 設定值
2. 各 M 層數量 = 設定值
3. 同一評審內不同類別間無重複編號

### 排名演算法
```
overHalf = floor(judgeCount / 2) + 1

排序優先順序：
1. Y >= overHalf（過半）的選手排在未過半前
2. Y 票數多者排前
3. Y+M1 累積票數多者排前
4. Y+M1+M2 累積票數多者排前
... 以此類推
```

### 輸出高亮
- 任何欄位達到過半數（`>= overHalf`）：`highlight` class（橘色加粗）

---

## Final 邏輯規格

### 輸入
- 評審數、參賽者數
- 每位評審對每位參賽者的排名（1 = 最佳，不可重複）

### 驗證
1. 所有分數已填寫
2. 分數在 1~contestantCount 範圍內
3. 同一評審不能給兩個參賽者相同名次

### 累積計算
```
accum[ci][k] = 在所有評審中，給參賽者 ci 名次 <= k+1 的評審數量
firstOver[ci] = 第一個 accum[ci][k] >= overHalf 的 k 值
```

### 排名演算法（5 個情境按優先順序）
```
1. firstOver 較小（越早過半）→ 排前
2. 同 firstOver：overVal 較大（同欄更多票）→ 排前
3. overVal 相同：過半欄位之名次加總較小（更好名次）→ 排前
4. 加總相同：後續累積欄位票數較多 → 排前
5. 完全一致：Battle（評審相對排名，贏得更多 judge 比較的選手排前）
```

### 輸出高亮
- `first-majority` class：第一次達到過半數的累積欄（黃底）

---

## 複製輸出格式

### Prelim TSV
```
參賽者\tJudge1\t...\tY\tY+M1\t...
001\tY\t\tY\t3\t4
...
```

### Final TSV
```
名次\t參賽者\tJ1\t...\t1→1\t1→2\t...
1\tA隊\t1\t2\t...\t2\t4
...
```
