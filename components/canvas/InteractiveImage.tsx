'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveImageProps {
  url: string;
  position: [number, number, number];
  scale: [number, number];
}

// Fallback mesh shown when image fails to load
function ImagePlaceholder({ position, scale }: { position: [number, number, number]; scale: [number, number] }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial color="#1a1a1a" transparent opacity={0.3} />
    </mesh>
  );
}

function ImageMesh({ url, position, scale }: InteractiveImageProps) {
  const imageRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!imageRef.current || !imageRef.current.material) return;

    const mat = imageRef.current.material;

    // Smooth zoom: subtle breathing + hover zoom
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
    const targetZoom = hovered ? 1.08 : 1.0 + breathe;
    mat.zoom = THREE.MathUtils.lerp(mat.zoom, targetZoom, 0.06);

    // Grayscale transition: desaturated by default, full color on hover
    const targetGrayscale = hovered ? 0 : 0.6;
    mat.grayscale = THREE.MathUtils.lerp(mat.grayscale, targetGrayscale, 0.06);

    // Slight Y float for organic feel
    if (imageRef.current) {
      imageRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.03;
    }
  });

  return (
    <group>
      <DreiImage
        ref={imageRef}
        url={url}
        position={position}
        scale={scale}
        transparent
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
      />
    </group>
  );
}

export default function InteractiveImage({ url, position, scale }: InteractiveImageProps) {
  // If no URL provided, show placeholder
  if (!url) return <ImagePlaceholder position={position} scale={scale} />;

  return (
    <Suspense fallback={<ImagePlaceholder position={position} scale={scale} />}>
      <ImageMesh url={url} position={position} scale={scale} />
    </Suspense>
  );
}

