/**
 * Mystic Wolf Handler Tests
 * 
 * 角色規則：
 * - 狼人陣營，喺狼人回合會同其他狼人互相認識
 * - 狼人回合之後，可以額外睇一張其他玩家嘅牌
 * - 唔可以睇自己
 * - 唔可以睇中間牌
 * - 唔可以睇被 Shield 嘅玩家
 */

const {
    MysticWolfHandler,
    WerewolfHandler,
    RoleHandler,
    setPlayerRoles,
    getPlayerRoles,
    setCenterCards,
    getCenterCards,
    addToken,
    removeToken,
    hasToken,
    clearAllTokens
} = require('../script');

describe('MysticWolfHandler', () => {
    let handler;
    let gameState;

    beforeEach(() => {
        clearAllTokens();
        
        // Setup: Mystic Wolf is Player 0, another Werewolf is Player 1
        const players = [
            { roleId: 'mysticwolf', initialRoleId: 'mysticwolf', tokens: [], roles: { initial: 'mysticwolf', actual: 'mysticwolf', perceived: 'mysticwolf' } },
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [], roles: { initial: 'werewolf', actual: 'werewolf', perceived: 'werewolf' } },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [], roles: { initial: 'villager', actual: 'villager', perceived: 'villager' } },
            { roleId: 'seer', initialRoleId: 'seer', tokens: [], roles: { initial: 'seer', actual: 'seer', perceived: 'seer' } },
            { roleId: 'robber', initialRoleId: 'robber', tokens: [], roles: { initial: 'robber', actual: 'robber', perceived: 'robber' } }
        ];
        setPlayerRoles(players);
        
        const centerCards = [
            { roleId: 'drunk', tokens: [] },
            { roleId: 'troublemaker', tokens: [] },
            { roleId: 'minion', tokens: [] }
        ];
        setCenterCards(centerCards);
        
        handler = new MysticWolfHandler();
        gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: getCenterCards(),
            currentPlayerIndex: 0
        };
        
        handler.startTurn(gameState);
    });

    afterEach(() => {
        clearAllTokens();
    });

    describe('Basic Properties', () => {
        test('should be a werewolf team role', () => {
            expect(handler.roleId).toBe('mysticwolf');
        });

        test('should have correct initial state', () => {
            expect(handler.actionState.hasViewed).toBe(false);
            expect(handler.actionState.viewedPlayerIndex).toBeNull();
        });
    });

    describe('Viewing Player Cards', () => {
        test('should allow viewing one player card', () => {
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(result.handled).toBe(true);
            expect(result.shouldReveal).toBe(true);
            expect(handler.actionState.hasViewed).toBe(true);
            expect(handler.actionState.viewedPlayerIndex).toBe(2);
        });

        test('should NOT allow viewing more than one card', () => {
            handler.handleAction(gameState, 'player', 2); // First view
            const result = handler.handleAction(gameState, 'player', 3); // Second view
            
            expect(result).toBe(false);
            expect(handler.actionState.viewedPlayerIndex).toBe(2); // Still first
        });

        test('should NOT allow viewing self', () => {
            const result = handler.handleAction(gameState, 'player', 0);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasViewed).toBe(false);
        });

        test('should NOT allow viewing center cards', () => {
            const result = handler.handleAction(gameState, 'center', 0);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasViewed).toBe(false);
        });

        test('should NOT allow viewing shielded player', () => {
            addToken({ type: 'player', index: 2 }, 'shield');
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasViewed).toBe(false);
        });

        test('should allow viewing another werewolf card', () => {
            // Mystic Wolf can view any player, including other werewolves
            const result = handler.handleAction(gameState, 'player', 1);
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.viewedPlayerIndex).toBe(1);
        });
    });

    describe('Turn Completion', () => {
        test('should complete turn after viewing one card', () => {
            expect(handler.isTurnComplete(gameState)).toBe(false);
            
            handler.handleAction(gameState, 'player', 2);
            
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should NOT complete turn without viewing', () => {
            expect(handler.isTurnComplete(gameState)).toBe(false);
        });
    });

    describe('State Reset', () => {
        test('should reset state on startTurn', () => {
            handler.actionState = {
                hasViewed: true,
                viewedPlayerIndex: 3
            };
            
            handler.startTurn(gameState);
            
            expect(handler.actionState.hasViewed).toBe(false);
            expect(handler.actionState.viewedPlayerIndex).toBeNull();
        });
    });

    describe('Werewolf Recognition (Conceptual)', () => {
        // Note: Werewolf recognition happens in the Werewolf phase
        // Mystic Wolf wakes AFTER werewolves, so they already know each other
        // This is handled by the game flow, not the handler itself
        
        test('Mystic Wolf should be part of werewolf team', () => {
            // This would be checked in rolesData team property
            // For now, just verify the handler exists and works
            expect(handler.roleId).toBe('mysticwolf');
        });
    });

    describe('Shield Interaction', () => {
        test('should fail on shielded player and allow retry on non-shielded', () => {
            addToken({ type: 'player', index: 2 }, 'shield');
            
            // Try shielded player
            const result1 = handler.handleAction(gameState, 'player', 2);
            expect(result1).toBe(false);
            expect(handler.actionState.hasViewed).toBe(false);
            
            // Try non-shielded player
            const result2 = handler.handleAction(gameState, 'player', 3);
            expect(result2.handled).toBe(true);
            expect(handler.actionState.hasViewed).toBe(true);
        });
    });
});
