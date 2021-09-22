import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

import styled, { createGlobalStyle, keyframes, css } from "styled-components";

import style from './style.css';

const userSignUp = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('error');

 console.log(search, ' is the search');
 console.log(name, ' is the name');
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

  // useEffect(() => {
  //   if(acceptName){
  //     // setConfirmName(name);
  //     document.getElementById('').style.display = 'none';
  //     document.getElementById('').style.display = 'block';
  //   }
  // }), [acceptName];

  // useEffect(() => {
  //   if(acceptLastName){
  //     document.getElementById('').style.display = 'none';
  //     document.getElementById('email').style.display = 'block';
  //   }
  // }), [acceptLastName];

  // useEffect(() => {
  //   if(confirmLastName.length > 0){
  //     document.getElementById('').style.display = 'none';
  //     document.getElementById('email').style.display = 'block';
  //   }
  // }), [confirmLastName];
  // useEffect(() => {
  //   if(acceptEmail > 0){
  //     document.getElementById('email').style.display = 'none';
  //     document.getElementById('password').style.display = 'block';
  //   }
  // }), [email];

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

  return (<div className={style.signUpForm}>
    {/* main header for the form
      displays users name as they fill out forms */}
    <h1>Sign Up Form</h1>

    <p>Welcome To Looper</p>
    {/* the form for collecting user information */}
    <form id="userForm" action="/api/v1/users" method="post">
      { //Check input first and last name to greet user
        (acceptEmail && acceptPassword && acceptPassword2) ? 
        //prompt of complete form
          <div> 
            <h3>You entered</h3>
            <p>
          Email: {email}<br/> 
          password: {'*'.repeat(password.length)} <br/>
            </p>
        Is this all correct?
            <button type="submit" onClick={(e) => {
              console.log(e);
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
          
              (password.length > 9) 
                ? <div>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setAcceptPassword(true);
                  }}> Set password</button>
                </div> : ''
            }
          </div>
        </label>

        <label id="password2" htmlFor="password2">
          <p>Confirm password </p>
          <input onChange={(e) => setPassword2(e.target.value)} type="password" /*pattern="[0-9]{3}-[Tel[0-9]{4}"*/ name="password2" value={password2}/>
          <div>
            { //does password name have a value?
          
              (password2.length > 9) 
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
          </div>
        </label>
      </div>

    </form>

    {(name) ? <div className={style.errorMessage}>Entered Email already exists</div> : ''}
  </div>
  );
};

export default userSignUp;
