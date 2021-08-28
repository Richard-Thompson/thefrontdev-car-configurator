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

    // useEffect(
    //     () => {
    //         if (soundRef.current || soundRef1.current) {
    //             // console.log({sound})
    //             setAnalyser(new THREE.AudioAnalyser(soundRef.current, 32));
    //             setAnalyser1(new THREE.AudioAnalyser(soundRef1.current, 32));

    //         }
    //     },
    //     [soundRef, soundRef1, soundOn]
    // );

    // useSpring({
    //     config: { duration: 2000, clamp: true },
    //     percentage: soundOn ? 1 : 0,
    //     onChange: (
    //         { value: { percentage } }
    //     ) => {
    //         console.log({ percentage })
    //         setEngineStartPlaying(true);
    //         if (percentage > 0.2) {
    //             setEngineStartPlaying(false);
    //         }
    //         if (percentage > 0.2) {
    //             setEngineIdlePlaying(true)
    //         }
    //     },
    //     onStart: () => { },
    //     onRest: () => {
    //         setEngineStartPlaying(false);
    //     },
    // });

    return soundOn && <PositionalAudio key={1} url="/car/audio/010567704-sfx-car-idling-1-ear.wav" soundPlaying={true} />
}