import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import * as THREE from 'three';
import fragShader from './ShaderPass/shader.frag';
import vertShader from './ShaderPass/shader.vert';
import { Camera } from 'three';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { Sphere, useGLTF } from '@react-three/drei'
import Model from '../CarModel/Car';
extend({ EffectComposer, ShaderPass, SavePass, RenderPass, FXAAShader, GammaCorrectionShader, SSAARenderPass, SAOPass });

const Effects = () => {
  const composer = useRef();
  const shaderPass = useRef();
  const SAO = useRef();
  const { scene, gl, size, camera, clock } = useThree();

  const [target] = React.useMemo(() => {
    const target = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        depthBuffer: true,
        depthTexture: new THREE.DepthTexture()
      },
    );
    return [target];
  }, []);

  const gltf = useGLTF('/car.gltf');

  // useEffect(() => composer.current.setSize(size.width, size.height), [size]);
  useFrame((state) => {
    const sceneModel = new THREE.Scene();

    if (gltf?.scene?.children?.length > 0) {
      // console.log({ gltf })
      gltf.scene.rotation.y = THREE.MathUtils.degToRad(25);
      sceneModel.add(gltf.scene)
    }

    state.gl.setRenderTarget(target);
    state.gl.render(scene, camera);
    const height = window.innerHeight;
    const width = window.innerWidth;

    // composer.current.renderer.setSize(window.innerWidth, window.innerHeight);
    // composer.current.renderer.setPixelRatio(window.devicePixelRatio);
    // composer.current.renderer.logarithmicDepthBuffer = true;

    shaderPass.current.uniforms['tDiffuse'].value = target.texture;
    shaderPass.current.uniforms['depthTexture'].value = target.depthTexture;
    shaderPass.current.uniforms['time'].value = clock.elapsedTime;
    shaderPass.current.uniforms['resolution'].value = new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    );

    shaderPass.current.uniforms['leftLight'].value = new THREE.Vector3(-0.45, 0.8, 2.0);
    shaderPass.current.uniforms['rightLight'].value = new THREE.Vector3(0.95, 0.8, 2.0);
    if (camera) {
      shaderPass.current.uniforms['cam'].value = new THREE.Vector3().copy(camera.matrixWorld.getPosition());
      shaderPass.current.uniforms['cameraWorldMatrix'].value = camera.matrixWorld;
      shaderPass.current.uniforms['cameraProjectionMatrixInverse'].value = new THREE.Matrix4().copy(camera.projectionMatrix).invert();

      shaderPass.current.uniforms['projectionMatrixInverse'].value = camera.projectionMatrixInverse;
      shaderPass.current.uniforms['viewMatrixInverse'].value = camera.matrixWorld;
    }

    // SAO.current.resolution.set(size.width, size.height)

    // SAO.current.params.saoBias = .5
    // SAO.current.params.saoIntensity = .00001
    // SAO.current.params.saoScale = 10;
    // SAO.current.params.saoKernelRadius = 100
    // SAO.current.params.saoMinResolution = 0

    camera.updateProjectionMatrix();
    composer.current.render();
  }, 1);

  const volumetricLights = {
    uniforms: {
      tDiffuse: null,
      depthTexture: null,
      time: null,
      resolution: null,
      leftLight: null,
      rightLight: null,
      cameraWorldMatrix: null,
      cameraProjectionMatrixInverse: null,
      matrixWorldInverse: null,
      cam: null,
      projectionMatrixInverse: null,
      viewMatrixInverse: null
    },
    vertexShader: vertShader,
    fragmentShader: fragShader
  }

  return (
    <effectComposer ref={composer} trans args={[gl]} >
      <sSAARenderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"

        ref={shaderPass}
        args={[volumetricLights, 'tDiffuse']}
        needsSwap={false}

      />
      {/* <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / (size.width * window.devicePixelRatio), 1 / (size.height * window.devicePixelRatio)]}
      /> */}
      {/* <shaderPass attachArray="passes" args={[GammaCorrectionShader]} renderToScreen /> */}
      {/* <sAOPass ref={SAO} attachArray="passes" args={[scene, camera]} scene={scene} camera={camera} saoBias={0.5} saoIntensity={.0012} saoScale={0.3} saoKernelRadius={40} saoMinResolution={0} /> */}
    </effectComposer>
  );
};

export default Effects;