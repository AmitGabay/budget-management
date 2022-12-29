import { Routes, Route } from "react-router";
import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Daily from "./pages/Daily/Daily";
import Monthly from "./pages/Monthly/Monthly";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("user");
    delete axios.defaults.headers.Authorization;
  };

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} logout={logout} />

      <Routes>
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        />

        <Route path="/" element={<Daily userLoggedIn={userLoggedIn} />} />

        <Route
          path="/month"
          element={<Monthly userLoggedIn={userLoggedIn} />}
        />

        <Route path="/:pick" element={<Daily userLoggedIn={userLoggedIn} />} />

        <Route
          path="/month/:pick"
          element={<Monthly userLoggedIn={userLoggedIn} />}
        />
      </Routes>
    </>
  );
};

export default App;
