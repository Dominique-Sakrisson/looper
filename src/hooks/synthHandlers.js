import React, { useEffect, useState } from 'react';

export const useSynthHandlers = () => {
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  //   const [octave, setOctave] = useState(4);
  //   const [volume, setVolume] = useState(-20);
  
  const handleDurationInput = (e) => {
    if(e._reactName === 'onClick'){
      e.preventDefault();
      
      setDuration(Number(e.target.value));
    }
    setDuration(e.target.value);
  };

  function handleShowSettings(e){
    e.preventDefault();
    console.log(duration);
    console.log(showSettings);
    if(e.target.ariaLabel === 'hide-settings' && showSettings){
      setShowSettings(false);
    }
    if(e.target.ariaLabel === 'show-settings' && !showSettings){
      setShowSettings(true);
    }
  }
  useEffect(() => {

  }, []);

  return { handleDurationInput, handleShowSettings, duration, showSettings, setDuration };
};
