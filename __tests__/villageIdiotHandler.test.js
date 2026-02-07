const { 
    VillageIdiotHandler, 
    setPlayerRoles, 
    getPlayerRoles,
    setCenterCards,
    updatePlayerRole,
    swapCards
} = require('../script.js');

// Mock global objects and methods expected by script.js
global.currentLang = 'en-US';
global.i18n = {
    'en-US': {
        roleAction: {
            villageidiot: "Village Idiot, shift all cards left or right."
        }
    }
};

describe('Village Idiot Handler', () => {
    let handler;
    let mockPlayers;

    beforeEach(() => {
        handler = new VillageIdiotHandler();
        
        // Setup 3 players for testing shift
        // Player 0: Villager
        // Player 1: Werewolf
        // Player 2: Seer
        mockPlayers = [
            { id: 0, name: 'Player 0', roles: { actual: 'villager', initial: 'villager' }, initialRoleId: 'villager' },
            { id: 1, name: 'Player 1', roles: { actual: 'werewolf', initial: 'werewolf' }, initialRoleId: 'werewolf' },
            { id: 2, name: 'Player 2', roles: { actual: 'seer', initial: 'seer' }, initialRoleId: 'seer' }
        ];
        
        // Setup playerRoles global
        setPlayerRoles(mockPlayers);
    });

    test('should initialize with correct role ID', () => {
        expect(handler.roleId).toBe('villageidiot');
    });

    test('should handle shift right (move +1) skipping self and shielded', () => {
        // Setup 4 players
        // Player 0: Village Idiot (Self - Skipped)
        // Player 1: Villager
        // Player 2: Seer (Shielded - Skipped)
        // Player 3: Werewolf
        
        mockPlayers = [
            { id: 0, name: 'Player 0', roles: { actual: 'villageidiot', initial: 'villageidiot' }, initialRoleId: 'villageidiot' },
            { id: 1, name: 'Player 1', roles: { actual: 'villager', initial: 'villager' }, initialRoleId: 'villager' },
            { id: 2, name: 'Player 2', roles: { actual: 'seer', initial: 'seer' }, initialRoleId: 'seer', tokens: ['shield'] },
            { id: 3, name: 'Player 3', roles: { actual: 'werewolf', initial: 'werewolf' }, initialRoleId: 'werewolf' }
        ];
        setPlayerRoles(mockPlayers);

        // Movable Group: [Player 1 (Villager), Player 3 (Werewolf)]
        // Shift Right: 
        // 1 receives from 3 (Werewolf)
        // 3 receives from 1 (Villager)
        // Result: 1->Werewolf, 3->Villager.
        // 0 stays Idiot. 2 stays Seer.
        
        const result = handler.handleAction({ 
            currentPlayerIndex: 0,
            playerRoles: getPlayerRoles()
        }, 'ui', 'shift_right');
        
        expect(result.handled).toBe(true);
        expect(result.forceRefresh).toBe(true);
        
        const updatedRoles = getPlayerRoles();
        expect(updatedRoles[0].roles.actual).toBe('villageidiot'); // Self skipped
        expect(updatedRoles[2].roles.actual).toBe('seer');         // Shielded skipped
        expect(updatedRoles[1].roles.actual).toBe('werewolf');     // 1 got from 3
        expect(updatedRoles[3].roles.actual).toBe('villager');     // 3 got from 1
    });

    test('should handle shift left (move -1) skipping self', () => {
        // Setup 3 players
        // Player 0: Village Idiot
        // Player 1: Villager
        // Player 2: Werewolf
        
        mockPlayers = [
            { id: 0, name: 'Player 0', roles: { actual: 'villageidiot', initial: 'villageidiot' }, initialRoleId: 'villageidiot' },
            { id: 1, name: 'Player 1', roles: { actual: 'villager', initial: 'villager' }, initialRoleId: 'villager' },
            { id: 2, name: 'Player 2', roles: { actual: 'werewolf', initial: 'werewolf' }, initialRoleId: 'werewolf' }
        ];
        setPlayerRoles(mockPlayers);
        
        // Movable: [1, 2]
        // Left Shift on [1, 2]:
        // 1 receives from 2 (Werewolf)
        // 2 receives from 1 (Villager)
        
        const result = handler.handleAction({ 
            currentPlayerIndex: 0,
            playerRoles: getPlayerRoles()
        }, 'ui', 'shift_left');
        
        expect(result.handled).toBe(true);
        
        const updatedRoles = getPlayerRoles();
        expect(updatedRoles[0].roles.actual).toBe('villageidiot');
        expect(updatedRoles[1].roles.actual).toBe('werewolf');
        expect(updatedRoles[2].roles.actual).toBe('villager');
    });
    
    test('should only allow shifting once', () => {
        handler.handleAction({ 
            currentPlayerIndex: 0,
            playerRoles: getPlayerRoles()
        }, 'ui', 'shift_right');
        expect(handler.isTurnComplete()).toBe(true);
        
        const result = handler.handleAction({ 
            currentPlayerIndex: 0,
            playerRoles: getPlayerRoles()
        }, 'ui', 'shift_left');
        expect(result).toBe(false);
    });
});
