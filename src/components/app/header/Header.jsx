/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../style.css';

const Header = () => {
  return (
    <ul className={style.header}> 

      <NavLink to="/tracks" activeClassName={style.current} exact> 
        <li>Tracks</li> 
      </NavLink>

      <NavLink to="/record" activeClassName={style.current} exact>
        <li>Record track </li> 
      </NavLink>

      <NavLink to="/challenge" activeClassName={style.current} exact>
        <li>Play Challenge</li> 
      </NavLink>
      
    </ul>
  );
};

export default Header;
