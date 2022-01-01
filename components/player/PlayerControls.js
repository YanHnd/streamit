import { useEffect, useRef } from "react";
import styles from "../../styles/player.module.scss";
import Play from "../../icones/play.svg";
import Pause from "../../icones/pause.svg";
import Previous from "../../icones/previous.svg";
import Next from "../../icones/next.svg";
import Onrepeat from "../../icones/onrepeat.svg";
import Shuffle from "../../icones/shuffle.svg";
import useStore from "../../store/store";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { millisecondsToMinutesSeconds } from "./PlayerUtils";
/**
 * @author
 * @function PlayerControls
 **/

const PlayerControls = (props) => {
  let { shuffle, repeat, duration, progress } = useStore(
    (state) => state.playback_state
  );
  console.log(progress);
  let current_track = useStore((state) => state.currentTrack);
  let is_playing = useStore((state) => state.is_playing);
  const intervalRef = useRef();
  const updateProgress = useStore((state) => state.updateProgress);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // console.log("1");
      updateProgress();
    }, [1000]);
  };

  useEffect(() => {
    //console.log(is_playing);
    if (is_playing) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [is_playing, current_track]);
  useEffect(() => {}, []);
  return (
    <div className={styles.controls_container}>
      <div className={styles.progress}>
        <p>{millisecondsToMinutesSeconds(progress)}</p>
        <input type="range" value={progress} step="1" min="0" max={duration} />
        <p>{millisecondsToMinutesSeconds(duration)}</p>
      </div>
      <ul className={styles.controls}>
        <li>
          <Onrepeat></Onrepeat>
        </li>
        <li>
          <Previous></Previous>
        </li>
        <li>
          <Play></Play>
        </li>
        <li>
          <Next></Next>
        </li>
        <li>
          <Shuffle></Shuffle>
        </li>
      </ul>
    </div>
  );
};

export default PlayerControls;
