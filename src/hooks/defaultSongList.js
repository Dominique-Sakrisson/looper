import React, { useState, useEffect } from 'react';
import songNotes from '../components/app/modules/DefaultSongs';

export const useDefaultSongList = (songNumber) => {
  const [songData, setSongData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'sample',
      'Sample',
      0, //start
      1000// (recTime > 0) ? recTime * 1000 : 5000, //finish
    ],
  ]);

  const [chartObject, setChartObject] = useState({
    width: '100%',
    height: '100%',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData,
    rootProps: { 'data-testid': '3' } 
  });

  useEffect(() => {
    setSongData(prevData => {
      if(songNumber === undefined){
        prevData.push(...songNotes[0].notes);
        return prevData;
      }
      prevData.splice(2, prevData.length - 1);
      prevData.push(...songNotes[songNumber].notes);
      return prevData;
    });

  }, [songNumber]);



  return { songData, setSongData, chartObject, setChartObject };
};

