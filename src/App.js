import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Daily from "./pages/Daily/Daily";
import Monthly from "./pages/Monthly/Monthly";

import "./App.module.css";

function App() {
  const current = new Date();

  const [date, setDate] = useState(
    `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
  );
  const [data, setData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));

  useEffect(() => {
    if (!userLoggedIn) return;

    const getData = async () => {
      const { data: expenses } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/`
      );
      setDate(expenses.date);
      setData(expenses.data);
    };

    getData();
  }, [userLoggedIn]);

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
            element={<Daily date={date} data={data} setData={setData} />}
          />
          <Route path="/month" element={<Monthly />} />
        </Routes>
      ) : (
        <Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      )}
    </div>
  );
}

export default App;
