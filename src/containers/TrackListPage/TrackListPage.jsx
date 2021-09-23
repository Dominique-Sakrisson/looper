import React, {useEffect, useState} from 'react';
import defaultTracks from '../../components/app/modules/DefaultSongs.js';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const tracks = [...defaultTracks];
// const userTracks = localStorage.getItem('trackList');

const TrackListPage = () => {
  const [userTracks, setUserTracks] = useState(
    (JSON.parse(localStorage.getItem('trackList'))) ? JSON.parse(localStorage.getItem('trackList')) : []);

  useEffect(() => {
    localStorage.setItem("trackList", JSON.stringify(userTracks));
  
  }, [userTracks]);
  
  const DefSongList = styled.ul`
    width: 100%;
    margin: 0;
    padding: 2rem;
    height: 300px;	
    overflow: scroll;
    background-color: #FFFFFF;	
    box-shadow: 0px 0px 25px 1px #939083;
    h1{
      position: fixed;
      width: 20rem;
      margin: 0 auto;
      background: blue;
    }
  }
  `;
  const SongList = styled.ul`
    width: 100%;
    display:flex;
    flex-direction: row;
    height: 40rem;	
    background-color: #FFFFFF;	
    position: relative;	
    overflow: scroll;
    box-shadow: 0px 0px 25px 1px #939083;
    & > li {
      width: 100%;
      background: blue;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  `;

  const TrackTitle = styled.div`
    font-size: 2rem;
    background-color: grey;
    width: 100%;
  `;
  const TrackButton = styled.div`
    font-size: 1rem;
    background-color: grey;
    padding: 1rem;
    border: 1px solid black;
    max-width: 3rem;
    box-sizing:content-box;
    &:hover{
      background-color: lightblue;
      cursor: pointer;
    }
  `;

  function handleDeleteTrack(track){
    const updatedTracks = userTracks.filter((item) => {
      return item.name !== track.name;
    });
    setUserTracks(updatedTracks);
  }

  return (<>
    <h2><i>If you saved a track and it does not show, refresh page</i></h2>
    <DefSongList>
      <h1 className={styled.trackTypeTitle}>Default Tracks</h1> 
      {
        tracks.map((track) => (
          <li key={track} >  
            <TrackTitle>Track: {track.name}</TrackTitle>
            <ul>
              {track.notes.map(note => {
                return <li key={note}>
                  <p>{note}</p>
                </li>;
              }) }
            
            </ul>
            <button>play track</button>
            <button>edit track</button>
          </li>
        ))
      }
    </DefSongList>
    <SongList >
      <h1>Your Tracks</h1>
      {(userTracks.length > 0) ? userTracks.map(track => (
        <li key={track} >  
          <TrackTitle>Track: {track.name}</TrackTitle>
        
          {track.recording.map(note => {
            return <li key={note.key}>
              <p>{note.key}</p>
              <p>note start {note.timing.toFixed(2)} seconds</p>
            </li>;
          }) }
            
      
          <button>play track</button>
          <button>edit track</button>
          <TrackButton onClick={() => {
            handleDeleteTrack(track);
          }}>delete track</TrackButton>
        </li>
      )) : '' }
      
    </SongList>
  </>
  );
};

export default TrackListPage;
