/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import questionMark from '../../../../public/assets/questionMark.png';
import questionMarkGreen from '../../../../public/assets/questionMarkGreen.png';
import closeButton from '../../../../public/assets/close-button.png';
const Instructions = ({ showInstructions, handleShowInstructions }) => {

  return (
    <section className={
      `${style.pianoInstructions} 
      // conditional to assign onScreen or OffScreen as well
      ${(showInstructions) ? style.onScreen : style.offScreen}`}>
      <div className={style.instructionText}>
        <h3>How to record </h3> 
        <p>(1)When record light is green you are not recording</p>
        <p>(2)Select record to turn light red</p>
        <p>(3)Playing notes will now save them to a track</p>
        <p>(4)Select playback to play your current track</p>
       
        <h3>Has keyboard support!</h3>
        <p>Press keys c, d, e, f, g, a, b</p>
        <p>Press keys 1 - 5 to play sharp notes</p>
      </div>
       <img 
          className={style.close}
          src={closeButton} 
          alt="need help?" 
          onClick={handleShowInstructions}
        />
    </section>
  );
};

Instructions.propTypes = {
  showInstructions: PropTypes.bool,
  handleShowInstructions: PropTypes.func,
};

export default Instructions;
