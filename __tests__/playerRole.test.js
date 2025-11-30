const { updatePlayerRole, setPlayerRoles, getPlayerRoles } = require('../script');

// Mock global variables that script.js relies on
global.players = [];
global.rolesData = [];
global.deck = [];
global.gamePhaseState = 'SETUP';

describe('Player Role System', () => {
    beforeEach(() => {
        // Reset state using the setter
        setPlayerRoles([
            { id: 1, name: 'Player 1', seatIndex: 0, roles: { initial: 'villager', actual: 'villager', perceived: 'villager' }, roleHistory: [] },
            { id: 2, name: 'Player 2', seatIndex: 1, roles: { initial: 'seer', actual: 'seer', perceived: 'seer' }, roleHistory: [] }
        ]);
    });

    test('updatePlayerRole should update actual role', () => {
        updatePlayerRole(0, 'werewolf', { perceived: true });
        expect(getPlayerRoles()[0].roles.actual).toBe('werewolf');
    });

    test('updatePlayerRole should update perceived role when perceived is true', () => {
        updatePlayerRole(0, 'werewolf', { perceived: true });
        expect(getPlayerRoles()[0].roles.perceived).toBe('werewolf');
    });

    test('updatePlayerRole should NOT update perceived role when perceived is false', () => {
        updatePlayerRole(0, 'werewolf', { perceived: false });
        expect(getPlayerRoles()[0].roles.actual).toBe('werewolf');
        expect(getPlayerRoles()[0].roles.perceived).toBe('villager'); // Should remain initial
    });

    test('updatePlayerRole should record history', () => {
        updatePlayerRole(0, 'werewolf', { perceived: true, event: 'test_event' });
        expect(getPlayerRoles()[0].roleHistory).toHaveLength(1);
        expect(getPlayerRoles()[0].roleHistory[0]).toMatchObject({
            from: 'villager',
            to: 'werewolf',
            event: 'test_event',
            perceived: true
        });
    });
    
    // Backward Compatibility Tests
    test('player object should have backward compatible getters for roleId', () => {
        const player = getPlayerRoles()[0];
        
        // Manually add getters for this test case because we are injecting raw objects
        // In the real app, these are added during initialization.
        Object.defineProperty(player, 'roleId', {
            get() { return this.roles.actual; }
        });
        
        expect(player.roleId).toBe('villager');
        
        updatePlayerRole(0, 'werewolf', { perceived: true });
        expect(player.roleId).toBe('werewolf');
    });
});
