/**
 * Revealer Handler Tests
 * 
 * 角色規則：
 * - 夜晚可以翻開一張其他玩家嘅牌
 * - 如果係村民陣營，牌保持翻開（公開資訊）
 * - 如果係狼人或 Tanner，蓋返（Revealer 知道但其他人唔知）
 * - 唔可以翻自己
 * - 唔可以翻中間牌
 * - 唔可以翻被 Shield 嘅玩家
 */

const {
    RevealerHandler,
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

describe('RevealerHandler', () => {
    let handler;
    let gameState;

    beforeEach(() => {
        clearAllTokens();
        
        // Setup: Revealer is Player 0
        const players = [
            { roleId: 'revealer', initialRoleId: 'revealer', tokens: [], roles: { initial: 'revealer', actual: 'revealer', perceived: 'revealer' } },
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [], roles: { initial: 'werewolf', actual: 'werewolf', perceived: 'werewolf' } },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [], roles: { initial: 'villager', actual: 'villager', perceived: 'villager' } },
            { roleId: 'seer', initialRoleId: 'seer', tokens: [], roles: { initial: 'seer', actual: 'seer', perceived: 'seer' } },
            { roleId: 'tanner', initialRoleId: 'tanner', tokens: [], roles: { initial: 'tanner', actual: 'tanner', perceived: 'tanner' } }
        ];
        setPlayerRoles(players);
        
        const centerCards = [
            { roleId: 'drunk', tokens: [] },
            { roleId: 'troublemaker', tokens: [] },
            { roleId: 'robber', tokens: [] }
        ];
        setCenterCards(centerCards);
        
        handler = new RevealerHandler();
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
        test('should have correct roleId', () => {
            expect(handler.roleId).toBe('revealer');
        });

        test('should have correct initial state', () => {
            expect(handler.actionState.hasRevealed).toBe(false);
            expect(handler.actionState.revealedPlayerIndex).toBeNull();
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });
    });

    describe('Revealing Village Cards', () => {
        test('should reveal villager card and keep it revealed', () => {
            const result = handler.handleAction(gameState, 'player', 2); // Villager
            
            expect(result.handled).toBe(true);
            expect(result.shouldReveal).toBe(true);
            expect(handler.actionState.hasRevealed).toBe(true);
            expect(handler.actionState.revealedPlayerIndex).toBe(2);
            expect(handler.actionState.shouldStayRevealed).toBe(true); // Village card stays revealed
        });

        test('should reveal seer card and keep it revealed', () => {
            const result = handler.handleAction(gameState, 'player', 3); // Seer
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.shouldStayRevealed).toBe(true);
        });
    });

    describe('Revealing Werewolf/Tanner Cards', () => {
        test('should reveal werewolf card but NOT keep it revealed', () => {
            const result = handler.handleAction(gameState, 'player', 1); // Werewolf
            
            expect(result.handled).toBe(true);
            expect(result.shouldReveal).toBe(true); // Revealer sees it
            expect(handler.actionState.hasRevealed).toBe(true);
            expect(handler.actionState.revealedPlayerIndex).toBe(1);
            expect(handler.actionState.shouldStayRevealed).toBe(false); // But it flips back
        });

        test('should reveal tanner card but NOT keep it revealed', () => {
            const result = handler.handleAction(gameState, 'player', 4); // Tanner
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });

        test('should NOT keep minion card revealed', () => {
            gameState.playerRoles[2].roleId = 'minion';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });

        test('should NOT keep dreamwolf card revealed', () => {
            gameState.playerRoles[2].roleId = 'dreamwolf';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });

        test('should NOT keep mysticwolf card revealed', () => {
            gameState.playerRoles[2].roleId = 'mysticwolf';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });
    });

    describe('Invalid Actions', () => {
        test('should NOT allow revealing more than one card', () => {
            handler.handleAction(gameState, 'player', 2); // First reveal
            const result = handler.handleAction(gameState, 'player', 3); // Second reveal
            
            expect(result).toBe(false);
            expect(handler.actionState.revealedPlayerIndex).toBe(2);
        });

        test('should NOT allow revealing self', () => {
            const result = handler.handleAction(gameState, 'player', 0);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasRevealed).toBe(false);
        });

        test('should NOT allow revealing center cards', () => {
            const result = handler.handleAction(gameState, 'center', 0);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasRevealed).toBe(false);
        });

        test('should NOT allow revealing shielded player', () => {
            addToken({ type: 'player', index: 2 }, 'shield');
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(result).toBe(false);
            expect(handler.actionState.hasRevealed).toBe(false);
        });
    });

    describe('Turn Completion', () => {
        test('should complete turn after revealing', () => {
            expect(handler.isTurnComplete(gameState)).toBe(false);
            
            handler.handleAction(gameState, 'player', 2);
            
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });
    });

    describe('State Reset', () => {
        test('should reset state on startTurn', () => {
            handler.actionState = {
                hasRevealed: true,
                revealedPlayerIndex: 3,
                shouldStayRevealed: true
            };
            
            handler.startTurn(gameState);
            
            expect(handler.actionState.hasRevealed).toBe(false);
            expect(handler.actionState.revealedPlayerIndex).toBeNull();
            expect(handler.actionState.shouldStayRevealed).toBe(false);
        });
    });

    describe('Shield Interaction', () => {
        test('should fail on shielded player and allow retry', () => {
            addToken({ type: 'player', index: 2 }, 'shield');
            
            // Try shielded
            const result1 = handler.handleAction(gameState, 'player', 2);
            expect(result1).toBe(false);
            
            // Try non-shielded
            const result2 = handler.handleAction(gameState, 'player', 3);
            expect(result2.handled).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        test('should handle revealing a card that was swapped to werewolf role', () => {
            // Simulate: a village role card was swapped and is now werewolf
            // The check is based on current roleId, not initial
            gameState.playerRoles[2].roleId = 'werewolf';
            gameState.playerRoles[2].initialRoleId = 'villager';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.shouldStayRevealed).toBe(false); // Current role is werewolf
        });
    });
});
