import React from "react";
import Image from "next/image";
import Play from "../icones/play.svg";
import styles from "../styles/card.module.scss";

/**
 * @author
 * @function Card
 **/

export const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <img src={props.url} />
        <div className={styles.player}>
          <Play></Play>
        </div>
      </div>
      <div className={styles.info_container}>
        <h3>{props.title}</h3>
        <h4>{props.artist}</h4>
      </div>
    </div>
  );
};
