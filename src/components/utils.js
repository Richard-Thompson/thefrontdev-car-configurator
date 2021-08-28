import * as THREE from 'three';

export const generateIntroCameraPath = (startPosition, endPostion) => {
    const arrayOfVectors = [startPosition, endPostion];

    const path = new THREE.CatmullRomCurve3(arrayOfVectors, false);

    path.arcLengthDivisions = 8000;

    return path;
};

export const CAMERA_PATH_END_POSITION = new THREE.Vector3(-0.9, 1.4, 20);

const CAMERA_ANGLE = new THREE.Vector3(0, 1, 0);

let camPosSwitch = true;
let firstNextCamPosAfterStartPath = new THREE.Vector3();

export const updateHandlerForPath = (
    camera,
    curve,
    tick,
) => {
    // Vec3 Position of camera

    console.log({ camera, curve, tick })
    const camPos = curve.getPointAt(tick);

    // Vec3 lookAtValue for camera
    const nextCamPos = curve.getPointAt(Math.min(tick + 0.06, 1));
    // This converts 0.4-1.0 to a percentage range 1-100% or 0-1.0
    const rangePercentage = ((tick - 0.35) * 100) / (1 - 0.35) / 100;

    // >0.4 is position the camera needs to start rotating towards main igloo
    // this is done by creating lookAt path for camera that deviates
    // from the nextCamPos just after 0.4.

    camera.rotation.x = 0;
    camera.position.x = camPos.x;
    camera.position.y = camPos.y;
    camera.position.z = camPos.z;
    camera.lookAt(nextCamPos);

};
