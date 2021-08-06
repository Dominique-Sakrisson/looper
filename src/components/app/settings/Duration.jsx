/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import clock from '../../../../public/assets/clock.png';
// import { useSettings } from '../../../hooks/settings/settings';

const Duration = ({
  duration,
  handleDurationInput,

}) => {

  return (<div className={style.duration}>
    <div>
      Duration {`${duration}`}
      <img src={clock} alt="" />
    </div>
    <input value={duration} type="range" min='0.0625' max='4'
    step='0.0625' placeholder="Note Length Seconds" onChange={handleDurationInput} />
  </div>
  );
};

Duration.propTypes = {
  duration: PropTypes.number,
  handleDurationInput: PropTypes.func,
};

export default Duration;
