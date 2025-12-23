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

    // View mode state
    viewMode: 'orbit', // 'orbit' | 'list'

    // Actions
    setFocus: (target) => set({ focusTarget: target }),
    
    setViewMode: (mode) => set({ viewMode: mode }),

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
        activeProject: null,
        // viewMode: 'orbit' // Optional: reset to orbit on view reset? Maybe keep current view.
    })
}));

export default useStore;
