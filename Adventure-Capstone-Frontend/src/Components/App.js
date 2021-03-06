import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import RegisterForm from "./registerPage/RegisterForm";
import axios from "axios";
import "./App.css";
import jwtDecode from "jwt-decode";
import Select from "react-select";
import MapContainer from "./MapContainer/MapContainer";
import Logout from "./Logout/Logout";

const App = (props) => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState({});
  const [venueOptions, setVenueOptions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [lodgingOptions, setLodging] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {


    await axios.post(`http://localhost:5000/api/auth`, user).then((res) => {
      localStorage.setItem("token", res.data);
      const user = jwtDecode(localStorage.getItem("token"));
      setUser(user);
      navigate("../", { replace: true });
    });
  };

  const logout = async (user) => {
    setUser(null);
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

  const handleVenueChange = (event) => {
    const venue = venues.filter((v) => v._id === event.value);
    setSelectedVenue(venue[0]);
  };

  const getVenues = async () => {

    const res = await axios.get(`http://localhost:5000/api/venues`);
    const rawVenues = res.data;
    setVenues(rawVenues);
    const venueOptions = rawVenues.map((venue, i) => {
      return {
        value: venue._id,
        label: venue.name,
      };
    });
    setVenueOptions(venueOptions);
  };

  const getActivities = async () => {
    const res = await axios.get(`http://localhost:5000/api/activities`);
    const rawActivities = res.data;
    setActivities(rawActivities);
  };

  const getLodging = async () => {
    const res = await axios.get(`http://localhost:5000/api/lodgingOptions`);
    const rawLodging = res.data;
    setLodging(rawLodging);
  };

  useEffect(getActivities, []);

  useEffect(getVenues, []);

  useEffect(getLodging, []);

  return (
    <>
              <h1 style={{color: "white", alignContent: "center"}}>ROCKY MOUNTAIN EXPEDITIONS</h1>

      <Routes>
        {!user && (
          <Route
            path="/login"
            element={
              <>
                <table>
                <colgroup>
                    <col style={{ width: "10%", padding: "30px" }} />
                    <col style={{ width: "50%", padding: "30px" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style={{color: "white"}}>
                        <LoginPage login={login} />
                      </td>
                      <td style={{color: "white", width: "80px"}}>
                        <RegisterForm
                          register={register}
                          user={user}
                          setUser={setUser}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            }
          />
        )}
        {user && (
          <Route
            path="/"
            element={
              <>
                <table style={{ width: "100%", border: "2px solid black" }}>
                  <colgroup>
                    <col style={{ width: "25%", padding: "30px" }} />
                    <col style={{ width: "50%", padding: "30px" }} />
                    <col style={{ width: "15%", padding: "30px" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style={{ color: "white", border: "1px solid black" }}>
                        <AdventurerProfile user={user} />
                      </td>
                      <td>
                        <MapContainer />
                      </td>
                      <td
                        style={{
                          background: "#7B6442",
                          color: "white",
                          textAlign: "left",
                        }}
                      >
                        {user && (
                          <h1 style={{ textAlign: "center" }}>
                            {user.firstName}
                          </h1>
                        )}
                        <h3>Activity Itinerary</h3>
                        {user &&
                          user?.activityList?.map((activity, i) => (
                            <li>
                              {
                                activities.find((a) => a._id === activity)
                                  ?.description
                              }
                            </li>
                          ))}
                        <h3>Lodging</h3>
                        {user &&
                          user?.lodging?.map((lodging, i) => (
                            <li>
                              {
                                lodgingOptions.find((l) => l._id === lodging)
                                  ?.type
                              }
                            </li>
                          ))}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style={{ textAlign: "center", color: "white" }}>
                          Discover Local Venues
                        </h1>
                        <Select
                          placeholder="Pick A Venue"
                          options={venueOptions}
                          onChange={handleVenueChange}
                        />
                      </td>
                      <td style={{ color: "white", padding: "20px" }}>
                        {selectedVenue && <h1>{selectedVenue.name}</h1>}
                        <h3>Available Activities</h3>
                        {selectedVenue &&
                          selectedVenue?.activities?.map((activity, i) => (
                            <li>{activity.description}</li>
                          ))}
                        <h3>Available Lodging</h3>
                        {selectedVenue &&
                          selectedVenue?.lodging?.map((lodging, i) => (
                            <li>{lodging.type}</li>
                          ))}
                      </td>
                      <td>
                        <Logout />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
