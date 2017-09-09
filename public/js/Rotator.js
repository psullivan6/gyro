export default class Rotator {
  constructor(props) {
    this.props = props;

    this.calls = {};
    this.events = {};

    this.attachBindings();
    this.attachListeners();
  }

  attachBindings() {
    this.handleOrientation = this.handleOrientation.bind(this);
  }

  attachListeners() {
    window.addEventListener('deviceorientation', this.handleOrientation, true);
  }

  on(key, callback, useLastCall) {
    if (!this.events[key]) {
      this.events[key] = [];
    }

    this.events[key].push(callback);
    if (useLastCall && typeof this.calls[key] !== 'undefined') {
      callback(this.calls[key]);
    }
  }

  handleOrientation(event) {
    console.log('handleOrientation', event);
    const key = 'rotate';
    const data = {
      alpha : event.alpha,
      beta  : event.beta,
      gamma : event.gamma
    };

    this.calls[key] = data || null;
    if (this.events[key]) {
      this.events[key].forEach(callback => callback(data));
    }
  }
}