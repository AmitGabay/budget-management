import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Daily from "./pages/Daily/Daily";
import Monthly from "./pages/Monthly/Monthly";

import "./App.module.css";

function App() {
  const day = new Date();

  // const [day, setDay] = useState(
  //   `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
  // );

  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.clear();
    delete axios.defaults.headers.Authorization;
  };

  return (
    <div className="App">
      <Navbar userLoggedIn={userLoggedIn} logout={logout} />
      {userLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<Daily userLoggedIn={userLoggedIn} day={day} />}
          />
          <Route
            path="/month"
            element={<Monthly userLoggedIn={userLoggedIn} day={day} />}
          />
        </Routes>
      ) : (
        <Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      )}
    </div>
  );
}

export default App;
