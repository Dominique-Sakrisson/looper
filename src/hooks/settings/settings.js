import React, { useEffect, useState } from 'react';

export const useSettings = (dur, oct, vol) => {
  const [duration, setDuration] = useState(dur);
  const [octave, setOctave] = useState(oct);
  const [volume, setVolume] = useState(vol);

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
