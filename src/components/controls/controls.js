import React, { useEffect, useState } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { useControls } from '../../Context/controlsContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useAnimationControls } from '../../Context/animationControls';
import { END_CAMERA_POSITION } from '../../constants';

extend({ OrbitControls })

export const Controls = () => {
    const { camera, gl } = useThree();
    const [controls, setControls] = useState(null);

    const {
        setControlsRef
    } = useControls(state => ({
        setControlsRef: state.setControlsRef
    }))

    const { startOfAnimation, endOfAnimation } = useAnimationControls((state) => ({
        startOfAnimation: state.startOfAnimation,
        endOfAnimation: state.endOfAnimation
    }))

    useEffect(() => {
        setControlsRef(controls)
        console.log({ controls })
    }, [controls])

    useEffect(() => {
        console.log({ controls })
        if (startOfAnimation) {
            controls.enabled = false;
        }
        if (endOfAnimation) {
            console.log('ended')
            controls.enabled = true;
        }
    }, [startOfAnimation, endOfAnimation])

    return <orbitControls
        layers={1}
        ref={setControls}
        args={[camera, gl.domElement]}

    />;
}