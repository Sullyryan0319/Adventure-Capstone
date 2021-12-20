import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/login";
import AdventurerProfile from "./AdventurerProfile/adventurerProfile";
import RegisterForm from "./registerPage/RegisterForm";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Select from "react-select";
import ActivitiesMapper from "./activitiesMapper/ActivitiesMapper";
import MapContainer from "./MapContainer/MapContainer";

const App = (props) => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState({});
  const [venueOptions, setVenueOptions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {
    console.log("user in login =", user);
    // const v = await getVenues();

    console.log("venues in login = ", venues);

    await axios.post(`http://localhost:5000/api/auth`, user).then((res) => {
      localStorage.setItem("token", res.data);
      console.log("set token");
      const user = jwtDecode(localStorage.getItem("token"));
      console.log("user after jwt decode = ", user);
      setUser(user);
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

  const handleVenueChange = (event) => {
    console.log("event in handle venue change = ", event.value);
    const venue = venues.filter((v) => v._id === event.value);
    console.log("venue in handle venue change =", venue[0]);
    setSelectedVenue(venue[0]);
  };

  const getVenues = async () => {
    console.log("entered get venues");

    const res = await axios.get(`http://localhost:5000/api/venues`);
    console.log("data in get venues = ", res.data);
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

  useEffect(getActivities, []);

  useEffect(getVenues, []);

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
                <LoginPage login={login} />
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
                <table style={{ width: "100%" }}>
                  <colgroup>
                    <col style={{ width: "15%", padding: "30px" }} />
                    <col style={{ width: "70%", padding: "30px" }} />
                    <col style={{ width: "15%", padding: "30px" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <AdventurerProfile user={user} />
                      </td>
                      <td>
                        <MapContainer />
                      </td>
                      <td>
                        {user && <h1>{user.firstName}</h1>}
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
                            <li>{lodging.type}</li>
                          ))}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Select
                          placeholder="Pick A Venue"
                          options={venueOptions}
                          onChange={handleVenueChange}
                        />
                      </td>
                      <td>
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
