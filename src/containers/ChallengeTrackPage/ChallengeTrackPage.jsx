/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts';
import { useDefaultSongList } from '../../hooks/defaultSongList';
import DefaultSongs from '../../components/app/modules/DefaultSongs';

const ChallengeTrackPage = () => {
  const [songChoice, setSongChoice] = useState(0);
  const { chartObject, setChartObject } = useDefaultSongList(songChoice);
  const [chart, setChart] = useState(<Chart {...chartObject}/>);

  useEffect(() => {
    setSongChoice(songChoice);
  }, []);

  useEffect(() => {
    setSongChoice(songChoice);
    setChart(<Chart {...chartObject}/>);
  }, [songChoice]);


  return (
    <>
      <h2>Try to play these notes</h2>
      <form action="">
        <label htmlFor="">
          <span>song choice</span>
          <select onChange={e => setSongChoice(e.target.value)} name="" id="">
            {DefaultSongs.map(item => {
              return (
                <option key={item.key} value={item.key}>
                  {item.key} {item.name}
                </option>
              );
            })}
          </select>
          current song {songChoice}
        </label>
      </form>
      
    {chart}
      

      {/* <Playback 
      handlePlayback={handlePlayback} 
      handleRecordNow={handleRecordNow} 
      recordNow={recordNow}
      showInstructions={showInstructions}
      handleShowInstructions={handleShowInstructions}/>

    <div className={style.piano}>
      <div className={style.keyBoard}>
        <KeySection handleNoteInput={handleNoteInput} />
      </div>
      
      <Settings 
        volume={volume}
        octave={Number(octave)}
        duration={duration}
        recordNow={recordNow}
        showSettings={showSettings} 
        showInstructions={showInstructions}
        handlePlayback={handlePlayback}
        handleRecordNow={handleRecordNow}
        handleShowSettings={handleShowSettings}
        handleOctaveChange={handleOctaveChange} 
        handleVolumeChange={handleVolumeChange}
        handleDurationInput={handleDurationInput}
        handleShowInstructions={handleShowInstructions} 
      />

    </div> */}
    </>

  );
};

export default ChallengeTrackPage;
