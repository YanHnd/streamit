import React from "react";
import styles from "../styles/Sidebar.module.scss";
import Home from "../icones/home.svg";
import Search from "../icones/search.svg";
import Discover from "../icones/discover.svg";
import Album from "../icones/album.svg";
import Person from "../icones/person.svg";
import Logo from "../icones/logo.svg";
import Favorites from "../icones/favorites.svg";
import Local from "../icones/local.svg";
import Recent from "../icones/recent.svg";
import { useSession, signOut } from "next-auth/react";

/**
 * @author
 * @function Sidebar
 **/

export const Sidebar = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Logo></Logo>StreamIt
        </div>
        <div className={styles.section}>
          <h3>MENU</h3>
          <ul className={styles.section_list}>
            <li>
              <Home></Home> Home
            </li>
            <li>
              <Search></Search> Search
            </li>
            <li>
              <Discover></Discover> Discover
            </li>
            <li>
              <Album></Album> Albums
            </li>
            <li>
              <Person></Person> Artists
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>LIBRARY</h3>
          <ul className={styles.section_list}>
            <li>
              <Recent></Recent> Recent
            </li>
            <li>
              <Local></Local>
              Local
            </li>
            <li>
              <Favorites></Favorites> Favorites
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>PLAYLISTS</h3>
          <ul className={styles.section_list}>
            <li>
              {" "}
              <Album></Album> Create New
            </li>
            <li>
              {" "}
              <Album></Album> Post punk
            </li>
            <li>
              {" "}
              <Album></Album> Rap
            </li>
            <button onClick={() => signOut()}>Logout</button>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
};
