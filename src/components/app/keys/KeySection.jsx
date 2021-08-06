/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import style from '../style.css';
import PropTypes from 'prop-types'

const volume = -20;

export const keys = [
  {
    key :'c',
  },
  {
    key : 'd',
  },
  {
    key : 'e',
  },
  {
    key : 'f',
  },
  {
    key : 'g',
  },
  {
    key : 'a',
  },
  {
    key : 'b',
  }];

export const sharpKeys = [
  {
    key :'c#',
  },
  {
    key : 'd#',
  },
  {
    key : 'e#',
  },
  {
    key : 'f#',
  },
  {
    key : 'g#',
  },
  {
    key : 'a#',
  },
  {
    key : 'b#',
  }];

export const timings = [
  {
    key :'+1',
  },
  {
    key : '+1.5',
  },
  {
    key : '+1.75',
  },
  {
    key : '+2',
  },
  {
    key : '+2.25',
  },
  {
    key : '+2.5',
  },
  {
    key : '+3',
  },
  {
    key : '+4',
  }
];


const KeySection = ({ handleNoteInput }) => {
  return (<>
    <section className={style.keys}>
      {
        keys.map(item => {
          return <span key={item.key} >
            <button className={`${style.keyButton} ${style[item.key]}`} aria-label="note-key" role="button" value={item.key} onClick={handleNoteInput}>{item.key}</button>
          </span>;
        })
      }
      {
        keys.map(item => {
          if(['c', 'd', 'f',  'g', 'a'].includes(item.key)){
            return (
              <button key={item.key + '#'} className={`${style.keyButtonSharp}`} aria-label="note-key" role="button" value={item.key + '#'} onClick={handleNoteInput}> {item.key + '#'}</button>
            );  
          }
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
