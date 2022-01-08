import React from "react";
import Image from "next/image";
import Play from "../icones/play.svg";
import Pause from "../icones/pause.svg";
import styles from "../styles/card.module.scss";
import { useRouter } from "next/router";
import useStore from "../store/store";
import { playPlaylist } from "./player/PlayerFunc";
import useSpotify from "./../hooks/useSpotify";

/**
 * @author
 * @function Card
 **/

export const Card = (props) => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const device = useStore((state) => state.device_id);
  const is_playing = useStore((state) => state.is_playing);
  const playlistId = useStore((state) => state.playingPlaylist);
  const albumId = useStore((state) => state.playingAlbum);
  const handleClick = (e) => {
    if (props.type == "playlist") {
      e.preventDefault();
      router.push(`/playlist/${props.id}`);
    }
    if (props.type == "album") {
      router.push(`/album/${props.id}`);
    }
  };
  const play = () => {
    playPlaylist(device, props.uri, spotifyApi, props.id, props.type);
  };
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <img src={props.url} />
        <div onClick={() => play()} className={styles.player}>
          {is_playing ? (
            playlistId == props.id ? (
              <Pause></Pause>
            ) : (
              <Play></Play>
            )
          ) : (
            <Play></Play>
          )}
        </div>
      </div>
      <div className={styles.info_container}>
        <h3>{props.title}</h3>
        <h4>{props.artist}</h4>
      </div>
      <div onClick={(e) => handleClick(e)} className={styles.background}></div>
    </div>
  );
};
