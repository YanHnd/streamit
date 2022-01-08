import { useEffect, useState } from "react";
import useStore from "../../store/store";
import styles from "../../styles/tracklist.module.scss";
import Heart from "../../icones/heart.svg";
import TrackIcone from "../../icones/track.svg";
import Track from "./track";
import { useRouter } from "next/router";
import { millisecondsToMinutesSeconds } from "../player/PlayerUtils";

/**
 * @author
 * @function Tracklist
 **/

const Tracklist = ({ type }) => {
  const playlist = useStore((state) => state.selectedPlaylist);
  const album = useStore((state) => state.selectedAlbum);
  const router = useRouter();
  console.log(album);
  const handleClick = () => {
    if (type == "album") {
      router.push(`/artist/${album?.artists[0]?.id}`);
    }
  };
  return (
    <div className={styles.tracklist_container}>
      <div className={styles.tracklist_header}>
        <div className={styles.left}>
          <div className={styles.image_container}>
            <img
              src={
                type == "playlist"
                  ? playlist?.images[0]?.url
                  : album?.images[0]?.url
              }
              alt=""
            />
          </div>
          <div className={styles.infos}>
            <h2>{type == "playlist" ? playlist?.name : album?.name}</h2>
            <h3 onClick={() => handleClick()}>
              {type == "playlist"
                ? playlist?.owner?.display_name
                : album?.artists[0]?.name}
            </h3>
            <p>{playlist?.description}</p>
          </div>
        </div>
        <div className={styles.right}>
          {type == "playlist" ? (
            <ul>
              <li>
                <TrackIcone></TrackIcone>
                {type == "playlist" ? playlist?.tracks?.total : null}
              </li>
              <li>
                <Heart></Heart>{" "}
                {type == "playlist" ? playlist?.followers?.total : null}
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      <div className={styles.tracklist}>
        {type == "playlist"
          ? playlist?.tracks?.items.map((track, index) => {
              return (
                <Track
                  number={index}
                  url={track.track?.album?.images[0]?.url}
                  id={track.track?.external_ids?.isrc}
                  key={track.track?.id}
                  title={track.track?.name}
                  artist={track.track?.artists[0]?.name}
                  uri={track.track?.uri}
                  artistId={track?.track?.artists[0]?.id}
                  duration={
                    track.track
                      ? millisecondsToMinutesSeconds(track.track.duration_ms)
                      : null
                  }
                ></Track>
              );
            })
          : album?.tracks?.items.map((track, index) => {
              return (
                <Track
                  number={index}
                  url={album?.images[0]?.url}
                  id={track?.external_ids?.isrc}
                  key={track?.id}
                  title={track?.name}
                  artist={track?.artists[0]?.name}
                  artistId={album?.artists[0]?.id}
                  uri={track?.uri}
                  duration={
                    track
                      ? millisecondsToMinutesSeconds(track?.duration_ms)
                      : null
                  }
                ></Track>
              );
            })}
      </div>
    </div>
  );
};

export default Tracklist;
