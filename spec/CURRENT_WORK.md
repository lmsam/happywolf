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
   - **Day Phase UI**: 簡化顯示為「天光！MM:SS」，加入 ⏰ 立即投票按鈕（Desktop + Mobile，使用 Font Awesome hourglass-end icon）
8. **新增角色 (Daybreak 擴充)**:
   - **Dream Wolf (夢遊狼)**: 狼人陣營，但唔會同其他狼人一齊醒來。其他狼人知道佢係邊個，但佢唔知道其他狼人係邊個。
   - **Apprentice Seer (學徒預言家)**: 村民陣營，可以查看一張中間卡。

- **Witch (女巫)**: 村民陣營，Wake Order 10。可以查看一張中間卡，然後將其與任何玩家交換（包括自己）。
  - 更新咗所有角色嘅 wake order 以配合新角色
  - 實現咗 Apprentice Seer 嘅行動邏輯
  - 更新咗 Werewolf highlighting 邏輯以包括 Dream Wolf
  - **Dream Wolf 語音**: 動態檢查牌庫，如果有 Dream Wolf，狼人語音會加句提示
  - **孤狼邏輯**: 修正咗孤狼判定，有 Dream Wolf 時普通狼人唔算孤狼

### 📚 角色行動次序 (Wake Order Reference)

根據官方 One Night Ultimate Werewolf Daybreak 規則：

1. **Doppelgänger (化身幽靈)**
2. **Sentinel** ← Daybreak 新角色（未實現）
3. **Werewolves (狼人)** - 包括 Alpha Wolf, Mystic Wolf, Dream Wolf
4. **Minion (爪牙)**
5. **Masons (守夜人)**
6. **Seer (預言家)**
7. **Apprentice Seer (學徒預言家)** ← Daybreak 新角色 ✅ 已實現
8. **Paranormal Investigator (偵探)** ← Daybreak 新角色（未實現）
9. **Robber (強盜)**
10. **Witch (女巫)** ← Daybreak 新角色 ✅ 已實現
11. **Troublemaker (搗蛋鬼)**
12. **Village Idiot** ← Daybreak 新角色（未實現）
13. **Drunk (酒鬼)**
14. **Insomniac (失眠者)**
15. **Revealer** ← Daybreak 新角色（未實現）
16. **Curator** ← Daybreak 新角色（未實現）

**備註**: Dream Wolf 唔會單獨醒來（wake order = -1），佢會喺 Werewolf turn 時被其他狼人見到。

### ⚠️ 遇到問題 (Issues Encountered)

1. **Redirect 失敗**: 按「確認牌庫」後無跳轉去 `mobile.html`
   - 原因：`startPeekPhase()` 會立即顯示 Game Phase UI，阻止了 redirect
   - 已修正：`confirmDeckBtn` 改為直接 redirect
2. **Init 錯誤**: `mobile.html` 載入時報錯 `Cannot set properties of null`

   - 原因：`renderLibrary()` 嘗試存取不存在的 Setup UI 元素
   - 已修正：分拆 `initSetup` 和 `initGame`

3. **unlockHandler 未定義**: `index.html` 載入時報錯 `ReferenceError`
   - 已修正：將 `unlockHandler` 定義移到 `init()` 最頂
4. **投票按鈕消失**: Desktop 模式下，投票按鈕有時會唔見
   - 原因：`renderTable` 邏輯假設 `instructionBanner` 不存在時才建立按鈕，但 `desktop.html` 已有 banner 導致跳過建立
   - 已修正：直接在 `desktop.html` 加入按鈕，確保其存在

### 🔄 進行中 (In Progress)

- [ ] 實現其他 Daybreak 角色（Paranormal Investigator 等）

### 📋 待辦事項 (TODO)

1. ~~完成三頁架構重構~~ ✅
2. ~~測試 Desktop 流程~~ ✅
3. ~~測試 Mobile 流程~~ ✅
4. ~~測試跨頁面的 State 持久化~~ ✅
5. ~~優化 Mobile UI~~ ✅
6. ~~完成 Dream Wolf 語音提示~~ ✅
7. ~~實現 Witch (女巫)~~ ✅
8. 實現其他 Daybreak 角色（Paranormal Investigator 等）

## 備註 (Notes)

- 所有 Game Logic (Night Phase, Day Phase, Voting 等) 保持不變
- Desktop 和 Mobile 只是 UI/Layout 不同，邏輯完全共用
- `localStorage` key: `happywolf_save`
- 新增角色圖片：`DreamWolf.png`, `ApprenticeSeer.png`, `Witch.png`

---

**最後更新**: 2025-11-23 13:25
**狀態**: ✅ 角色實現完成 (Roles Implemented)
