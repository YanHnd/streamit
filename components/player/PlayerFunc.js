import useStore from "../../store/store";
import { reqWithToken } from "./PlayerUtils";
export const getPlayerInfo = ({ spotifyToken }) => {
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
        const {
          is_playing,
          item,
          loading,
          progress_ms,
          repeat_state,
          shuffle_state,
        } = data;

        useStore.setState({
          currentTrack: { ...item },
          playback_state: {
            shuffle: shuffle_state,
            repeat: repeat_state !== "off",
            duration: item.duration_ms,
            progress: progress_ms,
            loading: loading,
          },
          is_playing: is_playing,
        });
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

export const resumePlayback = (spotifyApi) => {
  spotifyApi.play().then(
    function () {
      console.log("playBack resumed");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};
export const pausePlayback = (spotifyApi) => {
  spotifyApi.pause().then(
    function () {
      console.log("Playback paused");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const nextTrack = (spotifyApi) => {
  spotifyApi.skipToNext().then(
    function () {
      console.log("Skip to next");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const previousTrack = (spotifyApi) => {
  spotifyApi.skipToPrevious().then(
    function () {
      console.log("Skip to previous");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const toggleShuffle = (spotifyApi, shuffle) => {
  spotifyApi.setShuffle(shuffle ? false : true).then(
    function () {
      console.log("Shuffle is on.");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const toggleOnrepeat = (spotifyApi, repeat) => {
  spotifyApi.setRepeat(repeat ? "off" : "track").then(
    function () {
      console.log("Repeat track.");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const seekToPosition = (spotifyApi, position) => {
  spotifyApi.seek(position).then(
    function () {
      console.log("Seek to " + position);
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
};

export const playMusic = (device, uri, spotifyApi) => {
  spotifyApi
    .play({
      device_id: device,
      uris: [uri],
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
export const playPlaylist = (device, uri, spotifyApi, id, type) => {
  spotifyApi
    .play({
      device_id: device,
      context_uri: uri,
    })
    .then(
      function () {
        console.log("Playback started");

        useStore.setState({ playingPlaylist: id });
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
};
