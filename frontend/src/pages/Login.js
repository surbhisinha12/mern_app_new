import React , {useState} from 'react' 
import { handleError, handleSuccess} from '../utility';
import{Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';

function Login() {

  const[loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
  })
 
   const navigate = useNavigate();
  const handleChange = (e)=> {
     const {name , value } = e.target;
     const copyLoginInfo = {...loginInfo};
     copyLoginInfo[name] = value;
     setLoginInfo(copyLoginInfo);
     console.log(setLoginInfo);

  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email ,password } = loginInfo;
    if ( !email || !password ){
        return handleError('email and password are required')
    }
    try {
        const url = "http://localhost:8080/auth/login";
        const response = await fetch(url , {
            method : "POST",
            headers:{
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result  = await response.json();
        const { success , message, error, jwtToken, name} =  result;
        if(success){
          handleSuccess(message);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser' , name);
          setTimeout(() => {
            navigate('/home')
          }, 1000)
          } else if (error){
               const details = error?.details[0].message;
               handleError(details);}
          else if (!success){
            handleError(message);
          }
        console.log(result);
    } catch(err){
           handleError(err);
    }
  }
  return (
    <div class=" w-96 p-5 border-7 py-8 px-12 font-sans rounded-lg shadow-lg  shadow-slate-400">
        <h1 class="text-3xl font-medium mb-5">Login</h1>
        <form  onSubmit = {handleLogin}class="flex flex-col  gap-2.5">
           <div class = "flex flex-col ">
                <label htmlFor='email'>Email</label>
                <input 
                  class = " w-full text-sm  outline-none  border-b-2 border-black pb-2 "
                  onChange={handleChange}
                  type='email'
                  autoFocus
                  name = 'email'
                  placeholder ='enter your email'
                  value = {loginInfo.email}
                 />
            </div>
            <div class = "flex flex-col ">
                <label htmlFor='password'>Password</label>
                <input 
                  class = " w-full text-sm  outline-none  border-b-2 border-black pb-2"
                  onChange={handleChange}
                  type='password'
                  autoFocus
                  name = 'password'
                  placeholder='enter your password'
                  value = { loginInfo.password}
                 />
            </div>
            <button class = " bg-indigo-700 border-none text-lg text-white rounded-md px-2.5 py-2.5 cursor-pointer my-2.5 mx-0 hover:bg-blue-800" type='submit'>Login</button>
            <span class = "flex-row">
              Does't have an account?
               <Link  class=" text-blue-800 text-sm"to = "/signup">Signup</Link> 
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login;

