const { 
    createCard, 
    setPlayerRoles, 
    setCenterCards,
    addToken,
    setCardInteractionState
} = require('../script');

// Mock global variables
global.players = [];
global.rolesData = [
    { id: 'werewolf', name: { 'en-US': 'Werewolf', 'zh-HK': '狼人' } },
    { id: 'villager', name: { 'en-US': 'Villager', 'zh-HK': '村民' } }
];
global.deck = [];
global.gamePhaseState = 'NIGHT';
global.roleImageMap = {};
global.currentNightRole = null;
global.nightActionState = {};

describe('UI Rendering', () => {
    beforeEach(() => {
        setPlayerRoles([
            { id: 1, roleId: 'werewolf', roles: { actual: 'werewolf' }, tokens: [], interactionState: {} }
        ]);
        setCenterCards([
            { roleId: 'villager', tokens: [], interactionState: {} }
        ]);
    });

    test('createCard should render tokens', () => {
        // Add tokens
        addToken({ type: 'player', index: 0 }, 'shield');
        addToken({ type: 'player', index: 0 }, 'mark');
        
        // Create card element
        const card = createCard('player', 0, 'Player 1');
        
        // Check for token container
        const container = card.querySelector('.token-container');
        expect(container).not.toBeNull();
        
        // Check for specific tokens
        const shield = container.querySelector('.token.shield');
        const mark = container.querySelector('.token.mark');
        
        expect(shield).not.toBeNull();
        expect(mark).not.toBeNull();
        expect(shield.innerText).toBe('🛡️');
    });

    test('createCard should render interaction states', () => {
        // Set interaction state
        setCardInteractionState({ type: 'player', index: 0 }, 'selectable', true);
        setCardInteractionState({ type: 'player', index: 0 }, 'highlighted', true);
        
        // Create card element
        const card = createCard('player', 0, 'Player 1');
        
        // Check classes
        expect(card.classList.contains('selectable')).toBe(true);
        expect(card.classList.contains('highlighted')).toBe(true);
        expect(card.classList.contains('locked')).toBe(false);
    });
    
    test('createCard should render selected state with checkmark', () => {
        setCardInteractionState({ type: 'player', index: 0 }, 'selected', true);
        
        const card = createCard('player', 0, 'Player 1');
        
        expect(card.classList.contains('selected')).toBe(true);
        // Note: The checkmark is a pseudo-element (::after), which is not part of the DOM tree 
        // and cannot be directly tested with jsdom/jest without computed styles, 
        // but checking the class is sufficient for logic verification.
    });
});
