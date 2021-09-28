import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import style from './style.css';

const userSignUp = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('error');

  const [email, setEmail] = useState('');
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [acceptPassword, setAcceptPassword] = useState(false);


  useEffect(() => {
    document.getElementById('password').style.display = 'none';
  }), [];

  useEffect(() => {
    if(acceptEmail){
      document.getElementById('email').style.display = 'none';
      document.getElementById('password').style.display = 'block';
    }
  }), [acceptEmail];



  // useEffect(() => {
  //   if(acceptPassword){
  //     document.getElementById('password').style.display = 'none';
      
  //   }
  // }), [acceptPassword];

  const InputLabel = styled.div`
  font-size: .8rem;
  padding: 0;
  margin: 0;
  `;
  return (
    <div className={style.signUpForm}>
      {/* main header for the form
      displays users name as they fill out forms */}
      <h1>Looper</h1>

      <p>Sign In</p>
      {/* the form for collecting user information */}
      <form id="userForm" action="/api/v1/users/signIn" method="post">
        { //Check input first and last name to greet user
          (acceptPassword) ? 
          //prompt of complete form
            <div> 
              <h3>You entered</h3>
              <p>
          Email: {email}<br/> 
          password: {'*'.repeat(password.length)} <br/>
              </p>
        Is this all correct?
              <button type="submit" onClick={(e) => {
               
              }}> Confirm</button> 
            </div>
            : 
          //prompt if form isnt complete
            ''
        }

        <div id="inputLabels">      
          <label id="email" htmlFor="email">
            <InputLabel>Email address</InputLabel>
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
                      }}> submit</button>
                  </div> : 'youremail@examplemail.com'
              }
              
            </div>
          </label>
          <label id="password" htmlFor="password">
            <p>{email}</p>
            <InputLabel>Password</InputLabel>
            <input onChange={(e) => setPassword(e.target.value)} type="password"  name="password" value={password}/>
            <div>
              { //does password name have a value?
          
                (password) 
                  ? <div>
                    <button type="submit" onClick={(e) => {
                      
            
                    }}> Sign In</button>
                  </div> : ''
              }
            </div>
          </label>
        
        </div>

      </form>

    </div>
  );
};

export default userSignUp;
