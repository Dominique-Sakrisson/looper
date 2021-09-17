import React, {useState, useEffect} from 'react';

export const useUserRecords = () => {
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

};

