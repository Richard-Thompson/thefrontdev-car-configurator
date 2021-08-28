import React from 'react';
import { Card } from './Card/Card';
import { AudioButton } from './AudioButton/AudioButton';

import { Container, Left } from './Overlay.styles';


const wheels = ['wheel001', 'wheel002', 'wheel003', 'wheel'];

export const Overlay = ({ }) => {

    return (
        <Container>
            <Left>
                {wheels.map((item, index) => {
                    return <Card object={item} key={index} />
                })}
            </Left>
            <AudioButton />
        </Container>
    )
}