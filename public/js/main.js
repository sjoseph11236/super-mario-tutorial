function loadImage(url) {
  return new Promise(resolve => {

  })
}
// Create the canvas by getting the id
const canvas = document.getElementById('screen');
// Access the context with app to draw on the canvas
// The argument '2d' is a contextType. 

// A contextType is a domString 
// canvasRenderingContext2D object that repersents a two-dimensional rendering context 
// Set how the objects are presented in the canvas. 
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);