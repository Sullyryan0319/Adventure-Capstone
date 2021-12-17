import React from "react";
import useForm from "../../Hooks/useForm";

const RegisterForm = () => {
  const { values, handleChange, handleSubmit } = useForm(register);

  function register() {
    alert("Thank you for registering!");
  }

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
