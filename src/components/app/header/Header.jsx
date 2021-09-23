/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import style from '../style.css';
import form from '../../../../public/assets/form-icon.png'
import synth from '../../../../public/assets/synth-icon.png'
import synthDark from '../../../../public/assets/synth-icon-dark.png'
import stand from '../../../../public/assets/stand-icon.png'
import metalHands from '../../../../public/assets/metal-hands-icon.png'
import house from '../../../../public/assets/house-icon.png'
import houseDark from '../../../../public/assets/house-icon-dark.png'

const Header = () => {
  
  return (
    <ul className={style.header}> 
      <NavLink to="/" activeClassName={style.current} exact>
      <img 
          onMouseOver={e => e.target.src = houseDark} 
          onMouseOut={e => e.target.src = house} 
          src={house} alt="" 
        />
        Looper
      </NavLink>

      <NavLink to="/tracks" activeClassName={style.current} exact> 
        <img 
          onMouseOver={e => e.target.src = metalHands} 
          onMouseOut={e => e.target.src = stand} 
          src={stand} alt="" 
        />
        Tracks
      </NavLink>

      <NavLink to="/record" activeClassName={style.current} exact>
        <img 
          onMouseOver={e => e.target.src = synthDark} 
          onMouseOut={e => e.target.src = synth} 
          src={synth} alt="" />
          Synth
      </NavLink>
      <NavLink to="/signUp" activeClassName={style.current} exact>
        <img src={form} alt="" /> 
        Sign Up 
      </NavLink>

      {/* <NavLink to="/challenge" activeClassName={style.current} exact>
        <li>Play Challenge</li> 
      </NavLink> */}
      
    </ul>
  );
};

export default Header;
