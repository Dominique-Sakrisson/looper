/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import useInterval from '../../hooks/hooks';
import * as Tone from 'tone';

const KeySection = () => {
  const [keyStatus, setKeyStatus] = useState(false);
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState('8n');
  const [recording, setRecording] = useState();
  // const [recordingTime, setRecording] = useState(Tone.now());
  // const [loopNote, setLoopNote] = useState('');
  // const [loopDuration, setLoopDuration] = useState('4n');

  const keys = [
    {
      key :'c',
    },
    {
      key : 'd',
    },
    {
      key : 'e',
    },
    {
      key : 'f',
    },
    {
      key : 'g',
    },
    {
      key : 'a',
    },
    {
      key : 'b',
    }];

  useEffect(() => {
    // (recording) ? setRecording(false) : setRecording(true);
  }, [recording]);
  

  const synthInstance = () => {
    return new Tone.Synth().toDestination();
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }

  const handleNoteButtonSubmit = async (e) => {
    e.preventDefault();
    //create a synth and connect it to the main output (your speakers)
    if(keys.find(checkKey) !== undefined){
      const keyString = (note + '4').toUpperCase();
      synthInstance().triggerAttackRelease(keyString, duration);
    } else {
      throw 'fill in the note input with accurate note ( a, b, c, d, e, f, g )';
    }
  };

  document.addEventListener('keydown', ({ key }) => {
    console.log(key);
    // do something
});

  // const handleLoopButtonSubmit = async (e) => {
  //   e.preventDefault();
  //   await Tone.Transport.start();
  //   // setKeyStatus(true);
  //   let keyString = (e.key + '4').toUpperCase();
  //   let duration = '4n';
  //   const loopA = new Tone.Loop(time => {
  //     synth.triggerAttackRelease(keyString, '8n', time);
  //   }, duration).start();
  // };
  
  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  const handleDurationInput = (e) => {
    setDuration(e.target.value);
  };
  // const handleLoopNoteInput = (e) => {
  //   setLoopNote(e.target.value);
  // }
  
  // const handleLoopDurationInput = (e) => {
  //   setLoopDuration(e.target.value);
  // }

  //
  //   const keyDownMemo = useMemo(() => onKeyDown(keyStatus), keyStatus);
  
    
  return (
    <>
      <p>First hit record, then play notes</p>
      <button onClick={synthInstance}>Record</button> <span><img></img></span>
      <label>
        <h2>play a note</h2>
        <form>
          <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleNoteButtonSubmit}> play a note</button>
          <input onChange={handleNoteInput} value={note}   placeholder="note ( a, b, c, d, e, f, g ) "/>
          <input onChange={handleDurationInput} value={duration}   placeholder="4n"/>
        </form>
      </label>
      {/* <label>
          <h2>start a loop</h2>
        <form>
          <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleLoopButtonSubmit}> play a note</button>
          <input onChange={handleLoopNoteInput} value={loopNote}   placeholder='note'/>
          <input onChange={handleLoopDurationInput} value={loopDuration}   placeholder='4n'/>
        </form>
      </label> */}
    </>
  ); 


};

export default KeySection;
