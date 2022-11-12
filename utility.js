import { width } from "./game.js";

export function generatesRandomNumberBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isCircleAndRectColliding(circle, rect) {
  var distX = Math.abs(circle.position.x - rect.position.x - rect.width / 2);
  var distY = Math.abs(circle.position.y - rect.position.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.radius) {
    return false;
  }
  if (distY > rect.height / 2 + circle.radius) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.width / 2) {
    return true;
  }
  //test for corner collisions
  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

export function isOutsideCanvas(circle) {
  //left side
  if (circle.position.x < -circle.radius) {
    return true;
  }
  //right side
  else if (circle.position.x > width + circle.radius) {
    return true;
  } 
  
  else {
    return false;
  }
}

export function addsTextToCanvas(ctx, text, fontSize, position) {
  ctx.font = fontSize.concat(" " + "Monospace");
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, position.x, position.y);
}

export function addsRowsOfTextToCanvas(
  ctx,
  textRow1,
  textRow2,
  textRow3,
  textRow4,
  fontSize,
  startPosition
) {
  ctx.font = fontSize.concat(" " + "Monospace");
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(textRow1, startPosition.x, startPosition.y - 50);

  let secondFontSize = parseInt(fontSize) * 0.75;
  secondFontSize = secondFontSize.toString();

  ctx.font = secondFontSize.concat("px" + " " + "Monospace");
  ctx.fillText(textRow2, startPosition.x, startPosition.y);
  ctx.fillText(textRow3, startPosition.x, startPosition.y + 40);
  ctx.fillText(textRow4, startPosition.x, startPosition.y + 80);
}

export function addsImageToCanvas(ctx, id, position) {
  let img = document.getElementById(id);
  ctx.drawImage(img, position.x, position.y);
}
