import Scene from './components/Scene';
import HUD from './components/ui/HUD';
import AboutModal from './components/ui/AboutModal';
import ProjectModal from './components/ui/ProjectModal';
import ContactTerminal from './components/ui/ContactTerminal';

function App() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-space-darker">
      {/* 3D Scene */}
      <Scene />

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
