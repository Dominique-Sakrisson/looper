import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
// import Synth from '../../components/app/synth/Synth';
import play from '../../../public/assets/play-button.png';
import pianoIcon from '../../../public/assets/piano-icon.png';
import violinIcon from '../../../public/assets/violin-icon.png';
import baseGuitarIcon from '../../../public/assets/base-guitar-icon.png';
import saxophoneIcon from '../../../public/assets/saxophone-icon.png';

const Homepage = () => {
  // const [slides, setSlides] = useState([{ src: piano, alt: '' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({
    display: 'flex',
    justifyContent: 'center',
  });
  const imageRoll = [piano, play, pianoIcon, violinIcon, saxophoneIcon, baseGuitarIcon];
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

  const ImageB = styled.div.attrs({
    'aria-label' : 'slider of images'
  })`
background-image: url(${currentImage});
min-height:  20rem;
width: 20rem;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
box-sizing: content-box;
animation: cycle 6s infinite;
@keyframes cycle{
  10%{background-image: url(${imageRoll[i]});
}
  25%{background-image: url(${imageRoll[i + 1]});
}
  40%{background-image: url(${imageRoll[i + 2]});
}
  55%{background-image: url(${imageRoll[i + 3]});
}
  70%{background-image: url(${imageRoll[i + 4]});
}
  85%{background-image: url(${imageRoll[i + 5]});
}
}

`;

  const Cta = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
  padding: 1rem;
  background: black;
  h1{
    width: 100%;
    text-align: start;
    font-size: 2.5rem;
    color: RGBA(50, 170, 251, 1);
  }
  
`;

  const CtaCol = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
background: white;
width: 40%;
margin: 2rem;
padding: 1rem;
box-shadow: 0rem 0rem 1rem 1rem grey;
h2{
  color: RGBA(50, 170, 251, 1);
}
`;

  const InstrIcon = styled.div`
width: 12%;
border-radius: 50%;
padding: 2rem;
background: white;
box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
text-align: center;
img{
  margin: .5rem;
  width: 100px;
  height: 100px;
}
&:hover{
  opacity: .6;
}
&::before{
  content: ''
}
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
  margin: 2rem;
  padding: 2rem;
`;

  const SubmitButton = styled.button.attrs({
    type: 'submit',
  })`
  padding: 1rem;
  font-size: 2rem;
  color:black;
  border-radius: 0;
  margin-top: 2rem;
  &:hover{
    cursor: pointer;
    animation: border 1s forwards;
  }
  @keyframes border {
    100%{
      background: black;
      color: RGBA(50, 170, 251, 1);
      border-radius: 1rem;
    }
  }
`;
  return (<>
    <GlobalStyle />
    <TopSection >
      <Cta>
        <h1>Looper</h1>
        
        <CtaCol>
          <h2>Create songs with your friends</h2>
          <ImageB></ImageB>
        </CtaCol>

        <CtaCol>
          <h2>Choose from our selection of instruments</h2>
          <ImageB></ImageB>
        </CtaCol>
        
        <form action="/api/v1/forms" method="get" className="form">
          <SubmitButton type="submit">Play now!</SubmitButton>
        </form>
        
      </Cta> 
    
    </TopSection>
    <MidSection>
      
      
      <InstrIcon > 
        <img src={pianoIcon} alt="piano icon" />
        Piano
      </InstrIcon>
      
      <InstrIcon > 
        <img src={violinIcon} alt="violin icon" />
        Violin
      </InstrIcon>

      <InstrIcon > 
        <img src={baseGuitarIcon} alt="base guitar icon" />
        Base Guitar
      </InstrIcon>

      <InstrIcon > 
        <img src={saxophoneIcon} alt="saxophone icon" />
        saxophone
      </InstrIcon>
    
    </MidSection>
  </>
  );
};

export default Homepage;
