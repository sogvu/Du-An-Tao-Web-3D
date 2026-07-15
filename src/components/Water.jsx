import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Water({ color, envMap }) {
  const meshRef = useRef();
  const foamRef = useRef();

  // High-subdivision geometry for realistic undulating waves
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 18, 60, 60);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const initialY = new Float32Array(pos.count);
    const offsets = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialY[i] = pos.getY(i);
      offsets[i] = Math.random() * Math.PI * 2;
    }
    geo.userData = { initialY, offsets };
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Wave displacement — multi-frequency Gerstner-like layering
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      const pos = geo.attributes.position;
      const { initialY, offsets } = geo.userData;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        const w1 = Math.sin(x * 0.45 + time * 1.1 + offsets[i]) * 0.10;
        const w2 = Math.cos(z * 0.45 + time * 0.95 + offsets[i]) * 0.10;
        const w3 = Math.sin((x + z) * 0.22 + time * 0.75) * 0.05;
        const w4 = Math.cos((x - z) * 0.18 + time * 1.3 + offsets[i] * 0.5) * 0.04;

        pos.setY(i, initialY[i] + w1 + w2 + w3 + w4);
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    // Shoreline foam breathes in and out
    if (foamRef.current) {
      const scale = 1.0 + Math.sin(time * 1.8) * 0.025;
      foamRef.current.scale.set(scale, scale, 1.0);
      foamRef.current.material.opacity = 0.28 + Math.sin(time * 1.8) * 0.12;
    }
  });

  return (
    <group>
      {/* Deep ocean bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Animated water surface — PBR Physical material for reflections */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow position={[0, -0.18, 0]}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.1}
          reflectivity={0.9}
          transmission={0.3}
          thickness={1.2}
          ior={1.33}
          transparent
          opacity={0.78}
          envMapIntensity={1.6}
          envMap={envMap}
        />
      </mesh>

      {/* Foam ring at island base */}
      <mesh ref={foamRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, 0]}>
        <ringGeometry args={[4.05, 4.6, 48]} />
        <meshBasicMaterial
          color="#dceeff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
