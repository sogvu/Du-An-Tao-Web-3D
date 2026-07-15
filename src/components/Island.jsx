import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Island({ region, isActive }) {
  const islandRef = useRef();
  const flagRef = useRef();
  const cloudGroupRef = useRef();
  const treeGroupRef = useRef();

  useFrame((state) => {
    if (!islandRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Smooth Transition (Scale and Rotation)
    const targetScale = isActive ? 1 : 0;
    const targetRotY = isActive ? Math.sin(time * 0.05) * 0.1 : Math.PI;
    const targetPosY = isActive ? 0 : -3;

    // Lerp values for smooth transition
    islandRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    islandRef.current.position.y = THREE.MathUtils.lerp(islandRef.current.position.y, targetPosY, 0.06);
    
    // Smoothly transition rotation Y, adding a gentle float on top when active
    if (isActive) {
      // Gentle floating drift
      islandRef.current.position.y += Math.sin(time * 1.5) * 0.003;
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.04);
    } else {
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.06);
    }

    // 2. Animate flag waving
    if (flagRef.current && isActive) {
      flagRef.current.rotation.y = Math.sin(time * 8) * 0.15;
      flagRef.current.rotation.z = Math.cos(time * 4) * 0.05;
    }

    // 3. Animate clouds drifting
    if (cloudGroupRef.current && isActive) {
      cloudGroupRef.current.children.forEach((cloud, i) => {
        cloud.position.y = cloud.userData.initialY + Math.sin(time + i * 2) * 0.15;
        // Slowly rotate around center
        cloud.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1);
      });
    }

    // 4. Animate trees gently swaying
    if (treeGroupRef.current && isActive) {
      treeGroupRef.current.children.forEach((tree, i) => {
        tree.rotation.z = Math.sin(time * 2 + i) * 0.02;
        tree.rotation.x = Math.cos(time * 1.5 + i) * 0.02;
      });
    }
  });

  return (
    <group ref={islandRef} position={[0, -3, 0]} scale={[0, 0, 0]}>
      {/* 1. Base Ground (Low Poly Cylinder) */}
      {/* Grassy Top Layer */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4.2, 0.4, 16]} />
        <meshStandardMaterial color={region.theme.islandColor} flatShading roughness={0.8} />
      </mesh>
      {/* Dirt Bottom Layer */}
      <mesh castShadow receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[4.2, 3.8, 0.4, 16]} />
        <meshStandardMaterial color="#4d3b2c" flatShading roughness={0.9} />
      </mesh>
      {/* Stone Foundation Details */}
      <mesh castShadow position={[2, -0.5, 2]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#4b5563" flatShading />
      </mesh>
      <mesh castShadow position={[-2.5, -0.6, -1]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#374151" flatShading />
      </mesh>

      {/* 2. Flagpole & Waving Indonesian Flag */}
      <group position={[0, 0.2, 0]}>
        {/* Pole */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Flag Mesh (Red top, White bottom) */}
        <group ref={flagRef} position={[0, 2.0, 0]}>
          {/* Red Stripe */}
          <mesh castShadow position={[0.4, 0.18, 0]}>
            <boxGeometry args={[0.8, 0.22, 0.02]} />
            <meshStandardMaterial color="#dc2626" flatShading roughness={0.6} />
          </mesh>
          {/* White Stripe */}
          <mesh castShadow position={[0.4, -0.04, 0]}>
            <boxGeometry args={[0.8, 0.22, 0.02]} />
            <meshStandardMaterial color="#ffffff" flatShading roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* 3. Clouds */}
      <group ref={cloudGroupRef}>
        <group position={[2.5, 3.5, -2]} userData={{ initialY: 3.5 }}>
          <mesh castShadow>
            <sphereGeometry args={[0.6, 6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
          </mesh>
          <mesh castShadow position={[0.4, -0.15, 0.2]}>
            <sphereGeometry args={[0.45, 6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
          </mesh>
          <mesh castShadow position={[-0.4, -0.15, -0.1]}>
            <sphereGeometry args={[0.45, 6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
          </mesh>
        </group>

        <group position={[-2.8, 3.2, 1.8]} userData={{ initialY: 3.2 }}>
          <mesh castShadow>
            <sphereGeometry args={[0.5, 6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
          </mesh>
          <mesh castShadow position={[0.3, -0.1, 0.1]}>
            <sphereGeometry args={[0.35, 6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
          </mesh>
        </group>
      </group>

      {/* 4. Region-Specific Elements */}
      {region.id === "01" && (
        <>
          {/* --- WEST JAVA: Volcano & Tea Hills --- */}
          {/* Volcano - Tangkoeban Parahoe */}
          <group position={[-0.8, 0.2, -1]}>
            {/* Outer Cone */}
            <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
              <coneGeometry args={[1.8, 2.4, 8, 1, false]} />
              <meshStandardMaterial color="#374151" flatShading roughness={0.9} />
            </mesh>
            {/* Snowy peak or Crater outline */}
            <mesh position={[0, 2.4, 0]}>
              <cylinderGeometry args={[0.35, 0.45, 0.1, 8]} />
              <meshStandardMaterial color="#e5e7eb" flatShading />
            </mesh>
            {/* Glowing Lava inside Crater */}
            <mesh position={[0, 2.43, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.05, 8]} />
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} flatShading />
            </mesh>
            {/* Smoke particle (low poly) */}
            <mesh position={[0.1, 2.8, 0.05]} scale={0.75}>
              <dodecahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#9ca3af" transparent opacity={0.6} flatShading />
            </mesh>
          </group>

          {/* Secondary Volcano */}
          <mesh castShadow receiveShadow position={[1.5, 0.2, -1.8]}>
            <coneGeometry args={[1.1, 1.6, 6]} />
            <meshStandardMaterial color="#4b5563" flatShading roughness={0.9} />
          </mesh>

          {/* Tea Hills (soft green spheres) */}
          <mesh castShadow receiveShadow position={[-2, 0.2, 1.2]} scale={[1.8, 1.0, 1.8]}>
            <sphereGeometry args={[0.8, 6, 6]} />
            <meshStandardMaterial color="#15803d" flatShading roughness={0.9} />
          </mesh>
          <mesh castShadow receiveShadow position={[2, 0.15, 0.8]} scale={[1.4, 0.7, 1.4]}>
            <sphereGeometry args={[0.8, 6, 6]} />
            <meshStandardMaterial color="#166534" flatShading roughness={0.9} />
          </mesh>

          {/* Traditional Sundanese Huts */}
          <group position={[-1.8, 0.2, -0.4]} rotation={[0, Math.PI / 4, 0]}>
            {/* Hut Body */}
            <mesh castShadow position={[0, 0.2, 0]}>
              <boxGeometry args={[0.6, 0.4, 0.5]} />
              <meshStandardMaterial color="#b45309" flatShading roughness={0.8} />
            </mesh>
            {/* Hut Roof */}
            <mesh castShadow position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[0.45, 0.35, 4]} rotation={[0, Math.PI / 4, 0]} />
              <meshStandardMaterial color="#78350f" flatShading roughness={0.9} />
            </mesh>
          </group>
        </>
      )}

      {region.id === "02" && (
        <>
          {/* --- PAPUA: Raja Ampat Rocks & Honai Houses --- */}
          {/* Limestone Rock islets */}
          <group position={[-2, 0.1, -1.8]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.4, 0.7, 1.5, 6]} />
              <meshStandardMaterial color="#2d3748" flatShading />
            </mesh>
            <mesh position={[0, 0.8, 0]} scale={[1.2, 0.6, 1.2]}>
              <sphereGeometry args={[0.5, 5, 5]} />
              <meshStandardMaterial color="#15803d" flatShading />
            </mesh>
          </group>

          <group position={[2.5, 0.1, -1.2]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.8, 1.2, 5]} />
              <meshStandardMaterial color="#2d3748" flatShading />
            </mesh>
            <mesh position={[0, 0.6, 0]} scale={[1.1, 0.5, 1.1]}>
              <sphereGeometry args={[0.5, 5, 5]} />
              <meshStandardMaterial color="#166534" flatShading />
            </mesh>
          </group>

          {/* Snowy Mountain (Carstensz Pyramid) in the background */}
          <group position={[-0.5, 0.2, -2]}>
            <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
              <coneGeometry args={[1.5, 3.0, 6]} />
              <meshStandardMaterial color="#4a5568" flatShading roughness={0.9} />
            </mesh>
            {/* Snowy Peak */}
            <mesh position={[0, 2.5, 0]}>
              <coneGeometry args={[0.5, 1.0, 6]} />
              <meshStandardMaterial color="#ffffff" flatShading roughness={0.2} />
            </mesh>
          </group>

          {/* Clustered traditional Honai Houses (Circular huts) */}
          <group position={[1.5, 0.2, 1.2]}>
            {/* Honai 1 */}
            <group position={[0, 0, 0]}>
              <mesh castShadow position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.5, 10]} />
                <meshStandardMaterial color="#d97706" flatShading roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, 0.65, 0]}>
                <coneGeometry args={[0.6, 0.45, 10]} />
                <meshStandardMaterial color="#78350f" flatShading roughness={0.9} />
              </mesh>
            </group>

            {/* Honai 2 */}
            <group position={[-0.8, 0, -0.5]} scale={0.8}>
              <mesh castShadow position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.5, 10]} />
                <meshStandardMaterial color="#b45309" flatShading roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, 0.65, 0]}>
                <coneGeometry args={[0.6, 0.45, 10]} />
                <meshStandardMaterial color="#451a03" flatShading roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Small Fishing Boat */}
          <mesh castShadow position={[-2.2, -0.05, 1]} rotation={[0, -Math.PI / 6, 0]}>
            <boxGeometry args={[0.8, 0.15, 0.35]} />
            <meshStandardMaterial color="#dc2626" flatShading />
          </mesh>
        </>
      )}

      {region.id === "03" && (
        <>
          {/* --- BORNEO: Tropical Forest & Dayak Longhouse --- */}
          {/* Massive Jungle Trees (Big green foliage piles) */}
          <group position={[-1.8, 0.2, -1.5]}>
            <mesh castShadow position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.15, 0.2, 1.0, 8]} />
              <meshStandardMaterial color="#78350f" flatShading />
            </mesh>
            <mesh castShadow position={[0, 1.2, 0]} scale={[1.3, 1, 1.3]}>
              <sphereGeometry args={[0.7, 6, 6]} />
              <meshStandardMaterial color="#065f46" flatShading roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0.2, 1.7, 0.1]} scale={[0.9, 0.8, 0.9]}>
              <sphereGeometry args={[0.6, 6, 6]} />
              <meshStandardMaterial color="#047857" flatShading roughness={0.9} />
            </mesh>
          </group>

          <group position={[2.2, 0.2, -1.8]}>
            <mesh castShadow position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.12, 0.18, 1.2, 8]} />
              <meshStandardMaterial color="#78350f" flatShading />
            </mesh>
            <mesh castShadow position={[0, 1.4, 0]} scale={[1.2, 1, 1.2]}>
              <sphereGeometry args={[0.65, 6, 6]} />
              <meshStandardMaterial color="#065f46" flatShading roughness={0.9} />
            </mesh>
          </group>

          {/* Traditional Dayak Longhouse (Rumah Betang) on Stilts */}
          <group position={[0.6, 0.2, 1.2]} rotation={[0, -Math.PI / 10, 0]}>
            {/* Stilts */}
            {[
              [-0.8, -0.4], [-0.8, 0.4],
              [-0.3, -0.4], [-0.3, 0.4],
              [0.2, -0.4], [0.2, 0.4],
              [0.8, -0.4], [0.8, 0.4]
            ].map(([x, z], idx) => (
              <mesh key={idx} castShadow position={[x, 0.15, z]}>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
                <meshStandardMaterial color="#451a03" flatShading />
              </mesh>
            ))}
            {/* House Body */}
            <mesh castShadow position={[0, 0.5, 0]}>
              <boxGeometry args={[1.8, 0.35, 0.9]} />
              <meshStandardMaterial color="#d97706" flatShading roughness={0.8} />
            </mesh>
            {/* Curved Roof */}
            <mesh castShadow position={[0, 0.75, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 2.0, 8, 1, false, 0, Math.PI]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#78350f" flatShading roughness={0.9} />
            </mesh>
          </group>

          {/* Orangutan sanctuary tree group (smaller trees) */}
          <group position={[-2.4, 0.2, 0.8]}>
            <mesh castShadow position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.1, 0.12, 0.8, 6]} />
              <meshStandardMaterial color="#78350f" flatShading />
            </mesh>
            <mesh castShadow position={[0, 0.9, 0]}>
              <sphereGeometry args={[0.5, 5, 5]} />
              <meshStandardMaterial color="#047857" flatShading />
            </mesh>
            {/* Little Orangutan shape (Low-poly brown box/sphere) */}
            <mesh castShadow position={[0.2, 0.6, 0.1]} scale={0.15}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#92400e" flatShading roughness={0.9} />
            </mesh>
          </group>
        </>
      )}

      {/* 5. General Low-Poly Vegetation (Common Trees) */}
      <group ref={treeGroupRef}>
        {/* Common Tree 1 */}
        <group position={[2.8, 0.2, 0.2]}>
          <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
            <meshStandardMaterial color="#78350f" flatShading />
          </mesh>
          <mesh castShadow position={[0, 1.0, 0]}>
            <coneGeometry args={[0.5, 0.9, 5]} />
            <meshStandardMaterial color={region.id === "03" ? "#065f46" : "#16a34a"} flatShading roughness={0.8} />
          </mesh>
        </group>

        {/* Common Tree 2 */}
        <group position={[-2.5, 0.2, -0.6]}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#78350f" flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.75, 0]}>
            <coneGeometry args={[0.4, 0.7, 5]} />
            <meshStandardMaterial color={region.id === "02" ? "#0369a1" : "#15803d"} flatShading roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
