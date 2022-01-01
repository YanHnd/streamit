import { useEffect, useState, useCallback, useRef } from "react";
//import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

import { PlayerLayout } from "./playerLayout";

import PlayerWrapper from "./PlayerWrapper";
/**
 * @author
 * @function
 **/

const Player = (props) => {
  return (
    <PlayerWrapper>
      <PlayerLayout></PlayerLayout>
    </PlayerWrapper>
  );
};

export default Player;
