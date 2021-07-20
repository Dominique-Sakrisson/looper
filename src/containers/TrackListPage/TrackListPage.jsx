import React from 'react';
import defaultTracks from '../../components/app/modules/DefaultSongs.js';

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
              {track.notes.map(note => {
                return <li key={note}>
                  <p>{note}</p>
                </li>;
              }) }
            
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
