import * as THREE from 'three';

export const playAudio = (camera, url) => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, function (buffer) {
        sound.setBuffer(buffer);
        // sound.
        sound.setLoop(false);
        sound.setVolume(1.0);
        sound.play();
    });
}
