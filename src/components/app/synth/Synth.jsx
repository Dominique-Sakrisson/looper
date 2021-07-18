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
import { keys, sharpKeys } from '../modules/Keys.js';

const keysData = keys;
const sharpKeysData = sharpKeys;
// const timings = timings;


const Synth = () => {
  const initVolume = -20;
  const [synth, setSynth] = useState();
  const [fakeSynth, setFakeSynth] = useState(polySynth);
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState(Number(1));
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [preRecording, setPreRecording] = useState([]);
  const [volume, setVolume] = useState(initVolume);
  const [octave, setOctave] = useState(Number(4));
  //track starts on load currently
  const [preSongData, setPreSongData] = useState([
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
    [
      `C4`,
      'piano',
      Number(0),
      Number(1000)
    ],
    [
      `C4`,
      'piano',
      Number(2000),
      Number(4000)
    ],
    [
      `C#4`,
      'piano',
      Number(5000),
      Number(6000)
    ],
    [
      `F#2`,
      'piano',
      Number(6000),
      Number(7000)
    ],
   
  ]);
  const [songData, setSongData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'Length',
      `time ${(recTime) ? recTime : 0}`,
      0, //start
      5000, //finish
    ],
  ]);
  const [keyDown, setKeyDown] = useState({ start: 0, end: 0, down: false });
  
  const [songListNotechart, setSongListNoteChart] = useState({
    width: '100%',
    height: '100%',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: preSongData,
    rootProps: { 'data-testid': '3' } 
  });
  const [userRecordedNotechart, setChart] = useState({
    width: '100%',
    height: '350px',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData, 
    rootProps: { 'data-testid': '5' },
  });

  const [arr, setArr] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [recTime, setRecTime] = useState(0);
  const [playing, setPlaying] = useState({
    activeRound: false,
    track: [],
    entered: [],
  });

  //starts the timer for each recording
  //picks up from previous recording state
  useInterval(songTiming, 100);

  
  //default page load 
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

      
      
      setPreRecording((prevPreRecording) => {
        preSongData.map(item => {
          if(item === preSongData[0] || item === preSongData[1]){
            return;
          }
          prevPreRecording.push({ key: item[0], duration : item[3], timing: item[2], octave });
        });
        return prevPreRecording;
        
      });
    });
  }, []); 

  //on note change
  useEffect(() => {
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
    setSongData(prevSongData => {
      prevSongData[1][1] = `time ${(recTime) ? recTime : 0}`;
      prevSongData[1][3] += recTime ;
      return prevSongData;
    });
  }, [recTime]);

  //duration was set
  const handleDurationInput = (e) => {
    if(e._reactName === 'onClick'){
      e.preventDefault();
  
      setDuration(Number(e.target.value));
    }
    setDuration(e.target.value);
  };

  //validate the key entered 
  function checkKey(item){
    if(note){
      return item.key === note;
    } 
  }

  //the function that starts the recording clock
  function songTiming() {
    if(recordNow){
      setRecTime(prevTime => {
        prevTime += .1;
        return prevTime;
      });
    } 
  }

  //validates recording bool, pushes new note
  function checkAndSetRec(keyString){
    if(recordNow){
      // const timing = Tone.now();
      setRecording(prevRecord => {
        prevRecord.push({ key: keyString, duration, timing: recTime, octave });
        return prevRecord;
      });
    }
  }

  //converts target.value of DOM node to playable string
  function keyToKeyString(){
    const keyString = (note + octave).toUpperCase();
    return keyString; 
  }

  //handles the piano being clicked 
  const handleNoteButtonSubmit =  () => {
  
    //the check ensures the synth wont sound without a valid note
    if(keysData.find(checkKey) !== undefined){
      const fakeSynth = new Tone.PolySynth({
        volume,
        maxVolume: 0,
      }).toDestination();
      const keyString = keyToKeyString();
      checkAndSetRec(keyString);
      fakeSynth.triggerAttackRelease(keyString, duration);
    }
    if(sharpKeysData.find(checkKey) !== undefined){ 
      const fakeSynth = new Tone.PolySynth({
        volume,
        maxVolume: 0,
      }).toDestination();
      const keyString = keyToKeyString();
      checkAndSetRec(keyString);
      fakeSynth.triggerAttackRelease(keyString, duration);
    }
  };
  
  //volume change
  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  //octave change
  const handleOctaveChange = ({ target }) => {
    setOctave(target.value);
  };

  //a note is clicked
  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };
  
  //a keyboard button with valid note is pressed
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

  //user begins recording a track
  function handleRecordNow(e){
    e.preventDefault();
    (recordNow) ? setRecordNow(false) : setRecordNow(true);
  }

  //user selects playback track
  function handlePlayback(e){
    e.preventDefault();
    recording.forEach(item => {
      const { key, duration, timing } = item;
      
      fakeSynth.volume.value = volume;
      fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
      
    });
  }
  //user selects playback track
  function handlePrePlayback(e){
    
    preSongData.forEach(item => {
      if(item === preSongData[0] || item === preSongData[1]){
        return;
      }
      const key = item[0];
      const duration = (item[3] - item[2]) * .001;
      const timing = item[3] * .001;
      fakeSynth.volume.value = volume;
      fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
    });
  }

  //shows a detailed list of each note when user plays
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

  //user toggles the instructions visible
  function handleShowInstructions(){
    (showInstructions) ? setShowInstructions(false) : setShowInstructions(true);
  }


  //half assed attempt at a tracking bar for current place in the track
  const compStyle = {
    zIndex: '2',
    position: 'absolute',
    width: '5px',
    height: '200px',
    border: 'solid 1px black',
    left: (recTime > 0) ? (recTime * 100) + 67 : 67,
   
  };


  //user toggles the settings visible
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
      <span style={compStyle}>g</span>
      <Chart 
        width={userRecordedNotechart.width}
        height={userRecordedNotechart.height}
        chartType={userRecordedNotechart.chartType}
        loader={userRecordedNotechart.loader}
        data={songData}
        rootProps={userRecordedNotechart.rootProps}
        
      />
      

      <button onClick={handlePrePlayback}>play pre made track</button>
    </section>


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
        octave={Number(octave)}
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
