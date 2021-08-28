import React, { useMemo } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useControls } from '../../Context/controlsContext';
import { useAnimationControls } from '../../Context/animationControls';

import * as THREE from 'three'

import vertexShader from './ShaderPass/alphaBloom.vert';
import fragmentShader from './ShaderPass/alphaBloom.frag';


extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

// https://codesandbox.io/s/volumetric-light-w633u?file=/src/index.js:666-740


const Effects = ({ children }) => {
  const { gl, scene, camera, size } = useThree();

  const [bloomComposer, finalComposer] = useMemo(() => {
    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    const bloomComposer = new EffectComposer(gl);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: {}
      }),
      "baseTexture"
    );
    finalPass.needsSwap = true;

    const finalComposer = new EffectComposer(gl);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    return [bloomComposer, finalComposer];
  }, []);

  useFrame((state) => {
    camera.layers.set(2);
    bloomComposer.render();
    camera.layers.set(1);
    finalComposer.render();
  }, 1);

  return null;
};

export default Effects;
