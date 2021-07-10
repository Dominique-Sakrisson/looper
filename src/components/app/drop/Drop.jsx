import React, { useState } from 'react';
import * as Tone from 'tone';
import { keys, timings } from '../keys/KeySection';
const Drop = () => {
    
  const [dropStart, setDropStart] = useState('select a note');
  const [dropEnd, setDropEnd] = useState('select a note');
  const [dropDuration, setDropDuration] = useState('8n');

  const handleDropNoteInput = ({ target }) => {
    const dStart = (target.value + '4').toUpperCase();
    setDropStart(dStart);
  };
  
  const handleDropNoteInputEnd = (e) => {
    const dEnd = (e.target.value + '4').toUpperCase();
    setDropEnd(dEnd);
  };

  const handleDropDurationInput = (e) => {
    setDropDuration(e.target.value);
  };
  const handleDropSubmit = (e) => {
    e.preventDefault();
    const osc = new Tone.Oscillator().toDestination();
    // start at "C4"
    osc.frequency.value = dropStart;
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo(dropEnd, 2);
   
    // start the oscillator for 2 seconds
    osc.start().stop(dropDuration);
  };

  return (
    <label>
      <h2>Create a drop</h2>
      <span>note start: {dropStart}</span>
      <span>note end: {dropEnd}</span>
      <span> duration:  {dropDuration}</span>
      <form action="" onSubmit={handleDropSubmit}>

        <span>starting note</span>
        <select name="start" id="" onChange={handleDropNoteInput}>
          {
            keys.map(item => {
              return <option key={item} value={item.key}>{item.key} </option>;
            })
          }
        </select>
     
        <span>ending note</span>
        <select name="end" id="" onChange={handleDropNoteInputEnd}>
          {
            keys.map(item => {
              return <option key={item} value={item.key}>{item.key} </option>;
            })
          }
        </select>
        <span>Duration</span>
        <select name="" id="" onChange={handleDropDurationInput}>
          {
            timings.map(item => {
              return <option key={item} value={item.key}>{item.key} </option>;
            })
          }
        </select>
        <button>submit</button>
      </form>
      
    
    </label>
  );
};

export default Drop;
