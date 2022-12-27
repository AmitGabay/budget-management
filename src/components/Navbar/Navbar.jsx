import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

const Navbar = ({ userLoggedIn, logout, signin }) => {
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
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={signin}>Signup</button>
      )}
    </nav>
  );
};

export default Navbar;
