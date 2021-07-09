/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import style from '../style.css';
import { Chart } from 'react-google-charts';
import speaker from './speaker.png';


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
  const [keyDown, setKeyDown] = useState({ start: 0, end: 0, down: false });

  const [chart, setChart] = useState({
    width: '100%',
    height: '400px',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData,
    rootProps: { 'data-testid': '3' } 
  });
  const [arr, setArr] = useState([]);
  const [noteCount, setNoteCount] = useState(1);

  //currently gets laggy at about 80 notes
  console.log(noteCount);

  useEffect(() => {
    let start;
    let end;
    let delta;
    // const arr = [];

    document.addEventListener('keydown', ({ key }) => {
      setNoteCount(prev => {
        console.log(prev);
        prev++;
        return prev;
      });
      start = Number(new Date());
      // arr.push(key);
      setArr(prevArr => {
        prevArr.push(key);
        return prevArr;
      });
      if(arr[arr.length - 1] !== arr[arr.length - 2]){
        setKeyDown(prevKeyDown => {
          prevKeyDown.down = true;
          prevKeyDown.start = Number(start);
          // console.log(keyDown.start, keyDown.end);
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

  const handleDurationInput = (e) => {
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
        prevRecord.push({ key: keyString, duration, timing, octave });
        return prevRecord;
      });
    }
  }

  function keyToKeyString(){
    // const keyString = (note + 4).toUpperCase();
    const keyString = (note + octave).toUpperCase();
    return keyString; 
  }

  const handleNoteButtonSubmit =  () => {
    //the check ensures the synth wont sound without a valid note
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

  function handleRecordNow(){
    if(recordNow){
      setRecordNow(false);
    } else {
      setRecordNow(true);
    }
  }

  function handlePlayback(){
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
          <h3>Has keyboard support!</h3>
          <p>Press keys c, d, e, f, g, a, b</p>
          <p>Press keys 1 - 5 to play sharp notes</p>
          <p>Time (seconds)</p>
          <form >
            <input type="number" onChange={handleDurationInput} placeholder={duration}/>
          </form>
        </label>
        <div className={style.volume}>
          <p>Octave {octave}</p>
          <input onChange={handleOctaveChange} type="range" min="1" max="7" value={octave} />
        </div>
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
