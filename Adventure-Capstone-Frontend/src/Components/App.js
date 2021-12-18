import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import RegisterForm from "./registerPage/RegisterForm";
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {
    await axios.post(`http://localhost:5000/api/auth`, user).then((res) => {
      localStorage.setItem("token", res.data);
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    });
  };

    

  const register = async (values) => {
    await axios
    .post("http://localhost:5000/api/adventurers", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,

    })
    .then((res) => {
        localStorage.setItem("token", res.headers["x-auth-token"]);
        const user = jwtDecode(localStorage.getItem("token"));
        setUser(user);
        navigate("../", {replace:true});
        console.log("token", res.headers["x-auth-token"]);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
    }

  return (
    <>
      Hello World
      <button  onClick={()=> navigate("/login",{replace:true})}>Login or Register</button>
      <Routes>
        {!user && (
          <Route
         
            path="/login"
            element={
              <>
                <LoginPage login={login} user={user} setUser={setUser} />
                <RegisterForm register={register} user={user} setUser={setUser}/>
              </>
            }
          />
        )}
        {user && <Route path="/" element={<AdventurerProfile />} />}
      </Routes>
    </>
  );
};

export default App;
