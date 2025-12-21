import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store/useStore';
import { projects } from '../data/projects';

export default function CameraController() {
    const controlsRef = useRef();
    const { camera } = useThree();
    const { focusTarget } = useStore();

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate camera distances based on device
    const defaultZ = isMobile ? 35 : 20;
    const defaultY = isMobile ? 12 : 8;

    // Target position for camera lerp
    const targetPosition = useRef(new THREE.Vector3(0, defaultY, defaultZ));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useEffect(() => {
        if (focusTarget === null) {
            // Default orbital view - zoomed out more on mobile
            targetPosition.current.set(0, defaultY, defaultZ);
            targetLookAt.current.set(0, 0, 0);
        } else if (focusTarget === 'sun') {
            // Zoom into sun
            targetPosition.current.set(0, 2, isMobile ? 7 : 5);
            targetLookAt.current.set(0, 0, 0);
        } else if (focusTarget === 'comms') {
            // Zoom to comms array
            targetPosition.current.set(18, 3, isMobile ? 8 : 5);
            targetLookAt.current.set(20, 0, 0);
        } else if (focusTarget.startsWith('planet-')) {
            // Get planet index
            const index = parseInt(focusTarget.split('-')[1]);
            const project = projects[index];
            if (project) {
                const zoomFactor = isMobile ? 1.2 : 0.8;
                targetPosition.current.set(
                    project.orbitRadius * zoomFactor,
                    isMobile ? 4 : 3,
                    project.orbitRadius * (isMobile ? 0.8 : 0.6)
                );
            }
        }
    }, [focusTarget, isMobile, defaultY, defaultZ]);

    useFrame((state, delta) => {
        // Smooth camera movement
        camera.position.lerp(targetPosition.current, delta * 2);

        // Smooth look-at
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        currentLookAt.add(camera.position);
        currentLookAt.lerp(targetLookAt.current, delta * 2);
        camera.lookAt(targetLookAt.current);

        // Update orbit controls target
        if (controlsRef.current) {
            controlsRef.current.target.lerp(targetLookAt.current, delta * 2);
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={isMobile ? 10 : 5}
            maxDistance={isMobile ? 60 : 40}
            maxPolarAngle={Math.PI * 0.85}
            minPolarAngle={Math.PI * 0.1}
            autoRotate={focusTarget === null}
            autoRotateSpeed={0.3}
            dampingFactor={0.05}
            enabled={focusTarget === null}
        />
    );
}
