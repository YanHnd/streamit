import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import { Sidebar } from "./../../../components/sidebarLayout";
import { HorizentalLayout } from "./../../../components/horizentalLayout ";
import { useRouter } from "next/router";
import styles from "../../../styles/artist.module.scss";
import Heart from "../../../icones/heart.svg";
import TrackIcone from "../../../icones/track.svg";
import Track from "./../../../components/tracklist/track";
import { millisecondsToMinutesSeconds } from "../../../components/player/PlayerUtils";
import { Card } from "./../../../components/card";
import { ArtistCArd } from "./../../../components/artistCard";
/**
 * @author
 * @function Artist
 **/
const Artist = (props) => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState("");
  const [artistInfos, setInfos] = useState();
  const [artistTracks, setTracks] = useState();
  const [relatedArtists, setRelated] = useState();
  const [artistAlbums, setAlbums] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getArtist(id).then(
        function (data) {
          console.log("Artist information", data.body);
          setInfos(data.body);
        },
        function (err) {
          console.error(err);
        }
      );

      spotifyApi.getArtistTopTracks(id, "US").then(
        function (data) {
          console.log(data.body);
          setTracks(data.body.tracks);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
      spotifyApi.getArtistAlbums(id).then(
        function (data) {
          console.log("Artist albums", data.body);
          setAlbums(data.body.items);
        },
        function (err) {
          console.error(err);
        }
      );
      spotifyApi.getArtistRelatedArtists(id).then(
        function (data) {
          console.log(data.body);
          setRelated(data.body.artists);
        },
        function (err) {
          done(err);
        }
      );
    }
  }, [session, spotifyApi, id]);
  return (
    <div className={styles.artist}>
      <div className={styles.artist_header}>
        <div className={styles.left}>
          <div className={styles.image_container}>
            <img src={artistInfos?.images[0]?.url} alt="" />
          </div>
          <div className={styles.infos}>
            <h2>{artistInfos?.name}</h2>
            <h3>{artistInfos?.owner?.display_name}</h3>
            <p>{artistInfos?.description}</p>
          </div>
        </div>
        <div className={styles.right}>
          <ul>
            {/* <li>
              <TrackIcone></TrackIcone>
              {artistInfos?.tracks?.total}
            </li> */}
            <li>
              <Heart></Heart> {artistInfos?.followers?.total}
            </li>
          </ul>
        </div>
      </div>
      <>
        <div className={styles.container}>
          <div className={styles.title_container}>
            <h2 className={styles.title}> Top tracks</h2>
            <h3 className={styles.button}>See all</h3>
          </div>

          {artistTracks?.slice(0, 5).map((track, index) => (
            <Track
              url={track.album.images[0]?.url}
              id={track.external_ids.isrc}
              key={track.external_ids.isrc}
              title={track.name}
              artist={track.artists[0].name}
              uri={track.uri}
              duration={millisecondsToMinutesSeconds(track.duration_ms)}
            ></Track>
          ))}
        </div>
        <div className={styles.artist_container}>
          <div className={styles.title_container}>
            <h2 className={styles.title}> Discography</h2>
            <h3 className={styles.button}>See all</h3>
          </div>
          <div className={styles.card_container}>
            {artistAlbums?.slice(0, 4).map((item) => (
              <Card
                title={item.name}
                artist={item.artists[0].name}
                type="album"
                url={item.images[0].url}
                uri={item.uri}
                alt={item.name}
                key={item.id}
                id={item.id}
              ></Card>
            ))}
          </div>
        </div>
        <div className={styles.artist_container}>
          <div className={styles.title_container}>
            <h2 className={styles.title}> Related artists</h2>
            <h3 className={styles.button}>See all</h3>
          </div>
          <div className={styles.card_container}>
            {relatedArtists?.slice(0, 4).map((artist, index) => (
              <ArtistCArd
                id={artist.id}
                url={artist.images[0]?.url}
                name={artist.name}
              ></ArtistCArd>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default Artist;

Artist.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
