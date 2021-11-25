/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import clock from '../../../../public/assets/clock.png';

const Duration = ({
  duration,
  handleDurationInput,
}) => {

  return (
    <>
      <p>Duration {`${duration}`}
      </p> 
      <img src={clock} alt="clock image" />
      <input value={duration} onChange={handleDurationInput} 
        type="range" min="0.0625" max="4" step="0.0625" 
        placeholder="Note Length Seconds" 
      />
    </>
  );
};

Duration.propTypes = {
  duration: PropTypes.number,
  handleDurationInput: PropTypes.func,
};

export default Duration;
