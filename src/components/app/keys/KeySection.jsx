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
  const [synth, setSynth] = useState();
  const [keyStatus, setKeyStatus] = useState(false);
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState(1);
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
  const [volume, setVolume] = useState(-20);

  //track starts on load currently
  const [trackLength, setTrackLength] = useState(0);
  const [userTrack, setUserTrack] = useState([]);
  const [songData, setSongData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End',  value: '50' },
    ],
    [
      'Track 01',
      'Total Time',
      new Date(0, 0, 0, 0, 0, 0),
      new Date(0, 0, 0, 0, 0, 0),
    ],
    ['Track 02', 
      'Piano', 
      new Date(0, 0, 0, 0, 0, 0), 
      new Date(0, 0, 0, 0, 0, 0)],
  ]);
  const [chart, setChart] = useState({});

  const synthInstance = () => {
    return new Tone.PolySynth({
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
    setNote(e);
  };

  useEffect(() => {
    setSynth(synthInstance({ volume })
    );
  }, [volume]);


  useEffect(() => {
    // setSynth(synthInstance());
    setChart({
      width: '100%',
      height: '400px',
      chartType: 'Timeline',
      loader : '<div>Loading Chart</div>',
      data: songData,
      rootProps: { 'data-testid': '3' } }); 
    document.addEventListener('keydown', ({ key }) => {
      handleKeyPress(key);
    });
    setTrackLength(Tone.now());
  }, []);



  useEffect(() => {
    setChart(prevChart => {
  
      prevChart.data = songData;
  
      return prevChart;
    });

  }, [songData]);

  //held together in duct tape
  //enables the user to play the same note multiple times back to back
  useEffect(() => {
    handleNoteButtonSubmit();
    //set note here doesnt cause inifinite loop, nothing happens in above function if the note is not a defined value
    setNote('');
  }, [note]);

  useEffect(() => {
    if(!recordNow){
      const rec = recording;
      const arr = [];
      rec.map(item => {
        setUserTrack(prevUserTrack => {
          console.log(prevUserTrack);
          arr.push({
            note: item.key,
            start: item.timing,
            end: item.timing + item.duration
          });
          return arr;
        });
      });
    }

  }, [recordNow]);

  const handleDurationInput = (e) => {
    console.log(e.target.value);
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

      recording.map(eachNote => {
        setSongData(prevSongData => {
          const arr = [...prevSongData];
          const songIndex = [
            `${eachNote.key}`,
            `${eachNote.duration}`,
            new Date(0, 0, 0, 0, 0, eachNote.timing),
            new Date(0, 0, 0, 0, 0, (eachNote.timing + eachNote.duration)),
          ];
          arr.push(songIndex);
          return arr;
        });
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
      synth.triggerAttackRelease(keyString, duration);
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
      <li>Your recorded notes go here</li>
      {renderRecording()}
    </ul>
    <div className={style.piano}>
      <section className={style.pianoInstructions}>
        <h2>How to record</h2>
        <p>(1)Hit record</p>
        <p>(2)Play notes</p>
        <p>(3)Hit record</p>
        <p>(4)Hit playback</p>
        <p>(4)Wait a few seconds</p>
      </section>
      <section>
        <label className={style.duration}>
          <h2>Set the duration of the note</h2>
          <p>Time (seconds)</p>
          <form >
            {/* <button className={(keyStatus) ? 'pressed' : 'unPressed'} value="seee" onClick={handleNoteButtonSubmit}> play a note</button> */}
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
            return <span key={item.key} >
              <button key={item.key} className={`${style.keyButton} ${style[item.key]}`} aria-label="note-key" value={item.key} onClick={handleNoteInput}>{item.key}</button>
            </span>;
          })
        }

      </section>
    </div>
    {
      
      <Chart 
        width={chart.width}
        height={chart.height}
        chartType={chart.chartType}
        loader={chart.loader}
        data={songData}
        rootProps={chart.rootProps}
      />
    }
    
  </>
  ); 
};

export default KeySection;
