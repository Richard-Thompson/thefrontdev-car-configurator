import { useMemo } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { ManualMSAARenderPass } from 'three/examples/jsm/postprocessing/render';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

// import { useControls } from '../../Context/controlsContext';
import { useAnimationControls } from 'context/animationControls';

import * as THREE from 'three';

import vertexShader from 'components/effects/ShaderPass/blending.vert';
import fragmentShader from 'components/effects/ShaderPass/blending.frag';

extend({
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
});

// https://codesandbox.io/s/volumetric-light-w633u?file=/src/index.js:666-740

const Effects = () => {
  const {
    gl, scene, camera, size,
  } = useThree();

  const { endOfAnimation, brightnessValue } = useAnimationControls((state) => ({
    endOfAnimation: state.endOfAnimation,
    brightnessValue: state.brightnessValue,
  }));

  const [bloomComposer, finalComposer] = useMemo(() => {
    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      5.0,
      0.4,
      0.85,
    );

    const bloomComposerEffect = new EffectComposer(gl);
    bloomComposerEffect.renderToScreen = false;
    bloomComposerEffect.setSize(size.width, size.height);
    bloomComposerEffect.addPass(renderScene);
    bloomComposerEffect.addPass(bloomPass);

    const blendPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposerEffect.renderTarget2.texture },
          darkFactor: { value: 0.1 },
        },
        vertexShader,
        fragmentShader,
        defines: {},
      }),
      'baseTexture',
    );
    blendPass.needsSwap = true;

    const FXAAPass = new ShaderPass(FXAAShader);
    FXAAPass.uniforms.resolution.value.x = 1 / window.innerWidth;
    FXAAPass.uniforms.resolution.value.y = 1 / window.innerHeight;
    FXAAPass.renderToScreen = true;

    const finalComposerEffect = new EffectComposer(gl);
    finalComposerEffect.setSize(size.width, size.height);
    finalComposerEffect.addPass(renderScene);
    finalComposerEffect.addPass(blendPass);
    finalComposerEffect.addPass(FXAAPass);

    return [bloomComposerEffect, finalComposerEffect];
  }, []);

  useFrame(() => {
    camera.layers.set(2);
    bloomComposer.render();
    camera.layers.set(1);
    finalComposer.render();
    // console.log({ brightnessValue: brightnessValue.current })
    if (endOfAnimation) {
      finalComposer.passes[1].material.uniforms.darkFactor.value = brightnessValue.current;
    }

    // console.log({ finalComposer })
  }, 9);

  return null;
};

export default Effects;
