"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingBox() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 1, 4]} /> {/* Car-ish proportions */}
            <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} />
        </mesh>
    );
}

function CarPlaceholder() {
    // A simple group of shapes to look slightly more like a car
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Body */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[2, 0.8, 4.5]} />
                <meshStandardMaterial color="#2563eb" roughness={0.1} metalness={0.8} />
            </mesh>
            {/* Cabin */}
            <mesh position={[0, 1.2, -0.5]}>
                <boxGeometry args={[1.8, 0.7, 2.5]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Wheels */}
            <mesh position={[1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[-1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[-1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    )
}

export function ThreeScene() {
    return (
        <div className="h-[400px] w-full md:h-[600px]">
            <Canvas camera={{ position: [5, 4, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <CarPlaceholder />
                </Float>

                <Environment preset="city" />
                <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
        </div>
    );
}
