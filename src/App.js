import { Routes, Route } from "react-router";
import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Daily from "./pages/Daily/Daily";
import Monthly from "./pages/Monthly/Monthly";

import "./App.module.css";

function App() {
  const day = new Date();
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));
  const [login, setLogin] = useState(false);

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("user");
    delete axios.defaults.headers.Authorization;
  };

  const signin = async () => {
    setLogin(true);
  };

  return (
    <div className="App">
      <Navbar
        userLoggedIn={userLoggedIn}
        logout={logout}
        signin={signin}
        login={login}
        onClick={() => !userLoggedIn && setLogin(false)}
      />
      {login ? (
        <Login setUserLoggedIn={setUserLoggedIn} setLogin={setLogin} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Daily userLoggedIn={userLoggedIn} day={day} />}
          />
          <Route
            path="/month"
            element={<Monthly userLoggedIn={userLoggedIn} day={day} />}
          />
          <Route
            path="/:pick"
            element={<Daily userLoggedIn={userLoggedIn} />}
          />
          <Route
            path="/month/:pick"
            element={<Monthly userLoggedIn={userLoggedIn} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
