export const updateState = (streamItPlayer) => {
  if (!streamItPlayer.current) {
    getPlayerInfo();
  }
};
