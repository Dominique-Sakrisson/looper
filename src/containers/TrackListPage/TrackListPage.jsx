import React from 'react';
import defaultTracks from './data/defaultTracks';

const tracks = [...defaultTracks];
const userTracks = localStorage.getItem('tracks');

const TrackListPage = () => {

  return (<>
    <ul >
      {
        tracks.map((track) => (
          <li key={track} >  
            <span>{track.name}</span>
            <ul>
              
              <li>
                <p>{track[0]}</p>
                <p>{track[1]}</p> 
                <p>{track[2]}</p> 
                <p>{track[3]}</p> 
              </li>
            
            </ul>
            <button>play track</button>
            <button>edit track</button>
            <button>delete track</button>
          </li>
        ))
      }
    </ul>
  </>
  );
};

export default TrackListPage;
