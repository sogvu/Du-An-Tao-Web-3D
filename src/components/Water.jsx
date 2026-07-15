import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Water({ color }) {
  const meshRef = useRef();

  // Create a plane geometry with subdivisions for vertex displacement
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 16, 24, 24);
    // Rotate to lie flat on XZ plane
    geo.rotateX(-Math.PI / 2);
    
    // Store original height values (Y positions, which are indexed as Y in the plane before/after rotation)
    const pos = geo.attributes.position;
    const initialY = new Float32Array(pos.count);
    
    // We also generate custom wave offsets for each vertex to add organic variance
    const offsets = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialY[i] = pos.getY(i);
      offsets[i] = Math.random() * Math.PI * 2;
    }
    geo.userData = { initialY, offsets };
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;
    const { initialY, offsets } = geo.userData;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      // Multi-layered sine wave calculation
      const wave1 = Math.sin(x * 0.6 + time * 1.2 + offsets[i]) * 0.08;
      const wave2 = Math.cos(z * 0.6 + time * 1.0 + offsets[i]) * 0.08;
      const wave3 = Math.sin((x + z) * 0.3 + time * 0.8) * 0.04;
      
      // Apply wave displacement to the height (Y coordinate)
      pos.setY(i, initialY[i] + wave1 + wave2 + wave3);
    }
    
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow position={[0, -0.2, 0]}>
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.2}
        transparent
        opacity={0.8}
        flatShading
      />
    </mesh>
  );
}
