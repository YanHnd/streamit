import React from "react";
import styles from "../../styles/skeleton.module.scss";
import SkeletonCard from "./skeletonCard";
import Shimmer from "./shimmer";
/**
 * @author
 * @function SkeletonTops
 **/

export const SkeletonTops = ({ title }) => {
  return (
    <div className={styles.skeleton_tops}>
      <div className={styles.title_container}>
        <h2>{title}</h2> <h3 className={styles.button}>See all</h3>
      </div>
      <div className={styles.card_container}>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>

      <Shimmer></Shimmer>
    </div>
  );
};
