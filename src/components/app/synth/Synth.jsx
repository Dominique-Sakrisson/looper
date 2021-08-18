/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Chart } from 'react-google-charts';
import { polySynth } from '../modules/AudioContext';
import { useInterval } from '../../../hooks/hooks';
import { useSettings } from '../../../hooks/settings/settings';
import { useSynthHandlers } from '../../../hooks/synthHandlers';
import { keys, sharpKeys } from '../modules/Keys.js';
import Settings from '../settings/Settings';
import Instructions from '../instructions/Instructions';
import KeySection from '../keys/KeySection';
import Playback from './Playback';
import style from '../style.css';

const keysData = keys;
const sharpKeysData = sharpKeys;

const Synth = () => {
  const initVolume = -20;
  const [synth, setSynth] = useState();
  const [fakeSynth, setFakeSynth] = useState(polySynth);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [recordingName, setRecordingName] = useState('');
  // const { volume, setVolume } = useSettings(volume);
  // const [octave, setOctave] = useState(Number(4));
  // const [oct, setOct] = useState(4);
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
  const [userChartConfig, setChart] = useState({
    width: '100%',
    height: '350px',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData, 
    rootProps: { 'data-testid': '5' },
  });
  const [recChart, setRecChart] = useState(<Chart {...userChartConfig}/>);
  const [arr, setArr] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const { handleShowSettings, handleDurationInput, showSettings, duration, setDuration, volume, setVolume, octave, setOctave } = useSynthHandlers();

  //starts the timer for each recording
  //picks up from previous recording state
  useInterval(songTiming, 100);

  
  //default page load 
  useEffect(() => {
    let start;
    let end;
    let delta;
    setChart({
      width: '100%',
      height: '350px',
      chartType: 'Timeline',
      loader : '<div>Loading Chart</div>',
      data: songData, 
      rootProps: { 'data-testid': '5' },
    });
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
    setOctave(octave);
    setSongData(songData);
  }, []); 


  //on note change
  useEffect(() => {
    if(!saving){
      handleNoteButtonSubmit();
    }
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
        
          setRecChart(<Chart {...userChartConfig}/>);
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
      console.log(volume);
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


  function handleSaveTrack(){
    if(recording.length < 1){
      alert('Please record notes before saving');
      return;
    }
    if(!saving){
      setSaving(true);
    } else {
      setSaving(false);
    }

    const prevUserRecord = JSON.parse(localStorage.getItem('trackList'));

  

    const localArr = [];

    if(!prevUserRecord && recording.length > 0){
      const toAdd = {
        name: recordingName,
        recording, 
      };
      if(toAdd.name){
        localArr.push(toAdd);
        console.log(localArr, 'eeeeeeeeeeeeeeeee');
        localStorage.setItem('trackList', JSON.stringify(localArr));
        return;
      }
    }
    

    if(prevUserRecord && recording.length > 0){
      console.log(localArr, 'localarray');
      const toAdd = {
        name: recordingName,
        recording,
      };
    
      if(toAdd.name){
        prevUserRecord.push(toAdd);
        localArr.push(...prevUserRecord);
        localStorage.setItem('trackList', JSON.stringify(localArr));
      }
    }

  }

  function handleRecordingNameChange(e){
    setRecordingName(e.target.value);
  }
 console.log(volume, 'eyyy');
  return (<>
    {
      (saving) ? <> <button onClick={handleSaveTrack}>Confirm</button> <input onChange={handleRecordingNameChange} type="text" placeholder='Enter name here, hit confirm' /> </> :  
        <button onClick={handleSaveTrack}>Save Track</button>
    }

    <ul className={style.trackNotes}>
      <li>Recordings</li>
      {renderRecording()}
    </ul>

    <Playback 
      handlePlayback={handlePlayback} 
      handleRecordNow={handleRecordNow} 
      recordNow={recordNow}
      showInstructions={showInstructions}
      handleShowInstructions={handleShowInstructions}
    />

    <Settings 
      duration={duration}
      volume={volume}
      octave={octave}
      recordNow={recordNow}
      showSettings={showSettings} 
      showInstructions={showInstructions}
      handlePlayback={handlePlayback}
      handleShowSettings={handleShowSettings}
      handleOctaveChange={handleOctaveChange} 
      handleVolumeChange={handleVolumeChange}
      handleDurationInput={handleDurationInput}
      handleShowInstructions={handleShowInstructions} 
    />

    <div className={style.piano}>   
      <div className={style.keyBoard}>
        <KeySection handleNoteInput={handleNoteInput} />
      </div>
    </div>

    <section className={style.chart}>
      <span style={compStyle}></span>
      {recChart}   
    </section>

    <Instructions showInstructions={showInstructions} handleShowInstructions={handleShowInstructions} 
    />
  </>
  ); 
};

export default Synth;
