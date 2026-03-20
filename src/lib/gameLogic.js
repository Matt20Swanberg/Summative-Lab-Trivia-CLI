// Used to add color and styling to terminal output.
import chalk from "chalk";
// Used to prompt the player to choose answers in the CLI.
import { select } from "@inquirer/prompts";
// Import the quiz question data.
import questions from "./questions.js";

// ****Starting point function to show main menu*****
// then prompt player for selected action
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

// ****Main game Function****
// Resets the game, shows each question in order, scores answers,
// and shows the final results at the end.
export async function startGame(gameState, questions) {
    // Start each new game with a clean state.
    resetGameState(gameState);

    // Loop through quiz questions one at a time.
    for (let i = 0; i < questions.length; i++) {
        gameState.currentQuestionIndex = i;
        const currentQuestion = questions[i];

        // Show the current question and its position in the quiz.
        showQuestion(currentQuestion, i + 1, questions.length);

        // Give the player a limited amount of time to answer.
        const selectedAnswer = await selectAnswerWithTimer(currentQuestion, 2);

        // Check the answer, update score, and show feedback.
        if (selectedAnswer === null) {
            gameState.stats.timedOut++;
            showTimeoutFeedback(currentQuestion.answer);
            continue;
        }
        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);
        updateScore(gameState, isCorrect);
        giveAnswerFeedback(isCorrect, currentQuestion.answer);
    }

    // Mark the game as over and show the final results.
    endGame(gameState);
    showGameOverFeedback(gameState, questions.length);

    // Show the ending menu.
    const action = await endScreen();

    if (action === "end") {
        console.log(chalk.blue("\nThanks for playing!"));
    }
};

// ****Helper functions****
//
// Reset all game values so a new round starts fresh.
export function resetGameState(gameState) {
    gameState.stats.correct = 0;
    gameState.stats.incorrect = 0;
    gameState.stats.timedOut = 0;
    gameState.currentQuestionIndex = 0;
    gameState.over = false;
};

// Display the current question and its position in the quiz.
export function showQuestion(question, questionNumber, totalQuestions) {
    console.log(chalk.yellow(`Question ${questionNumber} of ${totalQuestions}`));
    console.log(chalk.white(question.question));
};

// Prompt the player to select an answer before the timer expires.
// Returns the selected answer if completed in time.
// Returns null if the prompt is aborted by the timer.
export async function selectAnswerWithTimer(question, timeLimitInSeconds) {
    // AbortController allows us to cancel the prompt after the time limit.
    const controller = new AbortController();

    // Start the countdown timer.
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

        // If the player answered in time, stop the timer.
        clearTimeout(timeoutId);
        return answer;
    } catch (error) {
        // Clear the timer if player answers question before time expires.
        clearTimeout(timeoutId);

        // If the prompt was aborted because time ran out, return null.
        if (error.name === "AbortPromptError") {
            return null;
        }

        // Re-throw unexpected errors so they are not hidden.
        throw error;
    }
}

// Show feedback when the player runs out of time.
export function showTimeoutFeedback(correctAnswer) {
    console.log(
        chalk.red(`Time's up! The correct answer was: ${correctAnswer}\n`)
    );
}

// Return true if the selected answer matches the correct answer.
export function checkAnswer(question, selectedAnswer) {
    return selectedAnswer === question.answer;
}

// Update the score based on whether the player answered correctly.
export function updateScore(gameState, isCorrect) {
    if (isCorrect) {
        gameState.stats.correct++;
    }
    else {
        gameState.stats.incorrect++;
    }
};

// Show immediate feedback after each answered question.
export function giveAnswerFeedback(isCorrect, correctAnswer) {
    if (isCorrect) {
        console.log(chalk.green("CORRECT!\n"))
    }
    else {
        console.log(chalk.red(`INCORRECT! The correct answer was: ${correctAnswer}\n`))
    }
};

// Mark the game as finished.
export function endGame(gameState) {
    gameState.over = true;
};

// Display the player's final quiz results.
export function showGameOverFeedback(gameState, totalQuestions) {
    // Only show timeout details if at least one question timed out.
    const timeoutText =
        gameState.stats.timedOut > 0 ? ` (${gameState.stats.timedOut} timed out)` : "";


    console.log(chalk.bgYellowBright(`\n**********Here are your results out of ${totalQuestions}:**********`));

    console.log(chalk.green(`Correct answers: ${gameState.stats.correct}`))
    console.log(chalk.red(`Incorrect answers: ${gameState.stats.incorrect + gameState.stats.timedOut}${timeoutText}`));

    // Calculate the final score percentage.
    const percentage = ((gameState.stats.correct / totalQuestions) * 100).toFixed(1);

    // Show a message based on performance.
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

// Show the final end screen menu and return the selected action.
export async function endScreen() {
    const action = await select({
        message: "Game Over!",
        choices: [
            { name: "End Game", value: "end" },
        ],
    });
    return action;
}