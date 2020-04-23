import * as MapUtils from './mapUtils.js';

function getHexColour(value) {
  switch(value) {
    case 10:
      return '#FFFAFA'; // Snow
      break;
    case 9:
      return '#483E34'; // Mountain
      break;
    case 8:     
      return '#A26040'; // Hills
      break;
    case 7:    
      return '#CE8D4D'; // Foothills
      break;  
    case 6:      
      return '#378816'; // Forest
      break;
    case 5:     
      return '#569C1E'; // Grass
      break; 
    case 4:      
      return '#85C458'; // Plains
      break;
    case 3:
      return '#ebecb8'; // Sand
      break;
    case 2:
      return '#a6e0e7'; // Shallows
      break;
    case 1:
      return '#82c3f3'; // Water
      break;
    case 0:
      return '#69aaee'; // Deep ocean
      break;
  }
}

class MapCell {
  constructor(x, y, value) {
    let hex = MapUtils.offsetToAxial(x, y);
    this.q = hex.q;
    this.r = hex.r;
    this.setValue(value);
  }

  setValue(value) {
    this.value = value;
    this.colour = getHexColour(value);
  }
}

export { MapCell }