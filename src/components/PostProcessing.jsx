import React from 'react';
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  Vignette,
  ChromaticAberration,
  DepthOfField,
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';

export default function PostProcessing({ activeLandmarkIndex }) {
  const isZoomed = activeLandmarkIndex !== null;

  return (
    <EffectComposer disableNormalPass>
      {/* ACES Filmic tone mapping — the gold standard for cinematic colour grading */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />

      {/* Bloom — makes emissive materials glow (lava, campfire, lanterns) */}
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.85}
        mipmapBlur
      />

      {/* Depth of Field — adds shallow-focus cinema feel when zooming into landmarks */}
      <DepthOfField
        focusDistance={isZoomed ? 0.005 : 0.0}
        focalLength={isZoomed ? 0.04 : 0.1}
        bokehScale={isZoomed ? 4 : 1.5}
        height={480}
      />

      {/* Subtle chromatic aberration on edges for a cinematic lens feel */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0006, 0.0006)}
        radialModulation={false}
        modulationOffset={0.3}
      />

      {/* Dark vignette around the frame edges for depth and focus */}
      <Vignette
        offset={0.3}
        darkness={0.55}
        eskil={false}
      />
    </EffectComposer>
  );
}
