/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import clock from '../../../../public/assets/clock.png';

const Duration = ({
  duration,
  handleDurationInput,

}) => {
  return (<div className={style.duration}>
    <div>
      Duration
      <img src={clock} alt="" />
    </div>
    <input value={duration} type="range" pattern="[0-9]" min='0.0625' max='4'
    step='0.0625' placeholder="Note Length Seconds" onChange={handleDurationInput} step=".1" />
  </div>
  );
};

Duration.propTypes = {
  duration: PropTypes.number,
  handleDurationInput: PropTypes.func,
};

export default Duration;
