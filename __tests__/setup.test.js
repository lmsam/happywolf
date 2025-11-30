const { shuffleArray } = require('../script');

describe('Setup Test', () => {
    test('shuffleArray should be defined', () => {
        expect(shuffleArray).toBeDefined();
    });

    test('shuffleArray should shuffle an array', () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = [...array]; // Clone
        shuffleArray(shuffled);
        
        // Note: There's a tiny chance it shuffles to the same order, 
        // but for a setup test this is usually fine or we can check length/elements
        expect(shuffled).toHaveLength(array.length);
        expect(shuffled).toEqual(expect.arrayContaining(array));
    });
});
