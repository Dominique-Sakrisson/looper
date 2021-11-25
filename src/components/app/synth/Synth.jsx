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

import { keyToKeyString} from './synthHelper';
import useUserChartConfig from '../../../hooks/chart/useUserChartConfig';
import useSongData from '../../../hooks/chart/useSongData';
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
    
    // ['C1', '', '', ''],
    // ['C#1', '', '', ''],
    // ['D1', '', '', ''],
    // ['D#1', '', '', ''],
    // ['E1', '', '', ''],
    // ['F1', '', '', ''],
    // ['F#1', '', '', ''],
    // ['G1', '', '', ''],
    // ['G#1', '', '', ''],
    // ['A1', '', '', ''],
    // ['A#1', '', '', ''],
    // ['B1', '', '', ''],
    // ['C2', '', '', ''],
    // ['C#2', '', '', ''],
    // ['D2', '', '', ''],
    // ['D#2', '', '', ''],
    // ['E2', '', '', ''],
    // ['F2', '', '', ''],
    // ['F#2', '', '', ''],
    // ['G2', '', '', ''],
    // ['G#2', '', '', ''],
    // ['A2', '', '', ''],
    // ['A#2', '', '', ''],
    // ['B2', '', '', ''],
    ['C3', '', '', ''],
    ['C#3', '', '', ''],
    ['D3', '', '', ''],
    ['D#3', '', '', ''],
    ['E3', '', '', ''],
    ['F3', '', '', ''],
    ['F#3', '', '', ''],
    ['G3', '', '', ''],
    ['G#3', '', '', ''],
    ['A3', '', '', ''],
    ['A#3', '', '', ''],
    ['B3', '', '', ''],
    // ['C4', '', '', ''],
    // ['C#4', '', '', ''],
    // ['D4', '', '', ''],
    // ['D#4', '', '', ''],
    // ['E4', '', '', ''],
    // ['F4', '', '', ''],
    // ['F#4', '', '', ''],
    // ['G4', '', '', ''],
    // ['G#4', '', '', ''],
    // ['A4', '', '', ''],
    // ['A#4', '', '', ''],
    // ['B4', '', '', ''],
    // ['C5', '', '', ''],
    // ['C#5', '', '', ''],
    // ['D5', '', '', ''],
    // ['D#5', '', '', ''],
    // ['E5', '', '', ''],
    // ['F5', '', '', ''],
    // ['F#5', '', '', ''],
    // ['G5', '', '', ''],
    // ['G#5', '', '', ''],
    // ['A5', '', '', ''],
    // ['A#5', '', '', ''],
    // ['B5', '', '', ''],
    
    // ['C6', '', '', ''],
    // ['C#6', '', '', ''],
    // ['D6', '', '', ''],
    // ['D#6', '', '', ''],
    // ['E6', '', '', ''],
    // ['F6', '', '', ''],
    // ['F#6', '', '', ''],
    // ['G6', '', '', ''],
    // ['G#6', '', '', ''],
    // ['A6', '', '', ''],
    // ['A#6', '', '', ''],
    // ['B6', '', '', ''],
    // ['C7', '', '', ''],
    // ['C#7', '', '', ''],
    // ['D7', '', '', ''],
    // ['D#7', '', '', ''],
    // ['E7', '', '', ''],
    // ['F7', '', '', ''],
    // ['F#7', '', '', ''],
    // ['G7', '', '', ''],
    // ['G#7', '', '', ''],
    // ['A7', '', '', ''],
    // ['A#7', '', '', ''],
    // ['B7', '', '', ''],
  ]);

  
  const [keyDown, setKeyDown] = useState({ start: 0, end: 0, down: false });
  const { data } = useSongData(note, octave, recordNow);

  const { chart } = useUserChartConfig(songData);
  
  
  const [recChart, setRecChart] = useState(<Chart {...chart} chartEvents={[
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if(selection.length > 0){
          const [selectedItem] = selection;
          const dataTable = chartWrapper.getDataTable();
          const { row, column } = selectedItem;
          alert(row, column);
          console.log(selection);
          
        }
        console.log(chart);
      }
    }

  ]} />);
  


  const [arr, setArr] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const { handleShowSettings, handleDurationInput, showSettings, duration, setDuration, volume, setVolume, octave, setOctave } = useSynthHandlers();
  //starts the timer for each recording
  //picks up from previous recording state
  useInterval(songTiming, 100);

  
  const compStyle = {
    zIndex: '2',
    position: 'absolute',
    width: '5px',
    height: '200px',
    border: 'solid 1px black',
    left: (recTime > 0) ? (recTime * 100) + 67 : 67,
  };

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
          setRecChart(<Chart {...chart}/>);
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

  //validate the key entered 
  function checkKey(item){
    if(note){
      return item.key === note;
    } 
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

  //toggles the currently recording status
  function handleCurrentlyRecording(e){
    e.preventDefault();
    //if previously recording, set recording to now be false
    //if not previously recording, set recording to now be true
    (recordNow) ? setRecordNow(false) : setRecordNow(true);
  }

  //user selects playback track
  function handlePlayback(e){
    e.preventDefault();
    //grab the entire recording, 
    //shape out the needed properties for the synth to play the note
    //key: the note and the octave for the note to be played
    //duration: the length of the note to be played
    //timing: the starting time for the note to be played
    recording.forEach(item => {
      const { key, duration, timing } = item;
      //set the volume for the synth playback equal to the value of the volume the user selected in the synth settings
      fakeSynth.volume.value = volume;
      //execute the synth method that plays the sound
      fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
    });
  }
 

  //user toggles the instructions visible
  function handleShowInstructions(){
    (showInstructions) ? setShowInstructions(false) : setShowInstructions(true);
  }

  //implementation of saving a recorded track to the users previous saved tracks
  function handleSaveTrack(){
    //first checks that there is at least 1 note in the track before saving
    if(recording.length < 1){
      alert('Please record notes before saving');
      return;
    }
    //toggle the saving state to fire off the useEffect for saving
    if(!saving){
      setSaving(true);
    } else {
      setSaving(false);
    }
    
    //grab the current tracklist values from local storage
    //we will append to this list with a new entry for the currently recorded track
    const prevUserRecord = JSON.parse(localStorage.getItem('trackList'));

    const localArr = [];
    //verify the recording length is greater than 0 
    if(!prevUserRecord && recording.length > 0){
      const toAdd = {
        name: recordingName,
        recording, 
      };
      if(toAdd.name){
        localArr.push(toAdd);
        localStorage.setItem('trackList', JSON.stringify(localArr));
        return;
      }
    }
    

    if(prevUserRecord && recording.length > 0){
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

  //the function to make the  new track name input a controlled input
  function handleRecordingNameChange(e){
    setRecordingName(e.target.value);
  }

  return (<>
    <div className={style.piano}>   
    
      <div className={style.pianoTop}>
        {
          (recording.length > 0) ? 
            <div className={style.saveTrack}> 
              <button onClick={handleSaveTrack}>Confirm</button> 
              <input onChange={handleRecordingNameChange} type="text" placeholder="Enter name here, hit confirm" /> 
            </div> 
            :
          
            < div className={style.saveTrack}>
              <button onClick={handleSaveTrack}>Save Track</button>
              <br/>
            </div>
        }
        <Playback 
          handlePlayback={handlePlayback} 
          handleCurrentlyRecording={handleCurrentlyRecording} 
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
      </div>

    
      <KeySection handleNoteInput={handleNoteInput} />
 
    </div>

   
    


    <section id="chart" className={style.chart}>
      <span style={compStyle}></span>
      {recChart}   
      
    </section>

    <Instructions 
      showInstructions={showInstructions} 
      handleShowInstructions={handleShowInstructions} 
    />
  </>
  ); 
};

export default Synth;
