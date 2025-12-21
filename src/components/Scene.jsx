import { Suspense, useCallback, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, PerformanceMonitor, Preload, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useStore from '../store/useStore';

import Sun from './Sun';
import Planet from './Planet';
import OrbitRing from './OrbitRing';
import DebrisField from './DebrisField';
import CameraController from './CameraController';
import { projects } from '../data/projects';

function Effects({ isMobile }) {
    const bloomEnabled = useStore((state) => state.bloomEnabled);

    // Disable bloom entirely on mobile for performance
    if (!bloomEnabled || isMobile) return null;

    return (
        <EffectComposer>
            <Bloom
                intensity={0.4}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
        </EffectComposer>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#00f5ff" wireframe />
        </mesh>
    );
}

export default function Scene() {
    const setPerformance = useStore((state) => state.setPerformance);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePerformanceIncline = useCallback(() => {
        setPerformance('high');
    }, [setPerformance]);

    const handlePerformanceDecline = useCallback(() => {
        setPerformance('low');
    }, [setPerformance]);

    return (
        <Canvas
            camera={{ position: [0, 8, 20], fov: 60 }}
            // Lower DPR on mobile for major performance boost
            dpr={isMobile ? [0.75, 1] : [1, 1.5]}
            gl={{
                antialias: !isMobile, // Disable antialiasing on mobile
                alpha: false,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
            }}
            style={{ background: '#050508' }}
            // Limit frame rate on mobile
            frameloop={isMobile ? 'demand' : 'always'}
        >
            <PerformanceMonitor
                onIncline={handlePerformanceIncline}
                onDecline={handlePerformanceDecline}
                flipflops={3}
                bounds={(fps) => [fps > 30 ? 1 : 0, fps > 45 ? 1 : 0]}
            />

            {/* Adaptive DPR - automatically adjusts based on performance */}
            <AdaptiveDpr pixelated />

            <Suspense fallback={<LoadingFallback />}>
                {/* Deep space background */}
                <color attach="background" args={['#050508']} />

                {/* Disable fog on mobile */}
                {!isMobile && <fog attach="fog" args={['#050508', 25, 50]} />}

                {/* Starfield - reduced count on mobile */}
                <Stars
                    radius={100}
                    depth={50}
                    count={isMobile ? 1000 : 3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={isMobile ? 0.2 : 0.5}
                />

                {/* Ambient lighting */}
                <ambientLight intensity={0.15} />

                {/* The Sun */}
                <Sun />

                {/* Orbit rings */}
                {projects.map((project) => (
                    <OrbitRing
                        key={`ring-${project.id}`}
                        radius={project.orbitRadius}
                        color={project.color}
                    />
                ))}

                {/* Planets */}
                {projects.map((project, index) => (
                    <Planet
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}

                {/* Debris field - only on desktop */}
                {!isMobile && <DebrisField />}

                {/* Camera controls */}
                <CameraController />

                {/* Post-processing - disabled on mobile */}
                <Effects isMobile={isMobile} />

                <Preload all />
            </Suspense>
        </Canvas>
    );
}
