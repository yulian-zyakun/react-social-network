import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const menu = ["Profile", "Dialogs", "Users", "News", "Music", "Settings"];

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      {menu.map((m) => (
        <NavItem key={m} menuItem={m} />
      ))}
    </nav>
  );
};

const NavItem = (props) => {
  return (
    <div className={styles.item}>
      <NavLink
        to={`/${props.menuItem.toLowerCase()}`}
        activeClassName={styles.activeLink}
      >
        {props.menuItem}
      </NavLink>
    </div>
  );
};

export default Navbar;
