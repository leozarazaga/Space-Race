import { Entity, Position } from "./entity.js";
import { height, width } from "./game.js";
import { addsImageToCanvas, addsRowsOfTextToCanvas, addsTextToCanvas } from "./utility.js";

export class Menu extends Entity {
  constructor(position) {
    super(position);
    this.color = "black";
    this.width = width;
    this.height = height;
    this.enterIsPressed = false;
  }

  draw(game, ctx) {
    this.appearance(ctx);

    this.title(ctx);

    this.underTitle(ctx);

    this.player1Intruction(ctx);

    this.player2Intruction(ctx);
    
    this.gameInstructions(ctx);

    this.promptKey(ctx);
  }

  appearance(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    addsImageToCanvas(ctx, "menuBackground", new Position(0, -150));
    addsImageToCanvas(ctx, "playerLogo", new Position(width / 2 - 25, 120))
  }

  title(ctx) {
    addsTextToCanvas(
      ctx,
      "S P A C E    R A C E",
      "60px",
      new Position(width / 2, height / 6)
    );
  }

  underTitle(ctx) {
    addsTextToCanvas(
      ctx,
      "CONTROLS",
      "50px",
      new Position(width / 2, height * 0.37)
    );
  }

  player1Intruction(ctx) {
    addsRowsOfTextToCanvas(
      ctx,
      "Player ❶",
      "W: Move up",
      "S: Move down",
      "Q: Shoot",
      "40px",
      new Position(width * 0.125, height / 2)
    );
  }

  player2Intruction(ctx) {
    addsRowsOfTextToCanvas(
      ctx,
      "Player ❷",
      "O: Move up",
      "L: Move down",
      "P: Shoot",
      "40px",
      new Position(width * 0.625, height / 2)
    );
  }

  gameInstructions(ctx){
    addsTextToCanvas(
      ctx,
      "Score 10 points to win!",
      "30px",
      new Position(width / 2, height * 0.75)
      )
  }

  promptKey(ctx) {
    addsTextToCanvas(
      ctx,
      "Press ENTER to Start Game",
      "50px",
      new Position(width / 2, height - 100)
    );
  }

  tick(game) {
    if (this.enterIsPressed) {
      this.isRemovedAndGameStarts(game);
      game.running = true;
    }
  }
  isRemovedAndGameStarts(game) {
    game.entities.splice(game.index--, 1);
    game.start();
  }
}
