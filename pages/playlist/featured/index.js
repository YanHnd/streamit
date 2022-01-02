import { useEffect, useState } from "react";
import { HorizentalLayout } from "./../../../components/horizentalLayout ";
import { Sidebar } from "./../../../components/sidebarLayout";
import styles from "../../../styles/playlist.module.scss";
import useStore from "../../../store/store";
import { useSession } from "next-auth/react";
import useSpotify from "./../../../hooks/useSpotify";
import { Card } from "./../../../components/card";

/**
 * @author
 * @function Featured
 **/

const Featured = (props) => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const featuredPlaylist = useStore((state) => state.featuredPlaylists);
  useEffect(() => {
    if (spotifyApi.getAccessToken() != undefined) {
      spotifyApi.getFeaturedPlaylists().then(
        function (data) {
          console.log(data.body.playlists.items);
          useStore.setState({ featuredPlaylists: data.body.playlists.items });
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [session, spotifyApi]);
  return (
    <div className={styles.playlist_container}>
      <div className={styles.playlist_header}>
        <h2>Featured Playlists</h2>
        <h4>{featuredPlaylist?.length + " "}Playlists</h4>
      </div>

      <div className={styles.card_container}>
        {featuredPlaylist != null
          ? featuredPlaylist.map((item) => (
              <Card
                title={item.name}
                artist={item.owner.display_name}
                type="playlist"
                url={item.images[0].url}
                uri={item.uri}
                alt={item.name}
                key={item.id}
                id={item.id}
              ></Card>
            ))
          : null}
      </div>
    </div>
  );
};

export default Featured;

Featured.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
