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
 * @function Album
 **/
const Album = ({ type }) => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [album, setAlbum] = useState();
  const { data: session, status } = useSession();
  const { id } = router.query;

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getAlbum(id).then(
        function (data) {
          useStore.setState({ selectedAlbum: data.body });
        },
        function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [session, spotifyApi, id]);
  return <Tracklist type="album" />;
};

export default Album;

Album.getLayout = (page) => (
  <Sidebar>
    <HorizentalLayout>{page}</HorizentalLayout>
  </Sidebar>
);
