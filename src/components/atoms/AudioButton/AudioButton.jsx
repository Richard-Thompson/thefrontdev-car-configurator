import React from 'react';
import { Button } from 'components/atoms/AudioButton/AudioButton.styles';
import { useControls } from 'context/controlsContext';
import EngineIcon from 'assets/engine.svg';

export const AudioButton = () => {
  const { soundOn, setSoundOn } = useControls((state) => ({
    soundOn: state.soundOn,
    setSoundOn: state.setSoundOn,
  }));
  return (
    <Button onClick={() => setSoundOn(!soundOn)}>
      <EngineIcon />
    </Button>
  );
};
