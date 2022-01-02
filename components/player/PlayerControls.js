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

const PlayerControls = ({
  resumePlayback,
  pausePlayback,
  nextTrack,
  previousTrack,
  toggleOnrepeat,
  toggleShuffle,
  seekToPosition,
}) => {
  let { shuffle, repeat, duration, progress } = useStore(
    (state) => state.playback_state
  );

  let current_track = useStore((state) => state.currentTrack);
  let is_playing = useStore((state) => state.is_playing);
  const intervalRef = useRef();
  const updateProgress = useStore((state) => state.updateProgress);
  const scrubProgress = useStore((state) => state.scrubProgress);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      updateProgress();
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    scrubProgress(value);
  };

  const onScrubEnd = () => {
    seekToPosition();
    startTimer();
  };

  useEffect(() => {
    //console.log(is_playing);
    if (is_playing) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [is_playing, current_track]);

  return (
    <div className={styles.controls_container}>
      <div className={styles.progress}>
        <p>{millisecondsToMinutesSeconds(progress)}</p>
        <input
          type="range"
          onChange={(e) => {
            onScrub(e.target.value);
          }}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          value={progress}
          step="1"
          min="0"
          max={duration}
        />
        <p>{millisecondsToMinutesSeconds(duration)}</p>
      </div>
      <ul className={styles.controls}>
        <li className={repeat ? styles.active : null} onClick={toggleOnrepeat}>
          <Onrepeat></Onrepeat>
        </li>
        <li onClick={previousTrack}>
          <Previous></Previous>
        </li>
        <li onClick={is_playing ? pausePlayback : resumePlayback}>
          {is_playing ? <Pause /> : <Play />}
        </li>
        <li onClick={nextTrack}>
          <Next></Next>
        </li>
        <li className={shuffle ? styles.active : null} onClick={toggleShuffle}>
          <Shuffle></Shuffle>
        </li>
      </ul>
    </div>
  );
};

export default PlayerControls;
