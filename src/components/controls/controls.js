import React, { useEffect, useRef } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useAnimationControls } from '../../Context/animationControls';
import { useControls } from '../../Context/controlsContext';
extend({ OrbitControls })

export const Controls = () => {
    const { camera, gl } = useThree();
    const controls = useRef(null);

    const { startOfAnimation } = useAnimationControls((state) => ({
        startOfAnimation: state.startOfAnimation
    }))

    useEffect(() => {
        camera.name = 'Camera'
        console.log({ camera })
        controls.current.enabled = false;
    }, [startOfAnimation])

    return <orbitControls
        layers={1}

        ref={controls}
        args={[camera, gl.domElement]}

    />;
}