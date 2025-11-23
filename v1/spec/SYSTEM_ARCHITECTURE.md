# Technical Architecture & System Design

## 1. Technology Stack
*   **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
*   **State Management**: Global JS Objects + LocalStorage Persistence
*   **Audio**: Web Speech API (SpeechSynthesis) + Web Audio API (Unlock Fix)
*   **Styling**: Custom CSS with CSS Variables (Dark/Light Theme support)

## 2. Data Structures

### 2.1 Global State (`script.js`)
*   `players`: Array of player objects `{ id, name }`.
*   `deck`: Array of role IDs (strings) representing the selected roles.
*   `playerRoles`: Array of objects mapping players to roles.
    ```javascript
    {
        playerId: "player-1",
        roleId: "seer",          // Current Role (changes after swap)
        initialRoleId: "seer",   // Original Role (for wake-up logic)
        mimickedRole: null,      // For Doppelgänger tracking
        revealed: false
    }
    ```
*   `centerCards`: Array of 3 role objects for the center.
*   `gamePhaseState`: Enum string (`SETUP`, `PEEK`, `NIGHT`, `DAY`, `VOTE`, `REVEAL`).
*   `nightActionState`: Object tracking the current step's interaction status.
    ```javascript
    {
        viewed: 0,      // Number of cards viewed
        swapped: false, // Has a swap occurred?
        selection: [],  // Selected card indices
        confirmed: false,
        completed: false
    }
    ```

## 3. Core Logic

### 3.1 Night Phase Loop
The Night Phase is driven by a `nightSequence` array, which is filtered from `rolesData` based on the selected deck and `wakeOrder`.
*   **Step Function**: `nextStep()` advances the index.
*   **Fake Turns**: If a role is in the deck but no player holds it (it's in the center), `activePlayerIndex` will be `-1`. The system still plays the audio and waits 10 seconds to prevent meta-gaming.
*   **Interaction Blocking**: `handleCardClick` checks `activePlayerIndex`. If `-1`, all interactions are blocked.

### 3.2 Role Identification Strategy
*   **Wake Up**: Players wake up based on `initialRoleId`.
*   **Action Execution**: Actions modify `roleId` (Current Role).
*   **Doppelgänger Exception**: The Doppelgänger wakes up first. If they copy an action role (e.g., Seer), they perform that action *immediately* within the Doppelgänger's turn. They do **NOT** wake up again during the Seer's turn.

### 3.3 Audio System (iOS Compatibility)
*   **Unlock Strategy**: Uses `touchend` and `click` events to play a silent Web Audio API buffer and resume `speechSynthesis`.
*   **Garbage Collection Fix**: `currentUtterance` global variable holds the active utterance to prevent iOS Safari from garbage collecting it prematurely.
*   **Force Play**: `speak()` function accepts a `force` parameter to bypass `isPlaying` checks for testing purposes.

## 4. Persistence
*   **LocalStorage**: `happywolf_save` key stores the entire game state.
*   **Auto-Resume**: On page load, `loadGameState()` checks for valid save data and restores the UI and Phase.
*   **Clear**: Data is cleared on "End Game" or winning condition.

## 5. Key Functions
*   `createCard(type, index)`: Generates card DOM with event listeners. Handles highlighting logic.
*   `handleCardClick(type, index)`: Central dispatcher for user interactions.
*   `handle[Role]Action(type, index)`: Specific logic for each role.
*   `renderTable()`: Refreshes the UI based on current state.
