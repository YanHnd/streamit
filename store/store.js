import create from "zustand";
import produce from "immer";
const useStore = create((set) => ({
  playlists: null,
  featuredPlaylists: null,
  featuredAlbums: null,
  selectedPlaylist: null,
  selectedAlbum: null,
  playingPlaylist: null,
  playingAlbum: null,
  device_id: null,
  FeaturedTracks: null,
  currentTrack: null,
  playback_state: {
    shuffle: false,
    repeat: false,
    duration: 0,
    progress: 0,
    loading: false,
  },
  is_playing: false,
  updateProgress: () =>
    set(
      produce((state) => {
        state.playback_state.progress = state.playback_state.progress + 1000;
      })
    ),
  scrubProgress: (value) =>
    set(
      produce((state) => {
        state.playback_state.progress = value;
      })
    ),
}));

export default useStore;
