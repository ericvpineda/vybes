import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
    
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          body: form,
        });
        const authenticatedUser = await response.json();
        
        if (response.ok) {
            if (authenticatedUser) {
              navigate("/")
            }
        } else {
            // TODO: Show UI for incorrect login
            console.log(authenticatedUser.message)
        }
      };

  return (
    <div className='h-full w-full flex justify-center items-center'>
        <div className='bg-slate-500 p-10 flex flex-col justify-betwee rounded-md'>
            <h2 className="text-white text-lg font-medium mb-4">Welcome to Vybes, the music social media hub for electronic music.</h2>
            <div className='mb-2'>
                <form onSubmit={formSubmitHandler} method="POST" className='flex flex-col'>
                    <input type="text" name="username" id="username" placeholder='Username' className='mb-5 py-2 px-1'/>
                    <input type="text" name="password" id="password" placeholder='Password' className='mb-5 py-2 px-1'/>
                    <button className='bg-black text-white py-2 px-1 rounded-lg'>Login</button>
                </form>
            </div>
            <div>
                <a href="#" className='text-blue-800'>Don't have an account? Sign up here.</a>
            </div>
        </div>
    </div>
  )
}
