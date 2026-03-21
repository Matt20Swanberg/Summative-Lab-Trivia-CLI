#!/usr/bin/env node

// Import the shared game state object.
import gameState from "../src/lib/state.js";
// Import the function that starts the CLI.
import { showMainMenu } from "../src/lib/gameLogic.js";


async function run() {
  while (true) {
    await showMainMenu(gameState);
}
}

// Run the CLI app.
run();