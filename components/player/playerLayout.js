import { useEffect, useState, useCallback, useRef } from "react";
//import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import usePlayer from "../../hooks/usePlayer";
import useStore from "../../store/store";
import { getPlayerInfo } from "./PlayerFunc";
import styles from "../../styles/player.module.scss";
import PlayerControls from "./PlayerControls";
import { millisecondsToMinutesSeconds } from "./PlayerUtils";

/**
 * @author
 * @function PlayerLayout
 **/

export const PlayerLayout = (props) => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  let streamItPlayer = useRef(null);

  const device = useStore((state) => state.device_id);
  const current_track = useStore((state) => state.currentTrack);
  const store = useStore();

  useEffect(() => {
    let token = spotifyApi.getAccessToken();
    if (token) {
      console.log(token);
      streamItPlayer.current = usePlayer({ streamItPlayer });
      getPlayerInfo({ spotifyToken: token });
    }
  }, [spotifyApi]);
  const playMusic = () => {
    spotifyApi
      .play({
        device_id: device,
        context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
      })
      .then(
        function () {
          console.log("Playback started");
        },
        function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log("Something went wrong!", err);
        }
      );
  };

  //const playbackState = usePlaybackState();
  //const device = usePlayerDevice();
  //console.log(window.Spotify);
  //console.log(device);
  //console.log(store);
  return (
    <div className={styles.player}>
      <div className={styles.image_container}>
        <img src={current_track?.album?.images[0]?.url} alt="" />
      </div>
      <div className={styles.artist_container}>
        <h3>{current_track?.artists[0]?.name}</h3>
        <h4>{current_track?.name}</h4>
        <h4>{millisecondsToMinutesSeconds(current_track?.duration_ms)}</h4>
      </div>
      <PlayerControls></PlayerControls>
    </div>
  );
};
