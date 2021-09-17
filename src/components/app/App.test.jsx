/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render, screen,  cleanup, waitFor } from '@testing-library/react';
import App from './App';
import Synth from './synth/Synth.jsx';
import * as Tone from 'tone';

//tests fail due to not having the initial entries with memeory router
jest.mock('./modules/AudioContext.js', () => ({
  polySynth: () => [{}]
}));

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks for keys', async () => {
    const { asFragment } = render(<Synth />);
    const keys = await screen.findAllByRole('button', {
      name: 'note-key'
    });
    expect(keys).toHaveLength(12);
    expect(asFragment()).toMatchSnapshot();
  });
});



