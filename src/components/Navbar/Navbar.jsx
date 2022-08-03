import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

const Navbar = () => {
  const activeClassName = style.selected;

  return (
    <div className={style.navbar}>
      <p>Budget Managment</p>
      <NavLink
        to={"/"}
        className={`${({ isActive }) => isActive && activeClassName} ${
          style.text
        }`}
      >
        Daily
      </NavLink>
      <NavLink to={"/month"} className={style.text}>
        Monthly
      </NavLink>
    </div>
  );
};

export default Navbar;
