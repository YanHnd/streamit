import SpotifyWebApi from "spotify-web-api-node";
//scopes

const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-private",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "playlist-modify-private",
  "user-read-email",
  "playlist-read-private",
  "user-top-read",
  "user-read-currently-playing",
  "playlist-modify-public",
  "user-read-recently-played",
].join(",");

const params = { scope: scopes };

const queryParamsString = new URLSearchParams(params).toString();
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString}`;

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_AUTH_CLIENT_ID,
  clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
