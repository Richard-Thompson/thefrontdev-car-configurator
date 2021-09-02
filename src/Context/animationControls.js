import create from 'zustand';

export const useAnimationControls = create((set) => ({
  endOfLoading: false,
  setEndOfLoading: (state) => set({ endOfLoading: state }),
  startOfAnimation: false,
  setStartOfAnimation: (state) => set({ startOfAnimation: state }),
  endOfAnimation: false,
  setEndOfAnimation: (state) => set({ endOfAnimation: state }),
  isPlayingIntroSong: false,
  setIsPlayingIntroSong: (state) => set({ isPlayingIntroSong: state }),
  brightnessValue: null,
  setBrightnessValue: (state) => set({ brightnessValue: state }),
}));
