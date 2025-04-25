import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  if(localStorage.getItem('username') && localStorage.getItem('password')){
    window.location.href = '/home'
  }

  const handleChange = (e) => {
    var { name, value } = e.target;
    value = value.toLowerCase()
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL_BACKEND}/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if(data.success){
        console.log(data)
        localStorage.setItem('username', formData.username)
        localStorage.setItem('password', formData.password)
        window.location.href = '/home'
      } 
      var a = data.message
      if(data.success===false)
          alert(a);
          setIsLoading(false)
      console.log(data.data)
    } catch (error) {
      alert('Login error:', data.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">

      {(isloading) && <h1 className='w-10 h-10 mx-auto mt-50 animate-spin text-white font-bold '>.</h1>}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  minLength={8}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  minLength={8}
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
                <button
                  type="submit"
                  onClick={() => setIsLoading((prev)=>(!prev))}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
            </div>
            <div>
              <Link to="/" className="text-white">Don't have an account? Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;