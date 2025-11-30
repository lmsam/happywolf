# Test-Driven Development (TDD) 工作流程

## 目的 (Purpose)

建立一個穩定、可靠嘅開發流程，確保重構過程中唔會破壞現有功能，並為新功能提供測試保障。

---

## 🛠️ 環境設置 (Setup)

由於項目目前係 Vanilla JS（無 Bundler），我哋需要簡單設置 Node.js 環境嚟跑測試。

### 1. 初始化項目 (如果未做)

```bash
npm init -y
```

### 2. 安裝 Jest

```bash
npm install --save-dev jest jest-environment-jsdom
```

### 3. 配置 Jest (`jest.config.js`)

**關鍵：** 必須忽略 `v1` 同 `v2` backup folder。

建立 `jest.config.js`:

```javascript
module.exports = {
  // 使用 jsdom 模擬瀏覽器環境 (DOM, window, document)
  testEnvironment: "jsdom",

  // 忽略備份目錄
  testPathIgnorePatterns: ["/node_modules/", "/v1/", "/v2/"],

  // 測試文件位置
  roots: ["<rootDir>"],

  // 測試文件匹配模式
  testMatch: ["**/__tests__/**/*.+(js)", "**/?(*.)+(spec|test).+(js)"],

  // 顯示詳細報告
  verbose: true,
};
```

### 4. 修改 `package.json`

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

---

## 🔄 Vanilla JS 兼容性處理

由於 `script.js` 係直接喺瀏覽器運行，無 `module.exports`，Jest 默認載入唔到。
我哋需要用一個簡單嘅 Pattern 令佢既可以喺瀏覽器跑，又可以被測試。

### **方法：條件式導出 (Conditional Export)**

喺 `script.js` (或新嘅邏輯文件) 嘅最底加入：

```javascript
// ... 現有代碼 ...

// 測試環境導出
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    updatePlayerRole,
    swapCards,
    validateGameState,
    // ... 其他需要測試嘅函數
  };
}
```

這樣做唔會影響瀏覽器（因為 `module` 未定義），但 Jest 可以 `require` 到函數。

---

## 🚦 TDD 循環 (The Cycle)

### **1. 🔴 Red (寫一個失敗嘅測試)**

根據 `PLAYER_ROLE_STATES.md` 或 `CARD_STATES_AND_TOKENS.md` 嘅規格，先寫測試。

例子 (`__tests__/playerRole.test.js`):

```javascript
const { updatePlayerRole } = require("../script"); // 或新文件

describe("Player Role System", () => {
  // 每個測試前重置狀態
  beforeEach(() => {
    // Reset game state mock
    global.players = [{ roles: { actual: "villager" }, roleHistory: [] }];
  });

  test("updatePlayerRole should update actual role", () => {
    // Action
    updatePlayerRole(0, "seer", { perceived: true });

    // Assertion (預期失敗，因為函數未寫)
    expect(global.players[0].roles.actual).toBe("seer");
  });
});
```

運行測試：

```bash
npm test
```

**結果：** ❌ 失敗 (因為 `updatePlayerRole` 未定義或未實現)

### **2. 🟢 Green (用最簡單方法通過測試)**

喺 `script.js` 實現最基本邏輯：

```javascript
function updatePlayerRole(playerIndex, newRole, options) {
  if (!players[playerIndex].roles) {
    players[playerIndex].roles = {};
  }
  players[playerIndex].roles.actual = newRole;
}
```

運行測試：

```bash
npm test
```

**結果：** ✅ 通過

### **3. 🔵 Refactor (重構代碼)**

優化代碼，加入完整邏輯、錯誤處理，確保代碼整潔。

```javascript
function updatePlayerRole(playerIndex, newRole, options = {}) {
  const player = players[playerIndex];

  // 驗證輸入
  if (!player) throw new Error("Player not found");

  // 更新邏輯
  player.roles.actual = newRole;

  // 處理 perceived
  if (options.perceived) {
    player.roles.perceived = newRole;
  }

  // 記錄歷史 (Refactor 加入嘅新功能)
  if (player.roleHistory) {
    player.roleHistory.push({
      /* ... */
    });
  }
}
```

再次運行測試確保無整壞嘢：

```bash
npm test
```

---

## 📂 測試目錄結構建議

```
happywolf/
├── script.js           (主邏輯)
├── logic/              (建議：將純邏輯抽出嚟，方便測試)
│   ├── playerManager.js
│   ├── cardManager.js
│   └── gameEngine.js
├── __tests__/          (測試文件夾)
│   ├── playerRole.test.js
│   ├── cardState.test.js
│   └── integration.test.js
├── jest.config.js
├── package.json
└── ...
```

## 📝 針對重構計劃嘅測試策略

### **Phase 1: 基礎架構**

- 重點測試 `updatePlayerRole`, `swapCards`。
- Mock `players` 同 `cards` 數組，唔好依賴 DOM。

### **Phase 2: Token 系統**

- 測試 `setCardInteractionState`。
- 可以用 `jest-environment-jsdom` 測試 DOM class 變化。
  ```javascript
  test("should add selectable class", () => {
    document.body.innerHTML = '<div id="card-0" class="card"></div>';
    setCardInteractionState(0, "selectable", true);
    expect(document.getElementById("card-0").classList).toContain("selectable");
  });
  ```

### **Phase 3: 角色 Handler**

- 整合測試：模擬一個完整嘅 Robber 回合。
- 檢查 `playerRoles` 狀態變化是否符合預期。

---

## ⚠️ 注意事項

1. **DOM 依賴**：如果函數依賴 `document.getElementById`，記得喺測試 `beforeEach` 入面 setup `document.body.innerHTML`。
2. **Global Variables**：`script.js` 用咗好多 global variables (`players`, `rolesData`)。喺測試環境可能需要 mock 或者手動注入。
   - _長遠建議_：重構為傳入參數，減少依賴 global state。

---

**最後更新**: 2025-11-28
