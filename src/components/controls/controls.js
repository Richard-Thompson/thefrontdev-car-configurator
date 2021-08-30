import React, { useEffect, useRef } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useAnimationControls } from '../../Context/animationControls';
import { END_CAMERA_POSITION } from '../../constants';

extend({ OrbitControls })

export const Controls = () => {
    const { camera, gl } = useThree();
    const controls = useRef(null);

    const { startOfAnimation, endOfAnimation } = useAnimationControls((state) => ({
        startOfAnimation: state.startOfAnimation,
        endOfAnimation: state.endOfAnimation
    }))

    useEffect(() => {

        console.log({ controls })
    }, [])

    useEffect(() => {
        if (endOfAnimation) {
            console.log({ finished: controls })
            controls.current.enabled = true
            controls.current.enabled = true;
            //   controls.current.minPolarAngle = POLAR_ANGLE;
            //   controls.current.maxPolarAngle = POLAR_ANGLE;
            //   controls.current.minAzimuthAngle = MIN_ROTATION_ANGLE;
            //   controls.current.maxAzimuthAngle = MAX_ROTATION_ANGLE;
            controls.current.enableZoom = true;
        } else {
            controls.current.enabled = false;
        }
    }, [startOfAnimation, endOfAnimation])

    return <orbitControls
        layers={1}
        ref={controls}
        args={[camera, gl.domElement]}

    />;
}