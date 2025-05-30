import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate() 


  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    if(!email || !password){
      alert("Please fill up all the data")
    }else{
      fetch('http://localhost:3000/auth/singin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      }
      ).then(res=>res.json()).then(result=>{
        if(result.error){
          toast.error(result.error)
        }else{
          toast.success("You have successlly loged in")
          localStorage.setItem('jwt',result.token)
          localStorage.setItem('id',result.id)
          navigate("/")
        }
      })
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p  className='font-semibold text-center text-blue-500 cursor-pointer underline'  onClick={()=>{navigate('/signup')}}>
          Don't have an accound? SignUp
        </p>

        <button
          type="submit"
          className="w-full my-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;