/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import Volume from './Volume';
import Octave from './Octave';
import Duration from './Duration';



const Settings = ({
  showSettings,
  volume,
  duration,
  octave,
  handleOctaveChange,
  handleShowSettings,
  handleVolumeChange,
  handleDurationInput,
}) => {
  return (
    <section className={style.settingsSection}>
      {(showSettings) ? <>
        <button aria-label="hide-settings"  onClick={handleShowSettings}> hide Settings </button>
        <form className={style.settingsForm}>
          <div className={style.settingsControl}>
            <Volume handleVolumeChange={handleVolumeChange} volume={volume}/>
          </div>
          <div className={style.settingsControl}>
            <Duration duration={duration} handleDurationInput={handleDurationInput}/>
          </div>
          <div className={style.settingsControl}>
            <Octave octave={octave} handleOctaveChange={handleOctaveChange} />
          </div>
        </form>
       
      </> 
        : 
        <button aria-label="show-settings" onClick={handleShowSettings}> Show Settings </button>}
      
    </section>
  );
};

Settings.propTypes = {
  octave: PropTypes.number,
  volume: PropTypes.number,
  duration: PropTypes.number,
  recordNow: PropTypes.bool,
  handlePlayback: PropTypes.func,
  handleCurrentlyRecording: PropTypes.func,
  showSettings: PropTypes.bool,
  handleOctaveChange: PropTypes.func,
  handleVolumeChange: PropTypes.func,
  handleDurationInput: PropTypes.func,
  handleShowSettings: PropTypes.func    
};

export default Settings;
