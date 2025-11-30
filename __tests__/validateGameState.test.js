const { validateGameState, setPlayerRoles, setCenterCards } = require('../script');

// Mock global variables
global.players = [];
global.rolesData = [
    { id: 'werewolf', name: { 'en-US': 'Werewolf' } },
    { id: 'villager', name: { 'en-US': 'Villager' } },
    { id: 'seer', name: { 'en-US': 'Seer' } },
    { id: 'robber', name: { 'en-US': 'Robber' } },
    { id: 'troublemaker', name: { 'en-US': 'Troublemaker' } }
];
global.deck = [];
global.gamePhaseState = 'NIGHT';

describe('Game State Validation', () => {
    test('validateGameState should return true for valid state', () => {
        setPlayerRoles([
            { id: 1, roles: { actual: 'werewolf' } },
            { id: 2, roles: { actual: 'villager' } },
            { id: 3, roles: { actual: 'seer' } }
        ]);
        setCenterCards([
            { roleId: 'robber' },
            { roleId: 'troublemaker' },
            { roleId: 'villager' }
        ]);
        
        const result = validateGameState();
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('validateGameState should detect missing roles', () => {
        setPlayerRoles([
            { id: 1, roles: { actual: null } }, // Missing role
            { id: 2, roles: { actual: 'villager' } }
        ]);
        setCenterCards([
            { roleId: 'robber' },
            { roleId: 'troublemaker' },
            { roleId: 'villager' }
        ]);
        
        const result = validateGameState();
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toMatch(/Player \d+ has no role/);
    });

    // Note: Duplicate roles are actually allowed in some setups (e.g. 2 Werewolves, 2 Masons, 2 Villagers)
    // So we shouldn't validate uniqueness unless we know the deck composition.
    // For now, we'll just validate that every player and center card has a valid role ID that exists in rolesData.
    
    test('validateGameState should detect invalid role IDs', () => {
        setPlayerRoles([
            { id: 1, roles: { actual: 'superman' } } // Invalid role
        ]);
        setCenterCards([
            { roleId: 'robber' },
            { roleId: 'troublemaker' },
            { roleId: 'villager' }
        ]);
        
        const result = validateGameState();
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toMatch(/Invalid role ID: superman/);
    });
});
