import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "./../../../components/sidebarLayout";
import { HorizentalLayout } from "./../../../components/horizentalLayout ";
import Tracklist from "../../../components/tracklist/tracklist";
import { useSession } from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import spotifyApi from "./../../../lib/spotify";
import useStore from "./../../../store/store";
/**
 * @author
 * @function Playlist
 **/
const Playlist = (props) => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useState();
  const { data: session, status } = useSession();
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    spotifyApi.getPlaylist(id).then(
      function (data) {
        useStore.setState({ selectedPlaylist: data.body });
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  }, [session, spotifyApi, id]);
  return <Tracklist />;
};

export default Playlist;

Playlist.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
