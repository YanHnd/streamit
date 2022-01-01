import styles from "../styles/horizentalLayout.module.scss";
import Notification from "./notification";
import useSpotify from "./../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ArtistCard from "./artist-card";
import Player from "./player/player";

/**
 * @author
 * @function HorizentalLayout
 **/

export const HorizentalLayout = ({ children }) => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [topCategories, setCategories] = useState();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi;
      spotifyApi
        .getCategories({
          limit: 6,
          offset: 0,
          country: "US",
        })
        .then((data) => {
          let top = data.body?.categories?.items;
          setCategories(top);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }, [session, spotifyApi]);

  return (
    <>
      <div className={styles.main_section}>
        <div className={styles.navbar}>
          <ul>
            <li>Music</li>
            <li>Podcast</li>
            <li>Live</li>
            <li>Radio</li>
          </ul>
          <div></div>
        </div>
        {children}
      </div>
      <div className={styles.right_bar}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <div className={styles.title}>
              <h3>Notifications</h3>
            </div>

            <div className={styles.dots}></div>
          </div>
          <Notification></Notification>
          <Notification></Notification>
        </div>
        <div className={styles.artist_container}>
          <div className={styles.nav}>
            <div className={styles.title}>
              <h3>Categories</h3>
            </div>

            <div className={styles.dots}></div>
          </div>
          <div className={styles.card_container}>
            {topCategories?.slice(0, 3).map((category) => (
              <ArtistCard
                key={category.id}
                url={category.icons[0]?.url}
                alt={category.id}
                name={category.name}
              ></ArtistCard>
            ))}
          </div>
          <div className={styles.card_container}>
            {topCategories?.slice(3, 6).map((category) => (
              <ArtistCard
                key={category.id}
                url={category.icons[0]?.url}
                alt={category.id}
                name={category.name}
              ></ArtistCard>
            ))}
          </div>
        </div>
        <div className={styles.player_container}>
          <Player></Player>
        </div>
      </div>
    </>
  );
};
