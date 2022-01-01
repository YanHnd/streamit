import { useEffect, useState } from "react";

const PlayerWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const loadScript = () => {
    const script = document.createElement("script");
    script.id = "spotify-player";
    script.type = "text/javascript";
    script.async = "async";
    script.defer = "defer";
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);
  };
  useEffect(() => {
    loadScript();
    window.onSpotifyWebPlaybackSDKReady = () => setLoaded(true);
  }, []);
  if (loaded) {
    return <>{children}</>;
  }
  return null;
};

export default PlayerWrapper;
