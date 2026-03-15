'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Preload, Scroll } from '@react-three/drei';
import { Suspense } from 'react';
import Gallery from './Gallery';

export default function Scene({ projects }: { projects: any[] }) {
  const pages = Math.max(4, projects.length * 1.5);
  
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient warm light to give images a gallery feel */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#f5e6d3" />
        
        <Suspense fallback={null}>
          <ScrollControls pages={pages} damping={0.15} distance={1.2}>
            <Scroll>
              <Gallery projects={projects} />
            </Scroll>
          </ScrollControls>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
