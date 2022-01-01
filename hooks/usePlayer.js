import { useEffect, useState } from "react";
import spotifyApi from "../lib/spotify";
import useStore from "../store/store";

const usePlayer = ({ streamItPlayer }) => {
  //   const [current_track, setCurrentTrack] = useState();
  //   const [playback_state, setPlaybackState] = useState();

  console.log("initializing streamIt player 👾");

  let { Player } = window.Spotify;
  streamItPlayer = new Player({
    name: "streamit Player",
    getOAuthToken: (cb) => {
      const token = spotifyApi.getAccessToken();
      cb(token);
    },
  });
  streamItPlayer.addListener("ready", ({ device_id }) => {
    useStore.setState({ device_id: device_id });
    console.log("Ready with Device ID", device_id);
  });
  streamItPlayer.addListener("player_state_changed", (state) => {
    if (state) {
      const {
        duration,
        loading,
        paused,
        position,
        repeat_mode,
        shuffle,
        track_window,
      } = state;
      const { current_track } = track_window;

      useStore.setState({
        playback_state: {
          duration: duration,
          suffle: shuffle,
          repeat: repeat_mode,
          progress: position,
        },

        is_playing: !paused,
      });
      spotifyApi.getTrack(current_track.id).then((data) => {
        //console.log(data.body);
        useStore.setState({ currentTrack: data.body });
      });
    }
  });

  //   // Error handling
  streamItPlayer.addListener("initialization_error", ({ message }) => {
    console.log(message);
  });
  streamItPlayer.addListener("authentication_error", ({ message }) => {
    console.log(message);
  });
  streamItPlayer.addListener("account_error", ({ message }) => {
    console.log(message);
  });
  streamItPlayer.addListener("playback_error", ({ message }) => {
    console.log(message);
  });
  //   // Playback status updates
  //   streamItPlayer.addListener("player_state_changed", (state) => {
  //     console.log(state);
  //     try {
  //       if (state) {
  //         const {
  //           duration,
  //           loading,
  //           paused,
  //           position,
  //           repeat_mode,
  //           shuffle,
  //           track_window,
  //         } = state;
  //         const { current_track } = track_window;
  //         // setCurrentTrack({ ...current_track, play: !paused });
  //         console.log(state);
  //         spotifyApi.getMyCurrentPlaybackState().then(
  //           function (data) {
  //             // Output items
  //             const dataD = data.body;
  //             useStore.setState({
  //               currentTrack: { ...dataD },
  //             });
  //             if (data.body && data.body.is_playing) {
  //               console.log("User is currently playing something!");
  //             } else {
  //               console.log(
  //                 "User is not playing anything, or doing so in private."
  //               );
  //             }
  //           },
  //           function (err) {
  //             console.log("Something went wrong!", err);
  //           }
  //         );

  //         // setPlaybackState((state) => ({
  //         //   ...state,
  //         //   loading: loading,
  //         //   play: !paused,
  //         //   shuffle: shuffle,
  //         //   repeat: repeat_mode !== 0,
  //         //   progress: position,
  //         //   duration: duration,
  //         // }));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   // Ready
  //   streamItPlayer.addListener("ready", ({ device_id }) => {
  //     console.log("Ready with Device ID", device_id);
  //   });
  // Not Ready
  streamItPlayer.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });
  //   // Connect the player!
  streamItPlayer.connect();
  console.log(streamItPlayer);
  return streamItPlayer;
};

export default usePlayer;
