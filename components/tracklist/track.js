import styles from "../../styles/tracklist.module.scss";
import PlayIcon from "../../icones/play.svg";
import Pause from "../../icones/pause.svg";
import useStore from "../../store/store";
import { playMusic } from "./../player/PlayerFunc";
import useSpotify from "./../../hooks/useSpotify";
/**
 * @author
 * @function Track
 **/

const Track = ({ number, id, url, title, artist, duration, uri }) => {
  const is_playing = useStore((state) => state.is_playing);
  const current_track = useStore((state) => state.currentTrack);
  const device = useStore((state) => state.device_id);
  const spotifyApi = useSpotify();
  const play = () => {
    console.log(uri);
    playMusic(device, uri, spotifyApi);
  };

  return (
    <div className="track">
      <div className="left">
        <h3>{number}</h3>
        <img src={url} alt="" />
        <div>
          <h3 className="artist">{title}</h3>
          <h4>{artist}</h4>
        </div>
      </div>
      <div className="right">
        <h3>{duration}</h3>
        <div onClick={() => play()}>
          {is_playing && current_track?.external_ids?.isrc == id ? (
            <Pause></Pause>
          ) : (
            <PlayIcon></PlayIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
