import React from 'react';
import ReactDOM from 'react-dom';
import NoMatchScreen from '.';

describe('NoMatchScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoMatchScreen />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
