/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import questionMark from '../../../../public/assets/questionMark.png';
import questionMarkGreen from '../../../../public/assets/questionMarkGreen.png';


const Playback = ({ handlePlayback, handleRecordNow, handleShowInstructions, recordNow, showInstructions }) => {
 
  return (<>
    <button onClick={handlePlayback}>Playback</button>
    <button onClick={handleRecordNow}>record</button> 
    <div className={(recordNow) ?  style.light : style.dark}></div>
    <img src={(showInstructions) ?  questionMarkGreen : questionMark} alt="need help?" onClick={handleShowInstructions}/><span>need help?</span><br/>

  </>
  ); 
};
Playback.propTypes = {
  recordNow: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool.isRequired,
  handleRecordNow: PropTypes.func,
  handlePlayback: PropTypes.func,
  handleShowInstructions: PropTypes.func,
};
export default Playback;
