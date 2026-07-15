import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Island({ region, isActive }) {
  const islandRef = useRef();
  const flagRef = useRef();
  const cloudGroupRef = useRef();
  const treeGroupRef = useRef();
  
  // Animation refs
  const volcanoSmokeRef = useRef();
  const waterfallSplashesRef = useRef();
  const campfireFireRef = useRef();
  const campfireSparksRef = useRef();

  useFrame((state) => {
    if (!islandRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Smooth Transition (Scale, Position, and Rotation)
    const targetScale = isActive ? 1 : 0;
    const targetRotY = isActive ? Math.sin(time * 0.05) * 0.1 : Math.PI;
    const targetPosY = isActive ? 0 : -3;

    islandRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    islandRef.current.position.y = THREE.MathUtils.lerp(islandRef.current.position.y, targetPosY, 0.06);
    
    if (isActive) {
      islandRef.current.position.y += Math.sin(time * 1.5) * 0.003; // Floating drift
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.04);
    } else {
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.06);
    }

    // 2. Waving Indonesian Flag
    if (flagRef.current && isActive) {
      flagRef.current.rotation.y = Math.sin(time * 8) * 0.15;
      flagRef.current.rotation.z = Math.cos(time * 4) * 0.05;
    }

    // 3. Clouds Drifting & Floating
    if (cloudGroupRef.current && isActive) {
      cloudGroupRef.current.children.forEach((cloud, i) => {
        cloud.position.y = cloud.userData.initialY + Math.sin(time + i * 2) * 0.12;
        cloud.rotation.y += 0.0015 * (i % 2 === 0 ? 1 : -1);
      });
    }

    // 4. Trees Gently Swaying
    if (treeGroupRef.current && isActive) {
      treeGroupRef.current.children.forEach((tree, i) => {
        tree.rotation.z = Math.sin(time * 1.8 + i) * 0.015;
        tree.rotation.x = Math.cos(time * 1.2 + i) * 0.015;
      });
    }

    // 5. Volcano Smoke Particles rising (West Java)
    if (volcanoSmokeRef.current && isActive && region.id === "01") {
      volcanoSmokeRef.current.children.forEach((smoke, idx) => {
        const speed = 0.4 + idx * 0.15;
        const cycleTime = (time * speed) % 1.5;
        smoke.position.y = 2.4 + cycleTime * 1.2;
        
        // Shrink as it rises
        const scaleVal = (1.0 - cycleTime / 1.5) * 0.45;
        smoke.scale.set(scaleVal, scaleVal, scaleVal);
        
        // Sway horizontally
        smoke.position.x = -0.8 + Math.sin(time * 3 + idx) * 0.12;
        smoke.position.z = -1.0 + Math.cos(time * 3 + idx) * 0.12;
      });
    }

    // 6. Waterfall Splash Particles bouncing (West Java)
    if (waterfallSplashesRef.current && isActive && region.id === "01") {
      waterfallSplashesRef.current.children.forEach((splash, idx) => {
        splash.position.y = 0.2 + Math.abs(Math.sin(time * 8 + idx * 1.5)) * 0.25;
        splash.scale.setScalar(0.08 + Math.cos(time * 8 + idx) * 0.03);
      });
    }

    // 7. Campfire flickering & Sparks rising (Borneo)
    if (isActive && region.id === "03") {
      if (campfireFireRef.current) {
        const flicker = 1.0 + Math.sin(time * 25) * 0.15;
        campfireFireRef.current.scale.set(flicker, flicker * 1.2, flicker);
      }
      if (campfireSparksRef.current) {
        campfireSparksRef.current.children.forEach((spark, idx) => {
          const speed = 0.6 + idx * 0.2;
          const cycleTime = (time * speed) % 1.0;
          spark.position.y = 0.35 + cycleTime * 1.2;
          
          // Shrink as it rises
          const scaleVal = (1.0 - cycleTime / 1.0) * 0.12;
          spark.scale.setScalar(scaleVal);
          
          // Spiral outward
          spark.position.x = 0.65 + Math.sin(time * 6 + idx) * 0.08;
          spark.position.z = 0.35 + Math.cos(time * 6 + idx) * 0.08;
        });
      }
    }
  });

  return (
    <group ref={islandRef} position={[0, -3, 0]} scale={[0, 0, 0]}>
      {/* --- CORE ISLAND BASE --- */}
      {/* Grass Top Disk */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4.2, 0.4, 24]} />
        <meshStandardMaterial color={region.theme.islandColor} flatShading roughness={0.8} />
      </mesh>
      {/* Dirt Middle Layer */}
      <mesh castShadow receiveShadow position={[0, -0.35, 0]}>
        <cylinderGeometry args={[4.2, 4.0, 0.3, 24]} />
        <meshStandardMaterial color="#4d3b2c" flatShading roughness={0.9} />
      </mesh>
      {/* Stone Bottom Rim */}
      <mesh castShadow receiveShadow position={[0, -0.7, 0]}>
        <cylinderGeometry args={[4.0, 3.5, 0.4, 24]} />
        <meshStandardMaterial color="#2d3748" flatShading roughness={0.95} />
      </mesh>

      {/* Decorative Stones on Grass */}
      <mesh castShadow position={[2, 0.15, 2]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#6b7280" flatShading />
      </mesh>
      <mesh castShadow position={[-2.5, 0.1, -1]}>
        <dodecahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#4b5563" flatShading />
      </mesh>
      <mesh castShadow position={[0.5, 0.05, -3.2]}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#4b5563" flatShading />
      </mesh>

      {/* --- NATIONAL FLAG (Common) --- */}
      <group position={[0, 0.2, 0]}>
        {/* Pole */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.03, 0.035, 2.4, 8]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Flag */}
        <group ref={flagRef} position={[0, 2.0, 0]}>
          <mesh castShadow position={[0.35, 0.16, 0]}>
            <boxGeometry args={[0.7, 0.2, 0.015]} />
            <meshStandardMaterial color="#e11d48" flatShading roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0.35, -0.04, 0]}>
            <boxGeometry args={[0.7, 0.2, 0.015]} />
            <meshStandardMaterial color="#ffffff" flatShading roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* --- LOW-POLY CLOUDS (Common) --- */}
      <group ref={cloudGroupRef}>
        <group position={[2.6, 3.6, -2]} userData={{ initialY: 3.6 }}>
          <mesh castShadow><sphereGeometry args={[0.5, 6, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.85} flatShading /></mesh>
          <mesh castShadow position={[0.35, -0.1, 0.15]}><sphereGeometry args={[0.38, 6, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.85} flatShading /></mesh>
          <mesh castShadow position={[-0.35, -0.1, -0.1]}><sphereGeometry args={[0.38, 6, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.85} flatShading /></mesh>
        </group>

        <group position={[-2.8, 3.3, 1.8]} userData={{ initialY: 3.3 }}>
          <mesh castShadow><sphereGeometry args={[0.42, 6, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.85} flatShading /></mesh>
          <mesh castShadow position={[0.25, -0.08, 0.1]}><sphereGeometry args={[0.32, 6, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.85} flatShading /></mesh>
        </group>
      </group>

      {/* ==================================================== */}
      {/* 4A. WEST JAVA: Active Volcano, Waterfall, Tea Fields */}
      {/* ==================================================== */}
      {region.id === "01" && (
        <>
          {/* Volcano - Tangkoeban Parahoe */}
          <group position={[-0.8, 0.2, -1]}>
            <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
              <coneGeometry args={[1.6, 2.2, 8, 1]} />
              <meshStandardMaterial color="#374151" flatShading roughness={0.8} />
            </mesh>
            {/* Crater Rim */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.3, 0.4, 0.08, 8]} />
              <meshStandardMaterial color="#4b5563" flatShading />
            </mesh>
            {/* Glowing Lava inside */}
            <mesh position={[0, 2.21, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.02, 8]} />
              <meshStandardMaterial color="#f97316" emissive="#ef4444" emissiveIntensity={3} flatShading />
            </mesh>
          </group>

          {/* Volcano Smoke Particles */}
          <group ref={volcanoSmokeRef}>
            {[...Array(4)].map((_, i) => (
              <mesh key={i} position={[-0.8, 2.5, -1.0]}>
                <dodecahedronGeometry args={[0.22, 0]} />
                <meshStandardMaterial color="#9ca3af" transparent opacity={0.55} flatShading />
              </mesh>
            ))}
          </group>

          {/* Secondary Peak */}
          <mesh castShadow receiveShadow position={[1.4, 0.2, -1.9]}>
            <coneGeometry args={[1.0, 1.5, 6]} />
            <meshStandardMaterial color="#4b5563" flatShading roughness={0.85} />
          </mesh>

          {/* Waterfall & Source Cliff */}
          <group position={[-2.6, 0.2, -1.4]}>
            {/* Rock Wall Cliff */}
            <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
              <boxGeometry args={[0.9, 1.6, 0.8]} />
              <meshStandardMaterial color="#4b5563" flatShading roughness={0.9} />
            </mesh>
            {/* Waving water stream falling */}
            <mesh position={[0, 0.75, 0.42]}>
              <boxGeometry args={[0.4, 1.4, 0.05]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.4} flatShading transparent opacity={0.85} />
            </mesh>
          </group>

          {/* Waterfall Splash Particles */}
          <group ref={waterfallSplashesRef} position={[-2.6, 0.2, -0.9]}>
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[0.2 * (i - 2), 0.2, 0]}>
                <sphereGeometry args={[0.1, 4, 4]} />
                <meshStandardMaterial color="#ffffff" flatShading transparent opacity={0.9} />
              </mesh>
            ))}
          </group>

          {/* Detailed Tea Hills (layered spheres) */}
          <group>
            {/* Hill 1 */}
            <mesh castShadow receiveShadow position={[-2.0, 0.2, 1.2]} scale={[1.8, 0.8, 1.8]}>
              <sphereGeometry args={[0.8, 6, 6]} />
              <meshStandardMaterial color="#166534" flatShading roughness={0.9} />
            </mesh>
            {/* Hill 2 */}
            <mesh castShadow receiveShadow position={[2.2, 0.15, 0.6]} scale={[1.3, 0.65, 1.3]}>
              <sphereGeometry args={[0.8, 6, 6]} />
              <meshStandardMaterial color="#15803d" flatShading roughness={0.9} />
            </mesh>
            {/* Hill 3 (Small Foreground) */}
            <mesh castShadow receiveShadow position={[1.4, 0.1, 1.8]} scale={[0.8, 0.4, 0.8]}>
              <sphereGeometry args={[0.8, 5, 5]} />
              <meshStandardMaterial color="#22c55e" flatShading roughness={0.9} />
            </mesh>
          </group>

          {/* Sundanese Pagoda / Traditional Pagoda Gate */}
          <group position={[-1.7, 0.2, 0.0]} rotation={[0, Math.PI / 4, 0]}>
            <mesh castShadow position={[0, 0.1, 0]}><boxGeometry args={[0.4, 0.2, 0.3]} /><meshStandardMaterial color="#854d0e" flatShading /></mesh>
            <mesh castShadow position={[0, 0.25, 0]}><boxGeometry args={[0.3, 0.15, 0.25]} /><meshStandardMaterial color="#b45309" flatShading /></mesh>
            <mesh castShadow position={[0, 0.4, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.3, 0.25, 4]} /><meshStandardMaterial color="#78350f" flatShading /></mesh>
          </group>
        </>
      )}

      {/* ==================================================== */}
      {/* 4B. PAPUA: Raja Ampat reefs, Carstensz, Dock, Corals */}
      {/* ==================================================== */}
      {region.id === "02" && (
        <>
          {/* Underwater Coral Details (visible through transparent water) */}
          <group position={[0, -0.45, 0]}>
            {/* Coral Reef Group 1 */}
            <mesh position={[2, 0, 1.8]}><dodecahedronGeometry args={[0.25, 0]} /><meshStandardMaterial color="#f43f5e" flatShading /></mesh>
            <mesh position={[2.2, -0.1, 1.6]}><dodecahedronGeometry args={[0.18, 0]} /><meshStandardMaterial color="#fb7185" flatShading /></mesh>
            {/* Coral Reef Group 2 */}
            <mesh position={[-2.8, 0, 0.5]}><dodecahedronGeometry args={[0.22, 0]} /><meshStandardMaterial color="#fb923c" flatShading /></mesh>
            <mesh position={[-2.6, -0.05, 0.7]}><dodecahedronGeometry args={[0.15, 0]} /><meshStandardMaterial color="#f59e0b" flatShading /></mesh>
          </group>

          {/* Limestone Islets (Raja Ampat style) */}
          <group position={[-2, 0.1, -1.8]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.35, 0.65, 1.6, 6]} />
              <meshStandardMaterial color="#374151" flatShading roughness={0.8} />
            </mesh>
            {/* Vegetation on top */}
            <mesh position={[0, 0.85, 0]} scale={[1.2, 0.6, 1.2]}>
              <sphereGeometry args={[0.45, 6, 6]} />
              <meshStandardMaterial color="#166534" flatShading />
            </mesh>
          </group>

          <group position={[2.6, 0.1, -1.1]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.45, 0.75, 1.3, 5]} />
              <meshStandardMaterial color="#2d3748" flatShading roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.65, 0]} scale={[1.15, 0.55, 1.15]}>
              <sphereGeometry args={[0.45, 5, 5]} />
              <meshStandardMaterial color="#15803d" flatShading />
            </mesh>
          </group>

          {/* Carstensz Pyramid (Snowy peak) */}
          <group position={[-0.5, 0.2, -2.0]}>
            <mesh castShadow receiveShadow position={[0, 1.4, 0]}>
              <coneGeometry args={[1.4, 2.8, 6]} />
              <meshStandardMaterial color="#4b5563" flatShading roughness={0.8} />
            </mesh>
            {/* Snow cap */}
            <mesh position={[0, 2.2, 0]}>
              <coneGeometry args={[0.6, 1.2, 6]} />
              <meshStandardMaterial color="#f3f4f6" roughness={0.1} flatShading />
            </mesh>
          </group>

          {/* Tribal Honai Village (Clustered circular huts) */}
          <group position={[1.5, 0.2, 1.2]}>
            {/* Honai Hut 1 */}
            <group position={[0, 0, 0]}>
              <mesh castShadow position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.5, 8]} />
                <meshStandardMaterial color="#d97706" flatShading roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, 0.62, 0]}>
                <coneGeometry args={[0.55, 0.4, 8]} />
                <meshStandardMaterial color="#78350f" flatShading roughness={0.9} />
              </mesh>
            </group>

            {/* Honai Hut 2 */}
            <group position={[-0.7, 0, -0.4]} scale={0.82}>
              <mesh castShadow position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.5, 8]} />
                <meshStandardMaterial color="#b45309" flatShading roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, 0.62, 0]}>
                <coneGeometry args={[0.55, 0.4, 8]} />
                <meshStandardMaterial color="#451a03" flatShading roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Wooden Dock extending into ocean */}
          <group position={[-2.1, 0.05, 1.6]} rotation={[0, -Math.PI / 4, 0]}>
            {/* Deck */}
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.04, 1.1]} />
              <meshStandardMaterial color="#7c2d12" flatShading roughness={0.9} />
            </mesh>
            {/* Stilts */}
            <mesh position={[-0.18, -0.22, 0.45]}><cylinderGeometry args={[0.02, 0.02, 0.4, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
            <mesh position={[0.18, -0.22, 0.45]}><cylinderGeometry args={[0.02, 0.02, 0.4, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
            <mesh position={[-0.18, -0.22, -0.45]}><cylinderGeometry args={[0.02, 0.02, 0.4, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
            <mesh position={[0.18, -0.22, -0.45]}><cylinderGeometry args={[0.02, 0.02, 0.4, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
          </group>

          {/* Small Boat */}
          <mesh castShadow position={[-2.5, -0.05, 2.4]} rotation={[0, -Math.PI / 10, 0]}>
            <boxGeometry args={[0.65, 0.12, 0.28]} />
            <meshStandardMaterial color="#991b1b" flatShading />
          </mesh>
        </>
      )}

      {/* ==================================================== */}
      {/* 4C. BORNEO: River, Campfire, Jungle layers, Longhouse */}
      {/* ==================================================== */}
      {region.id === "03" && (
        <>
          {/* Blue Winding River carving through Borneo */}
          <group position={[-0.8, 0.21, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.6, 3.5]} />
              <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.2} flatShading />
            </mesh>
            {/* Winding bend */}
            <mesh position={[0.4, 0, 1.2]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
              <planeGeometry args={[0.6, 1.5]} />
              <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.2} flatShading />
            </mesh>
          </group>

          {/* Campfire near the Longhouse */}
          <group position={[0.65, 0.2, 0.35]}>
            {/* Logs */}
            <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0.02, 0]}><cylinderGeometry args={[0.02, 0.02, 0.25, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]} position={[0, 0.02, 0]}><cylinderGeometry args={[0.02, 0.02, 0.25, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
            
            {/* Fire flame mesh */}
            <mesh ref={campfireFireRef} position={[0, 0.15, 0]}>
              <coneGeometry args={[0.08, 0.22, 5]} />
              <meshStandardMaterial color="#ea580c" emissive="#ef4444" emissiveIntensity={2.5} flatShading />
            </mesh>

            {/* Fire Sparks rising */}
            <group ref={campfireSparksRef}>
              {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[0, 0.2, 0]}>
                  <boxGeometry args={[0.03, 0.03, 0.03]} />
                  <meshStandardMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={2.0} flatShading />
                </mesh>
              ))}
            </group>
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
                <cylinderGeometry args={[0.025, 0.025, 0.4, 4]} />
                <meshStandardMaterial color="#451a03" flatShading />
              </mesh>
            ))}
            {/* House Body */}
            <mesh castShadow position={[0, 0.5, 0]}>
              <boxGeometry args={[1.8, 0.35, 0.8]} />
              <meshStandardMaterial color="#d97706" flatShading roughness={0.8} />
            </mesh>
            {/* Curved Roof */}
            <mesh castShadow position={[0, 0.74, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 1.95, 8, 1, false, 0, Math.PI]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#78350f" flatShading roughness={0.9} />
            </mesh>
          </group>

          {/* Deep Rainforest (Rich tree layering) */}
          <group>
            {/* Tall Jungle Tree */}
            <group position={[-1.9, 0.2, -1.6]}>
              <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.12, 0.16, 1.2, 8]} /><meshStandardMaterial color="#451a03" /></mesh>
              <mesh castShadow position={[0, 1.4, 0]} scale={[1.4, 0.9, 1.4]}><sphereGeometry args={[0.7, 6, 6]} /><meshStandardMaterial color="#064e3b" flatShading /></mesh>
              <mesh castShadow position={[0.2, 1.8, 0.15]} scale={[1.0, 0.7, 1.0]}><sphereGeometry args={[0.6, 5, 5]} /><meshStandardMaterial color="#047857" flatShading /></mesh>
            </group>

            {/* Middle Jungle Tree */}
            <group position={[2.3, 0.2, -1.8]}>
              <mesh castShadow position={[0, 0.55, 0]}><cylinderGeometry args={[0.1, 0.14, 1.1, 6]} /><meshStandardMaterial color="#451a03" /></mesh>
              <mesh castShadow position={[0, 1.25, 0]} scale={[1.2, 0.8, 1.2]}><sphereGeometry args={[0.6, 6, 6]} /><meshStandardMaterial color="#065f46" flatShading /></mesh>
            </group>

            {/* Orangutan Sanctuary Tree (Small Foreground) */}
            <group position={[-2.4, 0.2, 0.8]}>
              <mesh castShadow position={[0, 0.4, 0]}><cylinderGeometry args={[0.08, 0.12, 0.8, 6]} /><meshStandardMaterial color="#78350f" /></mesh>
              <mesh castShadow position={[0, 0.95, 0]}><sphereGeometry args={[0.48, 5, 5]} /><meshStandardMaterial color="#047857" flatShading /></mesh>
              {/* Orangutan */}
              <mesh castShadow position={[0.22, 0.6, 0.08]} scale={0.14}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#b45309" flatShading roughness={0.9} />
              </mesh>
            </group>
          </group>
        </>
      )}

      {/* ==================================================== */}
      {/* 5. DENSE VEGETATION (Common Pine & Deciduous Trees) */}
      {/* ==================================================== */}
      <group ref={treeGroupRef}>
        {/* Tree 1: Tall layered Pine tree */}
        <group position={[2.8, 0.2, 0.3]}>
          <mesh castShadow position={[0, 0.3, 0]}><cylinderGeometry args={[0.06, 0.09, 0.6, 6]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh castShadow position={[0, 0.75, 0]}><coneGeometry args={[0.45, 0.6, 5]} /><meshStandardMaterial color="#166534" flatShading /></mesh>
          <mesh castShadow position={[0, 1.15, 0]} scale={0.78}><coneGeometry args={[0.45, 0.6, 5]} /><meshStandardMaterial color="#15803d" flatShading /></mesh>
        </group>

        {/* Tree 2: Standard forest tree */}
        <group position={[-2.4, 0.2, -0.4]}>
          <mesh castShadow position={[0, 0.3, 0]}><cylinderGeometry args={[0.06, 0.08, 0.6, 6]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh castShadow position={[0, 0.75, 0]}><coneGeometry args={[0.4, 0.7, 5]} /><meshStandardMaterial color="#15803d" flatShading /></mesh>
        </group>

        {/* Tree 3: Smaller back tree */}
        <group position={[0.8, 0.2, -3.0]} scale={0.75}>
          <mesh castShadow position={[0, 0.3, 0]}><cylinderGeometry args={[0.06, 0.08, 0.6, 6]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh castShadow position={[0, 0.7, 0]}><coneGeometry args={[0.38, 0.7, 5]} /><meshStandardMaterial color="#14532d" flatShading /></mesh>
        </group>
      </group>
    </group>
  );
}
