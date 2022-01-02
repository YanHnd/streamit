import { useEffect, useState, useCallback, useRef } from "react";
//import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import usePlayer from "../../hooks/usePlayer";
import useStore from "../../store/store";
import {
  getPlayerInfo,
  resumePlayback,
  previousTrack,
  pausePlayback,
  nextTrack,
  toggleOnrepeat,
  toggleShuffle,
  seekToPosition,
} from "./PlayerFunc";
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
  let { shuffle, repeat, duration, progress } = useStore(
    (state) => state.playback_state
  );
  const device = useStore((state) => state.device_id);
  const current_track = useStore((state) => state.currentTrack);

  useEffect(() => {
    let token = spotifyApi.getAccessToken();
    if (token) {
      streamItPlayer.current = usePlayer({ streamItPlayer });
      getPlayerInfo({ spotifyToken: token });
    }
  }, [spotifyApi]);

  return (
    <div className={styles.player}>
      <div className={styles.image_container}>
        <img src={current_track?.album?.images[0]?.url} alt="" />
      </div>
      <div className={styles.artist_container}>
        <h3>{current_track?.artists[0]?.name}</h3>
        <h4>{current_track?.name}</h4>
      </div>
      <PlayerControls
        resumePlayback={() => resumePlayback(spotifyApi)}
        pausePlayback={() => pausePlayback(spotifyApi)}
        nextTrack={() => nextTrack(spotifyApi)}
        previousTrack={() => previousTrack(spotifyApi)}
        toggleOnrepeat={() => toggleOnrepeat(spotifyApi, repeat)}
        toggleShuffle={() => toggleShuffle(spotifyApi, shuffle)}
        seekToPosition={() => seekToPosition(spotifyApi, progress)}
      ></PlayerControls>
    </div>
  );
};
