import create from "zustand";
import produce from "immer";
const useStore = create((set) => ({
  playlists: null,
  selectedPlaylist: null,
  selectedPlatlistTracks: null,
  FeaturedTracks: null,
  currentTrack: null,
  playback_state: {
    shuffle: false,
    repeat: "off",
    duration: 0,
    progress: 0,
  },
  is_playing: false,
  updateProgress: () =>
    set(
      produce((state) => {
        state.playback_state.progress = state.playback_state.progress + 1000;
      })
    ),
}));

export default useStore;
