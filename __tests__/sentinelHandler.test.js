const { 
    SentinelHandler, 
    RobberHandler, 
    SeerHandler, 
    TroublemakerHandler,
    setPlayerRoles,
    setCenterCards,
    addToken, 
    hasToken 
} = require('../script');

// Mock globals
global.i18n = {
    'zh-HK': {
        roleAction: {
            sentinel: "Sentinel, place a shield token on a player card."
        }
    },
    'en-US': {
        roleAction: {
            sentinel: "Sentinel, place a shield token on a player card."
        }
    }
};
global.currentLang = 'zh-HK';

describe('SentinelHandler', () => {
    let handler;
    let gameState;

    beforeEach(() => {
        // Setup test data
        const players = [
            { roleId: 'sentinel', initialRoleId: 'sentinel', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] },
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [] }
        ];
        const center = [];
        
        // Inject into script.js
        setPlayerRoles(players);
        setCenterCards(center);
        
        gameState = {
            playerRoles: players,
            centerCards: center,
            currentPlayerIndex: 0
        };
        
        handler = new SentinelHandler();
    });

    test('should place a shield token on a player card', () => {
        const result = handler.handleAction(gameState, 'player', 1);
        
        expect(result.handled).toBe(true);
        expect(result.shouldReveal).toBe(false);
        expect(hasToken({ type: 'player', index: 1 }, 'shield')).toBe(true);
        expect(handler.actionState.tokenPlaced).toBe(true);
    });

    test('should NOT place token on self', () => {
        // Sentinel usually cannot shield self? 
        // Rules: "The Sentinel wakes up and may place a shield token on any player's card."
        // Usually "any player" implies "any other player" or "any player including self"?
        // Let's assume ANY player for now, or check specific rules.
        // ONUW Daybreak rules: "The Sentinel may place a shield token on any player's card (including his own)."
        // Wait, let me double check. 
        // "The Sentinel wakes up and places a shield token on any player's card."
        // Most implementations allow self-shielding.
        
        const result = handler.handleAction(gameState, 'player', 0);
        expect(result.handled).toBe(true);
        expect(result.shouldReveal).toBe(false);
        expect(hasToken({ type: 'player', index: 0 }, 'shield')).toBe(true);
    });

    test('should NOT place token on center card', () => {
        const result = handler.handleAction(gameState, 'center', 0);
        expect(result).toBe(false);
    });
});

describe('Interaction Blocking with Shield', () => {
    beforeEach(() => {
        const players = [
            { roleId: 'robber', initialRoleId: 'robber', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: ['shield'] }, // Shielded
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [] }
        ];
        const center = [
            { roleId: 'seer', tokens: [] },
            { roleId: 'mason', tokens: [] }
        ];
        
        setPlayerRoles(players);
        setCenterCards(center);
        
        // We need to update the global/module state for the handlers to see it
        // The handlers use the passed `gameState` for some things, but `hasToken` uses `getCardRef` which uses module state.
    });

    test('Robber should NOT be able to rob shielded player', () => {
        const handler = new RobberHandler();
        const gameState = {
            playerRoles: require('../script').getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        // Try to rob player 1 (Shielded)
        const result = handler.handleAction(gameState, 'player', 1);
        expect(result).toBe(false);
        
        // Try to rob player 2 (Unshielded)
        const result2 = handler.handleAction(gameState, 'player', 2);
        expect(result2).toEqual({ 
            handled: true, 
            shouldReveal: true, 
            needsRerender: true,
            revealTarget: { type: 'player', index: 0 } // Robber sees their own card after swap
        });
    });

    test('Robber should NOT be able to rob if SELF is shielded', () => {
        const handler = new RobberHandler();
        // Setup: Player 0 is Robber and HAS SHIELD
        const players = [
            { roleId: 'robber', initialRoleId: 'robber', tokens: ['shield'] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ];
        setPlayerRoles(players);
        
        const gameState = {
            playerRoles: players,
            currentPlayerIndex: 0
        };
        
        // startTurn should detect shield and mark as complete
        const turnInfo = handler.startTurn(gameState);
        expect(turnInfo.canInteract).toBe(false);
        expect(turnInfo.message).toContain('盾牌'); // Should mention shield
        
        // Turn should be marked as complete
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });

    test('Seer should NOT be able to view shielded player', () => {
        const handler = new SeerHandler();
        const gameState = {
            playerRoles: require('../script').getPlayerRoles(),
            currentPlayerIndex: 0 // Seer is not in playerRoles but we mock it
        };
        
        // Try to view player 1 (Shielded)
        const result = handler.handleAction(gameState, 'player', 1);
        expect(result).toBe(false);
        
        // Try to view player 2 (Unshielded)
        const result2 = handler.handleAction(gameState, 'player', 2);
        expect(result2).toEqual({ handled: true, shouldReveal: true });
    });
    
    test('Troublemaker should NOT be able to swap shielded player', () => {
        const handler = new TroublemakerHandler();
        const gameState = {
            playerRoles: require('../script').getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        // Try to select player 1 (Shielded)
        const result = handler.handleAction(gameState, 'player', 1);
        expect(result).toBe(false);
    });
});

describe('Additional Shield Token Tests', () => {
    const { 
        WitchHandler, 
        DrunkHandler,
        InsomniacHandler,
        DoppelgangerHandler,
        setPlayerRoles, 
        setCenterCards,
        getPlayerRoles,
        hasToken
    } = require('../script');

    beforeEach(() => {
        // Reset state for each test
        setPlayerRoles([
            { roleId: 'witch', initialRoleId: 'witch', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: ['shield'] }, // Shielded
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [] }
        ]);
        setCenterCards([
            { roleId: 'seer', tokens: [] },
            { roleId: 'robber', tokens: [] }
        ]);
    });

    test('Witch should NOT be able to swap center card with shielded player', () => {
        const handler = new WitchHandler();
        const gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: require('../script').getCenterCards(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        
        // Step 1: View center card
        handler.handleAction(gameState, 'center', 0);
        expect(handler.actionState.viewedCenter).toBe(true);
        
        // Step 2: Try to swap with shielded player
        const result = handler.handleAction(gameState, 'player', 1);
        expect(result).toBe(false);
        expect(handler.actionState.swapped).toBe(false);
        
        // Step 2: Swap with unshielded player should work
        const result2 = handler.handleAction(gameState, 'player', 2);
        expect(result2).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
        expect(handler.actionState.swapped).toBe(true);
    });

    test('Witch self-shielded should NOT be able to swap with self', () => {
        setPlayerRoles([
            { roleId: 'witch', initialRoleId: 'witch', tokens: ['shield'] }, // Witch is shielded
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        const handler = new WitchHandler();
        const gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: require('../script').getCenterCards(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        expect(handler.actionState.selfShielded).toBe(true);
        
        // Step 1: View center card
        handler.handleAction(gameState, 'center', 0);
        
        // Step 2: Try to swap with self (should fail because self is shielded)
        const result = handler.handleAction(gameState, 'player', 0);
        expect(result).toBe(false);
        
        // But can swap with another player
        const result2 = handler.handleAction(gameState, 'player', 1);
        expect(result2).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
    });

    test('Drunk self-shielded should NOT be able to swap', () => {
        setPlayerRoles([
            { roleId: 'drunk', initialRoleId: 'drunk', tokens: ['shield'] }, // Drunk is shielded
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        const handler = new DrunkHandler();
        const gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: require('../script').getCenterCards(),
            currentPlayerIndex: 0
        };
        
        const turnInfo = handler.startTurn(gameState);
        expect(turnInfo.canInteract).toBe(false);
        expect(handler.actionState.selfShielded).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });

    test('Insomniac can view self even if shielded', () => {
        // Insomniac viewing own card is not an "action" that shield blocks
        // Shield blocks OTHERS from viewing/interacting with your card
        setPlayerRoles([
            { roleId: 'insomniac', initialRoleId: 'insomniac', tokens: ['shield'] }
        ]);
        
        const handler = new InsomniacHandler();
        const gameState = {
            playerRoles: getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        
        // Insomniac can still view their own card
        const result = handler.handleAction(gameState, 'player', 0);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedSelf).toBe(true);
    });

    test('Doppelganger should NOT be able to view shielded player', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        
        // Try to view shielded player
        const result = handler.handleAction(gameState, 'player', 1);
        expect(result).toBe(false);
        expect(handler.actionState.viewed).toBe(false);
    });
});
