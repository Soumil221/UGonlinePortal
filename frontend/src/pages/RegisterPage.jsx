import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    password: ''
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailformat = /^\d{9}@nitkkr\.ac\.in$/;
    if(!emailformat.test(formData.email)) {
      alert("Invalid Email, Please enter the college domain id")
      window.location.reload();
    } 

    try {
      await axios.post(``, {
        name: formData.name,
        email: formData.email,
        rollno: formData.rollno,
        password: formData.password,
      });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F1FA] text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-[#3D8BCA]">Register</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white"
                    required
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                    required
                  />
                  <input
                    type="text"
                    name="rollno"
                    placeholder="Roll Number"
                    value={formData.rollno}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#A0C4E2] text-gray-900 w-full py-4 rounded-lg hover:bg-[#3D8BCA] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Register</span>
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#3D8BCA] hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
