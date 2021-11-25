import React, {useEffect, useState} from 'react';
import defaultTracks from '../../components/app/modules/DefaultSongs.js';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import TrackList from '../../components/app/trackList/TrackList.jsx';

const tracks = [...defaultTracks];
const TrackListPage = () => {
  const [userTracks, setUserTracks] = useState(
    (JSON.parse(localStorage.getItem('trackList'))) ? JSON.parse(localStorage.getItem('trackList')) : []);

  useEffect(() => {
    localStorage.setItem("trackList", JSON.stringify(userTracks));
  
  }, [userTracks]);
  
  const DefSongList = styled.ul`
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

  return (<>
    <h1 className={styled.trackTypeTitle}>Default Tracks</h1> 
    <DefSongList>
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
            <ControllButton>edit track</ControllButton>
          </li>
        ))
      }
    </DefSongList>
    <h1>Your Tracks</h1>
    <TrackList />
  </>
  );
};

export default TrackListPage;
