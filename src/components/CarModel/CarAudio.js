import React, { useRef, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { PositionalAudio } from './PositionalAudio';
import { useControls } from '../../Context/controlsContext';

export const CarAudio = () => {
    const {
        soundOn,
        setSoundOn,
        engineStartPlaying,
        setEngineStartPlaying,
        engineIdlePlaying,
        setEngineIdlePlaying
    } = useControls(state => ({
        soundOn: state.soundOn,
        setSoundOn: state.setSoundOn,
        engineStartPlaying: state.engineStartPlaying,
        setEngineStartPlaying: state.setEngineStartPlaying,
        engineIdlePlaying: state.engineIdlePlaying,
        setEngineIdlePlaying: state.setEngineIdlePlaying,
    }));

    return soundOn && <PositionalAudio key={1} url="/car/audio/010567704-sfx-car-idling-1-ear.wav" soundPlaying={true} />
}