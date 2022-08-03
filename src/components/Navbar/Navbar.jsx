import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.navbar}>
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
    </div>
  );
};

export default Navbar;
