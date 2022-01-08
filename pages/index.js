import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Sidebar } from "../components/sidebarLayout";
import { HorizentalLayout } from "./../components/horizentalLayout ";
import { Tops } from "./../components/tops";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";
import useStore from "../store/store";
import SkeletonElement from "../components/skletons/skeletonElement";
import SkeletonCard from "./../components/skletons/skeletonCard";
import { SkeletonTops } from "./../components/skletons/skeletonTops";

function Home({ children }) {
  const { data: session, status } = useSession();
  const [featured, setFeatured] = useState();
  const [releases, setReleases] = useState();
  const [loading, setLoading] = useState(false);
  const spotifyApi = useSpotify();

  useEffect(() => {
    //console.log(spotifyApi.getAccessToken());
    if (spotifyApi.getAccessToken() != undefined) {
      setLoading(true);
      spotifyApi
        .getFeaturedPlaylists({
          limit: 4,
          offset: 1,
          country: "US",
        })
        .then(
          function (data) {
            //console.log(data.body.playlists.items);
            setFeatured(data.body.playlists.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      spotifyApi.getNewReleases({ limit: 4, offset: 0, country: "US" }).then(
        function (data) {
          //console.log(data.body);
          setReleases(data.body.albums.items);
          setLoading(false);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [session, spotifyApi]);

  return (
    <>
      <div className={styles.main_section}>
        {loading ? (
          <>
            <SkeletonTops title="Featured Playlists"></SkeletonTops>
            <SkeletonTops title="New Releases"></SkeletonTops>
          </>
        ) : (
          <>
            <Tops
              type="playlist"
              children={featured}
              title="Featured playlists"
            ></Tops>
            <Tops type="album" children={releases} title="New Releases"></Tops>
          </>
        )}
      </div>
    </>
  );
}
Home.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
export default Home;
