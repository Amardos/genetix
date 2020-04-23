import * as MapUtils from './utilities/mapUtils.js';
import { MapCell } from './mapCell.js';

const SMOOTH_COUNT = 2;
const BORDER = 3;

let map;

function setup(ctx, width, height) {
  map = [];

  for (let x = 0; x < width; x++) {
    map[x] = [];
    for (let y = 0; y < height; y++) {    
      let cell = new MapCell(x, y, 0);  
      if (x >= BORDER && y >= BORDER && x < width-BORDER && y < height-BORDER) {
        cell.setValue(random(0, 10));
      }

      map[x][y] = cell;
    }
  }

  for (let i = 0; i < SMOOTH_COUNT; i++) smooth();
}

function smooth() {
  let tempMap = JSON.parse(JSON.stringify(map));

  for (let x = BORDER; x < map.length - BORDER; x++) {
    for (let y = BORDER; y < map[x].length - BORDER; y++) {
      let total = tempMap[x-1][y-1].value +
        tempMap[x][y-1].value +
        tempMap[x+1][y-1].value +
        tempMap[x-1][y].value +
        tempMap[x][y].value +
        tempMap[x+1][y].value +
        tempMap[x-1][y+1].value +
        tempMap[x][y+1].value +
        tempMap[x+1][y+1].value;

      map[x][y].setValue(Math.round(total / 9));
    }
  }

  return map;
}

function draw(context) {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      let coords = MapUtils.hexToPixel(map[x][y]);
      drawHex(context, coords.x, coords.y, MapUtils.TILE_SIZE, true, map[x][y].colour);
    }
  }
}

function drawHex(context, x, y, size, fill, colour) {
  let fill = fill || false;

  context.fillStyle = colour;

  context.beginPath();
  let hexPoint = MapUtils.getHexPoint(x, y, 0);
  context.moveTo(hexPoint.x, hexPoint.y);
  for (let i = 1; i < 6; i++) {
    hexPoint = MapUtils.getHexPoint(x, y, i);
    context.lineTo(hexPoint.x, hexPoint.y);
  }
  context.closePath();

  if(fill) {
      context.fill();
  } else {
      context.stroke();
  }
}

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

export { setup, draw };