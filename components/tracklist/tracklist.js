import { useEffect, useState } from "react";
import useStore from "../../store/store";
import styles from "../../styles/tracklist.module.scss";
import Heart from "../../icones/heart.svg";
import TrackIcone from "../../icones/track.svg";
import Track from "./track";
import { millisecondsToMinutesSeconds } from "../player/PlayerUtils";

/**
 * @author
 * @function Tracklist
 **/

const Tracklist = (props) => {
  const playlist = useStore((state) => state.selectedPlaylist);

  return (
    <div className={styles.tracklist_container}>
      <div className={styles.tracklist_header}>
        <div className={styles.left}>
          <div className={styles.image_container}>
            <img src={playlist?.images[0]?.url} alt="" />
          </div>
          <div className={styles.infos}>
            <h2>{playlist?.name}</h2>
            <h3>{playlist?.owner?.display_name}</h3>
            <p>{playlist?.description}</p>
          </div>
        </div>
        <div className={styles.right}>
          <ul>
            <li>
              <TrackIcone></TrackIcone>
              {playlist?.tracks?.total}
            </li>
            <li>
              <Heart></Heart> {playlist?.followers?.total}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.tracklist}>
        {playlist?.tracks?.items.map((track, index) => (
          <Track
            number={index}
            url={track.track.album.images[0]?.url}
            id={track.track.external_ids.isrc}
            key={track.track.id}
            title={track.track.name}
            artist={track.track.artists[0].name}
            uri={track.track.uri}
            duration={millisecondsToMinutesSeconds(track.track.duration_ms)}
          ></Track>
        ))}
      </div>
    </div>
  );
};

export default Tracklist;
