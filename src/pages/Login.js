import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; 
  useEffect(() => {
    const accessToken = localStorage.getItem("acctoken");
    if (accessToken) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      console.log(response);

      if (response.status === 200) {
        // Login successful
        const data = response.data;
        const token = data.token;

        // Save the token in localStorage
        localStorage.setItem("acctoken", token);
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        // Handle unsuccessful login
        console.error("Login failed");
        // Display error message or perform necessary actions for a failed login attempt
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error occurred:", error);
      // Display error message or perform necessary actions for errors
    }
    // You can use formData.email and formData.password here to access the form values
  };
  return (
    <div className="container-fluid">

      <div className="bg-image"></div>

      <div className='card-container'>

        <div className='card-body'>

          <h2 className="">Login now</h2>

          <div className="inputs">
            <input className='form-input' placeholder='Email' type='email'  value={formData.email}
              onChange={handleInputChange}/>
            <input className='form-input' placeholder='Password' type='password'   value={formData.password}
              onChange={handleInputChange}/>
            <button className='submit-btn' onClick={handleSubmit}>LOGIN</button>
          </div>
          <NavLink to='/signup' style={{ color: '#1266f1'}}>
                  Don't have an account? Sign up
                </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login