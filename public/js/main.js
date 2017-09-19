import Rotator from './Rotator.js';
import { getRadians } from './Math.js';

const rotator = new Rotator();

const alphaDOMInitial = document.querySelector('[data-rotate-alpha-initial]');
const betaDOMInitial = document.querySelector('[data-rotate-beta-initial]');
const gammaDOMInitial = document.querySelector('[data-rotate-gamma-initial]');


const alphaDOM = document.querySelector('[data-rotate-alpha]');
const betaDOM = document.querySelector('[data-rotate-beta]');
const gammaDOM = document.querySelector('[data-rotate-gamma]');




// =============================================================================
// Canvas Manipulation
// =============================================================================
const canvas = document.getElementById('Water');

// Get canvas sizing from the css values
var cWidth = parseInt(window.getComputedStyle(canvas).width, 10);
var cHeight = parseInt(window.getComputedStyle(canvas).height, 10);

// Double the canvas size for retina
canvas.width = cWidth * 2;
canvas.height = cHeight * 2;

const context = canvas.getContext("2d");


const image = document.createElement('img');
image.src = '/images/water.jpg';
image.width = '100%';

const getYOffset = (radians, adjacent) => {
  return Math.tan(radians) * adjacent;
}

const drawMask = (rotation) => {
  const yValue = canvas.height / 2;
  const yOffset = getYOffset(rotation, (canvas.height / 2));

  // Clear and Save
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save(); // [NOTE] this is crucial

  // Clipping Mask
  context.beginPath();
  context.moveTo(0, canvas.height);                // bottom left
  context.lineTo(0, yValue + yOffset);             // top left
  context.lineTo(canvas.width, yValue - yOffset);  // top right
  context.lineTo(canvas.width, canvas.height);     // bottom right
  context.closePath();
  context.clip();

  // Image Background
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  context.restore(); // [NOTE] this is crucial
}




// =============================================================================
// Rotator logic
// =============================================================================
const rotate = (values) => {
  const alpha = Math.floor(values.alpha);
  const beta = Math.floor(values.beta);
  const gamma = Math.floor(values.gamma);

  // console.log('ROTATE', rotator.initialValues);
  alphaDOM.innerHTML = alpha;
  betaDOM.innerHTML = beta;
  gammaDOM.innerHTML = gamma;

  drawMask(getRadians(alpha));
};

rotator.on('rotate', rotate);

rotator.on('init', function(values) {
  console.log('ROTATE - INIT', values);
  alphaDOMInitial.innerHTML = Math.floor(values.alpha);
  betaDOMInitial.innerHTML = Math.floor(values.beta);
  gammaDOMInitial.innerHTML = Math.floor(values.gamma);
});










// =============================================================================
// Manual Adjustment (Testing)
// =============================================================================
// context.clearRect(0, 0, canvas.width, canvas.height);

const adjustment = document.getElementById('adjust');

let adjustmentValues = {
  alpha : 0,
  beta  : 0,
  gamma : 0
};

const handleAdjustment = () => {
  console.log('HANDLE ADJUSTMENT');

  adjustmentValues.alpha += 1;

  rotate(adjustmentValues);
}

adjustment.addEventListener('click', handleAdjustment);
