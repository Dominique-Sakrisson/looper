/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import questionMark from '../../../../public/assets/questionMark.png';
import questionMarkGreen from '../../../../public/assets/questionMarkGreen.png';

const Instructions = ({ showInstructions, handleShowInstructions }) => {

  return (
    <section className={`${style.pianoInstructions} ${(showInstructions) ? style.onScreen : style.offScreen}`}>
      <img src={(showInstructions) ?  questionMarkGreen : questionMark} alt="need help?" onClick={handleShowInstructions}/><span>CLOSE</span>
      <div>
        <h3>How to record</h3>
        <p>(1)Hit record</p>
        <p>(2)Play notes</p>
        <p>(3)Hit record</p>
        <p>(4)Hit playback</p>
        <p>(4)Wait a few seconds</p>
        <h3>Has keyboard support!</h3>
        <p>Press keys c, d, e, f, g, a, b</p>
        <p>Press keys 1 - 5 to play sharp notes</p>
      </div>
    </section>
  );
};

Instructions.propTypes = {
  showInstructions: PropTypes.bool,
  handleShowInstructions: PropTypes.func,
};

export default Instructions;
