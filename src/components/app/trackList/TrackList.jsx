import React, {useEffect, useState} from 'react';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const TrackList = () => {
  const [userTracks, setUserTracks] = useState(
    (JSON.parse(localStorage.getItem('trackList'))) ? JSON.parse(localStorage.getItem('trackList')) : []);

  const SongList = styled.ul`
    width: 100%;
    display:flex;
    flex-direction: row;
    height: 40rem;	
    background-color: #FFFFFF;	
    position: relative;	
    overflow: scroll;
    box-shadow: 0px 0px 25px 1px #939083;
    list-style: none;
    & > li {
      width: 100%;
      border: 1px ridge black;
      overflow: scroll;
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
  const ControllButton = styled.button`
    font-size: 1rem;
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
  return (
    <>
      <SongList >
        {(userTracks.length > 0) ? userTracks.map(track => (
          <li key={track} >  
            <TrackTitle>Track: {track.name}</TrackTitle>
        
            {track.recording.map(note => {
              return <li key={note.key}>
                <p>{note.key}</p>
                <p>note start {note.timing.toFixed(2)} seconds</p>
              </li>;
            }) }
            <ControllButton>edit track</ControllButton>
            <ControllButton onClick={() => {
              handleDeleteTrack(track);
            }}>delete track</ControllButton>
          </li>
        )) : '' }
      
      </SongList>
    </>
  );
};

export default TrackList;
