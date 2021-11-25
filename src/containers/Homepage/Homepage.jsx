import React, { useEffect, useState } from 'react';
import piano from '../../../public/assets/piano.png';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import play from '../../../public/assets/play-button.png';
import pianoIcon from '../../../public/assets/piano-icon.png';
import violinIcon from '../../../public/assets/violin-icon.png';
import baseGuitarIcon from '../../../public/assets/base-guitar-icon.png';
import saxophoneIcon from '../../../public/assets/saxophone-icon.png';

const Homepage = () => {
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
min-height: 10rem;
min-width: 5rem;
width: 10rem;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
box-sizing: content-box;
animation: cycleImg 6s infinite;
@keyframes cycleImg{
//   10%{background-image: url(${imageRoll[i]});
// }
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
  justify-content: start;
  box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
  padding: 1rem;
  background: black;
  h1{
    margin-top: 0;
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
margin: 1rem;
padding: 1rem;
box-shadow: 0rem 0rem 1rem 1rem grey;
h2{
  color: RGBA(50, 170, 251, 1);
}
`;

  const InstrIcon = styled.div`
width: 5rem;
height:
border-radius: 50%;
padding: 2rem;
margin: 1rem;
background: white;
box-shadow: 0px 0px 10px 4px  rgba(200,200,200, .5);
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
img{
  margin: .5rem;
  width: 5rem;
  height: 5rem;
  display: block;
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: row;
  background: #fff;
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
{/* 
        <CtaCol>
          <h2>Choose from our selection of instruments</h2>
          <ImageB></ImageB>
        </CtaCol> */}
        
        <form onSubmit={async(e) => {
          e.preventDefault();
          await fetch(`${process.env.BACKEND_URL}/signUp`)
        }} className="form">
          <SubmitButton onClick={(e) => window.location.href = '/signIn'} type="submit">Play now!</SubmitButton>
        </form>
        
      </Cta> 
    
    </TopSection>
    <MidSection>
      
      
      <InstrIcon > 
        <img src={pianoIcon} alt="piano icon" /> 
        <p>
          Piano
        </p>
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
