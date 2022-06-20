import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    const user = {
      email,
      password,
    }
    try {
      setLoading(true)
      const result = await axios.post('http://localhost:5000/api/users/login', user);
      setLoading(false);
      const checkresult = result.data;
      if (checkresult) {
        localStorage.setItem('currentUser', JSON.stringify(checkresult));
        window.location.href = '/home'
      } else {
        window.location.href = '/login'
      }

    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(true)
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      <h1>
        <div className='row justify-content-center mt-5'>
          <div className='col-md-5 mt-5'>
            {error && (<Error message='Invalid Credentionals' />)}
            <div className='bs'>
              <h2>Login</h2>

              <input type='text' className='form-control ' placeholder='email'
                value={email} onChange={(e) => { setEmail(e.target.value) }} />
              <input type='password' className='form-control mt-3' placeholder='password'
                value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <p style={{marginTop: 10, color: 'blue'}}>Forgot password?</p>

              <button className='btn mt-3' onClick={login}>Login</button>
            </div>
          </div>
        </div>
      </h1>
    </div>
  )
}

export default LoginScreen