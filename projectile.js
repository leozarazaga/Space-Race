import { Entity, Position } from "./entity.js";
import { isCircleAndRectColliding, isOutsideCanvas } from "./utility.js";
import { width, height } from "./game.js";
import { addsImageToCanvas } from "./utility.js";

export class Projectile extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "rgba(147, 250, 165, 0.0)";
    this.velocity = velocity;
  }
  draw(game, ctx) {
    this.hitBox(ctx);
    this.appearance(ctx)
  }

  hitBox(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  appearance(ctx) {
    if (this.velocity.dx === Math.abs(this.velocity.dx) ) {
      addsImageToCanvas(ctx, "blueProjectile", new Position(this.position.x - 20, this.position.y - 20));
    }
    else {
      addsImageToCanvas(ctx, "redProjectile", new Position(this.position.x - 20, this.position.y - 20));
    }
  }

  tick(game) {
    this.moves(game);
    if (isOutsideCanvas(this)) {
      this.isDeleted(game);
    }

    if (isCircleAndRectColliding(this, game.player1)) {
      this.isDeleted(game);
      this.resetPositionOfPlayer1(game);
    }

    if (isCircleAndRectColliding(this, game.player2)) {
      this.isDeleted(game);
      this.resetPositionOfPlayer2(game);
    }

    if (isCircleAndRectColliding(this, game.wall)) {
      this.isDeleted(game);
    }
  }

  moves(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }
  isDeleted(game) {
    game.entities.splice(game.index--, 1);
  }

  resetPositionOfPlayer1(game) {
    game.player1.keys.up = false;
    game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
  }

  resetPositionOfPlayer2(game) {
    game.player2.keys.up = false;
    game.player2.position = new Position(width / 2 + 70, height - 100);
  }
}
