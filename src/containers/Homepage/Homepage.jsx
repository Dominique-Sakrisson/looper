import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
// import Synth from '../../components/app/synth/Synth';
import play from '../../../public/assets/play-button.png';
import pianoIcon from '../../../public/assets/piano-icon.png';
import violinIcon from '../../../public/assets/violin-icon.png';
import baseGuitarIcon from '../../../public/assets/base-guitar-icon.png';
import saxaphoneIcon from '../../../public/assets/saxaphone-icon.png';

const Homepage = () => {
  // const [slides, setSlides] = useState([{ src: piano, alt: '' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    display: 'flex',
    justifyContent: 'center',
  });
  const imageRoll = [piano, play, pianoIcon, violinIcon, saxaphoneIcon, baseGuitarIcon];
  const [i, setI] = useState(0);
  
  const [currentImage, setCurrentImage] = useState(imageRoll[i]);


  useEffect(() => {
    setCurrentImage(imageRoll[i]);
     
  }), [i];

  const GlobalStyle = createGlobalStyle`
  body{
    background-color: #eee;
  }
  img {
    width: '300px';
  }
`; 

  const pulse = keyframes`
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
  const clear = keyframes`
  100% {
    opacity: 1;
  }
`;

  const Header = styled.div`
height: 50px;
margin: 20px;
font-size: 2rem;
text-align: center;
animation: ${pulse} 2000ms infinite;
&:hover{
  animation: ${clear} 2000ms infinite;
  // animation-play-state: paused;

};
`;
  const Slider = styled.div`
  display: flex;
  // flex-direction: column;
  width: 30%
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 3rem;
  column-gap: 4em

`;
  const ImageB = styled.div.attrs({
    'aria-label' : 'slider of images'
  })`
background-image: url(${currentImage});
min-height:  20rem;
width: 500px;

// background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
box-sizing: content-box;

`;

  const ButRow = styled.div`
  display: flex;
  height: 20rem;

  width: 100%
  position: relative;
  justify-content: space-between;
`;

  const NavB = styled.button`
  background: green;
  color: white;
  box-sizing: content-box;
  padding: 1rem;
  border: 2px solid black;
`;

  const Par = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
  padding-bottom: 1rem;
  
`;

const InstrIcon = styled.div`
width: 10%;
border-radius: 50%;
padding: 2rem;
box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
text-align: center;
img{
  margin: .5rem;
  width: 100px;
  height: 100px;
}
`;
  
  const Next = styled.div`
height: 250px;
`;

const TopSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const MidSection = styled.section`
  width: 95%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  background: #fff;
  padding: 2rem;
`;
  
  function handleImageChange(e) {
    if(e.target.ariaLabel === 'previous-button'){
      if(i === 0){
        setI(imageRoll.length - 1);
        return;
      } 
      setI(i - 1);
    }
    if(e.target.ariaLabel === 'next-button'){
      if(i === imageRoll.length - 1){
        setI(0);
        return;
      } 
      setI(i + 1);
    }
    
  }

  return (<>
    <GlobalStyle />
    <TopSection >
      <Par>
        <h1>Sign Up to..</h1>
        <h2>Play with friends 😀</h2>
        <h2>Network 😀</h2>
        <h2>Challenge Mode! 😀</h2>

        
        <form action="/api/v1/forms" method="get" className="form">
          <button type="submit">User Sign Up</button>
        </form>

        <form onSubmit={(e) => {
          e.preventDefault();
          fetch('http://localhost:3000/api/v1/forms', {
            method: 'GET'
          });
        }}className="form">
          <button type="submit">blorp</button>
        </form>
        
        
      </Par>
      <Header> Create tracks <br/>Share with friends</Header>
      
      <Slider>
        <ButRow> 
          <NavB aria-label="previous-button" onClick={(e) => handleImageChange(e)}>
            back 
          </NavB>
          <ImageB></ImageB>
          <NavB aria-label="next-button" onClick={(e) => handleImageChange(e)}>
            next 
          </NavB>
        </ButRow>
      </Slider>

      <Par>
        Another section for information here
      </Par>
      
    
    </TopSection>
    <MidSection>
      
      
      <InstrIcon > 
        <img src={pianoIcon} alt="piano icon" />
      </InstrIcon>
      
      <InstrIcon > 
        <img src={violinIcon} alt="violin icon" />
      </InstrIcon>

      <InstrIcon > 
        <img src={baseGuitarIcon} alt="base guitar icon" />
      </InstrIcon>

      <InstrIcon > 
        <img src={saxaphoneIcon} alt="saxaphone icon" />
      </InstrIcon>
    
    </MidSection>
  </>
  );
};

export default Homepage;
