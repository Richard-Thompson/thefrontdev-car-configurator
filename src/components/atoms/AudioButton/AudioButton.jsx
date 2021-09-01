import React from 'react';
import { Button } from 'components/atoms/AudioButton/AudioButton.styles';
import { useControls } from 'context/controlsContext';

export const AudioButton = () => {
  const { soundOn, setSoundOn } = useControls((state) => ({
    soundOn: state.soundOn,
    setSoundOn: state.setSoundOn,
  }));
  return <Button onClick={() => setSoundOn(!soundOn)} />;
};
