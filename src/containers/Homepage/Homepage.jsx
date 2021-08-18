import React, { useState } from 'react'
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";


const Homepage = () => {
  const [slides, setSlides] = useState([{ src: piano, alt: '' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    
    display: 'flex',
    justifyContent: 'center',
 
  });

  const ImageSlider = styled.div`
  width: 35%,
  height: 300px
`;


  return <>
    <SectionStyle >
      <h1>Welcome to the homepage</h1>
      <h3>(A work in progress)</h3>
      <Image></Image>
      
    </SectionStyle>
  </>;
};


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

 animation-duration: 1s;
 animation-iteration-count: infinite;
`;


export default Homepage;
