import React, { useEffect, useState } from 'react';

export const useSettings = (dur, oct, vol) => {
  const [duration, setDuration] = useState(1);
  const [octave, setOctave] = useState(4);
  const [volume, setVolume] = useState(-20);

  useEffect(() => {
    setDuration(dur);
    setOctave(oct);
    setVolume(vol);
  }, []);

  useEffect(() => {        
    setVolume(vol);
  }, [vol]);
  useEffect(() => {
    setOctave(oct);
  }, [oct]);
  useEffect(() => {
    setDuration(dur);
  }, [dur]);

  return { duration, octave, volume, setVolume };
};
