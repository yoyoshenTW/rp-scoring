# Memory — RP Scoring 開發記憶

## 使用者需求
### Beta 版本
我想要製作一個 beta 版本，在 final 增加一個上傳圖片自動辨識的功能，主要要求如下

1.  當使用者進入 final 頁籤，除了手動輸入 judge 與參賽者數量後按下 “產生評分表”外，額外新增一個 “自動偵測產生評分表"，可以讓使用者上傳多張圖片，這個功能基本上是把多個照片丟給一個 n8n 的 webhook，讓他去觸發 workflow，而最後這個 workflow 會回傳一個 json，這個 json 會顯示辨識之後的 “judge 數量" "參賽者數量" "每一個 judge 名字" 以及 "每一個 judge 給每一個參賽者的 rank"，如以下範例{ "judge": 5, "competitor": 5, "result":{"wendy":[1,3,4,5,2], "kevin":[2,3,4,5,1], "Marvin":[2,1,5,4,3], "Miyabi":[1,2,4,5,3], "Hudo":[1,2,3,4,5]} }
2.  當使用者在上傳圖片之後，會等待回覆，當收到 n8n 回覆之後，會自動生成 final 的編輯模式(也就是在 final 頁籤案下 "產生評分表" 之後的狀況)，並且把收到的資料預先填入，讓使用者可以自己再度編輯
3.  接下來的行為都相同，因此此新增的功能主要是協助使用者在 final 比賽可以透過圖像辨識 key in 資料
4.  該 n8n 已經啟動了


## 專案背景

- 工具用途：搖擺舞比賽 RP（Relative Placement）計分，支援 Prelim（預選賽）和 Final（決賽）
- 用戶群：舞蹈比賽主辦方、評分員，主要在現場用手機操作
- 部署：靜態 HTML，無伺服器，可直接開啟 `index.html`

## 核心規則（不可改動）

### Prelim
- Y = 直接入圍票；M1~M5 = 備取層級（越小越優先）
- 過半數 = `floor(judgeCount / 2) + 1`
- 排序：Y 過半 > Y 票數 > Y+M1 累計 > Y+M1+M2 累計 > ...
- 同一評審內：Y 和各 M 層不能有重複編號

### Final
- 每位評審對所有參賽者排名（1 = 最佳），不可重複
- 累積欄：`1→k` = 有幾位評審給 ≤ k 名次
- 排序：最早過半欄位 → 同欄更多票 → 過半分數加總小 → 後續累積欄 → Battle
- Battle = 評審相對排名，A 比 B 排前的評審數多者勝

## 開發決策記錄

### v2.0 重構（2026-04-21）

**決策：保持 Vanilla JS，不引入框架**
- 理由：無複雜狀態管理需求，零依賴最適合靜態部署
- 結果：OK，代碼仍可維護

**決策：i18n 使用純 JS 物件 + `t()` 函式**
- 理由：簡單、無依賴、易擴充語言
- 佔位符格式：`{key}` → 用 `replaceAll` 取代
- 語言持久化：`localStorage('rp_lang')`

**決策：複製功能使用 TSV**
- 理由：Tab 分隔符號可直接貼入 Google Sheet / Excel，無需額外格式轉換
- `navigator.clipboard.writeText()` 需要 HTTPS 或 localhost

**決策：表格橫向捲動而非響應式折疊**
- 理由：評審/參賽者欄位數量動態，無法預測寬度；水平捲動最直觀
- 實作：`overflow-x: auto` + `-webkit-overflow-scrolling: touch`

**決策：Sticky topbar 放語言切換**
- 理由：用戶在手機上操作時可隨時切換語言，不需捲到頂部

## 常見 Bug 與解法

### Prelim 輸入解析
- 問題：用戶輸入 "1, 2, 3"（有空格）或 "1,,2"（多逗號）
- 解法：`split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))`

### Final 排序 Tie-breaking
- 問題：情境 3（加總相同後比後續欄位）的迴圈起始點
- 正確：從 `firstOver + 1` 開始（0-indexed），遍歷到 `contestantCount - 1`
- 錯誤容易犯：從 0 開始重複比較已知相同的欄位

### Battle 方向
- 問題：Battle 比較容易搞反
- 正確：`a.scores[ji] < b.scores[ji]` → a 贏（名次較小代表較好）
- 排序：`return bWin - aWin`（bWin 多 → b 排前，即 b 較小負值）

## 語言擴充指引

新增語言步驟：
1. 在 `I18N` 物件新增語言 key（如 `ja`）
2. 複製 `en` 的所有 key，翻譯內容
3. 在 `index.html` 的 `.lang-switcher` 加一個 `<button data-lang="ja">日本語</button>`
4. 不需改動其他邏輯

## 已知限制

- `navigator.clipboard` 在 HTTP（非 HTTPS）環境下可能無法使用 → 建議部署到 HTTPS
- 極大量評審（>15）或參賽者（>20）未經測試，但邏輯上應可運作
- Battle 情境只處理了「哪方贏得更多評審」，無法處理完全平局（罕見）
