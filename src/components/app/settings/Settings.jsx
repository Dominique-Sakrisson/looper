/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import Volume from './Volume';
import Octave from './Octave';
import Duration from './Duration';

const Settings = ({
  volume,
  octave,
  duration,
  showSettings,
  handleShowSettings,
  handleOctaveChange,
  handleVolumeChange,
  handleDurationInput,
}) => {
 
    
  return (<>
    <section className={style.settings}>
      {(showSettings) ? <label >
        <button aria-label="hide-settings"  onClick={handleShowSettings}> hide Settings </button>
        <form>
          

          <Duration duration={duration} handleDurationInput={handleDurationInput}/>
          {/* <p className={style.hint}>Note Clicked Length</p>
          <input value={duration} type="number" pattern="[0-9]"  placeholder={duration}/>
          <button onClick={handleDurationInput}>Submit duration</button>
          
            
          <p className={style.hint}>Keyboard presses set duration to how long you held the key</p> */}

          <Octave handleOctaveChange={handleOctaveChange} octave={octave}/>
          {/* <p>Octave {octave}</p>
          <input onChange={handleOctaveChange} type="range" min="1" max="7" value={octave} /> */}

          <Volume handleVolumeChange={handleVolumeChange} volume={volume}/>
          {/* <div className={style.volume}>
            <img src={speaker} width="20px" alt="volume speaker icon" />
            <input onChange={handleVolumeChange} type="range" min="-40" max="0" value={volume} />
          </div> */}

          
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
