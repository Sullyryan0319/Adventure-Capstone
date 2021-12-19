import React, {useState, useEffect} from "react";
import useForm from "../../Hooks/useForm";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const RegisterForm = ({user,setUser,register}) => {
  const { values, handleChange, handleSubmit,} = useForm(register);
  const navigate = useNavigate();



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="string"
            name="firstName"
            onChange={handleChange}
            value={values.firstName}
            required={true}
          />
        </label>
        <label>
          Last Name:
          <input
            type="string"
            name="lastName"
            onChange={handleChange}
            value={values.lastName}
            required={true}
          />
        </label>
        <label>
          Email:
          <input
            type="string"
            name="email"
            onChange={handleChange}
            value={values.emailName}
            required={true}
          />
        </label>
        <label>
          Password:
          <input
            type="string"
            name="password"
            onChange={handleChange}
            value={values.password}
            required={true}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
    
  );

};

export default RegisterForm;
