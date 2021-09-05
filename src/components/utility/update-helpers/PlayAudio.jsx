import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { playAudio } from '../../utils';
import { useAnimationControls } from '../../../context/animationControls';

export const PlayAudio = () => {
  const { isPlayingIntroSong } = useAnimationControls((state) => ({
    isPlayingIntroSong: state.isPlayingIntroSong,
  }));
  const { camera } = useThree();

  useEffect(() => {
    if (isPlayingIntroSong) {
      playAudio(
        camera,
        '/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.wav',
      );
    }
  }, [isPlayingIntroSong]);

  return null;
};
