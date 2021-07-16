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
      <img src={speaker} width="20px" alt="volume speaker icon" />
      <input onChange={handleVolumeChange} type="range" min="-40" max="0" value={volume} />
    </div>
  );
};

Volume.propTypes = {
  volume: PropTypes.number,
  handleVolumeChange: PropTypes.func,
};

export default Volume;
