const { 
    addToken, removeToken, hasToken, 
    setCardInteractionState, getCardInteractionState,
    setPlayerRoles, getPlayerRoles, setCenterCards, getCenterCards 
} = require('../script');

// Mock global variables
global.players = [];
global.rolesData = [];
global.deck = [];
global.gamePhaseState = 'NIGHT';

describe('Token System', () => {
    beforeEach(() => {
        setPlayerRoles([
            { id: 1, roles: { actual: 'villager' }, tokens: [] },
            { id: 2, roles: { actual: 'seer' }, tokens: [] }
        ]);
        setCenterCards([
            { roleId: 'robber', tokens: [] },
            { roleId: 'troublemaker', tokens: [] }
        ]);
    });

    test('addToken should add a token to a player', () => {
        addToken({ type: 'player', index: 0 }, 'shield');
        const player = getPlayerRoles()[0];
        expect(player.tokens).toContain('shield');
        expect(hasToken({ type: 'player', index: 0 }, 'shield')).toBe(true);
    });

    test('addToken should add a token to a center card', () => {
        addToken({ type: 'center', index: 1 }, 'mark');
        const card = getCenterCards()[1];
        expect(card.tokens).toContain('mark');
        expect(hasToken({ type: 'center', index: 1 }, 'mark')).toBe(true);
    });

    test('removeToken should remove a token', () => {
        addToken({ type: 'player', index: 0 }, 'shield');
        removeToken({ type: 'player', index: 0 }, 'shield');
        expect(hasToken({ type: 'player', index: 0 }, 'shield')).toBe(false);
    });

    test('addToken should not add duplicate tokens if unique is true', () => {
        addToken({ type: 'player', index: 0 }, 'shield');
        addToken({ type: 'player', index: 0 }, 'shield');
        const player = getPlayerRoles()[0];
        // Assuming tokens are unique by default or we handle it
        // Let's assume tokens are unique sets for now
        expect(player.tokens.filter(t => t === 'shield')).toHaveLength(1);
    });
});

describe('Interaction State System', () => {
    beforeEach(() => {
        // Reset interaction states (mock implementation needed in script.js)
        setPlayerRoles([
            { id: 1, roles: { actual: 'villager' }, interactionState: {} }
        ]);
    });

    test('setCardInteractionState should update state', () => {
        setCardInteractionState({ type: 'player', index: 0 }, 'selectable', true);
        const state = getCardInteractionState({ type: 'player', index: 0 });
        expect(state.selectable).toBe(true);
    });
    
    test('setCardInteractionState should toggle state', () => {
        setCardInteractionState({ type: 'player', index: 0 }, 'selected', true);
        expect(getCardInteractionState({ type: 'player', index: 0 }).selected).toBe(true);
        
        setCardInteractionState({ type: 'player', index: 0 }, 'selected', false);
        expect(getCardInteractionState({ type: 'player', index: 0 }).selected).toBe(false);
    });
});
