// Shared game state object.
// Stores score, question progress, and whether the game has ended.
const gameState = {
    stats: {
        correct: 0,
        incorrect: 0,
        timedOut: 0,
    },
    currentQuestionIndex: 0,
    over: false,
};

// Export the shared state so other files can read and update it.
export default gameState;