/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import style from '../style.css';
import form from '../../../../public/assets/form-icon.png';
import synth from '../../../../public/assets/synth-icon.png';
import synthDark from '../../../../public/assets/synth-icon-dark.png';
import stand from '../../../../public/assets/stand-icon.png';
import metalHands from '../../../../public/assets/metal-hands-icon.png';
import house from '../../../../public/assets/house-icon.png';
import houseDark from '../../../../public/assets/house-icon-dark.png';

const Header = () => {
  function handleMouseOut(e){
    if(e.target.childNodes[0].src.includes(houseDark)) e.target.childNodes[0].src = house; 
    if(e.target.childNodes[0].src.includes(metalHands)) e.target.childNodes[0].src = stand; 
    if(e.target.childNodes[0].src.includes(synthDark)) e.target.childNodes[0].src = synth; 
    return;
  }
  function handleMouseOver(e){
    if(e.target.childNodes[0].src.includes(house)) e.target.childNodes[0].src = houseDark; 
    if(e.target.childNodes[0].src.includes(stand)) e.target.childNodes[0].src = metalHands; 
    if(e.target.childNodes[0].src.includes(synth)) e.target.childNodes[0].src = synthDark; 
    return;
  }
  return (
    <ul className={style.header}> 
      <NavLink to="/" activeClassName={style.current} exact 
        onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  >
        <img src={house} alt="homepage icon" />
        Looper
      </NavLink>

      <NavLink to="/tracks" activeClassName={style.current} exact
        onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> 
        <img src={stand} alt="icon for tracks page" />
        Tracks
      </NavLink>

      <NavLink to="/record" activeClassName={style.current} exact
        onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <img src={synth} alt="icon for synth page" />
          Synth
      </NavLink>
      <NavLink to="/signUp" activeClassName={style.current} exact>
        <img src={form} alt="icon for sign up page" /> 
        Sign Up 
      </NavLink>

      {/* <NavLink to="/challenge" activeClassName={style.current} exact>
        <li>Play Challenge</li> 
      </NavLink> */}
      
    </ul>
  );
};

export default Header;
