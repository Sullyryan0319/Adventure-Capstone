import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import RegisterPage from "./RegisterPage/register";
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
                <RegisterPage/>
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
