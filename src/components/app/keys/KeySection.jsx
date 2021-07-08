/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useInterval } from '../../../hooks/hooks' 
import * as Tone from 'tone';
import { MDCSlider } from '@material/slider';
import style from '../style.css';
import { Chart } from 'react-google-charts';
import speaker from './speaker.png'


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
  const [duration, setDuration] = useState(1);

  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [volume, setVolume] = useState(0);
  //track starts on load currently
  const [trackLength, setTrackLength] = useState(0);
  const [userTrack, setUserTrack] = useState([]);
  // const [loopNote, setLoopNote] = useState('');
  // const [loopDuration, setLoopDuration] = useState('4n');

  const synthInstance = () => {
    return new Tone.Synth({
      volume,
      maxVolume: 0,
    }).toDestination();
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    console.log(e);
    setNote(e);
    // handleNoteButtonSubmit();
  };

  // console.log(Tone.now());  
  useInterval(() => {
    setTrackLength(Tone.now());
  }, 1000);


  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      handleKeyPress(key);
    });
    setTrackLength(Tone.now());

  }, []);

  

  //held together in duct tape
  //enables the user to play the same note multiple times back to back
  useEffect(() => {
    console.log(note, 'note');
    handleNoteButtonSubmit();
    //set note here doesnt cause inifinite loop, nothing happens in above function if the note is not a defined value
    setNote('');
  }, [note]);

  useEffect(() => {
    if(!recordNow){
      console.log(...recording);
      const rec = recording;
      const arr = [];
      rec.map(item => {
        setUserTrack(prevUserTrack => {
          arr.push({
            note: item.key,
            start: item.timing,
            end: item.timing + item.duration
          });
          return arr;
          // console.log(prevUserTrack);
          // // prevUserTrack.push(item);
          // return rec;
        });
      });
      console.log(rec);
      console.log(userTrack);
    
    }
    
  }, [recordNow]);

  const handleDurationInput = (e) => {
    setDuration(e.target.value);
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }
  
  function checkAndSetRecording(keyString){
    if(recordNow){
      const timing = Tone.now();
      setRecording(prevRecord => {
        prevRecord.push({ key: keyString, duration, timing });
        return prevRecord;
      });
    }
  }

  function keyToKeyString(){
    const keyString = (note + 4).toUpperCase();
    return keyString; 
  }

  const handleNoteButtonSubmit =  () => {
    //create a synth and connect it to the main output (your speakers)
    //check if user entered key is a real musical note
    if(keys.find(checkKey) !== undefined){
      const keyString = keyToKeyString();
      checkAndSetRecording(keyString);

      let totalDuration = 0; 

      recording.forEach(item => {
        totalDuration += item.timing - totalDuration;
      });

      // setTrackLength(Tone.now());
      synthInstance().triggerAttackRelease(keyString, duration);
    } 
  };

 

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

  function renderRecording(){
    const list = recording.map((item, index) => {
      index++;
      const { key, duration, timing } = item;
      return <li key={`${key + duration + timing}`}>
        <span>({index})</span>
        <span>{key} </span>
        <span>{duration} </span>
        <span>{timing} </span>
      </li>;
    });
   
    return list;
  }

  return (<>
    <p>First hit record, then play notes</p>
    <label>
      <h2>Set the duration of the note</h2>
      <p>Time (in seconds, decimals for under a second)</p>
      <form>
        {/* <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleNoteButtonSubmit}> play a note</button> */}
        <input onChange={handleDurationInput} value={duration}   placeholder="4n"/>
      </form>
    </label>
    <ul className={style.trackNotes}>
      <li>Your recorded notes go here</li>
      {renderRecording()}
    </ul>
    <div className={style.piano}>
      <section className={style.pianoInstructions}>
        <h2>Heres some piano keys for you</h2>
        <p>(1)Hit record</p>
        <p>(2)Play notes</p>
        <p>(3)Hit record</p>
        <p>(4)Hit playback</p>
        <p>(4)Wait a few seconds</p>
      </section>
      <section className={style.playbackControls}>
        <button onClick={handlePlayback}>Playback</button>
        <button onClick={handleRecordNow}>record</button> 
        <div className={(recordNow) ?  style.light : style.dark}></div>
        <div className={style.volume}>
          <img src={speaker} width="20px" alt="volume speaker icon" />
          <input onChange={handleVolumeChange} type="range" min="-40" max="0" value={volume} />
        </div>
      </section>
      <section className={style.keys}>
        {
          keys.map(item => {
            return <span key={item.key} >
              <button key={item.key} className={style.keyButton} aria-label="note-key" value={item.key} onClick={handleNoteInput}>{item.key}</button>
            </span>;
          })
        }

      </section>
    </div>
    
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
          'Total Time',
          new Date(0, 0, 0, 0, 0, 0),
          new Date(0, 0, 0, 0, 0, trackLength),
        ],
        ['Track 02', 
          'Piano', 
          new Date(0, 0, 0, 0, 0, 0), 
          new Date(0, 0, 0, 0, 0, 0)],
      ]}
      rootProps={{ 'data-testid': '3' }}
    />
   
  </>
  ); 
};

export default KeySection;
