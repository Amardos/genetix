const TILE_SIZE = 15;

const HEX_WIDTH = Math.sqrt(3) * TILE_SIZE;
const HEX_HEIGHT = 2 * TILE_SIZE;

function getCoords(xPos, yPos) {
  return {
    x: (HEX_WIDTH / 2) + xPos * HEX_WIDTH + (yPos % 2) * HEX_WIDTH / 2,
    y: (HEX_HEIGHT / 2) + (yPos * HEX_HEIGHT * 0.75)
  };
}

function getHexPoint(centreX, centreY, i) {
  let angleDeg = 60 * i - 30
  let angleRad = Math.PI / 180 * angleDeg;
  return {
    x: centreX + TILE_SIZE * Math.cos(angleRad),
    y: centreY + TILE_SIZE * Math.sin(angleRad)  
  };
}

function hexToPixel(hex) {
  return {
    x: TILE_SIZE * (Math.sqrt(3) * hex.q + Math.sqrt(3)/2 * hex.r),
    y: TILE_SIZE * (3/2 * hex.r)
  };
}

function cubeToOffset(cube) {
  var col = cube.x + (cube.z - (cube.z&1)) / 2;
  var row = cube.z;

  return new Offset(row, col);
}

function offsetToCube(offset) {
  let x = offset.col - (offset.row - (offset.row&1)) /2;
  let z = offset.row;
  let y = -x-z;

  return new Cube(x, y, z);
}

function cubeToAxial(cube) {
  let q = cube.x;
  let r = cube.z;
  
  return new Hex(q, r);
}

function axialToCube(hex) {
  let x = hex.q;
  let y = hex.r;
  let y = -x-z;

  return new Cube(x, y, z);
}

function offsetToAxial(offset) {
  return cubeToAxial(offsetToCube(offset));
}

function axialToOffset(hex) {
  return cubeToOffset(axialToCube(hex));
}

let axialDirections = [
  {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
  {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
];

function hexNeighbour(hex, direction) {
  let dir = axialDirections[direction];
  return new Hex(hex.q + dir.q, hex.r + dir.r);
}

export { 
  getCoords, 
  getHexPoint, 
  hexToPixel, 
  cubeToOffset, 
  offsetToCube, 
  cubeToAxial, 
  axialToCube, 
  offsetToAxial, 
  axialToOffset, 
  hexNeighbour, 
  TILE_SIZE, 
  HEX_HEIGHT, 
  HEX_WIDTH };

class Cube {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Hex {
  constructor(q, r) {
    this.q = q;
    this.r = r;
  }
}

class Offset {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}