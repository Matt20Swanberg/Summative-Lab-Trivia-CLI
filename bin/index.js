#!/usr/bin/env node

import gameState from "../src/lib/state.js";
import { showMainMenu } from "../src/lib/gameLogic.js";
import questions from "../src/lib/questions.js";

async function run() {
  await showMainMenu(gameState);
}

run();