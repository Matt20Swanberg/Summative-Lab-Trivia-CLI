# Trivia CLI Game

A fun command-line trivia game built with Node.js that tests your knowledge with Course 2 Module 8 related questions, timed answers, and instant feedback.

---

## Features

- Randomized question selection  
- Timed answers (25 seconds per question)  
- Immediate feedback (correct / incorrect / timeout)  
- Final score summary with percentage  
- Styled terminal output using Chalk  
- Replayable via main menu  

---

## Technologies Used

- Node.js  
- @inquirer/prompts - interactive CLI prompts  
- Chalk - styled terminal output  

---

## Installation

1. Clone the repository:  
git clone <your-repo-url>  
cd <your-project-folder>  

2. Install dependencies:  
npm install  

---

## How to Run
In terminal:
1. node index.js

- or:

2. trivia (if CLI requirements are met)

---

## How It Works

- You'll be prompted to start the game or exit  
- The game selects random questions  
- You have 25 seconds per question  
- If time runs out -> counted as a timeout (i.e. incorrect)
- After all questions:  
  - Correct answers  
  - Incorrect answers  
  - Timed-out answers  
  - Final percentage score  

---

## Project Structure

.
├── bin/
│   └── index.js
├── src/
│   └── lib/
│       ├── gameLogic.js
│       ├── questions.js
│       └── state.js
├── package.json
└── package-lock.json  

---

## Example Question Format

{
  question: "What is the function of the ls command?",
  options: [
    "A. Changes the current directory",
    "B. Lists files in the current directory",
    "C. Opens a file in the editor",
    "D. Deletes all hidden files"
  ],
  answer: "B. Lists files in the current directory"
}

---

## Scoring

(correct answers / total questions) * 100  

---

## Notes

- Answers in `questions.js` must match the full option text (only applicable if new questions are added)  
- The game compares selected answers directly to the answer field  
- Timeouts are counted as incorrect answers  

---

## Author

Built by Matthew Swanberg  

---