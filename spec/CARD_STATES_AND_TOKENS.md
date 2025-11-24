# 卡牌狀態與 Token 系統設計

## 目的 (Purpose)

整理所有可能嘅卡牌狀態同 Token，設計統一嘅 UI 顯示系統。

---

## 📋 卡牌狀態分類 (Card State Categories)

### 1. **基本狀態 (Basic States)**

| 狀態       | 說明     | 視覺效果          | 可見性         |
| ---------- | -------- | ----------------- | -------------- |
| `hidden`   | 背面朝上 | 顯示卡背          | 所有人         |
| `revealed` | 翻開     | 顯示角色圖        | 所有人         |
| `faceUp`   | 永久翻開 | 顯示角色圖 + 邊框 | 所有人（白天） |

### 2. **互動狀態 (Interaction States)** ⭐ **夜晚階段專用**

呢啲狀態只喺夜晚階段存在，用嚟處理玩家同卡牌嘅互動。

| 狀態          | 觸發時機     | 視覺效果               | 用途                                 |
| ------------- | ------------ | ---------------------- | ------------------------------------ |
| `selectable`  | 角色回合開始 | 高亮邊框 + 脈衝動畫    | 標示可以點擊嘅卡                     |
| `selected`    | 玩家點擊卡牌 | 綠色邊框 + 勾號        | 標示已選擇嘅卡                       |
| `animating`   | 執行動作中   | 動畫效果（交換、翻轉） | 顯示動作進行中                       |
| `locked`      | 完成選擇後   | 灰色遮罩               | 防止重複點擊                         |
| `highlighted` | 特殊提示     | 黃色光暈               | 提示重要資訊（例如：孤狼見到中間卡） |

**互動狀態生命週期：**

```
角色回合開始
    ↓
設定 selectable (可選擇嘅卡高亮)
    ↓
玩家點擊
    ↓
設定 selected (已選擇嘅卡標記)
    ↓
執行動作
    ↓
設定 animating (動畫進行中)
    ↓
動作完成
    ↓
清除所有互動狀態
```

**UI 設計：**

```css
/* Selectable - 可選擇 */
.card.selectable {
  border: 3px solid #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  cursor: pointer;
  animation: pulse 1.5s infinite;
}

.card.selectable:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 30px rgba(255, 215, 0, 0.8);
}

/* Selected - 已選擇 */
.card.selected {
  border: 3px solid #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
}

.card.selected::after {
  content: "✓";
  position: absolute;
  top: 5px;
  right: 5px;
  background: #00ff00;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Animating - 動畫中 */
.card.animating {
  pointer-events: none;
  transition: all 0.6s ease;
}

/* Locked - 鎖定 */
.card.locked {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(50%);
}

/* Highlighted - 高亮提示 */
.card.highlighted {
  border: 3px solid #ffd700;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  animation: glow 1s infinite alternate;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }
  100% {
    box-shadow: 0 0 40px rgba(255, 215, 0, 1);
  }
}
```

**數據結構：**

```javascript
const card = {
  // ... 其他屬性

  // 互動狀態（夜晚階段）
  interactionState: {
    selectable: false,
    selected: false,
    animating: false,
    locked: false,
    highlighted: false,
  },
};
```

**統一方法 - 設定互動狀態：**

```javascript
/**
 * 設定卡牌互動狀態
 * @param {number} cardIndex - 卡牌索引
 * @param {string} state - 狀態名稱
 * @param {boolean} value - 狀態值
 */
function setCardInteractionState(cardIndex, state, value) {
  const card = getCardAt(cardIndex);
  card.interactionState[state] = value;

  // 更新 DOM
  const cardElement = getCardElement(cardIndex);
  if (value) {
    cardElement.classList.add(state);
  } else {
    cardElement.classList.remove(state);
  }
}

/**
 * 清除所有互動狀態
 */
function clearAllInteractionStates() {
  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];
    card.interactionState = {
      selectable: false,
      selected: false,
      animating: false,
      locked: false,
      highlighted: false,
    };

    const cardElement = getCardElement(i);
    cardElement.classList.remove(
      "selectable",
      "selected",
      "animating",
      "locked",
      "highlighted"
    );
  }
}
```

**統一方法 - 設定可選擇卡牌：**

```javascript
/**
 * 設定可選擇嘅卡牌
 * @param {object} options - 選項
 */
function setSelectableCards(options = {}) {
  const {
    type = "all", // 'player' | 'center' | 'all'
    exclude = [], // 排除嘅索引
    maxSelections = null, // 最多可選幾張
    validator = null, // 自定義驗證函數
  } = options;

  // 清除舊狀態
  clearAllInteractionStates();

  // 設定新狀態
  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];

    // 檢查類型
    if (type === "player" && card.type !== "player") continue;
    if (type === "center" && card.type !== "center") continue;

    // 檢查排除
    if (exclude.includes(i)) continue;

    // 自定義驗證
    if (validator && !validator(card, i)) continue;

    // 設定為可選擇
    setCardInteractionState(i, "selectable", true);
  }
}
```

**實際應用例子：**

```javascript
// === 例子 1: Seer 回合 ===
function startSeerTurn() {
  // Seer 可以選擇：1 個玩家 OR 2 張中間卡
  setSelectableCards({
    type: "all",
    exclude: [seerIndex], // 排除自己
    validator: (card, index) => {
      // 如果已經選咗玩家，就唔可以再選中間卡
      if (nightActionState.selection.some((s) => s.type === "player")) {
        return card.type === "player";
      }
      return true;
    },
  });
}

// === 例子 2: Troublemaker 回合 ===
function startTroublemakerTurn() {
  // Troublemaker 可以選擇 2 個其他玩家
  setSelectableCards({
    type: "player",
    exclude: [troublemakerIndex], // 排除自己
    maxSelections: 2,
  });
}

// === 例子 3: 孤狼情況 ===
function startWerewolfTurn() {
  const werewolfCount = countWerewolves();

  if (werewolfCount === 1) {
    // 孤狼可以睇 1 張中間卡
    setSelectableCards({
      type: "center",
      maxSelections: 1,
    });

    // 高亮中間卡（提示）
    for (let i = 0; i < centerCards.length; i++) {
      setCardInteractionState(i, "highlighted", true);
    }
  } else {
    // 多隻狼，只係高亮其他狼人
    for (let i = 0; i < players.length; i++) {
      if (isWerewolf(i)) {
        setCardInteractionState(i, "highlighted", true);
      }
    }
  }
}
```

**統一方法 - 處理卡牌點擊：**

```javascript
/**
 * 處理卡牌點擊
 * @param {number} cardIndex - 卡牌索引
 */
function handleCardClick(cardIndex) {
  const card = allCards[cardIndex];

  // 檢查係咪可選擇
  if (!card.interactionState.selectable) {
    console.log("[Click] Card not selectable");
    return;
  }

  // 檢查係咪已鎖定
  if (card.interactionState.locked) {
    console.log("[Click] Card locked");
    return;
  }

  // 設定為已選擇
  setCardInteractionState(cardIndex, "selected", true);
  setCardInteractionState(cardIndex, "selectable", false);

  // 記錄選擇
  nightActionState.selection.push(cardIndex);

  // 檢查係咪完成選擇
  if (isSelectionComplete()) {
    executeAction();
  }
}
```

**統一方法 - 執行動作動畫：**

```javascript
/**
 * 執行卡牌動畫
 * @param {string} animationType - 動畫類型
 * @param {array} cardIndices - 涉及嘅卡牌
 */
async function animateCards(animationType, cardIndices) {
  // 設定動畫狀態
  for (const index of cardIndices) {
    setCardInteractionState(index, "animating", true);
    setCardInteractionState(index, "locked", true);
  }

  // 執行動畫
  switch (animationType) {
    case "swap":
      await animateSwap(cardIndices[0], cardIndices[1]);
      break;
    case "reveal":
      await animateReveal(cardIndices[0]);
      break;
    case "transform":
      await animateTransform(cardIndices[0]);
      break;
  }

  // 清除動畫狀態
  for (const index of cardIndices) {
    setCardInteractionState(index, "animating", false);
    setCardInteractionState(index, "locked", false);
  }
}

/**
 * 交換動畫
 */
async function animateSwap(index1, index2) {
  const card1 = getCardElement(index1);
  const card2 = getCardElement(index2);

  // 計算位置
  const rect1 = card1.getBoundingClientRect();
  const rect2 = card2.getBoundingClientRect();

  // 執行動畫
  card1.style.transform = `translate(${rect2.left - rect1.left}px, ${
    rect2.top - rect1.top
  }px)`;
  card2.style.transform = `translate(${rect1.left - rect2.left}px, ${
    rect1.top - rect2.top
  }px)`;

  await sleep(600);

  // 重置
  card1.style.transform = "";
  card2.style.transform = "";
}

/**
 * 翻開動畫
 */
async function animateReveal(index) {
  const card = getCardElement(index);
  card.classList.add("revealed");

  await sleep(3000);

  card.classList.remove("revealed");
}
```

**角色 Handler 重構例子：**

```javascript
// === 舊代碼（每個角色都要寫一次） ===
function handleSeerAction(type, index) {
  // 檢查係咪可以點擊
  if (type !== "player" && type !== "center") return;
  if (nightActionState.viewed >= 2) return;
  // ... 一堆檢查邏輯

  // 高亮
  const card = getCardElement(type, index);
  card.classList.add("revealed");
  // ... 一堆 UI 邏輯
}

// === 新代碼（使用統一方法） ===
function handleSeerAction(type, index) {
  // 統一處理點擊
  handleCardClick(index);

  // 角色特定邏輯
  if (nightActionState.selection.length === 1) {
    // 翻開卡牌
    animateCards("reveal", [index]);
  }

  // 檢查完成
  if (isSelectionComplete()) {
    finishSeerTurn();
  }
}
```

### 3. **保護狀態 (Protection States)**

| 狀態        | 角色      | Token     | 效果            | UI 顯示     | 可見性         |
| ----------- | --------- | --------- | --------------- | ----------- | -------------- |
| `shielded`  | Sentinel  | 🛡️ Shield | 不能被查看/移動 | Shield 圖示 | 所有人（白天） |
| `protected` | Bodyguard | 🛡️ Shield | 類似 Sentinel   | Shield 圖示 | 所有人（白天） |

**UI 設計：**

```html
<div class="card-token shield-token">
  <i class="fa fa-shield"></i>
</div>
```

### 3. **標記狀態 (Marking States)**

| 狀態     | 角色     | Token    | 效果                        | UI 顯示         | 可見性             |
| -------- | -------- | -------- | --------------------------- | --------------- | ------------------ |
| `marked` | Revealer | 📍 Mark  | 如果係狼人/皮匠，卡保持翻開 | 翻開 + 標記圖示 | 所有人（白天）     |
| `cursed` | Cursed   | 🌙 Curse | 被狼人查看時變狼人          | Curse 圖示？    | 只有 Cursed 自己知 |

**UI 設計：**

```html
<!-- Revealer Mark -->
<div class="card-token mark-token">
  <i class="fa fa-eye"></i>
</div>

<!-- Cursed (隱藏) -->
<div class="card-token curse-token hidden">
  <i class="fa fa-moon"></i>
</div>
```

### 4. **感染狀態 (Infection States)**

| 狀態       | 角色      | Token        | 效果                        | UI 顯示        | 可見性         |
| ---------- | --------- | ------------ | --------------------------- | -------------- | -------------- |
| `infected` | The Thing | 🦠 Infection | 被感染，變成 The Thing 陣營 | Infection 圖示 | 只有被感染者知 |
| `vampire`  | Vampire   | 🧛 Bite      | 被咬，變成吸血鬼            | Bite 圖示      | 只有被咬者知   |

**UI 設計：**

```html
<!-- The Thing Infection (隱藏) -->
<div class="card-token infection-token hidden">
  <i class="fa fa-virus"></i>
</div>
```

### 5. **連結狀態 (Link States)**

| 狀態     | 角色   | Token    | 效果               | UI 顯示    | 可見性     |
| -------- | ------ | -------- | ------------------ | ---------- | ---------- |
| `linked` | Cupid  | 💕 Heart | 與另一玩家成為戀人 | Heart 圖示 | 只有戀人知 |
| `paired` | (變體) | 🔗 Chain | 配對關係           | Chain 圖示 | 視情況     |

**UI 設計：**

```html
<!-- Cupid Link (隱藏，只有戀人見到) -->
<div class="card-token link-token" data-player-only="true">
  <i class="fa fa-heart"></i>
</div>
```

### 6. **道具狀態 (Artifact States)**

| 狀態          | 角色    | Token       | 效果         | UI 顯示       | 可見性         |
| ------------- | ------- | ----------- | ------------ | ------------- | -------------- |
| `hasArtifact` | Curator | 🎨 Artifact | 持有特殊道具 | Artifact 圖示 | 所有人（白天） |

**UI 設計：**

```html
<div class="card-token artifact-token">
  <i class="fa fa-gem"></i>
</div>
```

### 7. **轉換狀態 (Transformation States)**

| 狀態          | 角色               | Token | 效果         | UI 顯示            | 可見性     |
| ------------- | ------------------ | ----- | ------------ | ------------------ | ---------- |
| `transformed` | P.I., Doppelgänger | -     | 角色已轉換   | 無 Token，內部追蹤 | 只有自己知 |
| `mimicked`    | Doppelgänger       | -     | 模仿其他角色 | 無 Token，內部追蹤 | 只有自己知 |

---

## 🎨 UI 設計系統

### **Token 顯示層級**

```
卡牌結構：
┌─────────────────┐
│  Card Container │
│  ┌───────────┐  │
│  │ Card Face │  │  ← 角色圖片
│  └───────────┘  │
│  ┌───────────┐  │
│  │  Tokens   │  │  ← Token 層（多個 Token）
│  │ 🛡️ 📍 💕  │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │   Label   │  │  ← 玩家名字
│  └───────────┘  │
└─────────────────┘
```

### **Token 位置規劃**

```css
.card-tokens {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
  z-index: 10;
}

.card-token {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.shield-token {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mark-token {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.infection-token {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.link-token {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}
```

### **Token 可見性控制**

```javascript
// Token 可見性規則
const tokenVisibility = {
  shield: {
    nightPhase: false, // 夜晚唔顯示
    dayPhase: true, // 白天所有人見到
    owner: true, // 持有者見到
  },

  mark: {
    nightPhase: false,
    dayPhase: true, // 白天所有人見到
    owner: true,
  },

  infection: {
    nightPhase: false,
    dayPhase: false, // 永遠唔公開顯示
    owner: true, // 只有被感染者見到
  },

  link: {
    nightPhase: false,
    dayPhase: false, // 永遠唔公開顯示
    owner: true, // 只有戀人見到
    linked: true, // 另一個戀人都見到
  },
};

// 渲染 Token
function renderTokens(cardIndex, viewerIndex) {
  const card = getCardAt(cardIndex);
  const tokens = [];

  for (const [tokenType, state] of Object.entries(card.tokens)) {
    if (!state) continue;

    const visibility = tokenVisibility[tokenType];
    const canView =
      (gamePhaseState === "DAY" && visibility.dayPhase) ||
      (cardIndex === viewerIndex && visibility.owner) ||
      (tokenType === "link" && isLinkedPlayer(viewerIndex, cardIndex));

    if (canView) {
      tokens.push(createToken(tokenType));
    }
  }

  return tokens;
}
```

---

## 📊 數據結構設計

### **Card Object**

```javascript
const card = {
  // 基本資訊
  id: "card_0",
  roleId: "seer",
  initialRoleId: "seer",

  // 基本狀態
  state: "hidden", // 'hidden' | 'revealed' | 'faceUp'

  // Token 狀態
  tokens: {
    shielded: false,
    marked: false,
    infected: false,
    linked: false,
    hasArtifact: false,
  },

  // Token 元數據
  tokenMetadata: {
    shielded: { placedBy: 2 }, // Sentinel 係 Player 2
    marked: { placedBy: 3, revealed: true }, // Revealer 係 Player 3
    linked: { linkedTo: 4 }, // 與 Player 4 連結
    infected: { source: 1 }, // 被 Player 1 感染
  },

  // 轉換歷史
  transformations: [
    {
      from: "seer",
      to: "werewolf",
      source: "paranormal_investigator",
      timestamp: 1234,
    },
  ],
};
```

### **Slot Object (持有關係)**

```javascript
const slot = {
  index: 0,
  type: "player", // 'player' | 'center'
  playerId: 1,
  cardId: "card_0",

  // Slot 特定狀態（例如：Village Idiot 移位後）
  shifted: false,
  originalIndex: 0,
};
```

---

## 🎯 實現優先級

### 🔴 **Phase 1: 基本 Token 系統**

1. Shield Token (Sentinel)
2. Token 渲染系統
3. Token 可見性控制

### 🟡 **Phase 2: 進階 Token**

1. Mark Token (Revealer)
2. Infection Token (The Thing)
3. Link Token (Cupid)

### 🟢 **Phase 3: 複雜系統**

1. Artifact System
2. Transformation Tracking
3. Token 動畫效果

---

## 💡 設計考量

### **問題 1：多個 Token 同時存在**

```
例子：一張卡同時有 Shield + Mark
UI: 並排顯示兩個 Token
```

### **問題 2：Token 優先級**

```
顯示次序（由左至右）：
1. Shield (最重要)
2. Mark
3. Artifact
4. Link (隱藏)
5. Infection (隱藏)
```

### **問題 3：Mobile 顯示**

```
Mobile 卡牌較小，Token 可能重疊
解決：
- 縮小 Token 尺寸
- 使用 Badge 數字顯示 Token 數量
- 點擊卡牌顯示詳細資訊
```

---

**最後更新**: 2025-11-23 18:17
**狀態**: 📋 設計階段 (Design Phase)
