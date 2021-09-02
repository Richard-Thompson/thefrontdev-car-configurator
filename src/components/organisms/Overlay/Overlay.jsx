import React from 'react';
import { Card } from 'components/atoms/card/Card';
import { AudioButton } from 'components/atoms/AudioButton/AudioButton';

import { Container, Left } from './Overlay.styles';

const wheels = ['wheel001', 'wheel002', 'wheel003', 'wheel'];

export const Overlay = () => (
  <Container>
    <Left>
      {wheels.map((item, index) => (
        <Card object={item} key={`wheel-${index}`} />
      ))}
    </Left>
    <AudioButton />
  </Container>
);
