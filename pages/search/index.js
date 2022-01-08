import { useState, useEffect, useCallback } from "react";
import Track from "../../components/tracklist/track";
import { Sidebar } from "./../../components/sidebarLayout";
import { HorizentalLayout } from "./../../components/horizentalLayout ";
import style from "../../styles/search.module.scss";
import SearchIcon from "../../icones/search.svg";
import { debounce } from "lodash";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { ArtistCArd } from "../../components/artistCard";
import { millisecondsToMinutesSeconds } from "../../components/player/PlayerUtils";
import { Card } from "./../../components/card";

/**
 * @author
 * @function Search
 **/

const Search = (props) => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [recentTracks, setTracks] = useState();
  const [keywords, setKeywords] = useState("");
  const [filter, setFilter] = useState("");
  const [searchTracks, setSearchTracks] = useState();
  const [searchArtists, setSearchArtists] = useState();
  const [searchplaylists, setSearchPlaylists] = useState();
  //console.log(searchTracks);
  let debouncedSearch = useCallback(
    debounce((keywords) => {
      spotifyApi.searchTracks(keywords).then(
        function (data) {
          setSearchTracks(data.body.tracks.items);
        },
        function (err) {
          console.error(err);
        }
      );
      spotifyApi.searchArtists(keywords).then(
        function (data) {
          console.log(data.body.artists);
          setSearchArtists(data.body.artists.items);
        },
        function (err) {
          console.error(err);
        }
      );
      spotifyApi.searchPlaylists(keywords).then(
        function (data) {
          // console.log(data.body);
          setSearchPlaylists(data.body.playlists.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }, 500),
    []
  );

  useEffect(() => {
    console.log(keywords);
    if (keywords.length > 0) {
      debouncedSearch(keywords);
    }
  }, [keywords]);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 5,
        })
        .then(
          function (data) {
            // Output items
            console.log("Your 10 most recently played tracks are:");
            setTracks(data.body.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [session, spotifyApi]);
  return (
    <div className={style.search}>
      <div className={style.searchbar_container}>
        <input
          onChange={(e) => setKeywords(e.target.value)}
          type="text"
          placeholder="Search a track , playlist , album ..."
          className={style.searchbar}
        />
        <SearchIcon></SearchIcon>
      </div>
      {keywords ? (
        <div className={style.navbar}>
          <ul>
            <li onClick={() => setFilter("")}>All</li>
            <li onClick={() => setFilter("Tracks")}>Tracks</li>
            <li onClick={() => setFilter("Playlists")}>playlists</li>
            <li onClick={() => setFilter("Artists")}>artists</li>
          </ul>
          <div></div>
        </div>
      ) : null}

      {keywords.length == 0 ? (
        <div className={style.container}>
          <div className={style.title_container}>
            <h3 className={style.title}> Recent Tracks</h3>
            <h3 className={style.button}>See all</h3>
          </div>

          {recentTracks?.map((track, index) => (
            <Track
              url={track.track.album.images[0]?.url}
              id={track.track.external_ids.isrc}
              key={track.track.external_ids.isrc}
              title={track.track.name}
              artist={track.track.artists[0].name}
              uri={track.track.uri}
              duration={millisecondsToMinutesSeconds(track.track.duration_ms)}
            ></Track>
          ))}
        </div>
      ) : filter == "" ? (
        <>
          <div className={style.container}>
            <div className={style.title_container}>
              <h2 className={style.title}> Result tracks</h2>
              <h3 className={style.button}>See all</h3>
            </div>

            {searchTracks?.slice(0, 5).map((track, index) => (
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
          <div className={style.artist_container}>
            <div className={style.title_container}>
              <h2 className={style.title}> Result playlists</h2>
              <h3 className={style.button}>See all</h3>
            </div>
            <div className={style.card_container}>
              {searchplaylists?.slice(0, 4).map((item) => (
                <Card
                  title={item.name}
                  artist={item.owner.display_name}
                  type="playlist"
                  url={item.images[0].url}
                  uri={item.uri}
                  alt={item.name}
                  key={item.id}
                  id={item.id}
                ></Card>
              ))}
            </div>
          </div>
          <div className={style.artist_container}>
            <div className={style.title_container}>
              <h2 className={style.title}> Result artists</h2>
              <h3 className={style.button}>See all</h3>
            </div>
            <div className={style.card_container}>
              {searchArtists?.slice(0, 4).map((artist, index) => (
                <ArtistCArd
                  id={artist.id}
                  url={artist.images[0]?.url}
                  name={artist.name}
                ></ArtistCArd>
              ))}
            </div>
          </div>
        </>
      ) : filter == "Artists" ? (
        <div className={style.artist_container}>
          <div className={style.title_container}>
            <h2 className={style.title}> Result artists</h2>
          </div>
          <div className={style.card_container}>
            {searchArtists?.map((artist, index) => (
              <ArtistCArd
                id={artist.id}
                url={artist.images[0]?.url}
                name={artist.name}
              ></ArtistCArd>
            ))}
          </div>
        </div>
      ) : filter == "Tracks" ? (
        <div className={style.container}>
          <div className={style.title_container}>
            <h2 className={style.title}> Result tracks</h2>
          </div>

          {searchTracks?.map((track, index) => (
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
      ) : (
        <div className={style.artist_container}>
          <div className={style.title_container}>
            <h2 className={style.title}> Result artists</h2>
          </div>
          <div className={style.card_container}>
            {searchplaylists?.map((item) => (
              <Card
                title={item.name}
                artist={item.owner.display_name}
                type="playlist"
                url={item.images[0].url}
                uri={item.uri}
                alt={item.name}
                key={item.id}
                id={item.id}
              ></Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
Search.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
