import React from 'react';
import defaultTracks from '../../components/app/modules/DefaultSongs.js';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const tracks = [...defaultTracks];
// const userTracks = localStorage.getItem('trackList');
const userTracks = JSON.parse(localStorage.getItem('trackList'));

const TrackListPage = () => {

  const DefSongList = styled.ul`
    width: 300px;
    height: 300px;	
    background-color: #FFFFFF;	
    position: relative;	
    box-shadow: 0px 0px 25px 1px #939083;
  }
  `;
  const SongList = styled.ul`
    width: 300px;
    height: 800px;	
    background-color: #FFFFFF;	
    position: relative;	
    overflow: scroll;
    box-shadow: 0px 0px 25px 1px #939083;
  }
  `;


  return (<>
    <h2><i>If you saved a track and it does not show, refresh page</i></h2>
    <DefSongList>
      <h1>Default Tracks</h1> 
      {
        tracks.map((track) => (
          <li key={track} >  
            <h3>{track.name}</h3>
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
    </DefSongList>
    <SongList >
      <h1>Your Tracks</h1>
      {(userTracks) ? userTracks.map(track => (
        <li key={track} >  
          <h3>{track.name}</h3>
          <ul>
            {track.recording.map(note => {
              return <li key={note.key}>
                <p>{note.key}</p>
                <p>note start {note.timing.toFixed(2)} seconds</p>
              </li>;
            }) }
            
          </ul>
          <button>play track</button>
          <button>edit track</button>
          <button>delete track</button>
        </li>
      )) : '' }
      
    </SongList>
  </>
  );
};

export default TrackListPage;
