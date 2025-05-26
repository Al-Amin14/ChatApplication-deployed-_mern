import React, {useState } from 'react' ;
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpPage = () => {

  const navigate=useNavigate()
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert('All fields are required.')
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return;
    }

    // Proceed with signup logic (e.g., API call)
    console.log({ fullName, email, password });
    

    fetch("http://localhost:3000/auth/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        fullname:fullName,
        email:email,
        password:password,
        conformPassword:confirmPassword
      })
    }).then(res=>res.json()).then(result=>{
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success("Accound created successfully")
      }
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Sign Up</h2>

        

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 font-semibold text-xl text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <p className="text-blue-700 underline py-5 text-center font-semibold cursor-pointer" onClick={()=>{navigate('/login')}}>Already have an accound ? login</p>
      </form>
    </div>
  );
};

export default SignUpPage;