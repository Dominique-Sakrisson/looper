/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from '../style.css'
import octavePic from '../../../../public/assets/octave.png';
// import { useOctave } from '../../../hooks/settings/octave';

const Octave = ({ octave, handleOctaveChange }) => {
 
  return (<div className={style.octave}>
    <div className={style.hint}>Octave {octave} <img src={octavePic} alt="" />
    </div>
    <input onChange={handleOctaveChange} type="range" min="1" max="7" value={octave} />
  </div>
  );
};

Octave.propTypes = {
  octave: PropTypes.number,
  handleOctaveChange: PropTypes.func,
};

export default Octave;
