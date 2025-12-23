import useStore from './store/useStore';
import Scene from './components/Scene';
import HUD from './components/ui/HUD';
import AboutModal from './components/ui/AboutModal';
import ProjectModal from './components/ui/ProjectModal';
import ContactTerminal from './components/ui/ContactTerminal';
import ProjectArchive from './components/ui/ProjectArchive';

function App() {
  const viewMode = useStore((state) => state.viewMode);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-space-darker">
      {/* 3D Scene - Hidden when in list mode to save resources/visibilty */}
      <div className={`w-full h-full transition-opacity duration-1000 ${viewMode === 'list' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Scene />
      </div>

      {/* List View Overlay */}
      <ProjectArchive />

      {/* UI Overlays */}
      <HUD />

      {/* Modals */}
      <AboutModal />
      <ProjectModal />
      <ContactTerminal />
    </div>
  );
}

export default App;
