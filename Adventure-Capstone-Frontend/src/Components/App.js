import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = (props) => {
  const [user, setUser] = useState(null);

  const login = async (user) => {
    await axios.post(`http://localhost:5050/api/login`, user).then((res) => {
      localStorage.setItem("token", res.data);
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    });
  };

  return (
    <BrowserRouter basename = '/login'>
      <Routes>
        {!user && (
          <Route
            path="/login"
            element={
              <>
                <LoginPage login={login} user={user} setUser={setUser} />
              </>
            }
          />
        )}
        {user && <Route path="/" element={<AdventurerProfile />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
