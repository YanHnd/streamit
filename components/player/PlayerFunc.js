import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { reqWithToken } from "./PlayerUtils";
export const getPlayerInfo = ({ spotifyToken }) => {
  //   const [playbackState, setPlaybackState] = useState({
  //     loading: false,
  //     play: false,
  //     shuffle: false,
  //     repeat: false,
  //     progress: 0,
  //     duration: 0,
  //   });
  console.log(spotifyToken);
  const reqInformations = reqWithToken(
    "https://api.spotify.com/v1/me/player",
    spotifyToken
  );
  const getFunc = async () => {
    try {
      const response = await reqInformations();
      if (response.status === 200) {
        const { data } = response;
        const { is_playing, item, progress_ms, repeat_state, shuffle_state } =
          data;
        useStore.setState({
          currentTrack: { ...item },
          playback_state: {
            shuffle: shuffle_state,
            repeat: repeat_state !== "off",
            duration: item.duration_ms,
            progress: progress_ms,
          },
          is_playing: is_playing,
        });

        // setPlaybackState((state) => ({
        //   ...state,
        //   play: is_playing,
        //   shuffle: shuffle_state,
        //   repeat: repeat_state !== "off",
        //   duration: item.duration_ms,
        //   progress: progress_ms,
        // }));
      } else if (response.status === 204) {
        // setFlash(
        //   "Please select a device to start listening on FIREY SPOTIFY 🔥"
        // );
      } else {
        // setFlash("Error from Spotify Server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  getFunc();
};
