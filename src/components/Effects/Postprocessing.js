import React, { useMemo } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { ManualMSAARenderPass } from 'three/examples/jsm/postprocessing/render';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

// import { useControls } from '../../Context/controlsContext';
import { useAnimationControls } from '../../Context/animationControls';


import * as THREE from 'three'

import vertexShader from './ShaderPass/blending.vert';
import fragmentShader from './ShaderPass/blending.frag';
import blurAAVertexShader from './ShaderPass/blurAA.vert';
import blurAAFragmentShader from './ShaderPass/blurAA.frag';


extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

// https://codesandbox.io/s/volumetric-light-w633u?file=/src/index.js:666-740


const Effects = ({ children }) => {
  const { gl, scene, camera, size } = useThree();
  let tick = 0;

  const { endOfAnimation, brightnessValue } = useAnimationControls((state) => ({
    endOfAnimation: state.endOfAnimation,
    brightnessValue: state.brightnessValue
  }))

  const [bloomComposer, finalComposer] = useMemo(() => {
    const pixelRatio = 1000;

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      5.0,
      0.4,
      0.85
    );

    const bloomComposer = new EffectComposer(gl);
    bloomComposer.renderToScreen = false;
    bloomComposer.setSize(size.width, size.height);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const blendPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
          darkFactor: { value: 0.1 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: { }
      }),
      "baseTexture"
    );
    blendPass.needsSwap = true;

    const blurAAPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          iResolution: { value: new THREE.Vector3(size.width, size.height) }
        },
        vertexShader: blurAAVertexShader,
        fragmentShader: blurAAFragmentShader,
        defines: { }
      }),
    );




    const FXAAPass = new ShaderPass(FXAAShader);
    FXAAPass.uniforms['resolution'].value.x = 1 / (window.innerWidth);
    FXAAPass.uniforms['resolution'].value.y = 1 / (window.innerHeight);
    FXAAPass.renderToScreen = true

    const effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    const finalComposer = new EffectComposer(gl);
    finalComposer.setSize(size.width, size.height);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(blendPass);
    finalComposer.addPass(FXAAPass)
    // finalComposer.addPass(blurAAPass)

    // for var
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);
    // finalComposer.addPass(AAPass);

    return [bloomComposer, finalComposer];
  }, []);

  useFrame((state, delta) => {
    camera.layers.set(2);
    bloomComposer.render();
    camera.layers.set(1);
    finalComposer.render();
    // console.log({ brightnessValue: brightnessValue.current })
    if (endOfAnimation) {
      finalComposer.passes[1].material.uniforms['darkFactor'].value = brightnessValue.current;
    }

    // console.log({ finalComposer })
  }, 9);

  return null;
};

export default Effects;
