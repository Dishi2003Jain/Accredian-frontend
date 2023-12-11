import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    Name: "",
    email: "",
    password: "",
    confirmpassword:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const record = {
      Name:formData.Name,
      email: formData.email,
      password: formData.password,
      confirmpassword:formData.confirmpassword
    };
    // You can use formData.firstName, formData.lastName, formData.email, and formData.password here
    // for further processing like sending data to a server, etc.
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        record
      );

      if (formData.password===formData.confirmpassword && response.status === 201) {
        // Signup successful
        const data = response.data;
        // Handle successful signup, e.g., display success message, redirect, etc.
        console.log(data); // Handle the response data as needed
        setFormData({Name: "", email: "", password: "",confirmpassword:""});
      } else {
        // Handle unsuccessful signup
        console.error("Signup failed");
        // Display error message or perform necessary actions for a failed signup attempt
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error occurred:", error);
      // Display error message or perform necessary actions for errors
    }
    navigate("/login");
  };
  return (
    <div className="container-fluid">

      <div className="bg-image"></div>

      <div className='card-container'>

        <div className='card-body'>

          <h2 className="">Sign up now</h2>

          <div className="inputs">
            <input className='form-input' placeholder='Name' type='text' value={formData.Name}
                  onChange={handleInputChange}/>
            <input className='form-input' placeholder='Email' type='email'value={formData.email}
                  onChange={handleInputChange}/>
            <input className='form-input' placeholder='Password' type='password'  value={formData.password}
                  onChange={handleInputChange}/>
            <input className='form-input' placeholder='Confirm Password' type='password' value={formData.confirmpassword}
                  onChange={handleInputChange}/>
            <button className='submit-btn' onClick={handleSubmit}>SIGN UP</button>
          </div>
          <NavLink to='/login' style={{ color: '#1266f1'}}>
                  Already have an account? Log in
                </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Signup;
