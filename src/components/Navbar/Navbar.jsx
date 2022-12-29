import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

const Navbar = ({ userLoggedIn, logout }) => {
  return (
    <nav className={style.navbar}>
      <p>Budget Managment</p>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${style.text} ${isActive ? style.selected : ""}`
        }
      >
        Daily
      </NavLink>
      <NavLink
        to={"/month"}
        className={({ isActive }) =>
          `${style.text} ${isActive ? style.selected : ""}`
        }
      >
        Monthly
      </NavLink>
      {userLoggedIn ? (
        <button className={style.btn} onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `${style.login} ${isActive ? style.disappear : ""}`
          }
        >
          <button className={style.btn}>Login</button>
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
