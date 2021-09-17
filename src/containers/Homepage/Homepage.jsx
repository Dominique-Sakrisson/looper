import React, { useEffect, useState } from 'react';
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import play from '../../../public/assets/play-button.png';

const Homepage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    display: 'flex',
    justifyContent: 'center',
  });
  const imageRoll = [piano, play];
  const [i, setI] = useState(0);
  
  const [currentImage, setCurrentImage] = useState(imageRoll[i]);


  useEffect(() => {
    setCurrentImage(imageRoll[i]);
    
  }), [i];

  const GlobalStyle = createGlobalStyle`
  body{
    background-color: #eee;
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
};
`;
  const Slider = styled.div`
  display: flex;

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

  const Par = styled.p`
  display: flex;
  height: 300px;
  margin: 20px;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
`;
  
  const Next = styled.div`
height: 250px;
`;

  const SectionStyle = styled.section`
width: 100%
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
    <SectionStyle >
      <Par>Call to action stuff here</Par>
      <Header> Create tracks on the piano</Header>
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
      <Par>Another section for information here</Par>
    </SectionStyle>
  </>
  );
};

export default Homepage;
