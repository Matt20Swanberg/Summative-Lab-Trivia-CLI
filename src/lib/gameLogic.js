import chalk from "chalk";
import { select } from "@inquirer/prompts";
import questions from "./questions.js";

// Starting point Function
export async function showMainMenu(gameState) {
    const action = await select({
        message: "Main Menu",
        choices: [{ name: "Start Game", value: "start" },],
    });

    switch (action) {
        case "start":
            await startGame(gameState, questions);
            break;
    }
}

// Main Function
export async function startGame(gameState, questions) {
    resetGameState(gameState);

    for (let i = 0; i < questions.length; i++) {
        gameState.currentQuestionIndex = i;
        const currentQuestion = questions[i];

        showQuestion(currentQuestion, i + 1, questions.length);

        const selectedAnswer = await selectAnswerWithTimer(currentQuestion, 2);

        if (selectedAnswer === null) {
            gameState.stats.timedOut++;
            showTimeoutFeedback(currentQuestion.answer);
            continue;
        }
        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);
        updateScore(gameState, isCorrect);
        giveAnswerFeedback(isCorrect, currentQuestion.answer);
    }
    endGame(gameState);
    showGameOverFeedback(gameState, questions.length);

    const action = await endScreen();

    if (action === "end") {
        console.log(chalk.blue("\nThanks for playing!"));
    }
};

// Helper functions
export function resetGameState(gameState) {
    gameState.stats.correct = 0;
    gameState.stats.incorrect = 0;
    gameState.stats.timedOut = 0;
    gameState.currentQuestionIndex = 0;
    gameState.over = false;
};

export function showQuestion(question, questionNumber, totalQuestions) {
    console.log(chalk.yellow(`Question ${questionNumber} of ${totalQuestions}`));
    console.log(chalk.white(question.question));
};

export async function selectAnswerWithTimer(question, timeLimitInSeconds) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeLimitInSeconds * 1000);

    try {
        const answer = await select(
            {
                message: `Choose your answer (${timeLimitInSeconds} seconds):`,
                choices: question.options.map((option) => ({
                    name: option,
                    value: option,
                })),
            },
            {
                signal: controller.signal,
            }
        );

        clearTimeout(timeoutId);
        return answer;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === "AbortPromptError") {
            return null;
        }

        throw error;
    }
}

export function showTimeoutFeedback(correctAnswer) {
    console.log(
        chalk.red(`Time's up! The correct answer was: ${correctAnswer}\n`)
    );
}

export function checkAnswer(question, selectedAnswer) {
    return selectedAnswer === question.answer;
}

export function updateScore(gameState, isCorrect) {
    if (isCorrect) {
        gameState.stats.correct++;
    }
    else {
        gameState.stats.incorrect++;
    }
};

export function giveAnswerFeedback(isCorrect, correctAnswer) {
    if (isCorrect) {
        console.log(chalk.green("CORRECT!\n"))
    }
    else {
        console.log(chalk.red(`INCORRECT! The correct answer was: ${correctAnswer}\n`))
    }
};

export function endGame(gameState) {
    gameState.over = true;
};

export function showGameOverFeedback(gameState, totalQuestions) {

    const timeoutText =
        gameState.stats.timedOut > 0 ? ` (${gameState.stats.timedOut} timed out)` : "";


    console.log(chalk.bgYellowBright(`\n**********Here are your results out of ${questions.length}:**********`));

    console.log(chalk.green(`Correct answers: ${gameState.stats.correct}`))
    console.log(chalk.red(`Incorrect answers: ${gameState.stats.incorrect + gameState.stats.timedOut}${timeoutText}`));

    const percentage = ((gameState.stats.correct / totalQuestions) * 100).toFixed(1);
    if (percentage >= 50) {
        console.log(
            chalk.green(`\n${percentage} % questions answered correctly.\nGreat job!`)
        );
    }
    else {
        console.log(
            chalk.red(`\n${percentage} % questions answered correctly.\nBetter luck next time!`)
        );
    }
}

export async function endScreen() {
    const action = await select({
        message: "Game Over!",
        choices: [
            { name: "End Game", value: "end" },
        ],
    });
    return action;
}
