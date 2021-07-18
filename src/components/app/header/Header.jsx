import React from 'react'
import { Link } from 'react-router-dom';
import style from '../style.css'

const Header = () => {
  return (
    <ul className={style.header}> 
      <li> <Link to="/tracks">Tracks</Link></li>
      <li> <Link to="/record">Record track</Link></li>
      <li> <Link to="/challenge">Play Challenge</Link></li>
    </ul>
  );
};

export default Header;
