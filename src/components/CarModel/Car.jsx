/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: RodyYassen (https://sketchfab.com/RodyYassen)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/black-ferrari-488-gtb-e4d3246a89274efb9bb59068cad033f7
title: Black Ferrari 488 GTB
*/

import React, { useRef, useState, useMemo } from 'react'
import { Sphere, useGLTF } from '@react-three/drei'
import useKeypress from 'react-use-keypress';
import * as THREE from 'three';


export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/car.gltf');
  const [leftHeadLight, setLeftHeadLight] = useState(new THREE.Vector3(-0.45, 0.4, 1.65));
  const [rightHeadLight, setRightHeadLight] = useState(new THREE.Vector3(0.45, 0.4, 1.65));

  useMemo(() => {
    console.log({materials})
    if (materials) {
     Object.keys(materials).forEach((item) => {
       materials[item].opacity = 0.9;
     })

    }
  }, [materials])
  // useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], (event) => {
  //   if (event.key === 'ArrowLeft') {
  //     setSpherePositionZ(oldState => oldState - 1);
  //   } else if (event.key === 'ArrowRight'){
  //     setSpherePositionZ(oldState => oldState + 1);
  //   } else if (event.key === 'ArrowUp') {
  //     setSpherePositionX(oldState => oldState - 1);
  //   } else if (event.key === 'ArrowDown') {
  //     setSpherePositionX(oldState => oldState + 1);
  //   }
  // });
  return (
    <group ref={group} {...props} dispose={null} >
      <group name="OSG_Scene">
        <group name="RootNode_(gltf_orientation_matrix)" rotation={[-Math.PI / 2, 0, 0]}>
   

    <group
            name="RootNode_(model_correction_matrix)"
            position={[0.08, 0.06, 0.18]}
            rotation={[0, 0, 0]}
            scale={[1.48, 1.48, 1.48]}
            >
            <group name="root">

  
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group name="Circle002_1" position={[0.17, 0, -0.13]} rotation={[0, 0, -Math.PI / 2]}>
                  <mesh castShadow name="mesh_0" geometry={nodes.mesh_0.geometry} material={materials.disc_plate} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_1" geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_2" geometry={nodes.mesh_2.geometry} material={nodes.mesh_2.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_3" geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_4" geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_5" geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_6" geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_7" geometry={nodes.mesh_7.geometry} material={nodes.mesh_7.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_8" geometry={nodes.mesh_8.geometry} material={nodes.mesh_8.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_9" geometry={nodes.mesh_9.geometry} material={nodes.mesh_9.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_10" geometry={nodes.mesh_10.geometry} material={nodes.mesh_10.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_11" geometry={nodes.mesh_11.geometry} material={nodes.mesh_11.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_12" geometry={nodes.mesh_12.geometry} material={nodes.mesh_12.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_13" geometry={nodes.mesh_13.geometry} material={nodes.mesh_13.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_14" geometry={nodes.mesh_14.geometry} material={nodes.mesh_14.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_15" geometry={nodes.mesh_15.geometry} material={nodes.mesh_15.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_16" geometry={nodes.mesh_16.geometry} material={nodes.mesh_16.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_17" geometry={nodes.mesh_17.geometry} material={nodes.mesh_17.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_18" geometry={nodes.mesh_18.geometry} material={nodes.mesh_18.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_19" geometry={nodes.mesh_19.geometry} material={nodes.mesh_19.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_20" geometry={nodes.mesh_20.geometry} material={nodes.mesh_20.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_21" geometry={nodes.mesh_21.geometry} material={nodes.mesh_21.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_22" geometry={nodes.mesh_22.geometry} material={nodes.mesh_22.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_23" geometry={nodes.mesh_23.geometry} material={nodes.mesh_23.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_24" geometry={nodes.mesh_24.geometry} material={nodes.mesh_24.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_25" geometry={nodes.mesh_25.geometry} material={nodes.mesh_25.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_26" geometry={nodes.mesh_26.geometry} material={nodes.mesh_26.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_27" geometry={nodes.mesh_27.geometry} material={nodes.mesh_27.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_28" geometry={nodes.mesh_28.geometry} material={nodes.mesh_28.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane014_6" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_29" geometry={nodes.mesh_29.geometry} material={nodes.mesh_29.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_30" geometry={nodes.mesh_30.geometry} material={nodes.mesh_30.material} transparent opacity={0.0}/>
                </group>
                <group name="Cylinder008_7" position={[0.17, 0, -0.13]} rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
                  <mesh castShadow name="mesh_31" geometry={nodes.mesh_31.geometry} material={nodes.mesh_31.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane020_8" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_32" geometry={nodes.mesh_32.geometry} material={nodes.mesh_32.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane024_9" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_33" geometry={nodes.mesh_33.geometry} material={nodes.mesh_33.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_34" geometry={nodes.mesh_34.geometry} material={nodes.mesh_34.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_35" geometry={nodes.mesh_35.geometry} material={nodes.mesh_35.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_36" geometry={nodes.mesh_36.geometry} material={nodes.mesh_36.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_37" geometry={nodes.mesh_37.geometry} material={nodes.mesh_37.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_38" geometry={nodes.mesh_38.geometry} material={nodes.mesh_38.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane025_10" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_39" geometry={nodes.mesh_39.geometry} material={nodes.mesh_39.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane028_11" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_40" geometry={nodes.mesh_40.geometry} material={materials.Window} transparent opacity={0.0}/>
                </group>
                <group name="Plane021_12" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_41" geometry={nodes.mesh_41.geometry} material={nodes.mesh_41.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane029_13" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_42" geometry={nodes.mesh_42.geometry} material={nodes.mesh_42.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_43" geometry={nodes.mesh_43.geometry} material={nodes.mesh_43.material} transparent opacity={0.0}/>
                </group>
                <group name="Cylinder009_14" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_44" geometry={nodes.mesh_44.geometry} material={nodes.mesh_44.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_45" geometry={nodes.mesh_45.geometry} material={nodes.mesh_45.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane017_16" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_46" geometry={nodes.mesh_46.geometry} material={nodes.mesh_46.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_47" geometry={nodes.mesh_47.geometry} material={materials['Material.005']} transparent opacity={0.0}/>
                </group>
                <group name="Plane019_17" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_48" geometry={nodes.mesh_48.geometry} material={nodes.mesh_48.material} transparent opacity={0.0}/>
                </group>
                <group name="Cylinder002_18" position={[0.17, 0.41, -0.13]}>
                  <mesh castShadow name="mesh_49" geometry={nodes.mesh_49.geometry} material={nodes.mesh_49.material} transparent opacity={0.0}/>
                </group>
                <group name="Circle012_19" position={[0.17, 0, -0.13]} rotation={[0.15, 0, 0]}>
                  <mesh castShadow name="mesh_50" geometry={nodes.mesh_50.geometry} material={nodes.mesh_50.material} transparent opacity={0.0}/>
                </group>
                <group name="Circle013_20" position={[0.17, 0, -0.13]} rotation={[0.34, 0, 0]}>
                  <mesh castShadow name="mesh_51" geometry={nodes.mesh_51.geometry} material={nodes.mesh_51.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_52" geometry={nodes.mesh_52.geometry} material={nodes.mesh_52.material} transparent opacity={0.0}/>
                </group>
                <group name="Cylinder017_21" position={[0.17, 0, -0.13]}>
                  <group>
                    <mesh castShadow name="mesh_53" geometry={nodes.mesh_53.geometry} material={nodes.mesh_53.material} transparent opacity={0.0}/>
                    {/*  */}
                  </group>
                  <group>
                    <mesh castShadow name="mesh_54" geometry={nodes.mesh_54.geometry} material={nodes.mesh_54.material} transparent opacity={0.0}/>
                    {/*  */}
                  </group>
                </group>
                <group name="Cylinder018_22" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_55" geometry={nodes.mesh_55.geometry} material={nodes.mesh_55.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_56" geometry={nodes.mesh_56.geometry} material={nodes.mesh_56.material} transparent opacity={0.0}/>
                </group>
                <group name="Cylinder019_23" position={[0.17, 0.41, -0.13]}>
                  <mesh castShadow name="mesh_57" geometry={nodes.mesh_57.geometry} material={materials['Material.002']} transparent opacity={0.0}/>
                </group>
                <group name="Plane052_24" position={[0.17, 0, -0.13]}>
                  <mesh castShadow name="mesh_58" geometry={nodes.mesh_58.geometry} material={nodes.mesh_58.material} transparent opacity={0.0}/>
                  <mesh castShadow name="mesh_59" geometry={nodes.mesh_59.geometry} material={nodes.mesh_59.material} transparent opacity={0.0}/>
                </group>
                <group name="Plane053_25" position={[0.17, 0.41, -0.13]}>
                  <mesh castShadow name="mesh_60" geometry={nodes.mesh_60.geometry} material={nodes.mesh_60.material} transparent opacity={0.0}/>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/car.gltf')
