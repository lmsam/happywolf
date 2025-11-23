# 當前工作進度 (Current Work Status)

## 目的 (Goal)

為遊戲加入專門為手機優化的介面，避免用複雜的 CSS media queries 去硬改 Desktop 版面。

## 設計方案 (Design Approach)

將整個 App 分拆成三個獨立頁面：

1. **`index.html`** - 設定頁面 (Setup Only)

   - 玩家入座
   - 選擇角色卡牌
   - 遊戲設定 (音量、時間、介面模式)
   - 按「確認牌庫」後，洗牌、派牌，然後跳轉去遊戲頁面

2. **`desktop.html`** - Desktop 遊戲介面 (NEW)

   - 圓枱式排位 (Round Table Grid)
   - 適合大螢幕、滑鼠操作

3. **`mobile.html`** - Mobile 遊戲介面
   - 垂直排列 (Center Cards 一行 + Players Grid)
   - 適合小螢幕、觸控操作

## 技術實現 (Implementation Details)

### 資料流 (Data Flow)

- **Setup → Game**: `index.html` 完成設定後，將 Game State 存入 `localStorage`，然後 redirect 去 `desktop.html` 或 `mobile.html`
- **Game State**: 包括 `players`, `deck`, `playerRoles`, `centerCards`, `gamePhaseState` 等
- **End Game**: 從遊戲頁面返回 `index.html`，清空 `localStorage`

### Script 分拆 (Script Refactoring)

`script.js` 需要根據當前頁面執行不同邏輯：

- **Setup Page** (`index.html`): 執行 `initSetup()` - 初始化玩家列表、卡牌選擇、設定控制
- **Game Page** (`desktop.html` / `mobile.html`): 執行 `initGame()` - 載入 Game State、綁定遊戲事件、渲染桌面

## 當前進度 (Current Progress)

### ✅ 已完成 (Completed)

1. 在 `index.html` 加入「Game Interface」Toggle (Desktop / Mobile)
2. 實現 Smart Default (根據 window width 自動選擇)
3. 建立 `mobile.html` 基本結構
4. 實現 `renderMobileTable()` 函數
5. **重構為三頁架構**:
   - 建立 `desktop.html` (Game Phase)
   - 清理 `index.html` (Setup Phase)
   - 分拆 `script.js` (`initSetup`, `initGame`)
   - 修正 Redirect 邏輯
6. **修復 Bug**:
   - 修正 `speak` 被中斷導致的 Error
   - 修正 `mobile.html` 缺 `volume-control` 導致的 Crash
   - 修正 `loadGameState` 缺 `day-duration` 導致的 Crash
   - 延長語音 Fallback Timeout，避免長對白被切斷
   - **Lone Wolf**: 當只有一隻狼人時，高亮顯示中間卡牌，提示可以查看
   - **State Persistence**: 修正 `currentStep` 時序問題，防止 refresh 後重複執行同一角色
   - **Auto-Skip Prevention**: 互動角色使用 `completed` flag 機制，確保時間到但未完成動作時唔會自動跳去下一個角色
7. **UI 優化**:
   - **Mobile 介面**: 改用正方形卡牌 (1:1)、增加行距 (Row Gap) 防止遮擋名字、Glassmorphism 風格
   - **玩家名字**: 加大字體、加粗、置中對齊，防止選錯
   - **中間卡牌**: 隱藏名字標籤，介面更簡潔
   - **Robber Highlighting**: 修正視覺效果，開眼時 highlight 其他玩家，選擇後只有被選中嘅卡有綠邊
   - **Day Phase UI**: 簡化顯示為「天光！MM:SS」，加入 🗳️ 立即投票按鈕（Desktop + Mobile）

### ⚠️ 遇到問題 (Issues Encountered)

1. **Redirect 失敗**: 按「確認牌庫」後無跳轉去 `mobile.html`
   - 原因：`startPeekPhase()` 會立即顯示 Game Phase UI，阻止了 redirect
   - 已修正：`confirmDeckBtn` 改為直接 redirect
2. **Init 錯誤**: `mobile.html` 載入時報錯 `Cannot set properties of null`

   - 原因：`renderLibrary()` 嘗試存取不存在的 Setup UI 元素
   - 已修正：分拆 `initSetup` 和 `initGame`

3. **unlockHandler 未定義**: `index.html` 載入時報錯 `ReferenceError`
   - 已修正：將 `unlockHandler` 定義移到 `init()` 最頂

### 🔄 進行中 (In Progress)

- [ ] 測試 Desktop 流程 (Setup → Desktop Game → End)
- [ ] 測試 Mobile 流程 (Setup → Mobile Game → End)

### 📋 待辦事項 (TODO)

1. 完成三頁架構重構
2. 測試 Desktop 流程 (Setup → Desktop Game → End)
3. 測試 Mobile 流程 (Setup → Mobile Game → End)
4. 測試跨頁面的 State 持久化
5. 優化 Mobile UI (卡牌大小、間距、觸控區域)

## 備註 (Notes)

- 所有 Game Logic (Night Phase, Day Phase, Voting 等) 保持不變
- Desktop 和 Mobile 只是 UI/Layout 不同，邏輯完全共用
- `localStorage` key: `happywolf_save`

---

**最後更新**: 2025-11-23 02:33
**狀態**: 🔄 重構中 (Refactoring in Progress)
