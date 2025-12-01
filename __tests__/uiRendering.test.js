const { 
    createCard, 
    setPlayerRoles, 
    setCenterCards,
    addToken,
    setCardInteractionState,
    setGamePhaseState
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

describe('Token Visibility on Card Back vs Front', () => {
    beforeEach(() => {
        setPlayerRoles([
            { id: 1, roleId: 'pi', roles: { actual: 'pi' }, initialRoleId: 'pi', tokens: [], interactionState: {} }
        ]);
    });

    test('P.I. transformation token should NOT show on card back (unrevealed card)', () => {
        // Add P.I. transformation token
        addToken({ type: 'player', index: 0 }, 'pi-transformed-werewolf');
        
        // Create card element (unrevealed state)
        const card = createCard('player', 0, 'Player 1');
        
        // Token container should exist but have hidden-on-back class or similar
        const container = card.querySelector('.token-container');
        
        // For unrevealed cards, transformation tokens should be hidden
        // Either the container doesn't exist, or the specific token is hidden
        if (container) {
            const piToken = container.querySelector('.token.pi-transformed-werewolf');
            // P.I. token should either not exist or have hidden class
            // Actually, the solution should be: token container should be on card-face-back
            // so it only shows when card is flipped
            expect(container.closest('.card-face-back')).not.toBeNull();
        }
    });
    
    test('P.I. transformation token should show on card front (revealed card)', () => {
        addToken({ type: 'player', index: 0 }, 'pi-transformed-werewolf');
        
        const card = createCard('player', 0, 'Player 1');
        
        // After card is revealed (flipped), tokens on card-face-back become visible
        // The token container should be placed on the back face
        const faceBack = card.querySelector('.card-face-back');
        const container = faceBack.querySelector('.token-container');
        
        expect(container).not.toBeNull();
        
        const piToken = container.querySelector('.token.pi-transformed-werewolf');
        expect(piToken).not.toBeNull();
    });
    
    test('Shield token should still show on card back (visible before reveal)', () => {
        // Shield is a special case - it should be visible even on unrevealed cards
        // because players need to know a card is protected
        addToken({ type: 'player', index: 0 }, 'shield');
        
        const card = createCard('player', 0, 'Player 1');
        
        // Shield should be on the front face (card back design)
        const faceFront = card.querySelector('.card-face-front');
        const container = faceFront.querySelector('.token-container');
        
        expect(container).not.toBeNull();
        const shieldToken = container.querySelector('.token.shield');
        expect(shieldToken).not.toBeNull();
    });
});

describe('Doppelganger Token Visibility', () => {
    beforeEach(() => {
        setPlayerRoles([
            { id: 1, roleId: 'witch', roles: { actual: 'witch' }, initialRoleId: 'doppelganger', tokens: [], interactionState: {} }
        ]);
        setGamePhaseState('NIGHT'); // Default to NIGHT phase
    });

    test('Doppelganger token should NOT show during NIGHT phase', () => {
        setGamePhaseState('NIGHT');
        addToken({ type: 'player', index: 0 }, 'doppelganger-original');
        
        const card = createCard('player', 0, 'Player 1');
        
        // During NIGHT, doppelganger token should be hidden on both faces
        const faceFront = card.querySelector('.card-face-front');
        const faceBack = card.querySelector('.card-face-back');
        
        // Check front face - should NOT have doppelganger token
        const frontContainer = faceFront.querySelector('.token-container');
        if (frontContainer) {
            const doppelToken = frontContainer.querySelector('.token.doppelganger-original');
            expect(doppelToken).toBeNull();
        }
        
        // Check back face - should NOT have doppelganger token (only shows in REVEAL phase)
        const backContainer = faceBack.querySelector('.token-container');
        if (backContainer) {
            const doppelToken = backContainer.querySelector('.token.doppelganger-original');
            expect(doppelToken).toBeNull();
        }
    });

    test('Doppelganger token should show during REVEAL phase', () => {
        setGamePhaseState('REVEAL');
        addToken({ type: 'player', index: 0 }, 'doppelganger-original');
        
        const card = createCard('player', 0, 'Player 1');
        
        // During REVEAL, doppelganger token should be visible on back face
        const faceBack = card.querySelector('.card-face-back');
        const container = faceBack.querySelector('.token-container');
        
        expect(container).not.toBeNull();
        const doppelToken = container.querySelector('.token.doppelganger-original');
        expect(doppelToken).not.toBeNull();
        expect(doppelToken.innerText).toBe('🎭');
    });

    test('Seer viewing Doppelganger during NIGHT should NOT see the token', () => {
        setGamePhaseState('NIGHT');
        addToken({ type: 'player', index: 0 }, 'doppelganger-original');
        
        // Even when card is "revealed" during night (Seer action), token should be hidden
        const card = createCard('player', 0, 'Player 1');
        card.classList.add('revealed'); // Simulate Seer viewing the card
        
        // The doppelganger token should still be hidden
        const faceBack = card.querySelector('.card-face-back');
        const container = faceBack.querySelector('.token-container');
        
        if (container) {
            const doppelToken = container.querySelector('.token.doppelganger-original');
            expect(doppelToken).toBeNull();
        }
    });
});
