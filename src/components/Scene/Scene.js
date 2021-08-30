import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
    Canvas,
    CinematicHalfScreen,
    LoadingScreen,
    LoadingBar,
    Button,
} from './Scene.styles';
import Effects from '../Effects/Postprocessing';
import CarModel from '../CarModel/Car';
import { Overlay } from '../Overlay/Overlay';
import { Controls } from '../controls/controls';
import { useAnimationControls } from '../../Context/animationControls';
import {
    AMOUNT_OF_TIME_LOADING_SCREEN,
    START_ANIMATION,
    START_CAMERA_POSITION,
    END_CAMERA_POSITION
} from '../../constants';
import { useControls } from '../../Context/controlsContext';
import { useSpring } from '@react-spring/core';

export const Scene = () => {
    const {
        setControlsRef
    } = useControls(state => ({
        setControlsRef: state.setControlsRef
    }))
    const {
        startOfAnimation,
        endOfAnimation,
        setStartOfAnimation,
        setIsPlayingIntroSong,
        endOfLoading,
        setEndOfLoading,
        setBrightnessValue,
    } = useAnimationControls(state => ({
        setStartOfAnimation: state.setStartOfAnimation,
        startOfAnimation: state.startOfAnimation,
        endOfAnimation: state.endOfAnimation,
        setIsPlayingIntroSong: state.setIsPlayingIntroSong,
        endOfLoading: state.endOfLoading,
        setEndOfLoading: state.setEndOfLoading,
        setBrightnessValue: state.setBrightnessValue
    }))
    const [controls, setControls] = useState(null);
    const [personEntered, setPersonEntered] = useState(false)
    const { progress } = useProgress();
    const background = useRef(null);
    const postProBrightValue = useRef(null);

    useEffect(() => {
        setControlsRef(controls)
    }, [controls])

    useEffect(() => {
        if (progress >= 100 && personEntered) {

            setTimeout(() => {
                setEndOfLoading(true);
            }, AMOUNT_OF_TIME_LOADING_SCREEN);

            setTimeout(() => {
                setStartOfAnimation(true);
                setIsPlayingIntroSong(true)
            }, START_ANIMATION)
        }
    }, [progress, personEntered])

    useEffect(() => {
        postProBrightValue.current = 0.1;
        setBrightnessValue(postProBrightValue);
        // console.log({ background })
        // if (endOfAnimation) {
        //     setTransitionEndColor(true);
        // }
    }, []);

    useSpring({
        config: { duration: 4000, clamp: true },
        percentage: endOfAnimation ? 1 : 0,
        onChange: ({ value: { percentage } }) => {
            // console.log(percentage)

            postProBrightValue.current = (0.9 - 0.1) * percentage;

            if (background?.current) {
                const color = new THREE.Color('white');
                const startColor = new THREE.Color('#161616');
                background.current.copy(startColor).lerp(color, percentage)
            }
            // console.log({ bg: background })
        }
    })
    return (
        <>
            {progress !== 100 && (
                <LoadingScreen />
            )}
            <Canvas
                shadows
                gl={{ antialias: true }}
                onCreated={({ gl }) => {
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;
                    gl.antiAlias = true;
                    gl.setPixelRatio(2.0)
                    gl.setSize(window.innerWidth, window.innerHeight);
                    // gl.setPixelRatio(2)
                }}
                camera={{
                    position:
                        [
                            END_CAMERA_POSITION.x,
                            END_CAMERA_POSITION.y,
                            END_CAMERA_POSITION.z
                        ]
                }}
            >
                <Controls setControls={setControls} />
                {/* <color attach="background" args={["black"]} roughness={1.0} /> */}
                <gridHelper args={[10, 10]} />
                <Suspense fallback={null}>
                    <color ref={background} attach="background" args={["#161616"]} />

                    <ambientLight layers={2} intensity={20} color="white" />
                    <directionalLight
                        layers={1}
                        castShadow
                        position={[2.5, 8, 5]}
                        intensity={5.5}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                        color="white"
                    />

                    <CarModel />
                    <Effects />
                </Suspense>
            </Canvas >
            <>
                {progress >= 100 &&
                    <Button
                        fadeOut={personEntered}
                        onClick={() => {
                            setPersonEntered(true)
                        }}
                    >
                        Enter Configurator
                    </Button>
                }
                {personEntered &&
                    <LoadingBar className="ripple">
                        <div className={`${endOfLoading && 'fade-out'}`}></div>
                        <div className={`${endOfLoading && 'fade-out'}`}></div>
                    </LoadingBar>
                }
                <CinematicHalfScreen
                    top
                    endOfAnimation={endOfAnimation}
                    startOfAnimation={startOfAnimation}
                >

                </CinematicHalfScreen>
                <CinematicHalfScreen
                    top={false}
                    endOfAnimation={endOfAnimation}
                    startOfAnimation={startOfAnimation}
                />
            </>
            <Overlay />
        </>
    )
}