# 重構實現計劃

## 目的 (Purpose)

詳細規劃整個系統重構嘅步驟、優先級、風險評估同測試策略。

---

## 📋 重構範圍總覽

### **需要重構嘅部分**

1. **數據結構** (Data Structures)

   - Player Object
   - Card Object
   - Game State

2. **核心邏輯** (Core Logic)

   - 角色更新機制
   - 卡牌交換機制
   - 狀態驗證機制

3. **UI 系統** (UI System)

   - Token 顯示
   - 卡牌狀態視覺化
   - 可見性控制

4. **角色 Handlers** (Role Handlers)
   - 所有現有角色
   - 新增角色支援

---

## 🎯 重構目標

### **主要目標**

1. **Flexibility (靈活性)**

   - 輕鬆加入新角色
   - 支援複雜機制（保護、感染、連結）

2. **Maintainability (可維護性)**

   - 統一嘅 API
   - 清晰嘅數據流
   - 完整嘅驗證機制

3. **Correctness (正確性)**

   - 準確追蹤角色狀態
   - 正確處理所有邊界情況
   - 完整嘅測試覆蓋

4. **Backward Compatibility (向後兼容)**
   - 現有遊戲存檔可以繼續用
   - 逐步遷移，唔會一次過打爛所有嘢

---

## 📊 重構階段規劃

### **Phase 1: 基礎架構 (Foundation) - 2-3 日**

#### **目標**

建立新嘅數據結構同核心方法，但保持向後兼容。

#### **工作項目**

1. **擴展 Player 數據結構**

   ```javascript
   // 新增欄位，保留舊欄位
   const player = {
     // 舊欄位（保留）
     playerId: 1,
     roleId: "seer", // 改為 getter，指向 roles.actual
     initialRoleId: "robber", // 改為 getter，指向 roles.initial
     revealed: false,

     // 新欄位
     id: 1, // 同 playerId
     name: "Player 1",
     seatIndex: 0,
     roles: {
       initial: "robber",
       perceived: "seer",
       actual: "seer",
     },
     roleHistory: [],
     knowledge: {},
     special: {},
   };
   ```

2. **建立向後兼容層**

   ```javascript
   // 提供 getter/setter
   Object.defineProperty(player, "roleId", {
     get() {
       return this.roles.actual;
     },
     set(value) {
       this.roles.actual = value;
       // 同時更新對應卡牌
     },
   });

   Object.defineProperty(player, "initialRoleId", {
     get() {
       return this.roles.initial;
     },
   });
   ```

3. **實現核心方法**

   - `updatePlayerRole()`
   - `swapCards()`
   - `validateGameState()`
   - `getPlayersToWake()`

4. **單元測試**
   - 測試所有核心方法
   - 測試向後兼容層

#### **驗收標準**

- [ ] 所有現有代碼仍然運作
- [ ] 新方法通過單元測試
- [ ] `validateGameState()` 可以檢測不一致

---

### **Phase 2: Token 系統 (Token System) - 2-3 日**

#### **目標**

實現 Token 顯示系統，支援 Shield、Mark 等狀態。

#### **工作項目**

1. **擴展 Card 數據結構**

   ```javascript
   const card = {
     id: "card_0",
     roleId: "seer",
     initialRoleId: "robber",

     // 新增
     tokens: {
       shielded: false,
       marked: false,
       infected: false,
       linked: false,
     },
     tokenMetadata: {
       shielded: { placedBy: 2 },
       marked: { placedBy: 3, revealed: true },
     },
   };
   ```

2. **實現 Token 渲染系統**

   ```javascript
   function renderTokens(cardIndex, viewerIndex) {
     // 根據可見性規則渲染 Token
   }
   ```

3. **CSS 樣式**

   - Token 圖示設計
   - 位置規劃
   - 動畫效果

4. **可見性控制**
   - 夜晚/白天規則
   - 玩家特定可見性

#### **驗收標準**

- [ ] Shield Token 正確顯示
- [ ] 可見性規則正確
- [ ] Mobile 顯示正常

---

### **Phase 3: 角色 Handler 重構 (Role Refactoring) - 3-4 日**

#### **目標**

重構所有現有角色，使用新嘅核心方法。

#### **工作項目**

1. **重構 Robber**

   ```javascript
   // 舊代碼
   const temp = playerRoles[robberIdx].roleId;
   playerRoles[robberIdx].roleId = playerRoles[index].roleId;
   playerRoles[index].roleId = temp;

   // 新代碼
   swapCards(
     { type: "player", index: robberIdx },
     { type: "player", index: index },
     {
       actor: robberIdx,
       perceived1: true,
       perceived2: false,
       event: "robber_steal",
     }
   );
   ```

2. **重構其他角色**

   - Drunk
   - Troublemaker
   - Witch
   - Doppelgänger

3. **整合測試**
   - 測試每個角色嘅完整流程
   - 測試角色組合

#### **驗收標準**

- [ ] 所有角色正常運作
- [ ] `perceivedRole` 正確更新
- [ ] `roleHistory` 正確記錄

---

### **Phase 4: 新角色支援 (New Roles) - 按需進行**

#### **目標**

加入新角色，驗證系統靈活性。

#### **工作項目**

1. **實現 Sentinel**

   - Shield Token 邏輯
   - 交換阻止機制

2. **實現 P.I.**

   - 角色轉換邏輯
   - `cardTransformed` 追蹤

3. **實現其他角色**
   - 按優先級逐個加入

#### **驗收標準**

- [ ] 新角色正常運作
- [ ] 唔影響現有角色
- [ ] 系統保持穩定

---

## ⚠️ 風險評估

### **高風險項目**

| 風險                 | 影響             | 緩解策略                 |
| -------------------- | ---------------- | ------------------------ |
| **數據結構遷移失敗** | 遊戲完全唔能運作 | 建立向後兼容層，逐步遷移 |
| **現有存檔損壞**     | 玩家流失         | 版本檢測，自動遷移舊存檔 |
| **性能下降**         | 用戶體驗差       | 性能測試，優化關鍵路徑   |

### **中風險項目**

| 風險             | 影響     | 緩解策略                  |
| ---------------- | -------- | ------------------------- |
| **UI 顯示錯誤**  | 用戶困惑 | 詳細測試，視覺回歸測試    |
| **邊界情況遺漏** | Bug      | 完整測試用例，Code Review |

### **低風險項目**

| 風險           | 影響           | 緩解策略               |
| -------------- | -------------- | ---------------------- |
| **新角色 Bug** | 特定角色唔能用 | 獨立測試，Feature Flag |

---

## 🧪 測試策略

### **單元測試**

```javascript
// 測試核心方法
describe("updatePlayerRole", () => {
  it("should update actual role", () => {
    updatePlayerRole(0, "seer", { perceived: true });
    expect(players[0].roles.actual).toBe("seer");
  });

  it("should update perceived role if perceived=true", () => {
    updatePlayerRole(0, "seer", { perceived: true });
    expect(players[0].roles.perceived).toBe("seer");
  });

  it("should not update perceived role if perceived=false", () => {
    players[0].roles.perceived = "drunk";
    updatePlayerRole(0, "seer", { perceived: false });
    expect(players[0].roles.perceived).toBe("drunk");
  });
});

describe("swapCards", () => {
  it("should swap player cards", () => {
    swapCards({ type: "player", index: 0 }, { type: "player", index: 1 });
    // 驗證交換結果
  });

  it("should respect shield protection", () => {
    cards[0].tokens.shielded = true;
    const result = swapCards(
      { type: "player", index: 0 },
      { type: "player", index: 1 }
    );
    expect(result.success).toBe(false);
  });
});
```

### **整合測試**

```javascript
// 測試完整遊戲流程
describe("Game Flow", () => {
  it("should handle Robber stealing Seer", () => {
    // Setup
    setupGame(["robber", "seer", "villager"]);

    // Robber 回合
    handleRobberAction(0, 1);

    // 驗證
    expect(players[0].roles.actual).toBe("seer");
    expect(players[0].roles.perceived).toBe("seer");
    expect(players[1].roles.actual).toBe("robber");
    expect(players[1].roles.perceived).toBe("seer"); // 唔知被偷
  });

  it("should handle complex swap chain", () => {
    // Robber 偷 Drunk，Drunk 換中間卡
    // 測試複雜情況
  });
});
```

### **視覺回歸測試**

```javascript
// 使用 screenshot 比較
describe("Visual Regression", () => {
  it("should render shield token correctly", async () => {
    cards[0].tokens.shielded = true;
    renderTable();

    const screenshot = await takeScreenshot();
    expect(screenshot).toMatchSnapshot();
  });
});
```

---

## 📅 時間表

### **總時長：約 2-3 週**

| 階段                | 時長   | 開始日期 | 結束日期 |
| ------------------- | ------ | -------- | -------- |
| Phase 1: 基礎架構   | 2-3 日 | TBD      | TBD      |
| Phase 2: Token 系統 | 2-3 日 | TBD      | TBD      |
| Phase 3: 角色重構   | 3-4 日 | TBD      | TBD      |
| Phase 4: 新角色     | 按需   | TBD      | TBD      |
| **緩衝時間**        | 2-3 日 | -        | -        |

---

## ✅ 檢查清單

### **Phase 1 完成標準**

- [ ] Player 數據結構擴展完成
- [ ] 向後兼容層測試通過
- [ ] 核心方法實現完成
- [ ] 單元測試覆蓋率 > 80%
- [ ] 所有現有功能正常運作

### **Phase 2 完成標準**

- [ ] Card 數據結構擴展完成
- [ ] Token 渲染系統實現
- [ ] Shield Token 正確顯示
- [ ] 可見性規則正確
- [ ] Mobile/Desktop 都正常

### **Phase 3 完成標準**

- [ ] 所有角色 Handler 重構完成
- [ ] 整合測試通過
- [ ] `perceivedRole` 邏輯正確
- [ ] `roleHistory` 記錄完整
- [ ] 性能無明顯下降

### **Phase 4 完成標準**

- [ ] 至少一個新角色實現
- [ ] 新角色測試通過
- [ ] 系統穩定性驗證
- [ ] 文檔更新完成

---

## 🔄 回滾計劃

### **如果重構失敗**

1. **Git 分支策略**

   ```bash
   # 主分支保持穩定
   main (穩定版本)

   # 重構分支
   feature/refactor-architecture

   # 每個 Phase 獨立分支
   feature/refactor-phase1-foundation
   feature/refactor-phase2-tokens
   feature/refactor-phase3-roles
   ```

2. **Feature Flag**

   ```javascript
   const USE_NEW_ARCHITECTURE = false;

   if (USE_NEW_ARCHITECTURE) {
     // 新代碼
   } else {
     // 舊代碼
   }
   ```

3. **數據遷移**
   ```javascript
   function migrateGameState(oldState) {
     if (oldState.version === 1) {
       return migrateV1toV2(oldState);
     }
     return oldState;
   }
   ```

---

## 📝 下一步

1. **Review 所有設計文檔**

   - `ARCHITECTURE_ANALYSIS.md`
   - `CARD_STATES_AND_TOKENS.md`
   - `PLAYER_ROLE_STATES.md`
   - `REFACTORING_PLAN.md` (本文檔)

2. **決定開始時間**

   - 確認有足夠時間
   - 準備測試環境

3. **建立 Git 分支**

   ```bash
   git checkout -b feature/refactor-phase1-foundation
   ```

4. **開始 Phase 1**
   - 按照計劃逐步實現
   - 頻繁 commit
   - 定期測試

---

**最後更新**: 2025-11-23 18:29
**狀態**: 📋 計劃階段 (Planning Phase)
