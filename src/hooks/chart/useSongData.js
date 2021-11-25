import react, { useState, useEffect } from 'react';

function useSongDataz(note, octave, recordNow){
  const [data, setData] = useState([
    [
      { type: 'string', id: 'Track Name' },
      { type: 'string', id: 'Instrument' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'Length',
      'time',
      0, //start
      5000, //finish
    ]
  ]);

  useEffect(() => {

    if(recordNow){
      if(note){
        console.log(note, 'noooooooteee');
        console.log('yaohhhhh');
        setData(prevData => {
          prevData.push([
            `${note.key}`,
            'piano',
            Number((note.timing * 1000).toFixed(4)),
            Number(note.timing * 1000 + note.duration * 1000)
          ]);
          return prevData;
        });
      }
      return;
    }
  }), [note];
  return { data };
}

export default useSongDataz;
