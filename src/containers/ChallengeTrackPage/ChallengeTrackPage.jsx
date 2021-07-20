/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts';
import { useDefaultSongList } from '../../hooks/defaultSongList';
import DefaultSongs from '../../components/app/modules/DefaultSongs';
import Synth from '../../components/app/synth/Synth';

const ChallengeTrackPage = () => {
  const [songChoice, setSongChoice] = useState(0);
  const { chartObject, songData } = useDefaultSongList(songChoice);
  const [chart, setChart] = useState(<Chart {...chartObject}/>);


  // the array of notes to compare user notes to
  const compare = [songData.slice(2, songData.length)];



  //fix this up to listen to each song
   //user selects playback track
  //  function handlePrePlayback(e){
    
  //   preSongData.forEach(item => {
  //     if(item === preSongData[0] || item === preSongData[1]){
  //       return;
  //     }
  //     const key = item[0];
  //     const duration = (item[3] - item[2]) * .001;
  //     const timing = item[3] * .001;
  //     fakeSynth.volume.value = volume;
  //     fakeSynth.triggerAttackRelease(key, duration, Tone.now() + timing);
  //   });
  // }



  /* 
  collect input of notes from the user
  add thos notes to a refference array
  check the note key, start, end against our compare array
  for each note, 
    if the key value in the user array matches the key value in the same index of compare array
    count that note as a success,
      then check the start and end of the notes,
        if the start of the note is after the start of the compare index note, 
          they missed the note, 
            if the start is before the compare note and within 200ms 
            they correctly hit the note
  */

  useEffect(() => {
    setSongChoice(songChoice);
    console.log(songChoice);
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
      <button >play pre made track</button>
      {chart}
      
      <h1>Use this keyboard to copy the notes</h1>
      <Synth />
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
