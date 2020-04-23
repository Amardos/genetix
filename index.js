/*document.getElementById('btnSpawn').addEventListener('click', function() { spawn = true; });
document.getElementById('btnUpdate').addEventListener('click', function() { game.update(); });*/

"use strict";

import * as Map from './modules/map.js';
import { Organism } from './modules/organism.js';

const GAME_WIDTH = 900;
const GAME_HEIGHT = 1150;

const TILES_X = 30;
const TILES_Y = 45;

let canvas;
let context;

let organisms = [];

let lastRender;

function init() {
  setupCanvas();
  Map.setup(context, TILES_X, TILES_Y);

  //organisms.push(new Organism(TILES_X, TILES_Y));

  lastRender = 0;

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
  let secondsPassed = (timestamp - lastRender) / 1000;
  lastRender = timestamp;

  // Update
  for (let i = 0; i < organisms.length; i++) {
    organisms[i].update(secondsPassed);
  }

  // Draw
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  Map.draw(context);

  for (let i = 0; i < organisms.length; i++) {
    organisms[i].draw(context);
  }

  // Loop
  //window.requestAnimationFrame(gameLoop);
}

function setupCanvas() {
  canvas = document.createElement('canvas');
  document.getElementById('app').appendChild(canvas);

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  canvas.style = "border: 1px solid #000000";
  
  context = canvas.getContext('2d');
}

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

init();