const { swapCards, setPlayerRoles, getPlayerRoles, setCenterCards, getCenterCards, addToken, hasToken } = require('../script');

// Mock global variables
global.players = [];
global.rolesData = [];
global.deck = [];
global.gamePhaseState = 'NIGHT';

describe('Card Swap System', () => {
    beforeEach(() => {
        // Setup Players
        setPlayerRoles([
            { id: 1, name: 'Player 1', seatIndex: 0, roles: { initial: 'werewolf', actual: 'werewolf', perceived: 'werewolf' }, roleHistory: [], tokens: [] },
            { id: 2, name: 'Player 2', seatIndex: 1, roles: { initial: 'seer', actual: 'seer', perceived: 'seer' }, roleHistory: [], tokens: [] },
            { id: 3, name: 'Player 3', seatIndex: 2, roles: { initial: 'villager', actual: 'villager', perceived: 'villager' }, roleHistory: [], tokens: [] }
        ]);
        
        // Setup Center Cards
        setCenterCards([
            { roleId: 'robber', revealed: false, tokens: [] },
            { roleId: 'troublemaker', revealed: false, tokens: [] },
            { roleId: 'mason', revealed: false, tokens: [] }
        ]);
    });

    test('swapCards should swap roles between two players', () => {
        // Swap Player 1 (Werewolf) and Player 2 (Seer)
        swapCards(
            { type: 'player', index: 0 },
            { type: 'player', index: 1 },
            { source: 'troublemaker' }
        );
        
        const players = getPlayerRoles();
        expect(players[0].roles.actual).toBe('seer');
        expect(players[1].roles.actual).toBe('werewolf');
        
        // Check History
        expect(players[0].roleHistory).toHaveLength(1);
        expect(players[0].roleHistory[0].event).toBe('swap');
        expect(players[0].roleHistory[0].from).toBe('werewolf');
        expect(players[0].roleHistory[0].to).toBe('seer');
        
        expect(players[1].roleHistory).toHaveLength(1);
        expect(players[1].roleHistory[0].event).toBe('swap');
    });

    test('swapCards should swap player with center card', () => {
        // Swap Player 3 (Villager) with Center 0 (Robber)
        swapCards(
            { type: 'player', index: 2 },
            { type: 'center', index: 0 },
            { source: 'drunk' }
        );
        
        const players = getPlayerRoles();
        const center = getCenterCards();
        
        expect(players[2].roles.actual).toBe('robber');
        expect(center[0].roleId).toBe('villager');
        
        // Check History
        expect(players[2].roleHistory).toHaveLength(1);
        expect(players[2].roleHistory[0].to).toBe('robber');
    });
    
    test('swapCards should swap two center cards', () => {
        // Swap Center 1 (Troublemaker) with Center 2 (Mason)
        swapCards(
            { type: 'center', index: 1 },
            { type: 'center', index: 2 },
            { source: 'admin' }
        );
        
        const center = getCenterCards();
        expect(center[1].roleId).toBe('mason');
        expect(center[2].roleId).toBe('troublemaker');
    });
    
    test('swapCards should handle invalid indices gracefully', () => {
        // Should not throw
        swapCards(
            { type: 'player', index: 99 },
            { type: 'player', index: 0 }
        );
        
        const players = getPlayerRoles();
        expect(players[0].roles.actual).toBe('werewolf'); // Unchanged
    });
    
    test('swapCards should swap tokens along with roles', () => {
        // Player 1 has a transformation token (like P.I.)
        addToken({ type: 'player', index: 0 }, 'pi-transformed-werewolf');
        
        // Swap Player 1 and Player 2
        swapCards(
            { type: 'player', index: 0 },
            { type: 'player', index: 1 },
            { source: 'troublemaker' }
        );
        
        const players = getPlayerRoles();
        
        // Token should move from Player 1 to Player 2
        expect(hasToken({ type: 'player', index: 0 }, 'pi-transformed-werewolf')).toBe(false);
        expect(hasToken({ type: 'player', index: 1 }, 'pi-transformed-werewolf')).toBe(true);
    });
    
    test('swapCards should swap tokens between player and center', () => {
        // Player 3 has a doppelganger token
        addToken({ type: 'player', index: 2 }, 'doppelganger-original');
        
        // Swap Player 3 with Center 0
        swapCards(
            { type: 'player', index: 2 },
            { type: 'center', index: 0 },
            { source: 'drunk' }
        );
        
        const players = getPlayerRoles();
        const center = getCenterCards();
        
        // Token should move to center
        expect(hasToken({ type: 'player', index: 2 }, 'doppelganger-original')).toBe(false);
        expect(hasToken({ type: 'center', index: 0 }, 'doppelganger-original')).toBe(true);
    });
    
    test('swapCards should handle both cards having tokens', () => {
        // Player 1 has shield, Player 2 has pi-transformed token
        addToken({ type: 'player', index: 0 }, 'shield');
        addToken({ type: 'player', index: 1 }, 'pi-transformed-minion');
        
        // Swap them
        swapCards(
            { type: 'player', index: 0 },
            { type: 'player', index: 1 },
            { source: 'troublemaker' }
        );
        
        // Tokens should swap
        expect(hasToken({ type: 'player', index: 0 }, 'shield')).toBe(false);
        expect(hasToken({ type: 'player', index: 0 }, 'pi-transformed-minion')).toBe(true);
        expect(hasToken({ type: 'player', index: 1 }, 'shield')).toBe(true);
        expect(hasToken({ type: 'player', index: 1 }, 'pi-transformed-minion')).toBe(false);
    });
});
