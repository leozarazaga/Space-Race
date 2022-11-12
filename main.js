import { game } from "./game.js";
import { handleKeyDown, handleKeyUp } from "./event.js";
import { Position } from "./entity.js";
import { Menu } from "./menu.js";

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

export let startMenu = new Menu(new Position(0, 0));
game.entities.push(startMenu);
