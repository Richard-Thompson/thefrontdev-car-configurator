import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { PositionalAudio } from './PositionalAudio';
import { useAnimationControls } from '../../Context/animationControls';

export const CarIntroAudio = () => {
    const {
        isPlayingIntroSong
    } = useAnimationControls(state => ({
        isPlayingIntroSong: state.isPlayingIntroSong
    }));

    useEffect(() => {
        console.log({ isPlayingIntroSong })
    }, [])

    return <PositionalAudio
        url="/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.mp3"
        soundPlaying={isPlayingIntroSong}
    />
}