import * as Tone from 'tone';

export const polySynth = (volume) => {
  return new Tone.PolySynth({
    volume,
    maxVolume: 0,
  }).toDestination();    
};
