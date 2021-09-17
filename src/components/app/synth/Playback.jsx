/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import questionMark from '../../../../public/assets/questionMark.png';
import questionMarkGreen from '../../../../public/assets/questionMarkGreen.png';
import playButton from '../../../../public/assets/play-button.png';

const Playback = ({ handlePlayback, handleCurrentlyRecording, handleShowInstructions, recordNow, showInstructions }) => {
  return (
    <div className={style.playback}>
      <button onClick={handlePlayback}> <img src={playButton} width="10px" alt="" /> Play  </button>
      <button onClick={handleCurrentlyRecording}>
        {(recordNow) ? 'stop' : 'record'}
        <div className={(recordNow) ?  style.light : style.dark}></div>
      </button> 

      
      <button onClick={handleShowInstructions}>
        <img src={(showInstructions) ?  questionMarkGreen : questionMark} alt="need help?" />
        need help?
      </button>
    </div>
  ); 
};
Playback.propTypes = {
  recordNow: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool.isRequired,
  handleCurrentlyRecording: PropTypes.func,
  handlePlayback: PropTypes.func,
  handleShowInstructions: PropTypes.func,
};
export default Playback;
