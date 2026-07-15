import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Water({ color }) {
  const meshRef = useRef();
  const foamRef = useRef();

  // Create a plane geometry with subdivisions for vertex displacement
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 16, 28, 28);
    // Rotate to lie flat on XZ plane
    geo.rotateX(-Math.PI / 2);
    
    // Store original height values
    const pos = geo.attributes.position;
    const initialY = new Float32Array(pos.count);
    
    // Generate wave offsets for variance
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
    
    // Animate water vertex displacement
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      const pos = geo.attributes.position;
      const { initialY, offsets } = geo.userData;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        
        // Complex multi-layered low-poly wave waves
        const wave1 = Math.sin(x * 0.5 + time * 1.3 + offsets[i]) * 0.09;
        const wave2 = Math.cos(z * 0.5 + time * 1.1 + offsets[i]) * 0.09;
        const wave3 = Math.sin((x + z) * 0.25 + time * 0.9) * 0.05;
        
        pos.setY(i, initialY[i] + wave1 + wave2 + wave3);
      }
      
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    // Animate Shoreline Foam Ring (slow pulse scale and opacity)
    if (foamRef.current) {
      const pulseScale = 1.0 + Math.sin(time * 2.0) * 0.02;
      foamRef.current.scale.set(pulseScale, pulseScale, 1.0);
      foamRef.current.material.opacity = 0.35 + Math.sin(time * 2.0) * 0.15;
    }
  });

  return (
    <group>
      {/* 1. Waving Top Water Surface */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow position={[0, -0.2, 0]}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.82}
          flatShading
        />
      </mesh>

      {/* 2. Flat Deep Water Bed (creates depth parallax) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 3. Shoreline Foam Ring around the main island */}
      <mesh ref={foamRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]}>
        <ringGeometry args={[4.05, 4.35, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
