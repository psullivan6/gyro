import Rotator from './Rotator.js';

const rotator = new Rotator();

const alphaDOMInitial = document.querySelector('[data-rotate-alpha-initial]');
const betaDOMInitial = document.querySelector('[data-rotate-beta-initial]');
const gammaDOMInitial = document.querySelector('[data-rotate-gamma-initial]');


const alphaDOM = document.querySelector('[data-rotate-alpha]');
const betaDOM = document.querySelector('[data-rotate-beta]');
const gammaDOM = document.querySelector('[data-rotate-gamma]');

rotator.on('rotate', function(values) {
  // console.log('ROTATE', rotator.initialValues);
  alphaDOM.innerHTML = Math.floor(values.alpha);
  betaDOM.innerHTML = Math.floor(values.beta);
  gammaDOM.innerHTML = Math.floor(values.gamma);
});

rotator.on('init', function(values) {
  console.log('ROTATE - INIT', values);
  alphaDOMInitial.innerHTML = Math.floor(values.alpha);
  betaDOMInitial.innerHTML = Math.floor(values.beta);
  gammaDOMInitial.innerHTML = Math.floor(values.gamma);
});
