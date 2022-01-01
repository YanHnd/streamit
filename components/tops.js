import { useEffect, useState } from "react";
import styles from "../styles/tops.module.scss";
import { Card } from "./card";
/**
 * @author
 * @function Tops
 **/

export const Tops = ({ title, type, children }) => {
  return (
    <div className={styles.tops}>
      <div className={styles.title_container}>
        <h2>{title}</h2> <h3>See all</h3>
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
                alt={item.name}
                key={item.id}
              ></Card>
            ))
          : null}
      </div>
    </div>
  );
};
