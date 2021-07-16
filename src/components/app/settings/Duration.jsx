/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const Duration = ({
  duration,
  handleDurationInput,

}) => {
  return (<>
    <p className={style.hint}>Note Length Seconds</p>
    <input value={duration} type="number" pattern="[0-9]"  placeholder={duration} onChange={handleDurationInput} step=".1" />

    <p className={style.hint}>Keyboard presses set duration to how long you held the key</p>
  </>
  );
};

Duration.propTypes = {
  duration: PropTypes.number,
  handleDurationInput: PropTypes.func,
};

export default Duration;
