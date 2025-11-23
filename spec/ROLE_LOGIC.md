# Role Logic & Complex Interactions Specification

## 1. General Principles
1.  **Initial Role Rule**: Players always wake up based on their `initialRoleId`.
2.  **Swap Rule**: When a card is swapped (e.g., by Robber), the `roleId` updates immediately, but the player's identity for the rest of the night remains their `initialRoleId`.
3.  **Center Cards**: Center cards have `roleId` but no `initialRoleId` (conceptually).

## 2. The Doppelgänger (化身幽靈)
The most complex role. It copies the ability of the first card viewed.

### 2.1 Logic Flow
1.  **Wake Up**: Doppelgänger wakes up first.
2.  **View**: Views one player card.
3.  **Copy**:
    *   Updates `roleId` to the target's role.
    *   Updates `mimickedRole` to the target's role.
    *   **Crucial**: `initialRoleId` remains `'doppelganger'`.
4.  **Action**:
    *   **Passive Role** (Villager, Tanner, Hunter): Nothing happens.
    *   **Active Role** (Seer, Robber, etc.): The Doppelgänger **immediately** performs that role's action.
    *   **UI Update**: The UI refreshes to show the new role's instructions.
    *   **Delay**: A 2-second delay is added before the new action starts to allow the "Reveal" animation to complete.

### 2.2 Edge Cases
*   **Doppelgänger-Seer**: The Doppelgänger performs the Seer action (view 1 player or 2 center).
    *   *Bug Fix*: Ensure the Doppelgänger does NOT wake up again during the actual Seer turn.
*   **Doppelgänger-Werewolf**:
    *   If the target is a Werewolf, the Doppelgänger becomes a Werewolf.
    *   **Wolf Count**: The system counts players with `initialRoleId === 'werewolf'` OR `mimickedRole === 'werewolf'`.
    *   If only the Doppelgänger and one other Werewolf exist, they see each other.
    *   If the Doppelgänger is the *only* Werewolf (e.g., copied a lone Wolf who is actually a Minion? No, copied a Wolf card), they get the Lone Wolf peek.
*   **Doppelgänger-Robber**:
    *   Doppelgänger swaps their card (which is now effectively the Robber card) with another.
    *   They view the new card they received.

## 3. The Robber (強盜)
*   **Action**: Swaps self with target.
*   **View**: Views the *new* card they received.
*   **Display**: The UI must re-render *after* the swap but *before* the view to ensure the correct card image is shown (or at least the logic handles the "new" identity).

## 4. The Troublemaker (搗蛋鬼)
*   **Action**: Swaps two *other* players.
*   **UI**:
    *   Step 1: Select Card A (Green Highlight).
    *   Step 2: Select Card B (Green Highlight).
    *   Step 3: Swap Animation & "Swapped" message.
*   **Restriction**: Cannot select self.

## 5. The Drunk (酒鬼)
*   **Action**: Swaps self with a center card.
*   **Blind Swap**: The Drunk does *not* see the new card.
*   **Implementation**: The system performs the swap in data, but does not reveal the card to the UI.

## 6. Force Werewolf Rule
*   **Purpose**: To ensure the game is exciting, we avoid "No Werewolf" games if possible (optional rule, currently implemented as default).
*   **Logic**:
    *   During Setup (before Peek), check if any player is a Werewolf.
    *   If NO player is a Werewolf, but a Werewolf card exists in the Center:
    *   Swap a random player's card with the Center Werewolf card.
    *   This happens silently. The player will discover they are a Werewolf during the Peek phase.
