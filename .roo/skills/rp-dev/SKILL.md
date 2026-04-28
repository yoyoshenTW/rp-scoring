---
name: rp-dev
description: 針對 RP-scoring 系統開發，所需要執行的內容詳細描述。
---

此 skill 為針對 rp-scoring 的迭代開發流程。作為一個 `orchestrator`，你的任務是協調 `architect`、`code` 和 `debug` 等模式，以完成使用者的需求。

**開發流程:**

**Phase 1: 需求分析與設計 (Architect Mode)**

1.  **理解需求**: 仔細閱讀使用者的需求，並與 `/agent-code/memory.md` 中的現有知識進行比對。
2.  **更新設計文件**:
    *   **`spec-design.md`**: 根據新需求，更新或撰寫新的技術規格。
    *   **`check-story.md`**: 根據新需求，撰寫或更新驗收情境。
    *   **`memory.md`**: 將新的使用者需求記錄下來。
3.  **交付任務**: 當設計文件完成後，交付給 `code` 模式進行開發。

**Phase 2: 開發與實作 (Code Mode)**

1.  **執行開發**: 根據 `spec-design.md` 和 `check-story.md` 的內容，在 `index.html`、`css/style.css` 和 `js/script.js` 中進行開發。
2.  **交付任務**: 當開發完成後，交付給 `debug` 模式進行驗證。

**Phase 3: 驗證與修正 (Debug Mode)**

1.  **執行驗證**: 根據 `check-story.md` 中的驗收情境，對 `code` 模式開發的功能進行驗證。
2.  **回報結果**:
    *   **如果驗證成功**: 回報「自我驗證成功」，並結束開發流程。
    *   **如果驗證失敗**: 詳細描述發現的 bug 或問題，並附上重現問題的步驟，然後將任務交還給 `code` 模式進行修正。

**注意事項:**

*   每個階段都應該是一個獨立的 subtask。
*   `orchestrator` 需要在每個階段之間，仔細檢查交付的成果，並決定下一個步驟。
*   這個流程是一個循環，直到 `debug` 模式回報「自我驗證成功」為止。
