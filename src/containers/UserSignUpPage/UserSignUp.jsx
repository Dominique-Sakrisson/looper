import React, { useEffect, useState } from 'react';
import style from './style.css';

const userSignUp = () => {
  const [user, setUser] = useState({});

  const [first_name, set_first_name] = useState('');
  const [acceptName, setAcceptName] = useState(false);
  // const [confirmName, setConfirmName] = useState('');
  
  const [lastName, setLastName] = useState('');
  const [acceptLastName, setAcceptLastName] = useState(false);
  const [confirmLastName, setConfirmLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptPhone, setAcceptPhone] = useState(false);
  const [confirmPhone, setConfirmPhone] = useState('');
  const [formValid, setFormValid] = useState(false);


  
  useEffect(() => {
    document.getElementById('lastName').style.display = 'none';
    document.getElementById('email').style.display = 'none';
    // document.getElementById('email').style.backgroundColor = 'blue';
    // // document.getElementById('phone').style.backgroundColor = 'red';
    document.getElementById('phone').style.display = 'none';
  }), [];

  useEffect(() => {
    if(acceptName){
      // setConfirmName(name);
      document.getElementById('first_name').style.display = 'none';
      document.getElementById('lastName').style.display = 'block';
    }
  }), [acceptName];

  useEffect(() => {
    if(acceptLastName){
      setConfirmLastName(lastName);
    }
  }), [acceptLastName];

  useEffect(() => {
    if(confirmLastName.length > 0){
      document.getElementById('lastName').style.display = 'none';
      document.getElementById('email').style.display = 'block';
    }
  }), [confirmLastName];

  useEffect(() => {
    if(acceptEmail){
      setConfirmEmail(email);
    }
  }), [acceptEmail];

  useEffect(() => {
    if(confirmEmail.length > 0){
      document.getElementById('email').style.display = 'none';
      document.getElementById('phone').style.display = 'block';
    }
  }), [confirmEmail];
  useEffect(() => {
    if(acceptPhone){
      setConfirmPhone(phone);

    }
  }), [acceptPhone];

  useEffect(() => {
    if(confirmPhone.length > 9){
      document.getElementById('phone').style.display = 'none';
    }
  }), [confirmPhone];

  function confirmInput(e){ 
    e.preventDefault();
    console.log(e.nativeEvent.path);
  }
  return (<div className={style.signUpForm}>
    {/* the form for collecting user information */}
    <form id="userForm" action="/api/users" method="post">
      {/* main header for the form
      
      displays users name as they fill out forms */}
      <h1>Sign Up</h1>
      
      { //Check input first and last name to greet user
        (first_name && lastName && email && confirmPhone) ? 
        //prompt of complete form
          <p>Hello {first_name} 
            {confirmLastName} <br/>
          Email: {confirmEmail}<br/> 
          phone: {confirmPhone}<br/>
        Is this all correct?
            <button type="submit" onClick={() => {
              setFormValid(true);
            }}> Confirm</button> 
          </p>
          : 
        //prompt if form isnt complete
          <p>Hello {(first_name) ? `${first_name} ${confirmLastName}` : '...what was your name?'} </p>
      }

      <div id="inputLabels">
        {/* //return this input for collecting first name */}
        <label id="first_name" htmlFor="first_name">
          <input onChange={(e) => set_first_name(e.target.value)} type="text" value={first_name} name="first_name"/>
          { //does name have a value?
            (first_name.length > 0) 
              ? <div>
                {/* onclick fire confirmInput to determine which input were working on and then will proceed with grabbing this input labels htmlFor */}
                <button onClick={(e) => {
                  e.preventDefault();
                  confirmInput(e);
                  setAcceptName(true);
                }}> confirm name</button>
              </div> : ''
          }
        </label>
      

        {/* this div displays the confirm button once the name has been entered */}
      
        <label id="lastName" htmlFor="lastName" >
          <p>Last name?</p>
          <input onChange={(e) => setLastName(e.target.value)} type="text" value={lastName} name="lastName"/>
          {/* this div displays the confirm button once the last name has been entered */}
          <div>
            { //does last name have a value?
              (lastName.length > 0) 
                ? <div>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setAcceptLastName(true);
                  }}> confirm  last name</button>
                </div> : ''
            }
          </div>
        </label>
      
      
      
        <label id="email" htmlFor="email">
          <p>Whats your email?</p>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email}/>
          <div>
            { //does email name have a value?
          
              (email.substring(email.length - 4, email.length) === '.com') 
                ? <div>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setAcceptEmail(true);
                  }}> confirm  email</button>
                </div> : ''
            }
          </div>
        </label>
      

      
        <label id="phone" htmlFor="phone">
          <p>Whats your phone number (for verification)</p>
          <input onChange={(e) => setPhone(e.target.value)} type="tel" /*pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"*/ name="phone" value={phone}/>
          <div>
            { //does phone name have a value?
          
              (phone.length > 9) 
                ? <div>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setAcceptPhone(true);
                  }}> confirm  phone</button>
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
