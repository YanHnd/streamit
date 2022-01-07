import React from "react";
import styles from "../../styles/skeleton.module.scss";

function SkeletonElement({ type }) {
  return <div className={styles.skeleton + " " + styles[type]}></div>;
}

export default SkeletonElement;
