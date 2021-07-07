/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
// import useInterval from '../../hooks/hooks';
import * as Tone from 'tone';
import { MDCSlider } from '@material/slider';
import style from '../style.css';
import { Chart } from 'react-google-charts';


export const keys = [
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

export const timings = [
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

const KeySection = () => {
  const [keyStatus, setKeyStatus] = useState(false);
  const [note, setNote] = useState('');

  const [duration, setDuration] = useState('8n');
  const [recording, setRecording] = useState([]);

  const [recordNow, setRecordNow] = useState(false);
  const [trackLength, setTrackLength] = useState(0);
  // const [loopNote, setLoopNote] = useState('');
  // const [loopDuration, setLoopDuration] = useState('4n');

  const synthInstance = () => {
    return new Tone.Synth().toDestination();
  };

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  //held together in duct tape
  //enables the user to play the same note multiple times back to back
  useEffect(() => {
    console.log('jhjhh');
    handleNoteButtonSubmit();
    //set note here doesnt cause inifinite loop, nothing happens in above function if the note is not a defined value
    setNote('');
  }, [note]);

  const handleDurationInput = (e) => {
    setDuration(e.target.value);
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }
  
  const handleNoteButtonSubmit =  () => {
    //create a synth and connect it to the main output (your speakers)
    if(keys.find(checkKey) !== undefined){
      const keyString = (note + '4').toUpperCase();
      const timing = Tone.now();
      if(recordNow){
        setRecording(prevRecord => {
          prevRecord.push({ key: keyString, duration, timing });
          return prevRecord;
        });
      }
      let totalDuration = 0;  
      recording.forEach(item => {
        totalDuration += item.timing - totalDuration;
      });
      setTrackLength(totalDuration);
      synthInstance().triggerAttackRelease(keyString, duration);
    } 
  };

  document.addEventListener('keydown', ({ key }) => {
    // do something
  });



  
  function handleRecordNow(){
    if(recordNow){
      setRecordNow(false);
    } else {
      setRecordNow(true);
    }
  }

  function handlePlayback(){
    const now = Tone.now();
    recording.forEach(item => {
      const { key, duration, timing } = item;
      synthInstance().triggerAttackRelease(key, duration, now + timing);
    });
  }

 

  return (<>
    <p>First hit record, then play notes</p>

    {/* <button onClick={synthInstance}>Record</button> */}

    <label>
      <h2>play a note</h2>
      <form>
        <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleNoteButtonSubmit}> play a note</button>
        {/* <input onChange={handleNoteInput} value={note}   placeholder="note ( a, b, c, d, e, f, g ) "/> */}
        <input onChange={handleDurationInput} value={duration}   placeholder="4n"/>
      </form>
    </label>

    

    <h2>Same functionality as 'play a note'</h2>
    <p>If you hit record, each note will be saved along with the time and duration of the note</p>
    {
      keys.map(item => {
        return <span key={item.key} >
          <button key={item.key} className={style.keyButton} aria-label="note-key" value={item.key} onClick={handleNoteInput}>{item.key}</button>
        </span>;
      })
    }

    <button onClick={handleRecordNow}>start recording</button>
    <button onClick={handlePlayback}>Playback</button>
    
    <Chart
      width={'100%'}
      height={'200px'}
      chartType="Timeline"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'string', id: 'Track Name' },
          { type: 'string', id: 'Instrument' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' },
        ],
        [
          'Track 01',
          'Piano',
          new Date(0, 0, 0, 0, 0, trackLength),
          new Date(0, 0, 0, 0, 0, 300),
        ],
        ['Track 02', 
        'Hi hats', 
        new Date(0, 0, 0), 
        new Date(0, 0, 0)],
        [
          'President',
          'Thomas Jefferson',
          new Date(0, 0, 0),
          new Date(0, 0, 0),
        ],
      ]}
      rootProps={{ 'data-testid': '3' }}
    />

  </>


  ); 


};

export default KeySection;
