import { useEffect, useState } from "react";
import styles from "../styles/tops.module.scss";
import { Card } from "./card";
import { useRouter } from "next/router";
/**
 * @author
 * @function Tops
 **/

export const Tops = ({ title, type, children }) => {
  const router = useRouter();
  const handleClick = () => {
    if (type == "playlist") {
      router.push("/playlist/featured");
    }
  };
  return (
    <div className={styles.tops}>
      <div className={styles.title_container}>
        <h2>{title}</h2>{" "}
        <h3 className={styles.button} onClick={() => handleClick()}>
          See all
        </h3>
      </div>

      <div className={styles.card_container}>
        {children != null
          ? children.map((item) => (
              <Card
                title={item.name}
                artist={
                  type == "playlist"
                    ? item.owner.display_name
                    : item.artists[0].name
                }
                url={item.images[0].url}
                uri={item.uri}
                alt={item.name}
                type={type}
                key={item.id}
                id={item.id}
              ></Card>
            ))
          : null}
      </div>
    </div>
  );
};
