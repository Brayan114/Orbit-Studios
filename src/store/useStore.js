import { create } from 'zustand';

const useStore = create((set) => ({
    // Camera focus state
    focusTarget: null, // null | 'sun' | 'planet-0' | 'planet-1' | 'planet-2' | 'comms'

    // Modal state
    isModalOpen: false,
    modalType: null, // 'about' | 'project' | 'contact'
    activeProject: null,

    // Performance state
    performanceLevel: 'high', // 'high' | 'low'
    bloomEnabled: true,

    // Actions
    setFocus: (target) => set({ focusTarget: target }),

    openModal: (type, project = null) => set({
        isModalOpen: true,
        modalType: type,
        activeProject: project
    }),

    closeModal: () => set({
        isModalOpen: false,
        modalType: null,
        activeProject: null,
        focusTarget: null
    }),

    setPerformance: (level) => set({
        performanceLevel: level,
        bloomEnabled: level === 'high'
    }),

    // Reset to orbital view
    resetView: () => set({
        focusTarget: null,
        isModalOpen: false,
        modalType: null,
        activeProject: null
    })
}));

export default useStore;
