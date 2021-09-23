import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import close from '../../../public/assets/close-button.png';
import check from '../../../public/assets/check-button.png';

import styled, { createGlobalStyle, keyframes, css } from "styled-components";

import style from './style.css';

const userSignUp = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('error');
  const [user, setUser] = useState({});

  const [email, setEmail] = useState('');
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [acceptPassword, setAcceptPassword] = useState(false);
  const [acceptPassword2, setAcceptPassword2] = useState(false);
 
  const [formValid, setFormValid] = useState(false);


  
  useEffect(() => {

    document.getElementById('password').style.display = 'none';
    document.getElementById('password2').style.display = 'none';
  }), [];

  useEffect(() => {
    if(acceptEmail){
      document.getElementById('email').style.display = 'none';
      document.getElementById('password').style.display = 'block';
    }
  }), [acceptEmail];



  useEffect(() => {
    if(acceptPassword){
      document.getElementById('password').style.display = 'none';
      document.getElementById('password2').style.display = 'block';
    }
  }), [acceptPassword];

  useEffect(() => {
    if(acceptPassword2 && password2 === password){
      document.getElementById('password2').style.display = 'none';
    }
  }), [acceptPassword2];
  

  const CheckedIcon = styled.img`
    position: relative;
    text-align: start;
    top: .75rem;
    width: 2rem;
    height: 2rem;
  `;

  const passLength = (num) => {
    let result = {
      src: '../../../public/assets/close-button.png',
      status: false
    };
    //if number ==== 1 that means were in the first password field
    if(num === 1){
    //if first input && password >= 7 set the object src to a check, and the status to true
      if(password.length >= 7){
        result = { src: '../../../public/assets/check-button.png', status: true };
      }
    }

    //else were working in the second password field
    if(num === 2) {
      //and do the same as above
      if(password2.length >= 7){
        result = { src: '../../../public/assets/check-button.png', status: true };
      }
    }
    //return that object
    return result;
  };
 
  const passCase = (num) => {
    let result = {
      src: '../../../public/assets/close-button.png',
      status: false
    };
    if(num === 1){
      //evaluatue the string for the first password to check for uppercase
      for(const item of password){
        //there is an uppercase
        if(item === item.toUpperCase() && isNaN(item) && item.match(/[a-z]/i)) {
          result = {
            src: '../../../public/assets/check-button.png',
            status: true
          };
          //there is no uppercase
        } 
      }
    } 
    //in case the item is 2
    if(num === 2){
      //evaluatue the string for the first password to check for uppercase
      for(const item of password2){
        //there is an uppercase
        if(item === item.toUpperCase() && isNaN(item) && item.match(/[a-z]/i)) {
          result = {
            src: '../../../public/assets/check-button.png',
            status: true
          };
          //there is no uppercase
        } 
      }
    }
    return result;
  };

  const passSym = (num) => {
    let result = {
      src: '../../../public/assets/close-button.png',
      status: false
    };
    if(num === 1){
      for(const item of password){
        if(!item.isNaN && !item.match(/[a-z]/i)) {
          result = { src:'../../../public/assets/check-button.png', status: true };
          return result;
        }
      }
    }
    if(num === 2){
      for(const item of password2){
        if(!item.isNaN && !item.match(/[a-z]/i)) {
          result = { src: '../../../public/assets/check-button.png', status: true };
          return result;
        }
      }
    }
    return result;
  };

  function passMatch(){
    if(password === password2) {
      return '../../../public/assets/check-button.png';
    }
    return '../../../public/assets/close-button.png';
  }
  
 
  return (
    <div className={style.signUpForm}>
      {/* main header for the form
      displays users name as they fill out forms */}
      <h1>Sign Up Form</h1>

      <p>Welcome To Looper</p>
      {/* the form for collecting user information */}
      <form id="userForm" action="/api/v1/users" method="post">
        { //Check input first and last name to greet user
          (acceptPassword2) ? 
          //prompt of complete form
            <div> 
              <h3>You entered</h3>
              <p>
          Email: {email}<br/> 
          password: {'*'.repeat(password.length)} <br/>
              </p>
        Is this all correct?
              <button type="submit" onClick={(e) => {
                setFormValid(true);
              }}> Confirm</button> 
            </div>
            : 
          //prompt if form isnt complete
            ''
        }

        <div id="inputLabels">      
          <label id="email" htmlFor="email">
            <p>Set your email</p>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email}/>
            <div>
            
              { //does email name have a value?
                (email.substring(email.length - 4, email.length) === '.com') 
                  ? //yes it does
                  <div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setAcceptEmail(true);
                      }}> confirm  email</button>
                  </div> : 'youremail@examplemail.com'
              }
              
            </div>
          </label>
          <label id="password" htmlFor="password">
            <p>Set a password </p>
            <input onChange={(e) => setPassword(e.target.value)} type="password" /*pattern="[0-9]{3}-[Tel[0-9]{4}"*/ name="password" value={password}/>
            <div>
              { //does password name have a value?
          
                (passLength(1).status && passCase(1).status && passSym(1).status) 
                  ? <div>
                    <button onClick={(e) => {
                      e.preventDefault();
                      setAcceptPassword(true);
                    }}> Set password</button>
                  </div> : ''
              }
            </div>
            <CheckedIcon src={passLength(1).src}/> 7 Characters long <br/>
            <CheckedIcon src={passCase(1).src}/> One uppercase letter<br/>
            <CheckedIcon src={passSym(1).src}/> one symbol/number
          </label>

          <label id="password2" htmlFor="password2">
            <p>Confirm password </p>
            <input onChange={(e) => setPassword2(e.target.value)} type="password" /*pattern="[0-9]{3}-[Tel[0-9]{4}"*/ name="password2" value={password2}/>
            <div>
              { //does password name have a value?
          
                (passLength(2).status && passCase(2).status && passSym(2).status) 
                  ? <div>
                    <button onClick={(e) => {
                      e.preventDefault();
                      if(password === password2){
                        setAcceptPassword2(true);
                      } else {
                        alert('passwords must match');
                        throw 'passwords must match!';
                      }
                    }}> confirm password</button>
                  </div> : ''
              }
              <CheckedIcon src={passLength(2).src}/> 7 Characters long <br/>
              <CheckedIcon src={passCase(2).src}/> One uppercase letter<br/>
              <CheckedIcon src={passSym(2).src}/> one symbol/number <br/>
              <CheckedIcon src={passMatch()}/> match first entry
            </div>
          </label>
          
        </div>

      </form>

      {(name) ? <div className={style.errorMessage}>Entered Email already exists</div> : ''}
    </div>
  );
};

export default userSignUp;
