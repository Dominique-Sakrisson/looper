import React, { useState, useEffect } from 'react';
import Synth from '../../components/app/synth/Synth';
import { Chart } from 'react-google-charts';
import Drop from '../../components/app/drop/Drop';


const RecordTrackPage = () => {
  const initVolume = -20;
  const [synth, setSynth] = useState();
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState(Number(1));
  const [recordNow, setRecordNow] = useState(false);
  const [recording, setRecording] = useState([]);
 
  const [volume, setVolume] = useState(initVolume);
  const [octave, setOctave] = useState(Number(4));


  // const { octave } = useOctave(oct);
  const [oct, setOct] = useState(4);
  
  // const { songData } = useSampleTracks(upData);

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
  const [showSettings, setShowSettings] = useState(false);
  const [recTime, setRecTime] = useState(0);


  return (<>
    <Synth />
    <Drop />
  </>
  );
};

export default RecordTrackPage;
