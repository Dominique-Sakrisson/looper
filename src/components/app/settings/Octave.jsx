/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from '../style.css'
import octavePic from '../../../../public/assets/octave.png';
// import { useOctave } from '../../../hooks/settings/octave';

const Octave = ({ octave, handleOctaveChange }) => {
  // const { octave } = useOctave(octaveValue);
  // const [octaveValue, setOctaveValue] = useState(1);


  return (<>
    <p>Octave {octave}</p><img src={octavePic} alt="" />
    <input onChange={handleOctaveChange} type="range" min="1" max="7" value={octave} />
  </>
  );
};

Octave.propTypes = {
  octave: PropTypes.number,
  handleOctaveChange: PropTypes.func,
};

export default Octave;
