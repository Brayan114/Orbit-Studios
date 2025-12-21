import { Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, PerformanceMonitor, Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useStore from '../store/useStore';

import Sun from './Sun';
import Planet from './Planet';
import OrbitRing from './OrbitRing';
import DebrisField from './DebrisField';
import CameraController from './CameraController';
import { projects } from '../data/projects';

function Effects() {
    const bloomEnabled = useStore((state) => state.bloomEnabled);

    if (!bloomEnabled) return null;

    return (
        <EffectComposer>
            <Bloom
                intensity={0.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
        </EffectComposer>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#00f5ff" wireframe />
        </mesh>
    );
}

export default function Scene() {
    const setPerformance = useStore((state) => state.setPerformance);

    const handlePerformanceIncline = useCallback(() => {
        setPerformance('high');
    }, [setPerformance]);

    const handlePerformanceDecline = useCallback(() => {
        setPerformance('low');
    }, [setPerformance]);

    return (
        <Canvas
            camera={{ position: [0, 8, 20], fov: 60 }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            }}
            style={{ background: '#050508' }}
        >
            <PerformanceMonitor
                onIncline={handlePerformanceIncline}
                onDecline={handlePerformanceDecline}
                flipflops={3}
                bounds={(fps) => [fps > 50 ? 1 : 0, fps > 50 ? 1 : 0]}
            />

            <Suspense fallback={<LoadingFallback />}>
                {/* Deep space background */}
                <color attach="background" args={['#050508']} />
                <fog attach="fog" args={['#050508', 25, 50]} />

                {/* Starfield */}
                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Ambient lighting - very subtle */}
                <ambientLight intensity={0.1} />

                {/* The Sun - central core */}
                <Sun />

                {/* Orbit rings */}
                {projects.map((project) => (
                    <OrbitRing
                        key={`ring-${project.id}`}
                        radius={project.orbitRadius}
                        color={project.color}
                    />
                ))}

                {/* Planets (including Comms Array as a planet now) */}
                {projects.map((project, index) => (
                    <Planet
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}

                {/* Debris field */}
                <DebrisField />

                {/* Camera controls */}
                <CameraController />

                {/* Post-processing effects */}
                <Effects />

                <Preload all />
            </Suspense>
        </Canvas>
    );
}
