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

  export const sharpKeys = [
  {
    key :'c#',
  },
  {
    key : 'd#',
  },
  {
    key : 'e#',
  },
  {
    key : 'f#',
  },
  {
    key : 'g#',
  },
  {
    key : 'a#',
  },
  {
    key : 'b#',
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
const volume = -20;
const synthInstance = () => {
  return new Tone.PolySynth({
    volume,
    maxVolume: 0,
  }).toDestination();
};


const KeySection = () => {
  const [synth, setSynth] = useState(synthInstance());
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState(1);
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [volume, setVolume] = useState(volume);
 
  //track starts on load currently
  const [songData, setSongData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'Track 01',
      'Total Time',
      4000, //start
      5000, //finish
    ],
    ['Track 02', 
      'Piano', 
      0, //start
      1000, //finish
    ],
  ]);

  const [chart, setChart] = useState({
    width: '100%',
    height: '400px',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData,
    rootProps: { 'data-testid': '3' } 
  });

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      handleKeyPress(key);
    });
  }, []);
  
  useEffect(() => {
    if(!note){
      return null;
    }
    //held together in duct tape
    //enables the user to play the same note multiple times back to back
    handleNoteButtonSubmit();
    if(note){
      if(recordNow){
        const recentNote = recording[recording.length - 1];
        if(recentNote){
          setSongData(prevSongData => {
            prevSongData.push([
              `${recentNote.key}`,
              `piano`,
              Number((recentNote.timing * 1000).toFixed(4)),
              Number(recentNote.timing * 1000 + recentNote.duration * 1000)
            ]);
            return prevSongData;
          });
        }
      }
    }
    //set note here doesnt cause inifinite loop, nothing happens in above function if the note is not a defined value
    setNote('');
  }, [note]);

  const handleDurationInput = (e) => {
    console.log(e.target.value);
    setDuration(e.target.value);
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }
  
  function checkAndSetRec(keyString){
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
      checkAndSetRec(keyString);
      synth.triggerAttackRelease(keyString, duration);
    }
    if(sharpKeys.find(checkKey) !== undefined){
      const keyString = keyToKeyString();
      checkAndSetRec(keyString);
      synth.triggerAttackRelease(keyString, duration);
    }

  };
 
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleNoteInput = (e) => {
    console.log(e.target.value);
    setNote(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    setNote(e);
  };

  function handleRecordNow(){
    if(recordNow){
      setRecordNow(false);
    } else {
      setRecordNow(true);
    }
  }

  function handlePlayback(){
    // const now = Tone.now();
    recording.forEach(item => {
      const { key, duration, timing } = item;
      synth.triggerAttackRelease(key, duration, Tone.now() + timing);
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
    
    <ul className={style.trackNotes}>
      <li>Recordings</li>
      {renderRecording()}
    </ul>
    <div className={style.piano}>

      <section className={style.pianoInstructions}>
        <h2>How to record</h2>
        <span>(1)Hit record</span>
        <span>(2)Play notes</span>
        <span>(3)Hit record</span>
        <span>(4)Hit playback</span>
        <span>(4)Wait a few seconds</span>
      </section>

      <section>
        <label className={style.duration}>
          <h2>Set the duration of the note</h2>
          <p>Time (seconds)</p>
          <form >
            <input type="number" onChange={handleDurationInput} placeholder={duration}/>
          </form>
        </label>
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
            // if(['c', 'd', 'f',  'g', 'a'].includes(item.key)){
            //   return <span key={item.key} >
            //   <button key={item.key} className={`${style.keyButton} ${style[item.key]}`} aria-label="note-key" value={item.key} onClick={handleNoteInput}>{item.key}</button>
            //   <button key={item.key + '#'} className={`${style.keyButton} ${style.keyButtonSharp}`}> {item.key + '#'}</button>
            // </span>;  
            // };
            return <span key={item.key} >
              <button key={item.key} className={`${style.keyButton} ${style[item.key]}`} aria-label="note-key" value={item.key} onClick={handleNoteInput}>{item.key}</button>
            </span>;
          })
        }
      </section>
      <section className={style.itemSharp}>
        {
          keys.map(item => {
            if(['c', 'd', 'f',  'g', 'a'].includes(item.key)){
              return (
                <div key={item.key}  >
                  <button key={item.key + '#'} className={`${style.keyButtonSharp}`} aria-label="note-key" value={item.key + '#'} onClick={handleNoteInput}> {item.key + '#'}</button>
                </div>
              );  
            }
          })
        }
      </section>
    </div>
    <Chart 
      width={chart.width}
      height={chart.height}
      chartType={chart.chartType}
      loader={chart.loader}
      data={songData}
      rootProps={chart.rootProps}
    />
  </>
  ); 
};

export default KeySection;
