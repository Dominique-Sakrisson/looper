import React, { useEffect, useState } from 'react';

export const useSynthHandlers = () => {
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const [octave, setOctave] = useState(3);
  const [volume, setVolume] = useState(0);
  
  const handleDurationInput = (e) => {
    if(e._reactName === 'onClick'){
      e.preventDefault();
      
      setDuration(Number(e.target.value));
    }
    setDuration(e.target.value);
  };

  function handleShowSettings(e){
    e.preventDefault();

    if(!showSettings){
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  }
  useEffect(() => {

  }, []);

  return { handleDurationInput, handleShowSettings, duration, showSettings, setDuration, volume, setVolume, octave, setOctave };
};
