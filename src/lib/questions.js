// Array of quiz question objects.
// Each object includes the question text, answer options, 
// and correct answer.
const questions = [
    {
        question: "Which function type is most suitable for use as a one-time callback?",
        options: [
            'A. Named functions declared globally',
            'B. Nested functions used within a larger function',
            'C. Anonymous functions passed as arguments',
            'D. Arrow functions set to a variable'],
        answer: 'C. Anonymous functions passed as arguments'
    },
    {
        question: "What is the function of the ls command?",
        options: [
            'A. Changes the current directory',
            'B. Lists files in the current directory',
            'C. Opens a file in the editor',
            'D. Deletes all hidden files in a directory'],
        answer: 'B. Lists files in the current directory'
    },
    {
        question: "Why are higher-order functions useful?",
        options: [
            'A. They improve hoisting behavior',
            'B. They enable code reusability and modular design',
            'C. They simplify loops',
            'D. They allow creation of global variables'],
        answer: 'B. They enable code reusability and modular design'
    },
    {
        question: "Which is a best practice when using the rest operator?",
        options: [
            'A. Use it when the number of arguments is unknown',
            'B. Use it for copying objects',
            'C. Avoid it entirely',
            'D. Use it for all function parameters'],
        answer: 'A. Use it when the number of arguments is unknown'
    },
    {
        question: "What is the default return value of a JavaScript function with no return statement?",
        options: ['A. undefined', 'B. null', 'C. false', 'D. 0'],
        answer: 'A. undefined'
    },
    {
        question: "What is an advantage of using CLI for automation?",
        options: [
            'A. It only works with specific programming languages',
            'B. It is only useful for large-scale enterprises',
            'C. It saves time by reducing repetitive manual tasks',
            'D. It eliminates the need for human input entirely'],
        answer: 'A. It only works with specific programming languages'
    },
    {
        question: "Array methods like map, filter, and reduce are examples of what type of functions?",
        options: ['A. global', 'B. higher-order', 'C. callback', 'D. arrow'],
        answer: 'B. higher-order'
    },
    {
        question: "How does the \"this\" keyword behave in an arrow function?",
        options: [
            'A.It binds to the global object',
            'B.It creates a new this context',
            'C.It binds to the DOM element invoking the function',
            'D.It inherits the this value from its enclosing scope'],
        answer: 'D. It inherits the this value from its enclosing scope'
    },
    {
        question: "Why is mocking used in unit testing?",
        options: [
            'A. To simulate external dependencies',
            'B. To write production code faster',
            'C. To replace all unit tests',
            'D. To ensure UI consistency'],
        answer: 'A. To simulate external dependencies'
    },
    {
        question: "Which of the following is a valid use of the chmod command?",
        options: [
            'A. Displaying file contents',
            'B. Modifying file permissions',
            'C. Changing the current working directory',
            'D. Scheduling tasks in a Unix system'],
        answer: 'B. Modifying file permissions'
    },
    {
        question: "When should you use objects instead of arrays in JavaScript?",
        options: [
            'A. When you need immutable data',
            'B. When you need to associate keys with values',
            'C. When you need indexed access to elements',
            'D. When you need to store multiple values'],
        answer: 'B. When you need to associate keys with values'
    },
    {
        question: "Which tool is commonly used for debugging JavaScript?",
        options: ['A. Code spacing', 'B. Fetch API', 'C. Promises', 'D. Console logs'],
        answer: 'D. Console logs'
    },
    {
        question: "Which scope type enables inner functions to access outer variables?",
        options: ['A. Lexical scope', 'B. Block scope', 'C. Function scope', 'D. Global scope'],
        answer: 'A. Lexical scope'
    },
    {
        question: "What does Jest's mock method achieve?",
        options: [
            'A. It replaces a module or function with a mock implementation',
            'B. It optimizes performance during tests',
            'C. It generates random test cases',
            'D. It runs all tests in mock mode'],
        answer: 'A. It replaces a module or function with a mock implementation'
    },
    {
        question: "To stop a repeating timer created with setInterval, what should you use?",
        options: ['A. stopInterval', 'B. clearInterval', 'C. endInterval', 'D. removeInterval'],
        answer: 'B. clearInterval'
    },
]

// Export the question list so it can be used by the game logic.
export default questions;