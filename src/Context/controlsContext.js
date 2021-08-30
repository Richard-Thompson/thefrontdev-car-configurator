import create from 'zustand';

export const useControls = create(set => ({
    activeObject: false,
    setActiveObject: (state) =>
        set({ activeObject: state }),
    activeObjectName: '',
    setActiveObjectName: (state) =>
        set({ activeObjectName: state }),
    soundOn: false,
    setSoundOn: (state) =>
        set({ soundOn: state }),
    engineStartPlaying: false,
    setEngineStartPlaying: (state) =>
        set({ engineStartPlaying: state }),
    engineIdlePlaying: false,
    setEngineIdlePlaying: (state) =>
        set({ engineIdlePlaying: state }),
    turnAllSoundOff: (state) =>
        set({
            engineStartPlaying: false,
            engineIdlePlaying: false
        }),
    nodes: null,
    setNodes: (state) =>
        set({ nodes: state }),
    bloomRefSet: false,
    setBloomRef: (state) =>
        set({ bloomRefSet: state }),
    controlsRef: null,
    setControlsRef: (state) =>
        set({ controlsRef: state }),
}));