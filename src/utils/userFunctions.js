const backendUrl = 'https://looper-net-backend.herokuapp.com/api/v1/';
const localUrl = 'http://localhost:3000'

export const signUpUser = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:  JSON.stringify({email, password}),
    
  }
  console.log(requestOptions);
  const res = await fetch(`${backendUrl}/api/v1/users/signUp`, requestOptions);
  const json = await res.json();
  return json;
};

export const loginUser = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:  JSON.stringify({email, password}),
    
  }
  const res = await fetch(`${backendUrl}/api/v1/users/login`, requestOptions);
  const json = await res.json();
  return json;
};

export const getUsers = async () => {
  const res = await fetch(backendUrl + '/api/v1/users/', {
    method: 'get',
  });
  const json = await res.json();
  return json;
};
