import React from 'react';
import { Card } from 'components/atoms/card/Card';
import { AudioButton } from 'components/atoms/AudioButton/AudioButton';
import { useControls } from 'context/controlsContext';
import CarFront from 'assets/car-front.svg';
import {
  Container, Left, Colour, FrontView,
} from 'components/organisms/overlay/Overlay.styles';

const wheels = ['wheel001', 'wheel002', 'wheel003', 'wheel'];
const colors = ['#66b81f', '#fbe212', '#bc1917', '#39434d'];
export const Overlay = () => {
  const { setActiveColor, setActiveObject, setActiveObjectName } = useControls((state) => ({
    setActiveColor: state.setActiveColor,
    setActiveObject: state.setActiveObject,
    setActiveObjectName: state.setActiveObjectName,
  }));

  return (
    <Container>
      <AudioButton />
      <Left>
        {wheels.map((item, index) => (
          <Card object={item} key={`wheel-${index}`} />
        ))}
      </Left>
      <FrontView>
        <CarFront
          width="30px"
          height="30px"
          onClick={() => {
            setActiveObjectName('frontView');
            setActiveObject(true);
          }}
        />
      </FrontView>
      {colors.map((color) => (
        <Colour hex={color} onClick={() => setActiveColor(color)} />
      ))}
    </Container>
  );
};
