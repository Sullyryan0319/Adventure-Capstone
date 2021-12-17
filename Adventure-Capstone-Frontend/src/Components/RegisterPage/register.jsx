import React, {useState, useEffect} from "react";
import useForm from "../../Hooks/useForm";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const RegisterForm = () => {
  const { values, handleChange, handleSubmit, setUser} = useForm(register);
  const navigate = useNavigate();

  function register (){
      alert('Thanks for registering');
  }

//   const register = async () => {
//     await axios
//     .post("http://localhost:5000/api/adventurers", {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         password: values.password,

//     })
//     .then((res) => {
//         localStorage.setItem("token", res.headers["x-auth-token"]);
//         const user = jwtDecode(localStorage.getItem("token"));
//         setUser(user);
//         // navigate("/");
//         console.log("token", res.headers["x-auth-token"]);
//       })
//       .catch(function (error) {
//         if (error.response) {
//           console.log(error.response.data);
//         }
//       });
//   };
  

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
            reqired={true}
          />
        </label>
        <label>
          Last Name:
          <input
            type="string"
            name="lastName"
            onChange={handleChange}
            value={values.lastName}
            reqired={true}
          />
        </label>
        <label>
          Email:
          <input
            type="string"
            name="email"
            onChange={handleChange}
            value={values.emailName}
            reqired={true}
          />
        </label>
        <label>
          Password:
          <input
            type="string"
            name="password"
            onChange={handleChange}
            value={values.password}
            reqired={true}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
