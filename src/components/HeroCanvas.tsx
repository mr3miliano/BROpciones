"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function AnimatedShapes() {
  const sphereRef1 = useRef<THREE.Mesh>(null!);
  const sphereRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (sphereRef1.current) {
      sphereRef1.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef1.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (sphereRef2.current) {
      sphereRef2.current.rotation.x = state.clock.getElapsedTime() * -0.15;
      sphereRef2.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#f59e0b" />
      <spotLight position={[0, 5, 5]} intensity={2} penumbra={1} color="#10b981" />

      {/* Esfera Principal */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[2, 0, -5]}>
        <Sphere ref={sphereRef1} args={[1.5, 128, 128]}>
          <MeshDistortMaterial
            color="#f59e0b" // amber-500
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Esfera Secundaria */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[-3, 1, -8]}>
        <Sphere ref={sphereRef2} args={[2, 128, 128]}>
          <MeshDistortMaterial
            color="#059669" // emerald-600
            metalness={0.8}
            roughness={0.15}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.3}
            speed={1.5}
          />
        </Sphere>
      </Float>

      {/* Esfera de Fondo / Acento */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1} position={[0, -3, -10]}>
        <Sphere args={[3, 64, 64]}>
          <meshStandardMaterial
            color="#020617"
            metalness={1}
            roughness={0.2}
            envMapIntensity={0.5}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <h1>.</h1>
  );
}