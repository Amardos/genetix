import { getCoords } from './mapUtils.js';

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeLinear (t, b, c, d) {
    return c * t / d + b;
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
    this.x = random(0, worldWidth);
    this.y = random(0, worldHeight);

    this.direction = random(0, 360);
    
    this.minX = 1;
    this.maxX = worldWidth - 1;
    this.minY = 1;
    this.maxY = worldHeight - 1;

    this.state = {};

    this.ticks = 0;
  }

  draw(context) {
    let angle = this.direction;

    let mapCoords = getCoords(this.x, this.y);

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

      this.x = easeInOutQuad(this.ticks, this.prevX, this.targetX - this.prevX, 1);
      this.y = easeInOutQuad(this.ticks, this.prevY, this.targetY - this.prevY, 1);

      if (this.ticks > 1) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.state.moving = false;
      } 
    } else {
      let newDir = random(0, 6);

      switch(newDir) {
        case 0:
          // E
          this.targetX = this.x + 1;
          this.targetY = this.y;
          console.log('East');
          break;
        case 1:
          // SE
          this.targetX = (this.y % 2 == 0) ? this.x : this.x + 1;
          this.targetY = this.y + 1;
          console.log('South-east');
          break;
        case 2:
          // SW
          this.targetX = (this.y % 2 == 0) ? this.x - 1 : this.x;
          this.targetY = this.y + 1;
          console.log('South-west');
          break;
        case 3:
          // W
          this.targetX = this.x - 1;
          this.targetY = this.y;
          console.log('West');
          break;          
        case 4:
          // NW
          this.targetX = (this.y % 2 == 0) ? this.x - 1 : this.x;
          this.targetY = this.y - 1;
          console.log('North-west');
          break;
        case 5:
          // NE
          this.targetX = (this.y % 2 == 0) ? this.x : this.x + 1;
          this.targetY = this.y - 1;
          console.log('North-east');
          break;
      }

      this.prevX = this.x;
      this.prevY = this.y;

      console.log(`(${this.x},${this.y}) - (${this.prevX},${this.prevY}) - (${this.targetX},${this.targetY})`);

      this.state.moving = true;
      this.ticks = 0;
    }
  }
}

export { Organism };