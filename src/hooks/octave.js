import React, { useState, useEffect } from 'react';

export const useOctave = (value) => {
  //inital seed data to setup chart
  const [octave, setOctave] = useState(value);

  useEffect(() => {
    setOctave(value);
  }, [value]);

  return { octave };
};

