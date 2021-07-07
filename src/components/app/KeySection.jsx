/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import useInterval from '../../hooks/hooks';
import * as Tone from 'tone';
import { MDCSlider } from '@material/slider';
import style from './style.css';



const KeySection = () => {
  const [keyStatus, setKeyStatus] = useState(false);
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState('8n');
  const [recording, setRecording] = useState();

  const [dropStart, setDropStart] = useState('select a note');
  const [dropEnd, setDropEnd] = useState('select a note');
  const [dropDuration, setDropDuration] = useState('8n');

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

  const timings = [
    {
      key :'+1',
    },
    {
      key : '+1.5',
    },
    {
      key : '+1.75',
    },
    {
      key : '+2',
    },
    {
      key : '+2.25',
    },
    {
      key : '+2.5',
    },
    {
      key : '+3',
    },
    {
      key : '+4',
    }
  ];

  useEffect(() => {
    // (recording) ? setRecording(false) : setRecording(true);
  }, [recording]);
  

  const synthInstance = () => {
    return new Tone.Synth().toDestination();
  };

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  const handleDurationInput = (e) => {
    setDuration(e.target.value);
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }
  function checkKey2(item){
    if(dropStart){
      return item.key === dropStart;
    } 
  }
  function checkKey3(item){
    if(dropEnd){
      return item.key === dropEnd;
    } 
  }

  const handleNoteButtonSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    //aria label only exists for note-keys that will be for piano keys
    if(e.target.ariaLabel !== null){
      console.log(e, note, duration, 'ahahhaha');
      //create a synth and connect it to the main output (your speakers)
      if(keys.find(checkKey) !== undefined){
        const keyString = (e.target.value + '4').toUpperCase();
        console.log(duration);
        synthInstance().triggerAttackRelease(keyString, duration);
      } else {
        throw 'lalalala ( a, b, c, d, e, f, g )';
      }
    }
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
  
 
  // const handleLoopNoteInput = (e) => {
  //   setLoopNote(e.target.value);
  // }
  
  // const handleLoopDurationInput = (e) => {
  //   setLoopDuration(e.target.value);
  // }

  //
  //   const keyDownMemo = useMemo(() => onKeyDown(keyStatus), keyStatus);
  

  const handleDropNoteInput = (e) => {
    const dStart = (e.target.value + '4').toUpperCase();
    console.log(dStart);
    setDropStart(dStart);
  };
  
  const handleDropNoteInputEnd = (e) => {
    const dEnd = (e.target.value + '4').toUpperCase();
    setDropEnd(dEnd);
  };
  
  function keysPlay(e){
    handleNoteInput(e);
    handleNoteButtonSubmit(e);
  }
  const handleDropDurationInput = (e) => {
    setDropDuration(e.target.value);
  };
  const handleDropSubmit = (e) => {
    e.preventDefault();

    const osc = new Tone.Oscillator().toDestination();
    console.log(dropStart, dropEnd);
    // if(keys.find(checkKey2) !== undefined){
    // start at "C4"
    osc.frequency.value = dropStart;
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo(dropEnd, 2);
    // start the oscillator for 2 seconds
    osc.start().stop(dropDuration);
    // } else {
    //   throw 'fill in the note input with accurate note ( a, b, c, d, e, f, g )';
    // }
    
    
  };
  // and will print the time exactly once a second apart.
  const clock = new Tone.Clock(time => {
    console.log(time);
  }, 1);
  clock.start();
    
  return (<>
    <p>First hit record, then play notes</p>

    <button onClick={synthInstance}>Record</button>

    <label>
      <h2>play a note</h2>
      <form>
        <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleNoteButtonSubmit}> play a note</button>
        <input onChange={handleNoteInput} value={note}   placeholder="note ( a, b, c, d, e, f, g ) "/>
        <input onChange={handleDurationInput} value={duration}   placeholder="4n"/>
      </form>
    </label>

    <label>
      <h2>Create a drop</h2>
      <p>note start: {dropStart}</p>
      <p>note end: {dropEnd}</p>
      <p> duration:  {dropDuration}</p>
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
    {
      keys.map(item => {
        return <span key={item.key} >
          <button className={style.keyButton} aria-label="note-key" value={item.key} onClick={keysPlay}>{item.key}</button>
        </span>;
      })
    }
     
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
