import React, {useState, useEffect} from 'react'
import * as Tone from 'tone';

export const usePlayback = () => {
  const { recording } = useRecording();
  

    
  function  handlePlayback(e){
    e.preventDefault();
    recording.forEach(item => {
      const { key, duration, timing } = item;
          
      fakeSynth.volume.value = volume;
      fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
          
    });
  }

  return { handlePlayback };
  
};
