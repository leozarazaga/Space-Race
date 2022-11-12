import { isOutsideCanvas, isCircleAndRectColliding } from "./utility.js";
import { Entity, Position } from "./entity.js";
import { width, height } from "./game.js";
import { addsImageToCanvas } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "white";
    this.velocity = velocity;
    //for keeping track of time of collision with players
    this.timeOfCollision = null;
  }

  draw(game, ctx) {
    this.hitBox(game, ctx);
    this.appearance(game, ctx);
  }

  hitBox(game, ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  appearance(game, ctx) {
    addsImageToCanvas(
      ctx,
      "asteroid",
      new Position(this.position.x - 20, this.position.y - 20)
    );
  }

  tick(game) {
    this.moves(game);

    if (isOutsideCanvas(this)) {
      this.isDeleted(game);
    }

    if (isCircleAndRectColliding(this, game.player1) &&
      game.player1.isHit === false
    ) {
      this.hitsPlayer1AndStartsTimer(game);
      this.makesPlayer1InvisibleAndUnableToScore(game);
    }

    if (
      this.startedATimerForPlayer1(game) &&
      game.tickTime - game.player1.timeOfCollision >= 3
    ) {
      this.resetsPositionOfPlayer1(game);
    }

    if (
      isCircleAndRectColliding(this, game.player2) &&
      game.player2.isHit === false
    ) {
      this.hitsPlayer2AndStartsTimer(game);
      this.makesPlayer2InvisibleAndUnableToScore(game);
    }

    if (
      this.startedATimerForPlayer2(game) &&
      game.tickTime - game.player2.timeOfCollision >= 3
    ) {
      this.resetsPositionOfPlayer2(game);
    }
  }
  moves(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }

  isDeleted(game) {
    game.entities.splice(game.index--, 1);
  }

  hitsPlayer1AndStartsTimer(game) {
    game.player1.isHit = true;
    game.player1.timeOfCollision = game.tickTime;
  }

  makesPlayer1InvisibleAndUnableToScore(game) {
    game.player1.isBeingReset = true; //boolean logic handled in player.js draw method
    game.player1.keys.up = false;
  }

  startedATimerForPlayer1(game) {
    if (game.player1.isHit && game.player1.timeOfCollision !== null) {
      return true;
    } else {
      return false;
    }
  }

  resetsPositionOfPlayer1(game) {
    game.player1.timeOfCollision = null;
    game.player1.keys.up = false;
    game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
    game.player1.isBeingReset = false;
    game.player1.isHit = false;
  }

  hitsPlayer2AndStartsTimer(game) {
    game.player2.isHit = true;
    game.player2.timeOfCollision = game.tickTime;
  }

  makesPlayer2InvisibleAndUnableToScore(game) {
    game.player2.isBeingReset = true; //boolean logic handled in player.js draw method
    game.player2.keys.up = false;
  }

  startedATimerForPlayer2(game) {
    if (game.player2.isHit && game.player2.timeOfCollision !== null) {
      return true;
    } else {
      return false;
    }
  }

  resetsPositionOfPlayer2(game) {
    game.player2.timeOfCollision = null;
    game.player2.keys.up = false;
    game.player2.position = new Position(width / 2 + 70, height - 100);
    game.player2.isBeingReset = false;
    game.player2.isHit = false;
  }
}
