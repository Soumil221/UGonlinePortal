import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    department: '',
    semester: '',
    password: '',
    confirm: '',
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
    if(formData.password!=formData.confirm) {
      alert("Invalid Credintials entered");
    }

    try {
      await axios.post(``, {
        name: formData.name,
        email: formData.email,
        rollno: formData.rollno,
        department: formData.department,
        semester: formData.semester,
        password: formData.password,
      });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };


  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'text', placeholder: 'Email' },
    { name: 'rollno', type: 'text', placeholder: 'Roll Number' },
    { name: 'department', type: 'text', placeholder: 'Department' },
  ];

  return (
    <div className="min-h-screen bg-[#E8F1FA] text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-[#3D8BCA]">Register</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} className="flex flex-col">
                {inputFields.map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                      required
                    />
                  ))}
                 <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] text-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                    required
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                  </select>
                  <input
                    type="password"
                    name="password"
                    placeholder="Set Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#F0F8FF] border border-[#A0C4E2] placeholder-gray-500 text-sm focus:outline-none focus:border-[#3D8BCA] focus:bg-white mt-5"
                    required
                  />
                  <input
                    type="password"
                    name="condirm"
                    placeholder="Confirm Password"
                    value={formData.confirm}
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
