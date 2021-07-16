/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import style from '../style.css';
import { Chart } from 'react-google-charts';
import Drop from '../drop/Drop';
import Settings from '../settings/Settings';
import { useInterval } from '../../../hooks/hooks';
import Instructions from '../instructions/Instructions';

import { polySynth } from '../modules/AudioContext';
import KeySection from '../keys/KeySection';
import Playback from './Playback';


// console.log(JSON.stringify(polySynth()));
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

// const synthInstance = () => {
//   return new Tone.PolySynth({
//     volume,
//     maxVolume: 0,
//   }).toDestination();
// };

const Synth = () => {
    const initVolume = -20;
  const [synth, setSynth] = useState();
  const [fakeSynth, setFakeSynth] = useState(polySynth);
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState(Number(1));
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [volume, setVolume] = useState(initVolume);
  const [octave, setOctave] = useState(4);
  //track starts on load currently
  const [songData, setSongData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'Sample',
      'Sample Note',
      0, //start
      (recTime > 0) ? recTime * 1000 : 5000, //finish
    ],
  ]);
  const [keyDown, setKeyDown] = useState({ start: 0, end: 0, down: false });

  const [userRecordedNotechart, setChart] = useState({
    width: '100%',
    height: '100%',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData,
    rootProps: { 'data-testid': '3' } 
  });
  const [arr, setArr] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [recTime, setRecTime] = useState(0);


  useEffect(() => {
    let start;
    let end;
    let delta;

    document.addEventListener('keydown', ({ key }) => {
      start = Number(new Date());
      setArr(prevArr => {
        prevArr.push(key);
        return prevArr;
      });
      if(arr[arr.length - 1] !== arr[arr.length - 2]){
        setKeyDown(prevKeyDown => {
          prevKeyDown.down = true;
          prevKeyDown.start = Number(start);
          if(keyDown.start - prevKeyDown.start > -1000){
            return prevKeyDown;
          }
          return keyDown;
        });
        if(keyDown.start && !keyDown.end){
          handleKeyPress(key);
        }  
      } 
    });
    document.addEventListener('keyup', ({ key }) => {
      end = Number(new Date());
      setKeyDown(prevKeyDown => {
        prevKeyDown.down = false;
        prevKeyDown.end = end;
        return prevKeyDown;
      });
      delta = keyDown.end - keyDown.start;
      
      setDuration((delta / 1000 > 0) ? delta / 1000 : .01);
      
      handleKeyPress(key);
    });
  }, []); 

  useEffect(() => {
    //enables the user to play the same note multiple times back to back
    handleNoteButtonSubmit();
    if(note){
      if(recordNow){
        const recentNote = recording[recording.length - 1];
        if(recentNote){
          setSongData(prevSongData => {
            prevSongData.push([
              `${recentNote.key}`,
              'piano',
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

  useEffect(() => {
    if(!synth){
      setSynth(polySynth);
    }
  }, [recordNow]);

  const handleDurationInput = (e) => {
    if(e._reactName === 'onClick'){
      e.preventDefault();
  
      setDuration(Number(e.target.value));
    }
    setDuration(e.target.value);
  };

  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }

  useInterval(songTiming, 100);

  function songTiming() {
    if(recordNow){
      setRecTime(prevTime => {
        prevTime += .1;
        return prevTime;
      });
    } 
  }

  function checkAndSetRec(keyString){
    if(recordNow){
      // const timing = Tone.now();
      setRecording(prevRecord => {
        prevRecord.push({ key: keyString, duration, timing: recTime, octave });
        return prevRecord;
      });
    }
  }

  function keyToKeyString(){
    const keyString = (note + octave).toUpperCase();
    return keyString; 
  }

  const handleNoteButtonSubmit =  () => {
    //different paths depending on our recording state
    if(recordNow){
      if(!synth){
        checkAndSetRec(keyToKeyString());
        //the check ensures the synth wont sound without a valid note
        if(keys.find(checkKey) !== undefined){
          const keyString = keyToKeyString();
          checkAndSetRec(keyString);
          synth.volume.value = volume;
          synth.triggerAttackRelease(keyString, duration);
        }
        if(sharpKeys.find(checkKey) !== undefined){
          const keyString = keyToKeyString();
          checkAndSetRec(keyString);
          synth.volume.value = volume;
          synth.triggerAttackRelease(keyString, duration);
        }
      }
    }
    
    //the check ensures the synth wont sound without a valid note
    if(keys.find(checkKey) !== undefined){
      const fakeSynth = new Tone.PolySynth({
        volume,
        maxVolume: 0,
      }).toDestination();
      const keyString = keyToKeyString();
      checkAndSetRec(keyString);
      fakeSynth.triggerAttackRelease(keyString, duration);
    }
    if(sharpKeys.find(checkKey) !== undefined){ 
      const fakeSynth = new Tone.PolySynth({
        volume,
        maxVolume: 0,
      }).toDestination();
      const keyString = keyToKeyString();
      checkAndSetRec(keyString);
      fakeSynth.triggerAttackRelease(keyString, duration);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleOctaveChange = ({ target }) => {
    setOctave(target.value);
  };

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if(e === '1'){
      setNote('c#');
    }
    if(e === '2'){
      setNote('d#');
    }
    if(e === '3'){
      setNote('f#');
    }
    if(e === '4'){
      setNote('g#');
    }
    if(e === '5'){
      setNote('a#');
    }
    setNote(e);
  };

  function handleRecordNow(e){
    e.preventDefault();
    (recordNow) ? setRecordNow(false) : setRecordNow(true);
  }

  function handlePlayback(e){
    e.preventDefault();
    recording.forEach(item => {
      const { key, duration, timing } = item;
      fakeSynth.volume.value = volume;
      fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
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

  function handleShowInstructions(){
    (showInstructions) ? setShowInstructions(false) : setShowInstructions(true);
  }

  function handleShowSettings(e){
    e.preventDefault();
    if(e.target.ariaLabel === 'hide-settings' && showSettings){
      setShowSettings(false);
    }
    if(e.target.ariaLabel === 'show-settings' && !showSettings){
      setShowSettings(true);
    }
  }

  return (<>
    
    <ul className={style.trackNotes}>
      <li>Recordings</li>
      {renderRecording()}
    </ul>

    <section className={style.chart}>
      <Chart 
        width={userRecordedNotechart.width}
        height={userRecordedNotechart.height}
        chartType={userRecordedNotechart.chartType}
        loader={userRecordedNotechart.loader}
        data={songData}
        rootProps={userRecordedNotechart.rootProps}
      />
    </section>
    {/* <button onClick={handlePlayback}>Playback</button>
    <button onClick={handleRecordNow}>record</button> 
    <div className={(recordNow) ?  style.light : style.dark}></div> */}

    <Playback 
    handlePlayback={handlePlayback} 
    handleRecordNow={handleRecordNow} 
    recordNow={recordNow}
    showInstructions={showInstructions}
    handleShowInstructions={handleShowInstructions}/>

    <div className={style.piano}>
      <div className={style.keyBoard}>
        <KeySection handleNoteInput={handleNoteInput} />
      </div>
      
      <Settings 
        volume={volume}
        octave={octave}
        duration={duration}
        recordNow={recordNow}
        showSettings={showSettings} 
        showInstructions={showInstructions}
        handlePlayback={handlePlayback}
        handleRecordNow={handleRecordNow}
        handleShowSettings={handleShowSettings}
        handleOctaveChange={handleOctaveChange} 
        handleVolumeChange={handleVolumeChange}
        handleDurationInput={handleDurationInput}
        handleShowInstructions={handleShowInstructions} 
      />

    </div>
    
    
    <Drop />
    <Instructions showInstructions={showInstructions} handleShowInstructions={handleShowInstructions} 
    />
    
  </>
  ); 
};

export default Synth;
