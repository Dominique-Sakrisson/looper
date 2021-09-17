/* eslint-disable max-len */
import React from 'react';
import style from '../style.css';
import PropTypes from 'prop-types';
import { keys, sharpKeys } from '../modules/Keys';

const KeySection = ({ handleNoteInput }) => {
  //first map iterates over the standard key values and renders a button for each key
  //second map iterates over the sharp key values and renders a button for each sharp key
  return (<>
    <section className={style.keys}>
      {
        keys.map(item => {
          return <span key={item.key} >
            <button  className={`${style.keyButton} ${style[item.key]}`} aria-label="note-key" role="button" value={item.key} onClick={handleNoteInput}>{item.key}</button>
          </span>;
        })
      }
      {
        sharpKeys.map(item => {
          return (
            <button key={item.key} className={`${style.keyButtonSharp}`} aria-label="note-key" role="button" value={item.key} onClick={handleNoteInput}> {item.key}</button>
          );  
        })
      }
    </section>
  </>
  ); 
};

KeySection.propTypes = {
  handleNoteInput: PropTypes.func.isRequired,
};

export default KeySection;
