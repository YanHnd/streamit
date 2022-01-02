import spotifyApi from "../lib/spotify";
import useStore from "../store/store";

const usePlayer = ({ streamItPlayer }) => {
  console.log("initializing streamIt player 👾");

  let { Player } = window.Spotify;
  streamItPlayer = new Player({
    name: "streamit Player",
    getOAuthToken: (cb) => {
      const token = spotifyApi.getAccessToken();
      cb(token);
    },
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
          shuffle: shuffle,
          repeat: !repeat_mode == 0,
          progress: position,
          loading: loading,
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

  //Ready
  streamItPlayer.addListener("ready", ({ device_id }) => {
    useStore.setState({ device_id: device_id });
    console.log("Ready with Device ID", device_id);
  });

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
