import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Enemy } from "./enemy.js";
import { generatesRandomNumberBetween } from "./utility.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.entities = [
      new Wall(new Position(width / 2, height - 181)),
      new Player(new Position(width / 2 - 50 * 2, height - 100)),
      new Player(new Position(width / 2 + 70, height - 100)),
    ];
    this.wall = this.entities[0];
    this.player1 = this.entities[1];
    this.player2 = this.entities[2];

    //ENEMY SETTINGS
    this.enemiesOn = true;
    this.enemiesSpawnRate = 200; //ms

    //TIME MEASUREMENTS (used to equalize game experience for users with different FPS)
    this.deltaTime = 0;
    this.tickTime = 0;

    //for handling index values when splicing in tick method of different classes
    this.index = 0;

    //for handling menu and preventing game events in menu
    this.running = false;
  }

  start() {
    tick();
    if (this.enemiesOn) {
      setInterval(() => {
        this.spawnEnemies();
      }, this.enemiesSpawnRate);
    }
  }

  spawnEnemies() {
    let randomDirection = generatesRandomNumberBetween(1, 0);

    if (randomDirection === 0) {
      // spawned from the left side
      this.entities.push(
        new Enemy(
          new Position(0, Math.random() * height - 200),
          new Velocity(400, 0)
        )
      );
    } else if (randomDirection === 1) {
      // spawned from the right side
      this.entities.push(
        new Enemy(
          new Position(width, Math.random() * height - 200),
          new Velocity(-400, 0)
        )
      );
    }
  }
}

export const game = new Game(canvas, ctx);

let lastTick = Date.now();

function tick() {
  let currentTick = Date.now();

  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;

  game.tickTime += game.deltaTime;

  ctx.clearRect(0, 0, width, height);

  //handles all objects in the game
  for (game.index = 0; game.index < game.entities.length; ++game.index) {
    let entity = game.entities[game.index];
    entity.draw(game, ctx);
    entity.tick(game);
  }

  //when game over
  if (game.running && game.player1.score >= 10) {
    alert("Player 1 has won!");
    game.running = false;
    location.reload();
    return;
  }

  if (game.running && game.player2.score >= 10) {
    alert("Player 2 has won!");
    game.running = false; //
    location.reload();
    return;
  }
  requestAnimationFrame(tick);
}

tick();
