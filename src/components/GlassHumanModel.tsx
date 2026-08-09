import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("GlassHumanModel 3D asset failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Load the GLB model and apply a glass‑like material to all meshes
const HumanGLB = memo(() => {
  const { scene } = useGLTF('/models/human.glb') as any;

  // Apply glass material to each mesh in the scene
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        transmission: 0.9, // transparency
        thickness: 0.5,
        roughness: 0.1,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
        envMapIntensity: 1,
        color: new THREE.Color('#ffffff'),
        opacity: 1,
        transparent: true,
        side: THREE.DoubleSide,
      });
    }
  });

  return <primitive object={scene} />;
});

export const GlassHumanModel: React.FC = () => {
  return (
    <div className="w-full h-full max-w-[400px] rounded-lg overflow-hidden">
      <ErrorBoundary>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 1.2, 2.5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          frameloop="demand"
          dpr={window.devicePixelRatio ?? 1}
        >
          {/* Soft interior cyan glow */}
          <pointLight position={[0, 1.5, 1]} color="#5FD7FF" intensity={1.5} />
          {/* Ambient illumination */}
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <HumanGLB />
          </Suspense>
          {/* Subtle environment for reflections */}
          <Environment preset="city" background={false} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
