import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import colors from './colors';

const BASE_COLOR = '#FF0000'

class App extends React.Component {
  state = {
    dots: [],
    fill: '#a7fd90'
  }

  componentDidMount() {
    const fps = 25;

    setInterval(this.makeDots.bind(this), 1000/fps);

    document.onmousemove = (e) => {
      this.setState({ fill: this.getColor(e) })
    };

    document.onclick = (e) => {
      document.body.style['background-color'] = colors.randHex();
    }
  }

  getColor(e) {
    const hueChange    = Math.floor((e.clientX / window.innerWidth) * 360);
    const maxSatChange = 0.66;
    const satChange    = - (maxSatChange) + ((e.clientY / window.innerHeight) * maxSatChange);

    return colors.applyToHex(BASE_COLOR, { h: hueChange, s: satChange });
  }

  makeDots() {
    let dots = [];
    const baseW   = 1280;
    const baseR   = 47
    const adjust  = window.innerWidth / baseW;
    const minDots = 700 * adjust;
    const maxDots = 900 * adjust;
    const maxR    = baseR - ((baseR * (1 - adjust)) / 2);

    const amount   = _.random(minDots, maxDots);
    const { fill } = this.state;

    _.times(amount, () => {
      dots.push({
        cx: _.random(0, window.innerWidth),
        cy: _.random(0, window.innerHeight),
        r:  _.random(0, maxR),
        fill
      });
    });

    this.setState({ dots })
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
