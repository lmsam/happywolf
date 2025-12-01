

describe('RoleHandler Base Class', () => {
    let handler;
    const mockGameState = {};

    beforeEach(() => {
        handler = new RoleHandler('test-role');
    });

    test('should initialize with roleId', () => {
        expect(handler.roleId).toBe('test-role');
    });

    test('startTurn should return default instructions', () => {
        const result = handler.startTurn(mockGameState);
        expect(result).toEqual({
            message: 'Role test-role turn started',
            canInteract: false
        });
    });

    test('handleAction should return false by default', () => {
        const result = handler.handleAction(mockGameState, 'player', 0);
        expect(result).toBe(false);
    });

    test('isTurnComplete should return true by default', () => {
        expect(handler.isTurnComplete(mockGameState)).toBe(true);
    });
});

describe('Handler State Reset', () => {
    // Test that calling startTurn resets actionState for all handlers
    
    test('SeerHandler should reset actionState on startTurn', () => {
        const { SeerHandler } = require('../script');
        const handler = new SeerHandler();
        
        // Simulate a completed turn
        handler.actionState.viewedCount = 2;
        handler.actionState.viewedType = 'center';
        
        // Call startTurn again (new game or repeated role)
        handler.startTurn({});
        
        // actionState should be reset
        expect(handler.actionState.viewedCount).toBe(0);
        expect(handler.actionState.viewedType).toBe(null);
    });
    
    test('RobberHandler should reset actionState on startTurn', () => {
        const { RobberHandler, setPlayerRoles, getPlayerRoles, hasToken } = require('../script');
        const handler = new RobberHandler();
        
        // Setup unshielded player (reset global state with explicit empty tokens)
        setPlayerRoles([
            { roleId: 'robber', initialRoleId: 'robber', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        // Verify player 0 has no shield
        expect(getPlayerRoles()[0].tokens).toEqual([]);
        expect(hasToken({type: 'player', index: 0}, 'shield')).toBe(false);
        
        // Simulate a completed turn
        handler.actionState.step = 'complete';
        handler.actionState.targetIndex = 2;
        handler.actionState.selfShielded = false;
        
        // Call startTurn again (player is NOT shielded)
        const result = handler.startTurn({ currentPlayerIndex: 0 });
        
        // actionState should be reset (and player is not shielded so step stays 'select')
        expect(handler.actionState.step).toBe('select');
        expect(handler.actionState.targetIndex).toBe(-1);
        expect(handler.actionState.selfShielded).toBe(false);
    });
    
    test('TroublemakerHandler should reset actionState on startTurn', () => {
        const { TroublemakerHandler } = require('../script');
        const handler = new TroublemakerHandler();
        
        // Simulate a completed turn
        handler.actionState.selection = [{type: 'player', index: 0}, {type: 'player', index: 1}];
        handler.actionState.swapped = true;
        
        // Call startTurn again
        handler.startTurn({});
        
        // actionState should be reset
        expect(handler.actionState.selection).toEqual([]);
        expect(handler.actionState.swapped).toBe(false);
    });
    
    test('DoppelgangerHandler should reset actionState on startTurn', () => {
        const { DoppelgangerHandler } = require('../script');
        const handler = new DoppelgangerHandler();
        
        // Simulate a completed turn
        handler.actionState.viewed = true;
        handler.actionState.mimicId = 'seer';
        handler.actionState.subHandler = { some: 'handler' };
        
        // Call startTurn again
        handler.startTurn({});
        
        // actionState should be reset
        expect(handler.actionState.viewed).toBe(false);
        expect(handler.actionState.mimicId).toBe(null);
        expect(handler.actionState.subHandler).toBe(null);
    });
});

// Mock global variables expected by script.js
global.i18n = {
    'en-US': {
        roleAction: {
            apprenticeseer: "Apprentice Seer, view one center card.",
            witch: "Witch, view a center card then swap it with any player.",
            troublemaker: "Troublemaker, swap two players.",
            drunk: "Drunk, swap your card with a center card."
        }
    }
};
global.currentLang = 'en-US';

const { 
    RoleHandler, 
    SeerHandler, 
    RobberHandler, 
    WerewolfHandler,
    ApprenticeSeerHandler,
    WitchHandler,
    TroublemakerHandler,
    DrunkHandler
} = require('../script');

describe('SeerHandler', () => {
    let handler;
    const mockGameState = {};

    beforeEach(() => {
        handler = new SeerHandler();
    });

    test('should allow viewing 1 player card', () => {
        const result = handler.handleAction(mockGameState, 'player', 1);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCount).toBe(1);
        expect(handler.actionState.viewedType).toBe('player');
        expect(handler.isTurnComplete(mockGameState)).toBe(true);
    });

    test('should allow viewing 2 center cards', () => {
        let result = handler.handleAction(mockGameState, 'center', 0);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCount).toBe(1);
        expect(handler.isTurnComplete(mockGameState)).toBe(false);
        
        result = handler.handleAction(mockGameState, 'center', 1);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCount).toBe(2);
        expect(handler.isTurnComplete(mockGameState)).toBe(true);
    });
    
    test('should not allow viewing player after center', () => {
        handler.handleAction(mockGameState, 'center', 0);
        expect(handler.handleAction(mockGameState, 'player', 1)).toBe(false);
    });
});

describe('RobberHandler', () => {
    let handler;
    let mockGameState;

    beforeEach(() => {
        handler = new RobberHandler();
        mockGameState = {
            playerRoles: [
                { roleId: 'robber' },
                { roleId: 'villager' }
            ],
            currentPlayerIndex: 0
        };
    });

    test('should allow selecting a player', () => {
        const result = handler.handleAction(mockGameState, 'player', 1);
        expect(result).toEqual({ 
            handled: true, 
            shouldReveal: true, 
            needsRerender: true,
            revealTarget: { type: 'player', index: 0 } // Robber sees their own card after swap
        });
        expect(handler.actionState.targetIndex).toBe(1);
        expect(handler.actionState.step).toBe('complete');
        // Verify Swap
        expect(mockGameState.playerRoles[0].roleId).toBe('villager');
        expect(mockGameState.playerRoles[1].roleId).toBe('robber');
    });
    
    test('should not allow selecting center card', () => {
        expect(handler.handleAction(mockGameState, 'center', 0)).toBe(false);
    });
    
    test('should swap tokens along with roles', () => {
        // Setup: Player 1 (P.I.) has pi-transformed-werewolf token
        mockGameState.playerRoles = [
            { roleId: 'robber', tokens: [] },
            { roleId: 'pi', tokens: ['pi-transformed-werewolf'] }
        ];
        mockGameState.currentPlayerIndex = 0;
        
        handler.startTurn(mockGameState);
        handler.handleAction(mockGameState, 'player', 1);
        
        // After swap:
        // - Player 0 (Robber) should now have P.I. role AND the token
        // - Player 1 should have Robber role and no tokens
        expect(mockGameState.playerRoles[0].roleId).toBe('pi');
        expect(mockGameState.playerRoles[0].tokens).toContain('pi-transformed-werewolf');
        expect(mockGameState.playerRoles[1].roleId).toBe('robber');
        expect(mockGameState.playerRoles[1].tokens).toEqual([]);
    });
});



describe('WerewolfHandler', () => {
    let handler;
    let mockGameState;

    beforeEach(() => {
        handler = new WerewolfHandler();
        mockGameState = {
            playerRoles: []
        };
    });

    test('should identify as Lone Wolf if only 1 werewolf', () => {
        mockGameState.playerRoles = [
            { initialRoleId: 'werewolf' },
            { initialRoleId: 'villager' }
        ];
        
        const result = handler.startTurn(mockGameState);
        expect(handler.actionState.isLoneWolf).toBe(true);
        expect(result.canInteract).toBe(true);
    });

    test('should NOT identify as Lone Wolf if multiple werewolves', () => {
        mockGameState.playerRoles = [
            { initialRoleId: 'werewolf' },
            { initialRoleId: 'werewolf' }
        ];
        
        const result = handler.startTurn(mockGameState);
        expect(handler.actionState.isLoneWolf).toBe(false);
        expect(result.canInteract).toBe(false);
    });
    
    test('Lone Wolf should be able to view 1 center card', () => {
        mockGameState.playerRoles = [
            { initialRoleId: 'werewolf' }
        ];
        handler.startTurn(mockGameState);
        
        const result = handler.handleAction(mockGameState, 'center', 0);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCenter).toBe(true);
        expect(handler.isTurnComplete(mockGameState)).toBe(true);
    });
    
    test('Pack Wolf should NOT be able to view center card', () => {
        const handler = new WerewolfHandler();
        const gameState = {
            playerRoles: [
                { initialRoleId: 'werewolf' },
                { initialRoleId: 'werewolf' },
                { initialRoleId: 'villager' }
            ]
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'center', 0);
        
        // Pack wolves return handled but don't reveal - suppresses warning
        expect(result).toEqual({ handled: true, shouldReveal: false });
        expect(handler.actionState.viewedCenter).toBe(false);
    });
    
    test('should recognize Mystic Wolf as fellow wolf (not lone wolf)', () => {
        const handler = new WerewolfHandler();
        const gameState = {
            playerRoles: [
                { initialRoleId: 'werewolf' },
                { initialRoleId: 'mysticwolf' },
                { initialRoleId: 'villager' }
            ]
        };
        
        const result = handler.startTurn(gameState);
        expect(handler.actionState.isLoneWolf).toBe(false);
        expect(result.canInteract).toBe(false);
    });
    
    test('should recognize Dream Wolf as fellow wolf (not lone wolf)', () => {
        const handler = new WerewolfHandler();
        const gameState = {
            playerRoles: [
                { initialRoleId: 'werewolf' },
                { initialRoleId: 'dreamwolf' },
                { initialRoleId: 'villager' }
            ]
        };
        
        const result = handler.startTurn(gameState);
        expect(handler.actionState.isLoneWolf).toBe(false);
        expect(result.canInteract).toBe(false);
    });
    
    test('Mystic Wolf should be recognized as lone wolf when alone', () => {
        const handler = new WerewolfHandler();
        // Test: only mysticwolf in game = lone wolf from mysticwolf's POV
        // Uses initialRoleId because players act based on their ORIGINAL role
        const gameState = {
            playerRoles: [
                { initialRoleId: 'mysticwolf' },
                { initialRoleId: 'villager' },
                { initialRoleId: 'seer' }
            ]
        };
        
        const result = handler.startTurn(gameState);
        // Only 1 wolf team member (mysticwolf), so isLoneWolf = true
        expect(handler.actionState.isLoneWolf).toBe(true);
        expect(result.canInteract).toBe(true);
    });
});

describe('ApprenticeSeerHandler', () => {


    test('should allow viewing 1 center card', () => {
        const handler = new ApprenticeSeerHandler();
        const gameState = {};
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'center', 0);
        
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCenter).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });

    test('should NOT allow viewing player card', () => {
        const handler = new ApprenticeSeerHandler();
        const gameState = {};
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 0);
        
        expect(result).toBe(false);
        expect(handler.actionState.viewedCenter).toBe(false);
    });
});

describe('WitchHandler', () => {


    test('should view center card first', () => {
        const handler = new WitchHandler();
        const gameState = {};
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'center', 0);
        
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedCenter).toBe(true);
        expect(handler.actionState.centerIndex).toBe(0);
        expect(handler.isTurnComplete(gameState)).toBe(false); // Not done yet
    });

    test('should swap viewed center card with player', () => {
        const handler = new WitchHandler();
        const gameState = {
            centerCards: [{ roleId: 'villager' }],
            playerRoles: [{ roleId: 'werewolf' }]
        };
        
        handler.startTurn(gameState);
        
        // Step 1: View Center
        handler.handleAction(gameState, 'center', 0);
        
        // Step 2: Swap with Player
        const result = handler.handleAction(gameState, 'player', 0);
        
        expect(result).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
        expect(handler.actionState.swapped).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify Swap
        expect(gameState.centerCards[0].roleId).toBe('werewolf');
        expect(gameState.playerRoles[0].roleId).toBe('villager');
    });

    test('should NOT allow swapping before viewing center', () => {
        const handler = new WitchHandler();
        const gameState = {};
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 0);
        
        expect(result).toBe(false);
    });
});

describe('TroublemakerHandler', () => {


    test('should allow selecting two players to swap', () => {
        const handler = new TroublemakerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'villager' },
                { roleId: 'werewolf' },
                { roleId: 'seer' }
            ]
        };
        
        handler.startTurn(gameState);
        
        // Select first player
        let result = handler.handleAction(gameState, 'player', 0);
        expect(result).toEqual({ handled: true, shouldReveal: false });
        expect(handler.actionState.selection.length).toBe(1);
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // Select second player
        result = handler.handleAction(gameState, 'player', 1);
        expect(result).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
        expect(handler.actionState.selection.length).toBe(2);
        expect(handler.actionState.swapped).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify Swap
        expect(gameState.playerRoles[0].roleId).toBe('werewolf');
        expect(gameState.playerRoles[1].roleId).toBe('villager');
    });

    test('should NOT allow selecting same player twice', () => {
        const handler = new TroublemakerHandler();
        const gameState = { playerRoles: [{}, {}] };
        
        handler.startTurn(gameState);
        
        handler.handleAction(gameState, 'player', 0);
        const result = handler.handleAction(gameState, 'player', 0);
        
        expect(result).toBe(false);
        expect(handler.actionState.selection.length).toBe(1);
    });
});

describe('DrunkHandler', () => {

    test('should swap self with center card', () => {
        const handler = new DrunkHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'drunk', initialRoleId: 'drunk' },
                { roleId: 'villager' }
            ],
            centerCards: [
                { roleId: 'werewolf' }
            ],
            currentPlayerIndex: 0 // Drunk is at index 0
        };
        
        handler.startTurn(gameState);
        
        const result = handler.handleAction(gameState, 'center', 0);
        
        // DrunkHandler returns object with shouldReveal: false (Drunk doesn't see new card)
        expect(result).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
        expect(handler.actionState.swapped).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify Swap
        expect(gameState.playerRoles[0].roleId).toBe('werewolf');
        expect(gameState.centerCards[0].roleId).toBe('drunk');
    });

    test('should NOT view the new card (Drunk rule)', () => {
        const handler = new DrunkHandler();
        const gameState = {
            playerRoles: [{ roleId: 'drunk', initialRoleId: 'drunk' }],
            centerCards: [{ roleId: 'werewolf' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'center', 0);
        
        // Drunk returns shouldReveal: false to prevent revealing the new card
        expect(result.shouldReveal).toBe(false);
        expect(handler.actionState.swapped).toBe(true);
    });
});

describe('InsomniacHandler', () => {
    const { InsomniacHandler } = require('../script');

    test('should view own card', () => {
        const handler = new InsomniacHandler();
        const gameState = {
            playerRoles: [{ roleId: 'insomniac', initialRoleId: 'insomniac' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 0);
        
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedSelf).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });

    test('should NOT view other players', () => {
        const handler = new InsomniacHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'insomniac', initialRoleId: 'insomniac' },
                { roleId: 'villager' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 1);
        
        expect(result).toBe(false);
    });
    
    test('should work even if startTurn was not called (early click)', () => {
        // This simulates the case where a player clicks before speech finishes
        // The handler's constructor initializes actionState, so handleAction should still work
        const handler = new InsomniacHandler();
        const gameState = {
            playerRoles: [{ roleId: 'insomniac', initialRoleId: 'insomniac' }],
            currentPlayerIndex: 0
        };
        
        // NOTE: startTurn() is NOT called here - simulating early click
        const result = handler.handleAction(gameState, 'player', 0);
        
        // Should still work because actionState is initialized in constructor
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.actionState.viewedSelf).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('FIXED: should work on early click because startTurn is called before speech', () => {
        // Original bug scenario:
        // 1. Handler is singleton - reused across turns
        // 2. Previous turn set viewedSelf = true
        // 3. New turn starts, speech begins
        // 4. Player clicks before speech ends (before startTurn WAS called)
        // 5. handleAction checks viewedSelf which is still true from previous turn
        // 6. Returns false - card doesn't flip!
        //
        // FIX: startTurn() is now called BEFORE speech starts in nextStep()
        // So the handler state is always reset before any interaction can happen
        
        const handler = new InsomniacHandler();
        const gameState = {
            playerRoles: [{ roleId: 'insomniac', initialRoleId: 'insomniac' }],
            currentPlayerIndex: 0
        };
        
        // Simulate previous turn completed
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 0);
        expect(handler.actionState.viewedSelf).toBe(true);
        
        // Now a new turn starts
        // With the fix, startTurn is called BEFORE speech, so state is reset
        gameState.currentPlayerIndex = 1;
        gameState.playerRoles = [
            { roleId: 'insomniac', initialRoleId: 'insomniac' },
            { roleId: 'doppelganger', initialRoleId: 'doppelganger' }
        ];
        
        // This simulates what happens in the fixed code:
        // startTurn is called before speech starts
        handler.startTurn(gameState);
        
        // Now player clicks (even during speech) - this should work!
        const result = handler.handleAction(gameState, 'player', 1);
        
        expect(result).toEqual({ handled: true, shouldReveal: true });
    });
});

describe('DoppelgangerHandler', () => {
    const { DoppelgangerHandler } = require('../script');

    test('should view a player card and become that role', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'seer', initialRoleId: 'seer' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 1);
        
        // Result includes nextMessage for interactive roles
        expect(result.handled).toBe(true);
        expect(result.shouldReveal).toBe(true);
        expect(result.nextMessage).toBeDefined(); // Seer is interactive, so nextMessage exists
        expect(handler.actionState.viewed).toBe(true);
        expect(handler.actionState.mimicId).toBe('seer');
        
        // Verify Role Change
        expect(gameState.playerRoles[0].roleId).toBe('seer');
        expect(gameState.playerRoles[0].mimickedRole).toBe('seer');
    });

    test('should delegate action if mimicking an interactive role', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'robber', initialRoleId: 'robber' }, // Target is Robber
                { roleId: 'villager', initialRoleId: 'villager' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        
        // Step 1: View Robber
        handler.handleAction(gameState, 'player', 1);
        expect(handler.actionState.mimicId).toBe('robber');
        
        // Step 2: Perform Robber Action (Swap with Villager)
        const result = handler.handleAction(gameState, 'player', 2);
        expect(result).toEqual({ 
            handled: true, 
            shouldReveal: true, 
            needsRerender: true,
            revealTarget: { type: 'player', index: 0 } // Robber sees their own card after swap
        });
        
        // Verify Swap (Robber Logic)
        expect(gameState.playerRoles[0].roleId).toBe('villager');
        expect(gameState.playerRoles[2].roleId).toBe('robber');
    });
    
    test('should delegate Seer action (view player card)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'seer', initialRoleId: 'seer' },
                { roleId: 'villager', initialRoleId: 'villager' }
            ],
            centerCards: [{ roleId: 'werewolf' }, { roleId: 'robber' }, { roleId: 'tanner' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Seer
        
        // Now act as Seer - view a player card
        const result = handler.handleAction(gameState, 'player', 2);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should delegate Seer action (view 2 center cards)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'seer', initialRoleId: 'seer' }
            ],
            centerCards: [{ roleId: 'werewolf' }, { roleId: 'robber' }, { roleId: 'tanner' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Seer
        
        // View first center card
        handler.handleAction(gameState, 'center', 0);
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // View second center card
        const result = handler.handleAction(gameState, 'center', 1);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should delegate Apprentice Seer action (view 1 center card)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'apprenticeseer', initialRoleId: 'apprenticeseer' }
            ],
            centerCards: [{ roleId: 'werewolf' }, { roleId: 'robber' }, { roleId: 'tanner' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Apprentice Seer
        
        const result = handler.handleAction(gameState, 'center', 0);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should delegate Troublemaker action (swap 2 players)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'troublemaker', initialRoleId: 'troublemaker' },
                { roleId: 'villager', initialRoleId: 'villager' },
                { roleId: 'werewolf', initialRoleId: 'werewolf' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Troublemaker
        
        // Swap player 2 and 3
        handler.handleAction(gameState, 'player', 2);
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        handler.handleAction(gameState, 'player', 3);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify swap
        expect(gameState.playerRoles[2].roleId).toBe('werewolf');
        expect(gameState.playerRoles[3].roleId).toBe('villager');
    });
    
    test('should delegate Drunk action (swap with center)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'drunk', initialRoleId: 'drunk' }
            ],
            centerCards: [{ roleId: 'werewolf' }, { roleId: 'robber' }, { roleId: 'tanner' }],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Drunk
        
        const result = handler.handleAction(gameState, 'center', 0);
        expect(result).toEqual({ handled: true, shouldReveal: false, needsRerender: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify swap - Doppelganger (who became Drunk) swaps with center
        expect(gameState.playerRoles[0].roleId).toBe('werewolf');
        expect(gameState.centerCards[0].roleId).toBe('drunk');
    });
    
    test('should delegate Insomniac action (view own card)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'insomniac', initialRoleId: 'insomniac' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Insomniac
        
        // Insomniac views own card (player 0)
        const result = handler.handleAction(gameState, 'player', 0);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should complete turn immediately when mimicking passive role (Villager)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'villager', initialRoleId: 'villager' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Villager
        
        // Villager has no handler, turn completes immediately
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should complete turn immediately when mimicking passive role (Minion)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'minion', initialRoleId: 'minion' },
                { roleId: 'werewolf', initialRoleId: 'werewolf' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Minion
        
        // Minion is passive (just views werewolves), turn should complete
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should complete turn immediately when mimicking passive role (Tanner)', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'tanner', initialRoleId: 'tanner' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Tanner
        
        // Tanner has no handler, turn completes immediately
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should delegate Witch action (view center then swap with player)', () => {
        const { setPlayerRoles, setCenterCards, getPlayerRoles, getCenterCards } = require('../script');
        const handler = new DoppelgangerHandler();
        
        setPlayerRoles([
            { roleId: 'doppelganger', initialRoleId: 'doppelganger', tokens: [] },
            { roleId: 'witch', initialRoleId: 'witch', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        setCenterCards([
            { roleId: 'werewolf' },
            { roleId: 'robber' },
            { roleId: 'tanner' }
        ]);
        
        const gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: getCenterCards(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Witch
        
        expect(handler.actionState.mimicId).toBe('witch');
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // View center card
        handler.handleAction(gameState, 'center', 0);
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // Swap viewed center card with player 2
        handler.handleAction(gameState, 'player', 2);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify swap
        expect(getPlayerRoles()[2].roleId).toBe('werewolf');
        expect(getCenterCards()[0].roleId).toBe('villager');
    });
    
    test('should delegate Sentinel action (place shield token)', () => {
        const { setPlayerRoles, getPlayerRoles, hasToken } = require('../script');
        const handler = new DoppelgangerHandler();
        
        setPlayerRoles([
            { roleId: 'doppelganger', initialRoleId: 'doppelganger', tokens: [] },
            { roleId: 'sentinel', initialRoleId: 'sentinel', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        const gameState = {
            playerRoles: getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Sentinel
        
        expect(handler.actionState.mimicId).toBe('sentinel');
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // Place shield on player 2
        handler.handleAction(gameState, 'player', 2);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Verify shield token
        expect(hasToken({ type: 'player', index: 2 }, 'shield')).toBe(true);
    });
    
    test('should delegate Mystic Wolf action (view one player card)', () => {
        const { setPlayerRoles, getPlayerRoles } = require('../script');
        const handler = new DoppelgangerHandler();
        
        setPlayerRoles([
            { roleId: 'doppelganger', initialRoleId: 'doppelganger', tokens: [] },
            { roleId: 'mysticwolf', initialRoleId: 'mysticwolf', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        const gameState = {
            playerRoles: getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Mystic Wolf
        
        expect(handler.actionState.mimicId).toBe('mysticwolf');
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // View player 2's card
        const result = handler.handleAction(gameState, 'player', 2);
        expect(result).toEqual({ handled: true, shouldReveal: true });
        expect(handler.isTurnComplete(gameState)).toBe(true);
    });
    
    test('should delegate Revealer action (reveal one player card)', () => {
        const { setPlayerRoles, getPlayerRoles, hasToken } = require('../script');
        const handler = new DoppelgangerHandler();
        
        setPlayerRoles([
            { roleId: 'doppelganger', initialRoleId: 'doppelganger', tokens: [] },
            { roleId: 'revealer', initialRoleId: 'revealer', tokens: [] },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [] }
        ]);
        
        const gameState = {
            playerRoles: getPlayerRoles(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        handler.handleAction(gameState, 'player', 1); // Mimic Revealer
        
        expect(handler.actionState.mimicId).toBe('revealer');
        expect(handler.isTurnComplete(gameState)).toBe(false);
        
        // Reveal player 2's card (villager - stays revealed)
        const result = handler.handleAction(gameState, 'player', 2);
        expect(result.handled).toBe(true);
        expect(result.shouldReveal).toBe(true);
        expect(handler.isTurnComplete(gameState)).toBe(true);
        
        // Revealer handler should mark card as should stay revealed (village team)
        expect(handler.actionState.subHandler.actionState.shouldStayRevealed).toBe(true);
    });
    
    test('should return nextMessage when mimicking interactive role', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'robber', initialRoleId: 'robber' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 1);
        
        // Should have nextMessage for Robber's follow-up action
        expect(result.handled).toBe(true);
        expect(result.nextMessage).toBeDefined();
        expect(result.nextMessage.length).toBeGreaterThan(0);
    });
    
    test('should return nextMessage=null when mimicking passive role', () => {
        const handler = new DoppelgangerHandler();
        const gameState = {
            playerRoles: [
                { roleId: 'doppelganger', initialRoleId: 'doppelganger' },
                { roleId: 'villager', initialRoleId: 'villager' }
            ],
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
        const result = handler.handleAction(gameState, 'player', 1);
        
        // Villager has no handler, so no nextMessage
        expect(result.handled).toBe(true);
        expect(result.nextMessage).toBeNull();
    });
});
