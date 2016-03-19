import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import colors from './colors';

// require('../styles/application.scss');

class App extends React.Component {
  state = {
    dots: [],
    fill: colors.randHex()
  }

  componentDidMount() {
    const fps = 25;

    setInterval(() => {
      const dots = this.makeDots()
      this.setState({ dots })
    }, 1000/fps);

    setInterval(() => {
      this.setState({ fill: colors.randHex()})
    }, 2000)
  }

  makeDots() {
    let dots = [];
    const amount = _.random(700,900);
    const {fill} = this.state;
    _.times(amount, () => {
      dots.push({
        cx: _.random(0, 1240),
        cy: _.random(0, 800),
        r: _.random(0, 40),
        fill
      });
    });

    return dots;
  }

  render() {
    return (
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {this.state.dots.map(dot => <circle {...dot} />)}
      </svg>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);
