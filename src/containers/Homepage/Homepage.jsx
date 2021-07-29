import React, { useState } from 'react'
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";


const Homepage = () => {
  const [slides, setSlides] = useState([{ src: piano, alt: '' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    
    display: 'flex',
    justifyContent: 'center',
    animation: `${pulse} linear 1s`
  });

  const ImageSlider = styled.div`
  width: 50%,
  height: 400px
`;


  return <>
    <SectionStyle >
       <Image></Image>
      <Button>faf</Button>
    </SectionStyle>
  </>;
};


const pulse = css`keyframes
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;


const buttonAnimation = `${pulse} 1s infinite`;

const ImageSlider = styled.div`
width: 50%,
height: 400px,

`;
const SectionStyle = styled.section`
width: 100%
`;
const Image = styled.img.attrs(() => ({
  src: piano,
}))`
width: 80%;
height: 20%;
animation-name: ${pulse};
 animation-duration: 1s;
 animation-iteration-count: infinite;
`;
function alo() {
    console.log('hello');
}
const Button = styled.button.attrs(() => ({
  onClick: alo,
}))`
width: 80%;
height: 20%;

`;


export default Homepage;
