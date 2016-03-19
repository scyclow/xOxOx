import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

// require('../styles/application.scss');

const App = ({ thing }) => {
  return (
    <div>
      {thing}
    </div>
  )
}

render(
  <App thing="aaaaaap"/>,
  document.getElementById('app')
);
