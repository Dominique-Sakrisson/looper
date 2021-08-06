/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import speaker from '../../../../public/assets/speaker.png';

const Volume = ({
  volume,
  handleVolumeChange,
}) => {
  
  return (
    <div className={style.volume}>
      <div>
        Volume {`${volume}`}
        <img src={speaker} width="20px" alt="volume speaker icon" />

      </div>
      <input onChange={handleVolumeChange} step=".5" type="range" min="-15" max="0" value={volume} />
    </div>
  );
};

Volume.propTypes = {
  volume: PropTypes.number,
  handleVolumeChange: PropTypes.func,
};

export default Volume;
