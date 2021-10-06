/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import speaker from '../../../../public/assets/speaker.png';

const Volume = ({
  volume,
  handleVolumeChange,
}) => {
  
  return (
    <div>
      <p>Volume {`${volume}`}</p>
      <img src={speaker} width="20px" alt="volume speaker icon" />
      <input value={volume} onChange={handleVolumeChange} 
        step=".5" type="range" min="-15" max="0"  />
    </div>
  );
};

Volume.propTypes = {
  volume: PropTypes.number,
  handleVolumeChange: PropTypes.func,
};

export default Volume;
