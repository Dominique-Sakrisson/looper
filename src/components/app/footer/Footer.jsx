import React from 'react';
import tonejs from '../../../../public/assets/tonejs.png';

const Footer = () => {

  return (<>
    <div>
      <a href="https://tonejs.github.io/">
          Powered by 
        <img height='100px' width='200px' src={tonejs} alt="contribution" />
      </a>
      
    </div>
  </>);
};

export default Footer;
