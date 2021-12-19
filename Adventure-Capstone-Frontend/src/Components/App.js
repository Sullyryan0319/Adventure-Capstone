import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import RegisterForm from "./registerPage/RegisterForm";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Select from 'react-select'
import ActivitiesMapper from "./activitiesMapper/ActivitiesMapper";
import MapContainer from "./MapContainer/MapContainer";

const App = (props) => {
  const[venues,setVenues] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {
    console.log("user =", user);
    await getVenues();
    await axios.post(`http://localhost:5000/api/auth`, user).then((res) => {
      localStorage.setItem("token", res.data);
      console.log("set token");
      const jwt = localStorage.getItem("token");
      console.log("added to local storage");
      setUser(user);
      alert("called get venues", venues)
      alert("user in login funtion =", user);
      navigate("../", { replace: true });

    });
  };

  const logout = async (user) => {
    console.log(localStorage.getItem("token"));
    setUser(null);
    console.log(localStorage.getItem("token"));
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
        getVenues();
        navigate("../", { replace: true });
        console.log("token", res.headers["x-auth-token"]);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  // const getActivities = async (user) => {
  //   await axios
  //     .get(`http://localhost:5000/api/adventurers/${user._id}/activityList`)
  //     .then((res) => setActivities(res));
  // };

  const getVenues = async () => {
    console.log("entered get venues");
    await axios
      .get(`http://localhost:5000/api/venues`)
      .then((res) => {
        setVenues(res);
        console.log("venues retrieved")});
  };

  return (
    <>
      Hello World
      <button onClick={() => navigate("/login", { replace: true })}>
        Login or Register
      </button>
      <Routes>
        {!user && (
          <Route
            path="/login"
            element={
              <>
              <h1>Tester</h1>
                <LoginPage login={login} user={user} setUser={setUser} />
                <RegisterForm
                  register={register}
                  user={user}
                  setUser={setUser}
                />
              </>
            }
          />
        )}
        {user && (
          <Route
            path="/"
            element={
              <>
              <h1>Testing</h1>
              <AdventurerProfile
                user={user}
              />
  <Select options={venues} />
              {/* <MapContainer
              // />
              // <ActivityMapper activities={}
              // />
              /> */}
              </>
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
