import chalk from "chalk";
import { select } from "@inquirer/prompts";

export async function showMainMenu(gameState) {
    const action = await select({
        message: "Main Menu",
        choices: [
            { name: "Start Game", value: "start" },
        ],
    });

    switch (action) {
        case "start":
            await startGame(gameState);
            break;
    }
}

export async function startGame(gameState, questions) {
    resetGameState(gamestate);

    for (let i = 0; i < questions.length; i++) {
        gameState.currentQuestionIndex = i;
        const currentQuestion = questions[i]

        showQuestion(currentQuestion, i + 1, questions.length);

        const selectedAnswer = await selectAnswerWithTimer(question, 20);

        if (selectedAnswer === null) {
            gameState.stats.incorrect++;
            showTimeoutFeedback(currentQuestion.answer);
            continue;
        }
        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);
        updateScore(gameState, isCorrect);
        giveAnswerFeedback(isCorrect, currentQuestion.answer);
    }
    endGame(gameState);
    showGameOverFeedback(gameState, questions.length);
}
