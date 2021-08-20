import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";


const Homepage = () => {
  // const [slides, setSlides] = useState([{ src: piano, alt: '' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    display: 'flex',
    justifyContent: 'center',
  });

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
  // animation-play-state: paused;

};
`;

  const ImageSlider = styled.div`
background-image: url('../../../public/assets/piano.png');
min-height: 250px;

margin-bottom: 10px;
border: 2px solid orange;
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;


  const Par = styled.p`
  height: 300px;
::before{
  content: 'hmm';
}
::after{
  " (" attr(href) ")"

}

`;
  const Next = styled.div`
height: 250px;
`;

  const SectionStyle = styled.section`
width: 100%
`;
  // const Image = styled.img.attrs(() => ({
  //   src: piano,
  // }))`
  // width: 20%;
  // height: 30%;

  //  animation-duration: 1s;
  //  animation-iteration-count: infinite;
  // `;
  console.log(piano);  


  return (<>
    <GlobalStyle />
    <SectionStyle >
      <Header> Create tracks on the piano</Header>
      <ImageSlider></ImageSlider>
      <Next></Next>
      <Par></Par>
    </SectionStyle>
    
  </>
  );
};

export default Homepage;
