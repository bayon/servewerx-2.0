import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
 
 // REFERENCE: https://www.robinwieruch.de/react-testing-library
describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
    //screen.findAllByText('Resume');

  });
});