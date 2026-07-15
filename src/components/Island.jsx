import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// PBR-grade Island component using meshPhysicalMaterial for realistic surfaces
export default function Island({ region, isActive }) {
  const islandRef = useRef();
  const flagRef = useRef();
  const cloudGroupRef = useRef();
  const treeGroupRef = useRef();
  const volcanoSmokeRef = useRef();
  const waterfallSplashesRef = useRef();
  const campfireFireRef = useRef();
  const campfireSparksRef = useRef();

  useFrame((state) => {
    if (!islandRef.current) return;
    const time = state.clock.getElapsedTime();

    const targetScale = isActive ? 1 : 0;
    const targetRotY = isActive ? Math.sin(time * 0.04) * 0.08 : Math.PI;
    const targetPosY = isActive ? 0 : -3;

    islandRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.055);
    islandRef.current.position.y = THREE.MathUtils.lerp(islandRef.current.position.y, targetPosY, 0.055);

    if (isActive) {
      islandRef.current.position.y += Math.sin(time * 1.2) * 0.004;
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.035);
    } else {
      islandRef.current.rotation.y = THREE.MathUtils.lerp(islandRef.current.rotation.y, targetRotY, 0.06);
    }

    if (flagRef.current && isActive) {
      flagRef.current.rotation.y = Math.sin(time * 7) * 0.18;
      flagRef.current.rotation.z = Math.cos(time * 3.5) * 0.06;
    }

    if (cloudGroupRef.current && isActive) {
      cloudGroupRef.current.children.forEach((cloud, i) => {
        cloud.position.y = cloud.userData.initialY + Math.sin(time * 0.9 + i * 2) * 0.14;
        cloud.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1);
      });
    }

    if (treeGroupRef.current && isActive) {
      treeGroupRef.current.children.forEach((tree, i) => {
        tree.rotation.z = Math.sin(time * 1.6 + i) * 0.018;
        tree.rotation.x = Math.cos(time * 1.1 + i) * 0.012;
      });
    }

    if (volcanoSmokeRef.current && isActive && region.id === "01") {
      volcanoSmokeRef.current.children.forEach((smoke, idx) => {
        const speed = 0.35 + idx * 0.12;
        const cycleTime = (time * speed) % 1.8;
        smoke.position.y = 2.4 + cycleTime * 1.4;
        const s = (1.0 - cycleTime / 1.8) * 0.55;
        smoke.scale.set(s, s, s);
        smoke.position.x = -0.8 + Math.sin(time * 2.5 + idx) * 0.14;
        smoke.position.z = -1.0 + Math.cos(time * 2.5 + idx) * 0.14;
        if (smoke.material) smoke.material.opacity = s * 0.9;
      });
    }

    if (waterfallSplashesRef.current && isActive && region.id === "01") {
      waterfallSplashesRef.current.children.forEach((splash, idx) => {
        splash.position.y = 0.18 + Math.abs(Math.sin(time * 9 + idx * 1.4)) * 0.28;
        splash.scale.setScalar(0.07 + Math.cos(time * 9 + idx) * 0.03);
      });
    }

    if (isActive && region.id === "03") {
      if (campfireFireRef.current) {
        const flicker = 1.0 + Math.sin(time * 28) * 0.18 + Math.sin(time * 17) * 0.08;
        campfireFireRef.current.scale.set(flicker, flicker * 1.25, flicker);
      }
      if (campfireSparksRef.current) {
        campfireSparksRef.current.children.forEach((spark, idx) => {
          const speed = 0.7 + idx * 0.18;
          const ct = (time * speed + idx * 0.25) % 1.0;
          spark.position.y = 0.3 + ct * 1.4;
          const sv = Math.max(0, (1.0 - ct) * 0.14);
          spark.scale.setScalar(sv);
          spark.position.x = 0.65 + Math.sin(time * 5 + idx * 1.5) * 0.1;
          spark.position.z = 0.35 + Math.cos(time * 5 + idx * 1.5) * 0.1;
        });
      }
    }
  });

  // PBR rock / stone material helper
  const rockMat = (col = '#4b5563', rough = 0.9) => (
    <meshStandardMaterial color={col} roughness={rough} metalness={0.02} />
  );

  // PBR foliage material
  const foliageMat = (col = '#166534') => (
    <meshStandardMaterial color={col} roughness={0.85} metalness={0.0} />
  );

  // PBR wood material
  const woodMat = (col = '#78350f') => (
    <meshStandardMaterial color={col} roughness={0.92} metalness={0.0} />
  );

  // Cloud sphere — soft bright SSS-like material
  const cloudMat = () => (
    <meshStandardMaterial
      color="#f0f8ff"
      roughness={1.0}
      metalness={0.0}
      transparent
      opacity={0.88}
    />
  );

  return (
    <group ref={islandRef} position={[0, -3, 0]} scale={[0, 0, 0]}>
      {/* ======================================================
          BASE — PBR layered cylinder disc
      ====================================================== */}
      {/* Grass Top */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4.15, 0.42, 32]} />
        <meshStandardMaterial
          color={region.theme.islandColor}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>
      {/* Soil ring */}
      <mesh castShadow receiveShadow position={[0, -0.38, 0]}>
        <cylinderGeometry args={[4.15, 4.0, 0.32, 32]} />
        <meshStandardMaterial color="#5c4527" roughness={0.95} metalness={0.0} />
      </mesh>
      {/* Rock bottom cliff */}
      <mesh castShadow receiveShadow position={[0, -0.7, 0]}>
        <cylinderGeometry args={[4.0, 3.4, 0.45, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Tiny boulders */}
      {[
        { p: [2.2, 0.15, 2.0], r: 0.28 },
        { p: [-2.6, 0.12, -0.9], r: 0.4 },
        { p: [0.6, 0.08, -3.3], r: 0.3 },
        { p: [3.2, 0.1, -1.4], r: 0.22 },
      ].map(({ p, r }, i) => (
        <mesh key={i} castShadow position={p}>
          <dodecahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color="#475569" roughness={0.88} metalness={0.06} />
        </mesh>
      ))}

      {/* ======================================================
          FLAG  — metallic pole + cloth-like flag faces
      ====================================================== */}
      <group position={[0, 0.2, 0]}>
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.028, 0.032, 2.4, 10]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.08} />
        </mesh>
        <group ref={flagRef} position={[0, 2.0, 0]}>
          <mesh castShadow position={[0.33, 0.15, 0]}>
            <boxGeometry args={[0.66, 0.19, 0.012]} />
            <meshStandardMaterial color="#dc2626" roughness={0.7} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>
          <mesh castShadow position={[0.33, -0.04, 0]}>
            <boxGeometry args={[0.66, 0.19, 0.012]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.7} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* ======================================================
          CLOUDS — fluffy multi-sphere clusters
      ====================================================== */}
      <group ref={cloudGroupRef}>
        {[
          { pos: [2.7, 3.7, -2.1], initialY: 3.7, spheres: [[0, 0, 0, 0.52], [0.36, -0.1, 0.16, 0.38], [-0.36, -0.1, -0.1, 0.38], [0, 0.22, 0, 0.3]] },
          { pos: [-2.9, 3.4, 1.9], initialY: 3.4, spheres: [[0, 0, 0, 0.44], [0.28, -0.08, 0.1, 0.32]] },
          { pos: [0.5, 4.1, 3.2], initialY: 4.1, spheres: [[0, 0, 0, 0.36], [-0.25, -0.08, 0, 0.28], [0.25, -0.08, 0, 0.28]] },
        ].map((cloud, ci) => (
          <group key={ci} position={cloud.pos} userData={{ initialY: cloud.initialY }}>
            {cloud.spheres.map(([x, y, z, r], si) => (
              <mesh key={si} castShadow position={[x, y, z]}>
                <sphereGeometry args={[r, 9, 9]} />
                {cloudMat()}
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ======================================================
          WEST JAVA — Volcano, Waterfall, Tea hills, Huts
      ====================================================== */}
      {region.id === "01" && (
        <>
          {/* Main volcano body */}
          <group position={[-0.8, 0.2, -1.0]}>
            {/* Lower flanks */}
            <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
              <coneGeometry args={[2.0, 1.2, 10]} />
              <meshStandardMaterial color="#334155" roughness={0.88} metalness={0.04} />
            </mesh>
            {/* Upper cone */}
            <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
              <coneGeometry args={[1.2, 1.4, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.9} metalness={0.05} />
            </mesh>
            {/* Crater rim */}
            <mesh position={[0, 2.35, 0]}>
              <cylinderGeometry args={[0.28, 0.36, 0.08, 8]} />
              <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.05} />
            </mesh>
            {/* Lava glow — high emissive for Bloom */}
            <mesh position={[0, 2.36, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.018, 8]} />
              <meshStandardMaterial
                color="#ff4400"
                emissive="#ff3300"
                emissiveIntensity={5.0}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            {/* Glowing lava point light */}
            <pointLight position={[0, 2.5, 0]} intensity={2.5} color="#ff5500" distance={3} decay={2} />
          </group>

          {/* Animated volcano smoke particles */}
          <group ref={volcanoSmokeRef}>
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[-0.8, 2.5, -1.0]}>
                <sphereGeometry args={[0.22, 6, 6]} />
                <meshStandardMaterial
                  color="#94a3b8"
                  transparent
                  opacity={0.5}
                  roughness={1}
                />
              </mesh>
            ))}
          </group>

          {/* Secondary dormant peak */}
          <mesh castShadow receiveShadow position={[1.5, 0.2, -2.0]}>
            <coneGeometry args={[1.1, 1.7, 7]} />
            <meshStandardMaterial color="#374151" roughness={0.85} metalness={0.04} />
          </mesh>

          {/* Waterfall cliff */}
          <group position={[-2.7, 0.2, -1.5]}>
            <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
              <boxGeometry args={[0.95, 1.7, 0.85]} />
              <meshStandardMaterial color="#334155" roughness={0.9} metalness={0.04} />
            </mesh>
            {/* Water stream — emissive for subtle glow */}
            <mesh position={[0, 0.8, 0.44]}>
              <boxGeometry args={[0.36, 1.5, 0.045]} />
              <meshPhysicalMaterial
                color="#7dd3fc"
                emissive="#38bdf8"
                emissiveIntensity={0.5}
                roughness={0.05}
                metalness={0.1}
                transmission={0.7}
                transparent
                opacity={0.88}
              />
            </mesh>
          </group>

          {/* Waterfall splash particles */}
          <group ref={waterfallSplashesRef} position={[-2.7, 0.22, -0.95]}>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[0.22 * (i - 2.5), 0.18, 0]}>
                <sphereGeometry args={[0.09, 5, 5]} />
                <meshStandardMaterial color="#e0f2fe" roughness={0.3} transparent opacity={0.9} />
              </mesh>
            ))}
          </group>

          {/* Layered tea hills */}
          {[
            { p: [-2.0, 0.2, 1.2], s: [1.9, 0.8, 1.9], c: '#166534' },
            { p: [2.2, 0.15, 0.7], s: [1.4, 0.65, 1.4], c: '#15803d' },
            { p: [1.5, 0.1, 1.9], s: [0.85, 0.4, 0.85], c: '#22c55e' },
          ].map((h, i) => (
            <mesh key={i} castShadow receiveShadow position={h.p} scale={h.s}>
              <sphereGeometry args={[0.8, 8, 8]} />
              <meshStandardMaterial color={h.c} roughness={0.88} metalness={0.0} />
            </mesh>
          ))}

          {/* Sundanese traditional hut */}
          <group position={[-1.7, 0.2, 0.0]} rotation={[0, Math.PI / 4, 0]}>
            <mesh castShadow position={[0, 0.15, 0]}>
              <boxGeometry args={[0.55, 0.3, 0.42]} />
              <meshStandardMaterial color="#92400e" roughness={0.88} />
            </mesh>
            <mesh castShadow position={[0, 0.38, 0]}>
              <coneGeometry args={[0.4, 0.3, 4]} />
              <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
          </group>
        </>
      )}

      {/* ======================================================
          PAPUA — Raja Ampat, Carstensz, Honai, Dock, Corals
      ====================================================== */}
      {region.id === "02" && (
        <>
          {/* Underwater corals — show through transparent water */}
          <group position={[0, -0.48, 0]}>
            {[
              { p: [2.1, 0, 1.9], r: 0.27, c: '#f43f5e' },
              { p: [2.35, -0.1, 1.65], r: 0.2, c: '#fb7185' },
              { p: [-2.9, 0, 0.55], r: 0.24, c: '#fb923c' },
              { p: [-2.65, -0.06, 0.75], r: 0.16, c: '#f59e0b' },
              { p: [3.0, -0.05, -0.8], r: 0.2, c: '#a78bfa' },
            ].map(({ p, r, c }, i) => (
              <mesh key={i} castShadow position={p}>
                <dodecahedronGeometry args={[r, 0]} />
                <meshStandardMaterial color={c} roughness={0.5} metalness={0.1} emissive={c} emissiveIntensity={0.25} />
              </mesh>
            ))}
          </group>

          {/* Karst limestone islets */}
          {[
            { p: [-2.1, 0.1, -1.9], ra: [0.38, 0.68, 1.65, 6], vp: [0, 0.88, 0], vs: [1.25, 0.62, 1.25], vc: '#166534' },
            { p: [2.7, 0.1, -1.15], ra: [0.46, 0.78, 1.35, 5], vp: [0, 0.68, 0], vs: [1.15, 0.55, 1.15], vc: '#15803d' },
            { p: [-1.2, 0.05, 2.8], ra: [0.28, 0.5, 1.0, 5], vp: [0, 0.52, 0], vs: [0.9, 0.42, 0.9], vc: '#16a34a' },
          ].map(({ p, ra, vp, vs, vc }, i) => (
            <group key={i} position={p}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={ra} />
                <meshStandardMaterial color="#334155" roughness={0.85} metalness={0.04} />
              </mesh>
              <mesh position={vp} scale={vs}>
                <sphereGeometry args={[0.46, 7, 7]} />
                <meshStandardMaterial color={vc} roughness={0.87} metalness={0.0} />
              </mesh>
            </group>
          ))}

          {/* Carstensz Pyramid — main snow peak */}
          <group position={[-0.5, 0.2, -2.1]}>
            <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
              <coneGeometry args={[1.5, 3.0, 7]} />
              <meshStandardMaterial color="#475569" roughness={0.82} metalness={0.06} />
            </mesh>
            {/* Snow cap — subtle roughness variation */}
            <mesh position={[0, 2.35, 0]}>
              <coneGeometry args={[0.65, 1.3, 7]} />
              <meshStandardMaterial
                color="#f1f5f9"
                roughness={0.12}
                metalness={0.0}
                envMapIntensity={1.2}
              />
            </mesh>
          </group>

          {/* Honai village cluster */}
          <group position={[1.5, 0.2, 1.2]}>
            {[
              { pos: [0, 0, 0], sc: 1.0, bc: '#d97706', rc: '#78350f' },
              { pos: [-0.7, 0, -0.4], sc: 0.82, bc: '#b45309', rc: '#451a03' },
            ].map(({ pos, sc, bc, rc }, i) => (
              <group key={i} position={pos} scale={sc}>
                <mesh castShadow position={[0, 0.25, 0]}>
                  <cylinderGeometry args={[0.44, 0.44, 0.5, 10]} />
                  <meshStandardMaterial color={bc} roughness={0.82} metalness={0.0} />
                </mesh>
                <mesh castShadow position={[0, 0.64, 0]}>
                  <coneGeometry args={[0.58, 0.42, 10]} />
                  <meshStandardMaterial color={rc} roughness={0.88} metalness={0.0} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Wooden dock */}
          <group position={[-2.2, 0.04, 1.7]} rotation={[0, -Math.PI / 4, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.04, 1.2]} />
              <meshStandardMaterial color="#7c2d12" roughness={0.92} metalness={0.0} />
            </mesh>
            {[[-0.18, 0.45], [0.18, 0.45], [-0.18, -0.45], [0.18, -0.45]].map(([x, z], i) => (
              <mesh key={i} position={[x, -0.22, z]}>
                <cylinderGeometry args={[0.022, 0.022, 0.44, 5]} />
                <meshStandardMaterial color="#451a03" roughness={0.92} metalness={0.0} />
              </mesh>
            ))}
          </group>

          {/* Fishing boat */}
          <mesh castShadow position={[-2.6, -0.06, 2.5]} rotation={[0, -0.3, 0]}>
            <boxGeometry args={[0.68, 0.13, 0.3]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.8} metalness={0.08} />
          </mesh>
        </>
      )}

      {/* ======================================================
          BORNEO — River, Longhouse, Jungle layers, Campfire
      ====================================================== */}
      {region.id === "03" && (
        <>
          {/* Winding river */}
          <group position={[-0.8, 0.205, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.7, 3.8]} />
              <meshPhysicalMaterial
                color="#3b82f6"
                roughness={0.05}
                metalness={0.15}
                transmission={0.4}
                transparent
                opacity={0.78}
                emissive="#1d4ed8"
                emissiveIntensity={0.15}
              />
            </mesh>
            <mesh position={[0.45, 0, 1.3]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
              <planeGeometry args={[0.7, 1.6]} />
              <meshPhysicalMaterial
                color="#3b82f6"
                roughness={0.05}
                metalness={0.15}
                transmission={0.4}
                transparent
                opacity={0.78}
                emissive="#1d4ed8"
                emissiveIntensity={0.15}
              />
            </mesh>
          </group>

          {/* Campfire */}
          <group position={[0.65, 0.2, 0.35]}>
            {/* Log cross */}
            <mesh rotation={[0, 0.4, Math.PI / 2.5]} position={[0, 0.025, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.28, 5]} />
              <meshStandardMaterial color="#3f1a03" roughness={0.95} />
            </mesh>
            <mesh rotation={[0, -0.4, -Math.PI / 2.5]} position={[0, 0.025, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.28, 5]} />
              <meshStandardMaterial color="#3f1a03" roughness={0.95} />
            </mesh>
            {/* Flame — emissive for bloom */}
            <mesh ref={campfireFireRef} position={[0, 0.16, 0]}>
              <coneGeometry args={[0.07, 0.22, 5]} />
              <meshStandardMaterial
                color="#ff6a00"
                emissive="#ff3300"
                emissiveIntensity={6.0}
                roughness={0.2}
                metalness={0.0}
              />
            </mesh>
            {/* Fire point light for realistic glow cast */}
            <pointLight position={[0, 0.35, 0]} intensity={3.5} color="#ff5500" distance={3.5} decay={2} />
            {/* Sparks */}
            <group ref={campfireSparksRef}>
              {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[0.65, 0.2, 0.35]}>
                  <boxGeometry args={[0.035, 0.035, 0.035]} />
                  <meshStandardMaterial
                    color="#fbbf24"
                    emissive="#f97316"
                    emissiveIntensity={4.0}
                  />
                </mesh>
              ))}
            </group>
          </group>

          {/* Dayak longhouse on stilts */}
          <group position={[0.6, 0.2, 1.2]} rotation={[0, -Math.PI / 10, 0]}>
            {[
              [-0.8, -0.4], [-0.8, 0.4],
              [-0.3, -0.4], [-0.3, 0.4],
              [0.2, -0.4], [0.2, 0.4],
              [0.8, -0.4], [0.8, 0.4],
            ].map(([x, z], idx) => (
              <mesh key={idx} castShadow position={[x, 0.15, z]}>
                <cylinderGeometry args={[0.026, 0.026, 0.42, 5]} />
                <meshStandardMaterial color="#451a03" roughness={0.95} />
              </mesh>
            ))}
            <mesh castShadow position={[0, 0.5, 0]}>
              <boxGeometry args={[1.82, 0.36, 0.82]} />
              <meshStandardMaterial color="#d97706" roughness={0.82} metalness={0.0} />
            </mesh>
            <mesh castShadow position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.52, 0.52, 1.97, 10, 1, false, 0, Math.PI]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#78350f" roughness={0.88} metalness={0.0} />
            </mesh>
          </group>

          {/* Jungle canopy trees */}
          {[
            { p: [-1.9, 0.2, -1.6], th: 1.2, tr: 0.13, c1: '#064e3b', c2: '#047857' },
            { p: [2.3, 0.2, -1.8], th: 1.1, tr: 0.11, c1: '#065f46', c2: '#059669' },
            { p: [-2.4, 0.2, 0.8], th: 0.8, tr: 0.09, c1: '#047857', c2: '#10b981' },
          ].map(({ p, th, tr, c1, c2 }, i) => (
            <group key={i} position={p}>
              <mesh castShadow position={[0, th * 0.5, 0]}>
                <cylinderGeometry args={[tr, tr * 1.35, th, 7]} />
                <meshStandardMaterial color="#451a03" roughness={0.94} />
              </mesh>
              <mesh castShadow position={[0, th * 1.1, 0]} scale={[1.3, 0.9, 1.3]}>
                <sphereGeometry args={[0.65, 8, 8]} />
                <meshStandardMaterial color={c1} roughness={0.88} metalness={0.0} />
              </mesh>
              <mesh castShadow position={[0.18, th * 1.5, 0.14]} scale={[0.95, 0.7, 0.95]}>
                <sphereGeometry args={[0.55, 7, 7]} />
                <meshStandardMaterial color={c2} roughness={0.88} metalness={0.0} />
              </mesh>
            </group>
          ))}
        </>
      )}

      {/* ======================================================
          COMMON VEGETATION
      ====================================================== */}
      <group ref={treeGroupRef}>
        {[
          { p: [2.9, 0.2, 0.3], trunk: [0.065, 0.09, 0.65], cones: [[0, 0.78, 0, 0.46, 0.62], [0, 1.18, 0, 0.36, 0.55]] },
          { p: [-2.45, 0.2, -0.5], trunk: [0.06, 0.08, 0.6], cones: [[0, 0.72, 0, 0.42, 0.7]] },
          { p: [0.9, 0.2, -3.1], trunk: [0.055, 0.075, 0.5], cones: [[0, 0.65, 0, 0.36, 0.65]] },
        ].map(({ p, trunk, cones }, i) => (
          <group key={i} position={p}>
            <mesh castShadow position={[0, trunk[4] ? trunk[4] * 0.4 : 0.3, 0]}>
              <cylinderGeometry args={[trunk[0], trunk[1], trunk[2], 6]} />
              <meshStandardMaterial color="#78350f" roughness={0.92} />
            </mesh>
            {cones.map(([x, y, z, r, h], ci) => (
              <mesh key={ci} castShadow position={[x, y, z]}>
                <coneGeometry args={[r, h, 6]} />
                <meshStandardMaterial
                  color={region.id === "03" ? "#065f46" : "#166534"}
                  roughness={0.88}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}
