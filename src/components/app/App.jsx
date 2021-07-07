/* eslint-disable max-len */
import React from 'react';
import KeySection from './keys/KeySection';
import Drop from './drop/Drop'

export default function App() {
  return <>
    <h1>Select a note, (c, d, e, a..) and the time either in seconds or tempo relative timings </h1>

    <KeySection />
    <Drop />
  </>;
}
