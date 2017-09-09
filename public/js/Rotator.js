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

  trigger(key, data) {
    this.calls[key] = data || null;
    if (this.events[key]) {
      this.events[key].forEach(callback => callback(data));
    }
  }

  handleOrientation(event) {
    const key = 'rotate';
    const values = {
      alpha : event.alpha,
      beta  : event.beta,
      gamma : event.gamma
    };

    if ((this.initialValues == null) && ((values.beta !== 0) && (values.gamma !== 0))) {
      console.log('CONDITION MET', values);
      this.initialValues = values;
      console.log('this.initialValues', this.initialValues);
      this.trigger('init', values);
    }

    this.trigger(key, values);
  }
}