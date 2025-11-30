/**
 * P.I. (Paranormal Investigator) Handler Tests
 * 
 * 角色規則：
 * - 夜晚可以查看最多 2 張其他玩家嘅牌
 * - 如果查看到狼人陣營 (werewolf, minion, dreamwolf) 或 Tanner，P.I. 立即變成該角色
 * - 轉換係「跟牌」模式 - token 綁定喺 P.I. 嘅牌上，被換走會跟住去
 * - 轉換後停止查看，唔可以繼續
 * - 無法查看被盾嘅玩家
 * - 無法查看自己或中間卡
 */

const {
    PIHandler,
    SentinelHandler,
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

describe('PIHandler', () => {
    let handler;
    let gameState;

    beforeEach(() => {
        // Reset tokens
        clearAllTokens();
        
        // Setup: P.I. is Player 0
        const players = [
            { roleId: 'pi', initialRoleId: 'pi', tokens: [], roles: { initial: 'pi', actual: 'pi', perceived: 'pi' } },
            { roleId: 'werewolf', initialRoleId: 'werewolf', tokens: [], roles: { initial: 'werewolf', actual: 'werewolf', perceived: 'werewolf' } },
            { roleId: 'villager', initialRoleId: 'villager', tokens: [], roles: { initial: 'villager', actual: 'villager', perceived: 'villager' } },
            { roleId: 'seer', initialRoleId: 'seer', tokens: [], roles: { initial: 'seer', actual: 'seer', perceived: 'seer' } },
            { roleId: 'minion', initialRoleId: 'minion', tokens: [], roles: { initial: 'minion', actual: 'minion', perceived: 'minion' } }
        ];
        setPlayerRoles(players);
        
        const centerCards = [
            { roleId: 'robber', tokens: [] },
            { roleId: 'drunk', tokens: [] },
            { roleId: 'troublemaker', tokens: [] }
        ];
        setCenterCards(centerCards);
        
        handler = new PIHandler();
        gameState = {
            playerRoles: getPlayerRoles(),
            centerCards: getCenterCards(),
            currentPlayerIndex: 0 // P.I. is at index 0
        };
        
        handler.startTurn(gameState);
    });

    afterEach(() => {
        // Clean up tokens
        clearAllTokens();
    });

    describe('Basic Viewing', () => {
        test('should allow viewing a player card', () => {
            const result = handler.handleAction(gameState, 'player', 2); // View Villager
            expect(result.handled).toBe(true);
            expect(result.shouldReveal).toBe(true);
            expect(handler.actionState.viewedCount).toBe(1);
        });

        test('should allow viewing up to 2 player cards', () => {
            // View first card (Villager)
            handler.handleAction(gameState, 'player', 2);
            expect(handler.actionState.viewedCount).toBe(1);
            expect(handler.isTurnComplete(gameState)).toBe(false);
            
            // View second card (Seer)
            handler.handleAction(gameState, 'player', 3);
            expect(handler.actionState.viewedCount).toBe(2);
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should NOT allow viewing more than 2 cards', () => {
            handler.handleAction(gameState, 'player', 2); // View 1
            handler.handleAction(gameState, 'player', 3); // View 2
            
            const result = handler.handleAction(gameState, 'player', 4); // Try view 3
            expect(result).toBe(false);
        });

        test('should NOT allow viewing self', () => {
            const result = handler.handleAction(gameState, 'player', 0); // P.I. is at index 0
            expect(result).toBe(false);
            expect(handler.actionState.viewedCount).toBe(0);
        });

        test('should NOT allow viewing center cards', () => {
            const result = handler.handleAction(gameState, 'center', 0);
            expect(result).toBe(false);
            expect(handler.actionState.viewedCount).toBe(0);
        });

        test('should NOT allow viewing same player twice', () => {
            handler.handleAction(gameState, 'player', 2);
            const result = handler.handleAction(gameState, 'player', 2); // Same player
            expect(result).toBe(false);
            expect(handler.actionState.viewedCount).toBe(1);
        });
    });

    describe('Transformation on Werewolf Team', () => {
        test('should transform into Werewolf if viewed', () => {
            const result = handler.handleAction(gameState, 'player', 1); // View Werewolf
            
            expect(result.handled).toBe(true);
            expect(result.shouldReveal).toBe(true);
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('werewolf');
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should transform into Minion if viewed', () => {
            const result = handler.handleAction(gameState, 'player', 4); // View Minion
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('minion');
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should transform into DreamWolf if viewed', () => {
            // Setup: Add DreamWolf
            gameState.playerRoles[2].roleId = 'dreamwolf';
            
            const result = handler.handleAction(gameState, 'player', 2); // View DreamWolf
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('dreamwolf');
        });

        test('should stop immediately after transformation (cannot view second card)', () => {
            handler.handleAction(gameState, 'player', 1); // View Werewolf -> Transform
            
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.isTurnComplete(gameState)).toBe(true);
            
            // Try to view another card
            const result = handler.handleAction(gameState, 'player', 2);
            expect(result).toBe(false);
            expect(handler.actionState.viewedCount).toBe(1); // Still only 1
        });

        test('should update P.I. actual role after transformation', () => {
            handler.handleAction(gameState, 'player', 1); // View Werewolf
            
            // The handler should update the player's role
            // Note: This depends on implementation - handler may just track state,
            // and the actual role update happens in handleCardClick
            expect(handler.actionState.transformedTo).toBe('werewolf');
        });
    });

    describe('No Transformation on Village Team', () => {
        test('should NOT transform if viewing Villager', () => {
            const result = handler.handleAction(gameState, 'player', 2); // View Villager
            
            expect(result.handled).toBe(true);
            expect(handler.actionState.transformed).toBe(false);
            expect(handler.actionState.transformedTo).toBeNull();
            expect(handler.isTurnComplete(gameState)).toBe(false);
        });

        test('should NOT transform if viewing Seer', () => {
            const result = handler.handleAction(gameState, 'player', 3); // View Seer
            
            expect(handler.actionState.transformed).toBe(false);
            expect(handler.isTurnComplete(gameState)).toBe(false);
        });

        test('should NOT transform if viewing Robber, Drunk, etc.', () => {
            // Replace a player with Robber role
            gameState.playerRoles[2].roleId = 'robber';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.transformed).toBe(false);
        });
    });

    describe('Shield Interaction', () => {
        test('should NOT be able to view shielded player', () => {
            // Add shield to player 2
            addToken({ type: 'player', index: 2 }, 'shield');
            
            const result = handler.handleAction(gameState, 'player', 2);
            expect(result).toBe(false);
            expect(handler.actionState.viewedCount).toBe(0);
        });

        test('should be able to view non-shielded player after shielded attempt', () => {
            addToken({ type: 'player', index: 2 }, 'shield');
            
            // Try shielded - fails
            handler.handleAction(gameState, 'player', 2);
            expect(handler.actionState.viewedCount).toBe(0);
            
            // Try non-shielded - succeeds
            const result = handler.handleAction(gameState, 'player', 3);
            expect(result.handled).toBe(true);
            expect(handler.actionState.viewedCount).toBe(1);
        });
    });

    describe('Turn Completion', () => {
        test('should complete after viewing 2 non-werewolf cards', () => {
            handler.handleAction(gameState, 'player', 2); // Villager
            expect(handler.isTurnComplete(gameState)).toBe(false);
            
            handler.handleAction(gameState, 'player', 3); // Seer
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should complete immediately after transformation', () => {
            handler.handleAction(gameState, 'player', 1); // Werewolf
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should NOT complete after only 1 non-werewolf card', () => {
            handler.handleAction(gameState, 'player', 2); // Villager
            expect(handler.isTurnComplete(gameState)).toBe(false);
        });
    });

    describe('State Reset', () => {
        test('should reset actionState on startTurn', () => {
            // Simulate previous state
            handler.actionState = {
                viewedCount: 2,
                transformed: true,
                transformedTo: 'werewolf',
                viewedPlayers: [1, 2]
            };
            
            // Start new turn
            handler.startTurn(gameState);
            
            expect(handler.actionState.viewedCount).toBe(0);
            expect(handler.actionState.transformed).toBe(false);
            expect(handler.actionState.transformedTo).toBeNull();
            expect(handler.actionState.viewedPlayers).toEqual([]);
        });
    });

    describe('Edge Cases', () => {
        test('should transform into Tanner if viewed', () => {
            gameState.playerRoles[2].roleId = 'tanner';
            
            const result = handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('tanner');
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });

        test('should handle viewing after first view is shielded player attempt', () => {
            addToken({ type: 'player', index: 1 }, 'shield'); // Shield the Werewolf
            
            // Try to view shielded Werewolf - fails
            handler.handleAction(gameState, 'player', 1);
            expect(handler.actionState.viewedCount).toBe(0);
            
            // View Villager - succeeds
            handler.handleAction(gameState, 'player', 2);
            expect(handler.actionState.viewedCount).toBe(1);
            
            // View Seer - succeeds (2nd view)
            handler.handleAction(gameState, 'player', 3);
            expect(handler.actionState.viewedCount).toBe(2);
            expect(handler.isTurnComplete(gameState)).toBe(true);
        });
    });

    describe('Transformation and Card Swap Interaction (跟牌 Mode)', () => {
        test('P.I. transformation should track the card index for token binding', () => {
            // P.I. views Werewolf and transforms
            handler.handleAction(gameState, 'player', 1);
            
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('werewolf');
            expect(handler.actionState.transformedCardIndex).toBe(0); // P.I. is at index 0
            
            // The physical card (roleId) should NOT change - it's still 'pi'
            expect(gameState.playerRoles[0].roleId).toBe('pi');
        });

        test('P.I. transformation to Tanner should also track card index', () => {
            gameState.playerRoles[2].roleId = 'tanner';
            
            handler.handleAction(gameState, 'player', 2);
            
            expect(handler.actionState.transformed).toBe(true);
            expect(handler.actionState.transformedTo).toBe('tanner');
            expect(handler.actionState.transformedCardIndex).toBe(0);
        });

        test('transformation token follows the card (conceptual)', () => {
            // This test documents the expected behavior:
            // When P.I. transforms, a token "pi-transformed-werewolf" is added to P.I.'s card
            // If Robber/Troublemaker swaps the card, the token goes with the card
            // Whoever holds the card with the token has that win condition
            
            handler.handleAction(gameState, 'player', 1); // View Werewolf, transform
            
            // The handleCardClick function will call:
            // addToken({ type: 'player', index: 0 }, 'pi-transformed-werewolf')
            
            // If later Troublemaker swaps Player 0 and Player 3's cards:
            // The token will move from position 0 to position 3 automatically
            // (because swapCards also swaps tokens)
            
            expect(handler.actionState.transformedTo).toBe('werewolf');
        });
    });
});
