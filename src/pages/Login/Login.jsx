import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./Login.module.css";

const [LOGIN, SIGNUP] = ["Login", "Signup"];

const Login = ({ setUserLoggedIn }) => {
  const [mode, setMode] = useState(LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/${mode}`,
        {
          mode,
          email,
          password,
        }
      );

      setUserLoggedIn(true);
      localStorage.setItem("user", data.token);
      if (data.token) axios.defaults.headers.Authorization = data.token;

      if (mode === SIGNUP && localStorage.getItem("expenses")) {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/daily`, {
          expenses: JSON.parse(localStorage.getItem("expenses")),
        });
        localStorage.removeItem("expenses");
      }

      navigate("/");
    } catch ({ response }) {
      if (response.status === 409) {
        alert("This email is already registered!");
      } else if (response.status === 403) {
        alert("Incorrect email or password. Try again!");
      } else alert("An error occured. Please try again!");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.header}>
          <h2 className={style.name}>{mode}</h2>

          <div className={style.icon}></div>
        </div>

        <form className={style.form} onSubmit={onSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="email"
            value={email}
            name="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            name="psw"
            minLength="8"
            required
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className={style.btn} type="submit">
            {mode}
          </button>
        </form>

        <div className={style.signup}>
          <h4>{mode === LOGIN ? "Not a member?" : "Already a member?"}</h4>

          <button
            className={style.link}
            onClick={() => setMode(mode === LOGIN ? SIGNUP : LOGIN)}
          >
            {mode === LOGIN ? "Signup now" : LOGIN}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
