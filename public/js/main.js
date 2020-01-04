// import SpriteSheet from './spriteSheet';

// function to load the image 
function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });

    image.src = url; 
  });
}

function loadLevel(name) {
  return fetch(`/levels/${name}.json`)
  .then(r => r.json());
}

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for(let x = x1; x2 < 25; ++x) {
      for(let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x , y);
      }
    }
  });
}

class SpriteSheet {
  constructor(image, width, height) {
    this.image = image; 
    this.width = width;
    this.height = height; 
    this.tiles = new Map();
  }
  
  define(name, x, y) {
    // save the subest of the image as buffer
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext('2d')
      .drawImage(
        this.image, 
        x * this.width, 
        y * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height);
      this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) { 
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) { 
    this.draw(name, context, x * this.width, y  * this.height);
  }
}


// Create the canvas by getting the id
const canvas = document.getElementById('screen');
// Access the context with app to draw on the canvas
// Set how the objects are presented in the canvas. 
const context = canvas.getContext('2d');

// context.fillRect(0, 0, 50, 50);

loadImage('/img/tiles.png').then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define('ground', 0, 0);
  sprites.define('sky',3, 23);

  loadLevel('1-1')
  .then(level => { 
    drawBackground(level.backgrounds[0],context, sprites);
  });



  for(let x = 0; x < 25; ++x) {
    for(let y =12; y < 14; ++y) {
      sprites.drawTile('ground', context, x , y);
    }
  }

});
// Notes: 

// The argument '2d' is a contextType. 

// A contextType is a domString 
// canvasRenderingContext2D object that repersents a two-dimensional rendering context 