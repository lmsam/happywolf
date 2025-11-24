# One Night Ultimate Werewolf - 架構分析與重構建議

## 目的 (Purpose)

分析現有系統嘅限制，設計一個更 flexible 嘅架構去支援未來角色同機制。

## 現有系統分析 (Current System Analysis)

### 1. Player Data Structure

**現有結構：**

```javascript
playerRoles = [
  {
    playerId: 1763903042267,
    roleId: "werewolf",
    initialRoleId: "werewolf",
    revealed: false,
    mimickedRole: "seer", // Only for Doppelgänger
  },
];
```

**限制：**

- ❌ 無法追蹤多重狀態（例如：被保護、被感染、被標記）
- ❌ 無法記錄角色轉換歷史（P.I. 變狼人）
- ❌ 無法儲存角色特定數據（例如：Cupid 配對資訊）
- ❌ `mimickedRole` 只適用於 Doppelgänger，唔夠通用

### 2. Card State

**現有狀態：**

- `revealed: boolean` - 只有兩種狀態

**需要支援嘅狀態：**

- ✅ Hidden (背面)
- ✅ Revealed (翻開)
- ⚠️ Protected (被保護 - Sentinel)
- ⚠️ Marked (被標記 - Revealer)
- ⚠️ Infected (被感染 - The Thing)
- ⚠️ Locked (被鎖定 - 某些變體)

### 3. Game Flow & Actions

**現有流程：**

```
Setup → Peek → Night (Sequential Roles) → Day → Vote → Reveal
```

**限制：**

- ❌ 角色行動係 hardcoded，難以擴展
- ❌ 交換邏輯散落喺唔同 handler
- ❌ 無統一嘅「行動驗證」機制（例如：檢查保護狀態）
- ❌ 無法處理「被動觸發」（例如：Cursed 被查看時轉換）

### 4. Role Mechanics

**現有機制類型：**

1. **View** - Seer, Apprentice Seer
2. **Swap Self** - Robber, Drunk
3. **Swap Others** - Troublemaker, Witch
4. **Transform** - Doppelgänger, (P.I.)
5. **Passive** - Minion, Mason, Insomniac

**缺少嘅機制：**

- ⚠️ **Protect** - Sentinel, Bodyguard
- ⚠️ **Mark/Flag** - Revealer
- ⚠️ **Infect/Spread** - The Thing, Vampire
- ⚠️ **Link** - Cupid (配對)
- ⚠️ **Conditional Transform** - Cursed, P.I.
- ⚠️ **Global Effect** - Village Idiot (全體移位)

---

## 建議架構 (Proposed Architecture)

### 1. Enhanced Player Data Structure

```javascript
playerRoles = [
  {
    // Core Identity
    playerId: number,
    initialRoleId: string,
    currentRoleId: string, // Replaces roleId

    // State Flags
    states: {
      revealed: boolean,
      protected: boolean,
      marked: boolean,
      infected: boolean,
      locked: boolean,
    },

    // Role History (for complex transformations)
    roleHistory: [
      { roleId: "werewolf", timestamp: 0, source: "initial" },
      { roleId: "seer", timestamp: 1234, source: "doppelganger" },
    ],

    // Role-Specific Data
    metadata: {
      // Doppelgänger
      mimickedRole: "seer",

      // Cupid
      linkedPlayerId: 3,

      // P.I.
      viewedPlayers: [1, 2],
      transformedFrom: "paranormal_investigator",

      // Sentinel
      protectedBy: 2, // Player ID who protected this player

      // Custom data for future roles
      customData: {},
    },
  },
];
```

### 2. Card State System

```javascript
// Unified Card State
const CardState = {
  HIDDEN: "hidden",
  REVEALED: "revealed",
  PROTECTED: "protected",
  MARKED: "marked",
  INFECTED: "infected",
  LOCKED: "locked",
};

// Card can have multiple states
card.states = new Set(["hidden", "protected"]);
```

### 3. Action System (Event-Driven)

```javascript
// Action Types
const ActionType = {
  VIEW: "view",
  SWAP_SELF: "swap_self",
  SWAP_OTHERS: "swap_others",
  PROTECT: "protect",
  MARK: "mark",
  TRANSFORM: "transform",
  INFECT: "infect",
  LINK: "link",
  GLOBAL: "global",
};

// Action Validation Pipeline
function validateAction(action) {
  const validators = [checkProtection, checkLocked, checkRoleSpecific];

  for (const validator of validators) {
    const result = validator(action);
    if (!result.valid) {
      return { valid: false, reason: result.reason };
    }
  }

  return { valid: true };
}

// Example: Robber tries to swap with protected player
const action = {
  type: ActionType.SWAP_SELF,
  actor: 0, // Robber index
  target: 2, // Protected player index
};

const validation = validateAction(action);
if (!validation.valid) {
  console.log("Action blocked:", validation.reason);
  // Silently fail or notify based on role
}
```

### 4. Role Definition Enhancement

```javascript
const rolesData = [
  {
    id: "sentinel",
    name: { "zh-HK": "哨兵", "en-US": "Sentinel" },
    team: "village",
    wakeOrder: 2,

    // Action Configuration
    action: {
      type: ActionType.PROTECT,
      targetType: "player", // 'player' | 'center' | 'self' | 'any'
      targetCount: 1,
      canTargetSelf: true,

      // Custom validation
      validate: (actor, targets, gameState) => {
        // Custom logic
        return { valid: true };
      },

      // Execute action
      execute: (actor, targets, gameState) => {
        const targetPlayer = targets[0];
        gameState.playerRoles[targetPlayer].states.protected = true;
        gameState.playerRoles[targetPlayer].metadata.protectedBy = actor;
      },
    },

    // Passive Triggers
    triggers: {
      // When someone tries to swap this player
      onSwapAttempt: (event, gameState) => {
        if (gameState.playerRoles[event.target].states.protected) {
          return { blocked: true, silent: true };
        }
        return { blocked: false };
      },
    },
  },
];
```

### 5. Swap Logic Refactoring

```javascript
// Unified Swap Function
function attemptSwap(player1Index, player2Index, swapType = "normal") {
  // Validation
  const validation = validateAction({
    type: ActionType.SWAP_OTHERS,
    actor: currentNightRole.actorIndex,
    targets: [player1Index, player2Index],
  });

  if (!validation.valid) {
    console.log(`[Swap Blocked] ${validation.reason}`);
    return { success: false, reason: validation.reason };
  }

  // Execute Swap
  const temp = playerRoles[player1Index].currentRoleId;
  playerRoles[player1Index].currentRoleId =
    playerRoles[player2Index].currentRoleId;
  playerRoles[player2Index].currentRoleId = temp;

  // Trigger Events
  triggerEvent("onSwap", { player1: player1Index, player2: player2Index });

  return { success: true };
}
```

---

## 重構計劃 (Refactoring Plan)

### Phase 1: Data Structure Migration

1. 擴展 `playerRoles` 結構
2. 加入 `states` 同 `metadata`
3. 向後兼容（保留 `roleId` -> `currentRoleId`）

### Phase 2: Action System

1. 建立 `ActionType` enum
2. 實現 `validateAction` pipeline
3. 重構現有 handlers 使用新系統

### Phase 3: Event System

1. 建立 event bus
2. 加入 triggers 到 role definitions
3. 實現 passive abilities

### Phase 4: Role Migration

1. 逐步遷移現有角色到新結構
2. 測試兼容性
3. 清理舊代碼

---

## 優先級建議 (Priority Recommendations)

### 🔴 High Priority (必須做)

1. **Player Data Structure** - 基礎，影響所有功能
2. **Swap Logic Refactoring** - 多個角色依賴
3. **State System** - 支援 Sentinel, Revealer 等

### 🟡 Medium Priority (應該做)

1. **Action Validation Pipeline** - 提升可維護性
2. **Role Definition Enhancement** - 方便加新角色

### 🟢 Low Priority (可以做)

1. **Event System** - 進階功能，暫時唔急
2. **Role History** - 除非需要複雜轉換邏輯

---

## 下一步 (Next Steps)

1. **Review** - 你睇下呢個設計有冇問題
2. **Prioritize** - 決定由邊個 Phase 開始
3. **Prototype** - 小範圍測試新結構
4. **Migrate** - 逐步遷移現有代碼
5. **Extend** - 加入新角色

---

**最後更新**: 2025-11-23 17:59
**狀態**: 📋 設計階段 (Design Phase)
