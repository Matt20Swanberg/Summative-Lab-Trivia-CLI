// Used to add color and styling to terminal output.
import chalk from "chalk";
// Used to prompt the player to choose answers in the CLI.
import { select, input } from "@inquirer/prompts";
// Import the quiz question data.
import questions from "./questions.js";

// Variable to control timer 
const timeLimit = 25;

// ****Starting point function to show main menu*****
// then prompt player for selected action
export async function showMainMenu(gameState) {

    // Variable to store the Main menu message in a cleaner format rather
    // than one very long sentence
    const welcomeMessage = (
        chalk.yellow("Welcome to my trivia lab.\n") +
        "You will be asked 5 randomly pulled questions.\nYou will have " +
        chalk.red(`${timeLimit} seconds `) +
        "to answer EACH question.\n\n" +
        chalk.bgGreenBright("Good luck!!\n")
    );

    const action = await select({
        message: welcomeMessage,
        choices: [
            { name: "Start Game", value: "start" },
            { name: "Exit", value: "exit" },
        ],
    });

    switch (action) {
        case "start":
            await startGame(gameState, questions);
            break;

        case "exit":
            console.log("Goodbye!");
            process.exit(0);
    }
}

// ****Main game Function****
// Resets the game, shows each question in order, scores answers,
// and shows the final results at the end.
export async function startGame(gameState, questions) {
    const selectedQuestions = getRandomQuestions(questions, 10);

    for (let i = 0; i < selectedQuestions.length; i++) {
        const currentQuestion = selectedQuestions[i];

        // Show the current question and its position in the quiz.
        showQuestion(currentQuestion, i + 1, selectedQuestions.length);

        // Give the player a limited amount of time to answer.
        const selectedAnswer = await selectAnswerWithTimer(currentQuestion, timeLimit);

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

    // Pull 10 random questions (15 total)
    function getRandomQuestions(allQuestions, count) {
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, allQuestions.length));
    }

    // Mark the game as over and show the final results.
    endGame(gameState);
    showGameOverFeedback(gameState, selectedQuestions.length);

    // Show the ending menu.
    await endScreen();
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
    console.log(`Question ${questionNumber}: ${question.question}`);
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
export function showGameOverFeedback(gameState, questions) {
    // Only show timeout details if at least one question timed out.
    const timeoutText =
        gameState.stats.timedOut > 0 ? ` (${gameState.stats.timedOut} timed out)` : "";


    console.log(chalk.bgYellowBright(`\n**********Here are your results out of ${questions}:**********`));

    console.log(chalk.green(`Correct answers: ${gameState.stats.correct}`))
    console.log(chalk.red(`Incorrect answers: ${gameState.stats.incorrect + gameState.stats.timedOut}${timeoutText}`));

    // Calculate the final score percentage.
    const percentage = ((gameState.stats.correct / questions) * 100).toFixed(1);

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

// Show the final end screen menu and a prompt to hit ENTER to
// return back to main menu (due to main menu setup) .
export async function endScreen() {
    await input({
        message: `${chalk.blue("\nPress Enter to return to the main menu...")}`,
    });
}