/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render, screen,  cleanup, waitFor } from '@testing-library/react';
import App from './App';
import * as Tone from 'tone';


jest.mock('./modules/AudioContext.js', () => ({
  polySynth: () => [{}]
}));

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    const { asFragment } = render(<App />);
    console.log(asFragment());
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks for keys', async () => {
    const { asFragment } = render(<App />);
    console.log(asFragment());
    
    const keys = await screen.findAllByRole('button', {
      name: 'note-key'
    });

    expect(asFragment()).toMatchSnapshot();
  });
});



