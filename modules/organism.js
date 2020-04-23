import * as MapUtils from './utilities/mapUtils.js';
import { easeInOutQuad, degToRad } from './utilities/2dUtils.js';

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

class Organism {
  constructor(worldWidth, worldHeight) {
    this.genome = [];
    for (let i = 0; i < 10; i++) {
      this.genome[i] = random(0,4);
    }

    this.waste = this.genome.filter(x => x==0).length;
    this.speed = this.genome.filter(x => x==1).length;
    this.attack = this.genome.filter(x => x==2).length;
    this.defence = this.genome.filter(x => x==3).length;

    this.size = this.speed + this.attack + this.defence;

    let hex = MapUtils.offsetToAxial({col: Math.floor(worldWidth/2), row: Math.floor(worldHeight/2)});
    this.q = hex.q;
    this.r = hex.r;

    this.direction = random(0, 6);

    this.state = {};

    this.ticks = 0;
  }

  draw(context) {
    let angle = this.direction;

    let mapCoords = MapUtils.hexToPixel(this);

    // Nice gaps beween the coloured blocks
    let waste = (this.waste * 36) / 3;

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(mapCoords.x, mapCoords.y, this.size + 4, 0, 360);
    context.fill();

    // Attack
    this.drawArc(context, 'red', 3, mapCoords.x, mapCoords.y, this.size, angle, angle += (this.attack * 36));

    // Defence
    this.drawArc(context, 'blue', 3, mapCoords.x, mapCoords.y, this.size, angle += waste, angle += (this.defence * 36));

    // Speed
    this.drawArc(context, 'green', 3, mapCoords.x, mapCoords.y, this.size, angle += waste, angle += (this.speed * 36));

    // Outlines
    this.drawArc(context, 'black', 2, mapCoords.x, mapCoords.y, this.size + 3, 0, 360);
  }

  drawArc(context, colour, lineWidth, x, y, radius, startAngle, endAngle) {
    context.lineWidth = lineWidth;
    context.strokeStyle = colour;

    context.beginPath();
    context.arc(x, y, radius, degToRad(startAngle), degToRad(endAngle));
    context.stroke();
  }

  update(delta) {
    if (this.state.moving) {
      this.ticks += delta;

      this.q = easeInOutQuad(this.ticks, this.prevQ, this.targetQ - this.prevQ, 1);
      this.r = easeInOutQuad(this.ticks, this.prevR, this.targetR - this.prevR, 1);

      if (this.ticks > 1) {
        this.q = this.targetQ;
        this.r = this.targetR;
        this.state.moving = false;
      } 
    } else {
      let newDir = random(0,3) - 1;
      this.direction += newDir;
      if (this.direction > 5) this.direction -= 5;
      if (this.direction < 0) this.direction += 5;

      let target = MapUtils.hexNeighbour(this, this.direction);

      this.targetQ = target.q;
      this.targetR = target.r;

      this.prevQ = this.q;
      this.prevR = this.r;

      this.state.moving = true;
      this.ticks = 0;
    }
  }
}

export { Organism };