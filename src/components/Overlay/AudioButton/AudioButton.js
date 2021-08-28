import React from 'react';
import { Button } from './AudioButton.styles';
import { useControls } from '../../../Context/controlsContext';


export const AudioButton = () => {
    const { soundOn, setSoundOn } = useControls(state => ({
        soundOn: state.soundOn,
        setSoundOn: state.setSoundOn,
    }));
    return (
        <Button onClick={() => setSoundOn(!soundOn)} />
    )
}