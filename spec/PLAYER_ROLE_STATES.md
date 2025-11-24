# 玩家角色狀態系統設計

## 目的 (Purpose)

詳細設計玩家嘅三種角色狀態（初始角色、心理角色、實際角色），確保系統能正確追蹤同處理所有角色轉換情況。

---

## 🎭 核心概念：三種角色狀態

### **概念定義**

```
玩家 (Player)
├─ 初始角色 (Initial Role)      - 遊戲開始時抽到嘅角色（永不改變）
├─ 心理角色 (Perceived Role)    - 玩家「以為」自己係咩角色
└─ 實際角色 (Actual Role)       - 玩家面前張卡嘅真實角色（與卡牌一致）
```

### **為何需要三種狀態？**

| 狀態               | 用途             | 例子                                             |
| ------------------ | ---------------- | ------------------------------------------------ |
| **Initial Role**   | 決定邊個應該醒來 | Robber 一開始係 Robber，所以 Robber 回合時佢要醒 |
| **Perceived Role** | 玩家發言依據     | Robber 偷咗 Seer，佢會話「我係 Seer」            |
| **Actual Role**    | 投票勝負計算     | 投票時睇面前張卡，唔係睇玩家以為自己係咩         |

---

## 📚 詳細例子

### **例子 1：普通村民（三者一致）**

```javascript
// 遊戲開始
Player 1 抽到 Villager

// 狀態
{
    initialRole: 'villager',
    perceivedRole: 'villager',
    actualRole: 'villager'
}

// 整個遊戲過程
- 夜晚：冇醒來（因為 initialRole 唔係互動角色）
- 白天：以為自己係村民（perceivedRole）
- 投票：面前張卡係村民（actualRole）

// 結果：三者一致 ✅
```

### **例子 2：Robber 偷咗 Seer**

```javascript
// 遊戲開始
Player 1: Robber
Player 2: Seer

// === Robber 回合 ===
// Player 1 醒來（因為 initialRole === 'robber'）
Player 1 偷 Player 2

// 交換後
Player 1: {
    initialRole: 'robber',      // 永遠唔變
    perceivedRole: 'seer',      // 佢見到自己變咗 Seer ✅
    actualRole: 'seer'          // 面前張卡真係 Seer ✅
}

Player 2: {
    initialRole: 'seer',        // 永遠唔變
    perceivedRole: 'seer',      // 佢唔知自己被偷 ❌
    actualRole: 'robber'        // 但面前張卡其實係 Robber ✅
}

// === Seer 回合 ===
// Player 2 醒來（因為 initialRole === 'seer'）
// 但佢面前張卡其實係 Robber！
// 佢以為自己係 Seer，會使用 Seer 能力

// === 白天討論 ===
Player 1: "我係 Seer，我見到..." （基於 perceivedRole）
Player 2: "我先係 Seer！" （基於 perceivedRole）

// === 投票 ===
// 如果 Player 2 被投死
// 檢查 actualRole === 'robber' → 村民贏（殺咗 Robber）
```

### **例子 3：Drunk 換卡（唔知結果）**

```javascript
// 遊戲開始
Player 3: Drunk
Center 1: Werewolf

// === Drunk 回合 ===
// Player 3 醒來（因為 initialRole === 'drunk'）
Player 3 將自己張卡同 Center 1 交換

// 交換後
Player 3: {
    initialRole: 'drunk',       // 永遠唔變
    perceivedRole: 'drunk',     // 佢唔知自己變咗咩 ❌
    actualRole: 'werewolf'      // 但面前張卡其實係狼人 ✅
}

Center 1: {
    roleId: 'drunk'
}

// === 白天討論 ===
Player 3: "我係 Drunk，我換咗中間一張卡"
// 佢唔知自己其實已經係狼人！

// === 投票 ===
// 如果 Player 3 被投死
// 檢查 actualRole === 'werewolf' → 村民贏
```

### **例子 4：Troublemaker 換咗兩個人**

```javascript
// 遊戲開始
Player 4: Troublemaker
Player 5: Seer
Player 6: Werewolf

// === Troublemaker 回合 ===
// Player 4 醒來
Player 4 交換 Player 5 同 Player 6

// 交換後
Player 5: {
    initialRole: 'seer',
    perceivedRole: 'seer',      // 佢唔知自己被換 ❌
    actualRole: 'werewolf'      // 但面前張卡其實係狼人 ✅
}

Player 6: {
    initialRole: 'werewolf',
    perceivedRole: 'werewolf',  // 佢唔知自己被換 ❌
    actualRole: 'seer'          // 但面前張卡其實係 Seer ✅
}

// === Seer 回合 ===
// Player 5 醒來（因為 initialRole === 'seer'）
// 佢以為自己係 Seer，使用 Seer 能力
// 但其實佢面前張卡係狼人！

// === 白天討論 ===
Player 5: "我係 Seer，我見到..." （以為自己係 Seer）
Player 6: "我係狼人" （以為自己係狼人）
// 兩個都錯！

// === 投票 ===
// 如果投 Player 5 → actualRole === 'werewolf' → 村民贏
// 如果投 Player 6 → actualRole === 'seer' → 狼人贏
```

### **例子 5：P.I. 見到狼人後轉換**

```javascript
// 遊戲開始
Player 7: Paranormal Investigator
Player 8: Werewolf

// === P.I. 回合 ===
// Player 7 醒來
Player 7 查看 Player 8 → 見到狼人！
// P.I. 立即轉換成狼人

// 轉換後
Player 7: {
    initialRole: 'paranormal_investigator',  // 永遠唔變
    perceivedRole: 'werewolf',               // 佢知道自己變咗狼人 ✅
    actualRole: 'werewolf',                  // 面前張卡真係狼人 ✅
    cardTransformed: true                    // 卡本身轉換咗
}

// 特殊：P.I. 嘅卡本身轉換咗，唔係交換
// 所以 actualRole 同 cardRoleId 都變成 'werewolf'

// === 白天討論 ===
Player 7: "我係狼人" （基於 perceivedRole，佢知道）

// === 投票 ===
// 如果投 Player 7 → actualRole === 'werewolf' → 村民贏
```

### **例子 6：複雜情況 - Robber 偷咗 Drunk**

```javascript
// 遊戲開始
Player 9: Robber
Player 10: Drunk
Center 2: Seer

// === Robber 回合 ===
Player 9 偷 Player 10

// 交換後
Player 9: {
    initialRole: 'robber',
    perceivedRole: 'drunk',     // 佢見到自己變咗 Drunk ✅
    actualRole: 'drunk'         // 面前張卡真係 Drunk ✅
}

Player 10: {
    initialRole: 'drunk',
    perceivedRole: 'drunk',     // 佢唔知自己被偷 ❌
    actualRole: 'robber'        // 但面前張卡其實係 Robber ✅
}

// === Drunk 回合 ===
// Player 10 醒來（因為 initialRole === 'drunk'）
// 但佢面前張卡其實係 Robber！
Player 10 將自己張卡同 Center 2 交換

// 交換後
Player 10: {
    initialRole: 'drunk',
    perceivedRole: 'drunk',     // 佢仍然以為自己係 Drunk ❌
    actualRole: 'seer'          // 但面前張卡其實係 Seer ✅
}

Center 2: {
    roleId: 'robber'
}

// === 白天討論 ===
Player 9: "我係 Drunk" （基於 perceivedRole）
Player 10: "我都係 Drunk！" （基於 perceivedRole）
// 兩個都以為自己係 Drunk，但其實：
// Player 9 面前真係 Drunk
// Player 10 面前其實係 Seer

// === 投票 ===
// 如果投 Player 9 → actualRole === 'drunk' → 村民輸（殺錯人）
// 如果投 Player 10 → actualRole === 'seer' → 狼人贏（殺咗 Seer）
```

---

## 📊 數據結構設計

### **Player Object - 完整版**

```javascript
const player = {
  // ===== 基本身份 =====
  id: 1,
  name: "Player 1",
  seatIndex: 0,

  // ===== 三種角色狀態 =====
  roles: {
    initial: "robber", // 初始角色（永不改變）
    perceived: "seer", // 心理角色（玩家以為自己係咩）
    actual: "seer", // 實際角色（面前張卡，必須同 card.roleId 一致）
  },

  // ===== 角色變化歷史 =====
  roleHistory: [
    {
      timestamp: 0,
      event: "initial",
      role: "robber",
      perceived: true,
    },
    {
      timestamp: 1234,
      event: "robber_steal",
      from: "robber",
      to: "seer",
      target: 2,
      perceived: true, // 玩家知道呢次變化
      source: "robber",
    },
  ],

  // ===== 玩家知識（佢知道咩資訊）=====
  knowledge: {
    // 查看過嘅卡
    viewedCards: [
      {
        type: "player", // 'player' | 'center'
        index: 2,
        roleId: "robber",
        timestamp: 1234,
      },
    ],

    // 執行過嘅交換
    swappedCards: [
      {
        type: "swap_self", // 'swap_self' | 'swap_others'
        from: 0,
        to: 2,
        timestamp: 1234,
      },
    ],

    // 聽到嘅公告（例如：狼人醒來）
    heardAnnouncements: [{ event: "werewolf_wake", timestamp: 500 }],

    // 見到嘅 Token（例如：Shield）
    seenTokens: [{ type: "shield", playerIndex: 3, timestamp: 2000 }],
  },

  // ===== 特殊狀態 =====
  special: {
    cardTransformed: false, // 卡本身轉換咗（P.I.）
    mimicking: null, // Doppelgänger 模仿緊邊個角色
    linked: null, // Cupid 連結咗邊個玩家
    infected: false, // The Thing 感染
  },
};
```

### **Card Object - 對應版**

```javascript
const card = {
  id: "card_0",
  roleId: "seer", // 必須同 player.roles.actual 一致
  initialRoleId: "robber", // 呢張卡一開始係咩角色

  // Token 狀態
  tokens: {
    shielded: false,
    marked: false,
    infected: false,
  },

  // 轉換狀態
  transformed: false, // 卡本身轉換咗（P.I.）
  transformedFrom: null, // 由咩角色轉換過嚟
};
```

---

## 🔧 核心方法實現

### **方法 1：更新玩家角色**

```javascript
/**
 * 更新玩家角色
 * @param {number} playerIndex - 玩家索引
 * @param {string} newRole - 新角色
 * @param {object} options - 選項
 */
function updatePlayerRole(playerIndex, newRole, options = {}) {
  const {
    perceived = false, // 玩家知唔知道呢次變化？
    event = "unknown", // 事件類型
    source = null, // 來源（邊個角色/玩家造成）
    target = null, // 目標（如果有）
    transformCard = false, // 係咪卡本身轉換（P.I.）
  } = options;

  const player = players[playerIndex];
  const oldRole = player.roles.actual;

  // 更新實際角色
  player.roles.actual = newRole;

  // 更新心理角色（如果玩家知道）
  if (perceived) {
    player.roles.perceived = newRole;
  }

  // 更新對應卡牌
  const card = getCardAt(playerIndex);
  card.roleId = newRole;

  // 如果係卡本身轉換（P.I.）
  if (transformCard) {
    card.transformed = true;
    card.transformedFrom = oldRole;
    player.special.cardTransformed = true;
  }

  // 記錄歷史
  player.roleHistory.push({
    timestamp: Date.now(),
    event: event,
    from: oldRole,
    to: newRole,
    perceived: perceived,
    source: source,
    target: target,
  });

  console.log(
    `[Role Update] Player ${playerIndex}: ${oldRole} → ${newRole} (perceived: ${perceived})`
  );
}
```

### **方法 2：交換兩張卡**

```javascript
/**
 * 交換兩張卡（玩家或中間卡）
 * @param {object} slot1 - { type: 'player'|'center', index: number }
 * @param {object} slot2 - { type: 'player'|'center', index: number }
 * @param {object} options - 選項
 */
function swapCards(slot1, slot2, options = {}) {
  const {
    actor = null, // 執行交換嘅玩家
    perceived1 = false, // Slot1 玩家知唔知道
    perceived2 = false, // Slot2 玩家知唔知道
    event = "swap",
  } = options;

  // 獲取兩張卡
  const card1 = getCardAtSlot(slot1);
  const card2 = getCardAtSlot(slot2);

  // 交換卡牌
  const tempRole = card1.roleId;
  card1.roleId = card2.roleId;
  card2.roleId = tempRole;

  // 如果涉及玩家，更新玩家角色
  if (slot1.type === "player") {
    updatePlayerRole(slot1.index, card1.roleId, {
      perceived: perceived1,
      event: event,
      source: actor,
      target: slot2,
    });
  }

  if (slot2.type === "player") {
    updatePlayerRole(slot2.index, card2.roleId, {
      perceived: perceived2,
      event: event,
      source: actor,
      target: slot1,
    });
  }

  console.log(
    `[Swap] ${slot1.type}${slot1.index} ↔ ${slot2.type}${slot2.index}`
  );
}
```

### **方法 3：驗證遊戲狀態**

```javascript
/**
 * 驗證遊戲狀態一致性
 */
function validateGameState() {
  let errors = [];

  // 檢查每個玩家
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const card = getCardAt(i);

    // Rule 1: actualRole 必須同面前張卡一致
    if (player.roles.actual !== card.roleId) {
      errors.push({
        type: "role_mismatch",
        playerIndex: i,
        playerRole: player.roles.actual,
        cardRole: card.roleId,
      });
    }

    // Rule 2: initialRole 永遠唔變
    const initialFromHistory = player.roleHistory[0]?.role;
    if (player.roles.initial !== initialFromHistory) {
      errors.push({
        type: "initial_role_changed",
        playerIndex: i,
        current: player.roles.initial,
        history: initialFromHistory,
      });
    }
  }

  if (errors.length > 0) {
    console.error("[Validation Failed]", errors);
    return false;
  }

  console.log("[Validation Passed] Game state is consistent");
  return true;
}
```

### **方法 4：決定邊個應該醒來**

```javascript
/**
 * 決定邊個玩家應該喺呢個角色回合醒來
 * @param {string} roleId - 當前角色 ID
 * @returns {number[]} - 應該醒來嘅玩家索引列表
 */
function getPlayersToWake(roleId) {
  const playersToWake = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    // 用 initialRole 決定
    if (player.roles.initial === roleId) {
      playersToWake.push(i);
    }

    // 特殊：Doppelgänger 模仿咗呢個角色
    if (player.special.mimicking === roleId) {
      playersToWake.push(i);
    }
  }

  return playersToWake;
}
```

---

## 🎯 實際應用場景

### **場景 1：Robber 回合**

```javascript
function handleRobberAction(robberIndex, targetIndex) {
  // 獲取角色
  const robberRole = players[robberIndex].roles.actual;
  const targetRole = players[targetIndex].roles.actual;

  // 交換卡牌
  swapCards(
    { type: "player", index: robberIndex },
    { type: "player", index: targetIndex },
    {
      actor: robberIndex,
      perceived1: true, // Robber 知道
      perceived2: false, // 被偷嘅人唔知
      event: "robber_steal",
    }
  );

  // Robber 查看新卡（翻開動畫）
  revealCardToPlayer(robberIndex, robberIndex);

  // 記錄 Robber 嘅知識
  players[robberIndex].knowledge.viewedCards.push({
    type: "player",
    index: robberIndex,
    roleId: targetRole,
    timestamp: Date.now(),
  });
}
```

### **場景 2：Drunk 回合**

```javascript
function handleDrunkAction(drunkIndex, centerIndex) {
  // 交換卡牌
  swapCards(
    { type: "player", index: drunkIndex },
    { type: "center", index: centerIndex },
    {
      actor: drunkIndex,
      perceived1: false, // Drunk 唔知自己變咗咩
      perceived2: false, // 中間卡冇玩家
      event: "drunk_swap",
    }
  );

  // Drunk 唔會查看新卡
  // 佢嘅 perceivedRole 保持 'drunk'
}
```

### **場景 3：P.I. 轉換**

```javascript
function handlePITransformation(piIndex, targetRole) {
  // P.I. 見到狼人或皮匠，轉換成該角色
  updatePlayerRole(piIndex, targetRole, {
    perceived: true, // P.I. 知道自己轉換咗
    event: "pi_transform",
    source: "paranormal_investigator",
    transformCard: true, // 卡本身轉換
  });

  // 顯示轉換訊息
  showMessage(`你變成咗 ${targetRole}！`);
}
```

### **場景 4：投票階段計算勝負**

```javascript
function calculateWinner(votedPlayerIndex) {
  const player = players[votedPlayerIndex];

  // 用 actualRole（面前張卡）計算
  const actualRole = player.roles.actual;

  if (actualRole === "werewolf") {
    return {
      winner: "village",
      reason: `Player ${votedPlayerIndex} 係狼人`,
    };
  } else if (actualRole === "tanner") {
    return {
      winner: "tanner",
      reason: `Player ${votedPlayerIndex} 係皮匠`,
    };
  } else {
    return {
      winner: "werewolf",
      reason: `Player ${votedPlayerIndex} 唔係狼人`,
    };
  }
}
```

---

## ✅ 驗證規則

### **Rule 1: actualRole 同 card.roleId 必須一致**

```javascript
// 任何時候都要保證
player.roles.actual === getCardAt(playerIndex).roleId;
```

### **Rule 2: initialRole 永遠唔變**

```javascript
// 遊戲開始設定後，永遠唔可以改
player.roles.initial = "robber"; // 只設定一次

// 之後唔可以改
player.roles.initial = "seer"; // ❌ 錯誤！
```

### **Rule 3: perceivedRole 可以同 actualRole 唔同**

```javascript
// 呢個係正常嘅
player.roles.perceived = "seer"; // 佢以為自己係 Seer
player.roles.actual = "werewolf"; // 但其實係狼人
```

### **Rule 4: 交換卡牌時，必須同時更新 player.roles.actual**

```javascript
// ❌ 錯誤做法
card1.roleId = card2.roleId;
card2.roleId = tempRole;
// 漏咗更新 player.roles.actual

// ✅ 正確做法
swapCards(slot1, slot2, options); // 會自動更新所有相關狀態
```

---

## 📋 實現計劃

### **Phase 1: 數據結構遷移**

1. 擴展 `playerRoles` 結構

   ```javascript
   // 舊結構
   playerRoles = [{ playerId, roleId, initialRoleId, revealed }];

   // 新結構
   players = [
     {
       id,
       name,
       seatIndex,
       roles: { initial, perceived, actual },
       roleHistory: [],
       knowledge: {},
       special: {},
     },
   ];
   ```

2. 建立向後兼容層

   ```javascript
   // 提供 getter/setter 保持舊代碼運作
   Object.defineProperty(player, "roleId", {
     get() {
       return this.roles.actual;
     },
     set(value) {
       this.roles.actual = value;
     },
   });
   ```

3. 逐步遷移現有代碼

### **Phase 2: 核心方法實現**

1. `updatePlayerRole()`
2. `swapCards()`
3. `validateGameState()`
4. `getPlayersToWake()`

### **Phase 3: 角色 Handler 重構**

1. 重構 `handleRobberAction`
2. 重構 `handleDrunkAction`
3. 重構 `handleTroublemakerAction`
4. 重構 `handleWitchAction`

### **Phase 4: 測試與驗證**

1. 單元測試
2. 整合測試
3. 遊戲流程測試

---

**最後更新**: 2025-11-23 18:29
**狀態**: 📋 設計階段 (Design Phase)
