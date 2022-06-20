import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function RegisterScreen() {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[cpassword, setCPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

 async function register(){
    if(password==cpassword){
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setLoading(true);
        const result = await axios.post('http://localhost:5000/api/users/register', user).data;
        setLoading(false)
        setSuccess(true)

        setName('')
        setEmail('')
        setPassword('')
        setCPassword('')

      
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true)
      }
    }else{
      alert ('password not matched')
    }
  }

  return (
    <div>
      {loading && (<Loader/>)}
      {error && (<Error/>)}
      
        <h1>
            <div className='row justify-content-center '>
              <div className='col-md-5 mt-5'>
              {success && (<Success message='Registration success'/>)}
                <div className='bs'>
                  <h2>Register</h2>
                  <input type='text' className='form-control mt-3' placeholder='name' 
                  value={name} onChange={(e)=>{setName(e.target.value)}}/>
                  <input type='email' className='form-control mt-3' placeholder='email'
                  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  <input type='password' className='form-control mt-3' placeholder='password'
                  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  <input type='password' className='form-control mt-3' placeholder='confirm password'
                  value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}}/>

                  <button className='btn mt-3' onClick={register}>Register</button>
                </div>
              </div>
            </div>
        </h1>
    </div>
  )
}

export default RegisterScreen