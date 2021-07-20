/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import Volume from './Volume';
import Octave from './Octave';
import Duration from './Duration';
import { useOctave } from '../../../hooks/octave';

const Settings = ({
  volume,
  duration,
  showSettings,
  handleShowSettings,
  handleVolumeChange,
  handleDurationInput,
}) => {
 
 
    
  return (<>
    <section className={style.settings}>
      {(showSettings) ? <label >
        <button aria-label="hide-settings"  onClick={handleShowSettings}> hide Settings </button>
        <form>
          

          <Duration duration={duration} handleDurationInput={handleDurationInput}/>
     

          <Octave />
       

          <Volume handleVolumeChange={handleVolumeChange} volume={volume}/>
      

          
        </form>
      </label> : <button aria-label="show-settings" onClick={handleShowSettings}> Show Settings </button>}
      
    </section>
  </>
  );
};

Settings.propTypes = {
  octave: PropTypes.number,
  volume: PropTypes.number,
  duration: PropTypes.number,
  recordNow: PropTypes.bool,
  handlePlayback: PropTypes.func,
  handleRecordNow: PropTypes.func,
  showSettings: PropTypes.bool,
  handleOctaveChange: PropTypes.func,
  handleVolumeChange: PropTypes.func,
  handleDurationInput: PropTypes.func,
  handleShowSettings: PropTypes.func    
};

export default Settings;
