import React , {useState} from 'react' 
import { handleError, handleSuccess} from '../utility';
import{Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';

 function Signup() {
  const[signupInfo, setSignupInfo] = useState({
      name: '',
      email: '',
      password: ''
  })
 
   const navigate = useNavigate();
  const handleChange = (e)=> {
     const {name , value } = e.target;
     console.log(name,value);
     const copySignupInfo = {...signupInfo};
     copySignupInfo[name] = value;
     setSignupInfo(copySignupInfo);
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const {name , email ,password } = signupInfo;
    if (!name || !email|| !password ){
        return handleError('name ,email and password are required')
    }
    // return handleSuccess('successfully Submited');
    try {
        const url = "http://localhost:8080/auth/signup";
        const response = await fetch(url , {
            method : "POST",
            headers:{
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result  = await response.json();
        console.log(response);
        const { success , message, error} = result;
        if(success){
          handleSuccess(message);
          setTimeout(() =>{
            navigate('/login')
          }, 1000)
          } else if (error){
               const details = error?.details[0].message;
               handleError(details);
          }else if (!success){
            handleError("User is already exist, you can log in");
            setTimeout(() =>{
              navigate('/login')
            }, 2000)
          }
        
    } catch(err){
           handleError(err);
    }
  }
  return (
    <div class=" w-96 p-5 border-7 py-8 px-12 font-sans rounded-lg shadow-lg  shadow-slate-400">
        <h1 class="text-3xl font-medium mb-5">Sign Up</h1>
        <form  onSubmit = {handleSignup}class="flex flex-col  gap-2.5">
            <div class = "flex flex-col ">
                <label htmlFor='name'>Name</label>
                <input 
                  class = " w-full text-sm  outline-none border-b-2 border-black pb-2 font-serif"
                  onChange={handleChange }
                  type='text'
                  autoFocus
                  name = 'name'
                  placeholder='enter your name'
                  value = {signupInfo.name}
                 />
            </div>
            <div class = "flex flex-col ">
                <label htmlFor='Email'>Email</label>
                <input 
                  class = " w-full text-sm  outline-none  border-b-2 border-black pb-2 "
                  onChange={handleChange}
                  type='email'
                  autoFocus
                  name = 'email'
                  placeholder ='enter your email'
                  value = {signupInfo.email}
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
                  value = { signupInfo.password}
                 />
            </div>
            <button class = " bg-indigo-700 border-none text-lg text-white rounded-md px-2.5 py-2.5 cursor-pointer my-2.5 mx-0 hover:bg-blue-800" type='submit'>Signup</button>
            <span class = "flex-row">
              Already have an account?
               <Link  class=" text-blue-800 text-sm"to = "/login">Login</Link> 
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup;
