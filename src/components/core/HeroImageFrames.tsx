"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as DreiImage, Float, Environment, OrbitControls, Preload, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Robust Error Boundary for 3D content
class ImageErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

function Frame({ url, position, rotation, scale = [1, 1.618, 0.05], ...props }: any) {
    const imageRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (imageRef.current) {
            const targetScaleX = hovered ? scale[0] * 1.05 : scale[0];
            const targetScaleY = hovered ? scale[1] * 1.05 : scale[1];

            imageRef.current.scale.x = THREE.MathUtils.lerp(imageRef.current.scale.x, targetScaleX, delta * 5);
            imageRef.current.scale.y = THREE.MathUtils.lerp(imageRef.current.scale.y, targetScaleY, delta * 5);

            // @ts-ignore - DreiImage material has a zoom prop
            if (imageRef.current.material && 'zoom' in imageRef.current.material) {
                // @ts-ignore
                imageRef.current.material.zoom = THREE.MathUtils.lerp(imageRef.current.material.zoom, hovered ? 1.1 : 1, delta * 5);
            }
        }
    });

    return (
        <group position={position} rotation={rotation} {...props}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                {/* The Image with Error Handling - No Frame Border */}
                <ImageErrorBoundary fallback={
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[scale[0], scale[1]]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                }>
                    <DreiImage
                        ref={imageRef}
                        url={url}
                        scale={[scale[0], scale[1]]}
                        position={[0, 0, 0]}
                        transparent
                        opacity={1}
                        side={THREE.DoubleSide}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                    />
                </ImageErrorBoundary>
            </Float>
        </group>
    );
}

function InteractiveSingleImage() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Smoothly tilt the group based on mouse position
            const targetRotationY = (state.mouse.x * Math.PI) / 10; // Left/Right tilt
            const targetRotationX = (-state.mouse.y * Math.PI) / 10; // Up/Down tilt

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
        }
    });

    return (
        <group ref={groupRef} position={[2, 0, 0]}>
            {/* Single Hero Image - Large & Interactive */}
            <Frame
                url="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"
                position={[0, 0, 0]}
                scale={[4.5, 3]}
            />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={20} blur={3} far={10} color="#0f172a" />
        </group>
    );
}

export function HeroImageFrames() {
    return (
        <div className="w-full h-full min-h-screen">
            {/* Suspense is crucial for async assets like DreiImage */}
            <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, 0, -10]} intensity={0.5} />

                    <Suspense fallback={null}>
                        <InteractiveSingleImage />
                        <Environment preset="city" />
                    </Suspense>

                    {/* Disable OrbitControls to let the mouse tilt effect take over */}
                    {/* <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} /> */}
                </Canvas>
            </Suspense>
        </div>
    );
}
