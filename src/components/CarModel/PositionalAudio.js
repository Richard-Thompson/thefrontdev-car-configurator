import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const PositionalAudio = ({
    url,
    soundPlaying,
    loopSound = false,
    offset = 0
}) => {
    const sound = useRef()
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)

    useEffect(() => {
        if (sound.current) {
            // sound.current.offset = 5;
            console.log({ buffer })
            sound.current.setBuffer(buffer)
            sound.current.setRefDistance(8.0)
            sound.current.onEnded = function () {
                console.log('sound1 ended');
                sound.current.stop() /* sets Three wrapper property correctly */
            };
            if (soundPlaying) {
                sound.current.play();
            }
        }
        camera.add(listener)
        return () => camera.remove(listener)
    }, [soundPlaying])

    return <positionalAudio ref={sound} args={[listener]} />
}
