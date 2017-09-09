import Rotator from './Rotator.js';

const rotator = new Rotator();
const alphaDOM = document.querySelector('[data-rotate-alpha]');
const betaDOM = document.querySelector('[data-rotate-beta]');
const gammaDOM = document.querySelector('[data-rotate-gamma]');

rotator.on('rotate', function(options) {
  console.log('ROTATED', options.alpha, options.beta, options.gamma);
  alphaDOM.innerHTML = Math.floor(options.alpha);
  betaDOM.innerHTML = Math.floor(options.beta);
  gammaDOM.innerHTML = Math.floor(options.gamma);
});
