'use client';

import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import InteractiveImage from './InteractiveImage';

// Staggered gallery layout logic
// We compute positions based on index to keep the editorial feel
const getPosition = (index: number): [number, number, number] => {
  const y = index * -3.5;
  const x = (index % 2 === 0 ? -1.5 : 1.5) + (Math.random() - 0.5) * 0.5;
  const z = (Math.random() - 0.5) * 1.5;
  return [x, y, z];
};

const getScale = (index: number): [number, number] => {
  return index % 3 === 0 ? [3.5, 2.2] : [2.5, 3.5];
};

export default function Gallery({ projects }: { projects: any[] }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!group.current) return;

    const offset = scroll.offset;

    // Smooth camera travel through the 3D space
    // Scale distance based on project count
    group.current.position.y = offset * (projects.length * 3.5);
    group.current.position.z = offset * 3;

    // Subtle horizontal sway for organic feel
    group.current.rotation.y = Math.sin(offset * Math.PI) * 0.02;
  });

  return (
    <group ref={group}>
      {projects.map((project, index) => (
        <InteractiveImage
          key={project.id || index}
          url={project.coverImage}
          position={getPosition(index)}
          scale={getScale(index)}
        />
      ))}
    </group>
  );
}
