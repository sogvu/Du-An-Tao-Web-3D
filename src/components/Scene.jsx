import React from 'react';
import { Sky, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import Lights from './Lights';
import Water from './Water';
import Island from './Island';
import CameraController from './CameraController';
import PostProcessing from './PostProcessing';
import * as THREE from 'three';

export default function Scene({ activeRegion, regions, activeLandmarkIndex }) {
  // Determine sky sun parameters from region theme
  const skyParams = {
    "01": { sunPos: [0.15, 0.06, -1], turbidity: 6, rayleigh: 2.0 },   // West Java — hazy tropical noon
    "02": { sunPos: [0.22, 0.08, -1], turbidity: 3, rayleigh: 1.5 },   // Papua — crisp bright sky
    "03": { sunPos: [0.08, 0.04, -1], turbidity: 10, rayleigh: 3.0 },  // Borneo — golden hazy sunset
  };
  const sky = skyParams[activeRegion.id] ?? skyParams["01"];

  return (
    <>
      {/* =========================================================
          SKY — procedural Rayleigh / Mie scattering atmosphere
      ========================================================= */}
      <Sky
        sunPosition={sky.sunPos}
        turbidity={sky.turbidity}
        rayleigh={sky.rayleigh}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        distance={450}
      />

      {/* =========================================================
          ENVIRONMENT — IBL (Image-Based Lighting) from preset
          Gives all meshPhysicalMaterial their realistic reflections
      ========================================================= */}
      <Environment preset="sunset" background={false} />

      {/* =========================================================
          FOG — distance haze that matches sky colour
      ========================================================= */}
      <fog attach="fog" args={[activeRegion.color, 10, 28]} />

      {/* Lights rig */}
      <Lights />

      {/* Soft contact shadow cast by the island onto the water */}
      <ContactShadows
        position={[0, -0.17, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
        color="#1e293b"
      />

      {/* Animated water surface with physical material */}
      <Water color={activeRegion.theme.waterColor} />

      {/* Atmospheric sparkle particles matching region accent */}
      <Sparkles
        count={100}
        scale={[11, 7, 11]}
        size={3}
        speed={0.35}
        opacity={0.55}
        color={activeRegion.theme.accent}
        position={[0, 2.5, 0]}
      />

      {/* Islands — only the active one scales in */}
      {regions.map((region) => (
        <Island
          key={region.id}
          region={region}
          isActive={region.id === activeRegion.id}
        />
      ))}

      {/* Camera flight controller */}
      <CameraController
        activeRegion={activeRegion}
        activeLandmarkIndex={activeLandmarkIndex}
      />

      {/* Post-processing effects stack */}
      <PostProcessing activeLandmarkIndex={activeLandmarkIndex} />
    </>
  );
}
