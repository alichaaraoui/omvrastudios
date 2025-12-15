"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { Photo } from "@/lib/data";

interface SphereGalleryProps {
  photos: Photo[];
}

function PhotoPlane({ photo, position, index, total }: { photo: Photo; position: [number, number, number]; index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const router = useRouter();
  const { camera } = useThree();
  
  // Load texture with CORS support
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      photo.thumbnailUrl,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture for ${photo.title}:`, error);
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#f0f0f0';
          ctx.fillRect(0, 0, 256, 256);
          ctx.fillStyle = '#000';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Image', 128, 120);
          ctx.fillText('Loading...', 128, 140);
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setTexture(fallbackTexture);
      }
    );
  }, [photo.thumbnailUrl, photo.title]);

  // Make the plane always face the camera
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  const handleClick = () => {
    router.push(`/photo/${photo.id}`);
  };

  if (!texture) {
    return null;
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      scale={hovered ? 1.3 : 1.0}
    >
      <planeGeometry args={[2.5, 2.5]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        emissive={hovered ? new THREE.Color(0x222222) : new THREE.Color(0x000000)}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

function SphereScene({ photos }: { photos: Photo[] }) {
  const radius = 25;
  
  // Improved sphere distribution using Fibonacci spiral for even coverage
  const positions: [number, number, number][] = photos.map((_, index) => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    const theta = goldenAngle * index;
    const y = 1 - (2 * index) / Math.max(photos.length - 1, 1); // Distribute from -1 to 1
    const radiusAtY = Math.sqrt(1 - y * y); // Radius at this y level
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    return [x * radius, y * radius, z * radius];
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[20, 20, 10]} intensity={2.0} />
      <directionalLight position={[-20, -20, -10]} intensity={1.0} />
      <directionalLight position={[0, 20, 0]} intensity={1.5} />
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={20}
        maxDistance={60}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
      {photos.map((photo, index) => (
        <PhotoPlane
          key={photo.id}
          photo={photo}
          position={positions[index]}
          index={index}
          total={photos.length}
        />
      ))}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white h-screen">
      <p className="text-black">Loading gallery...</p>
    </div>
  );
}

export default function SphereGallery({ photos }: SphereGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-black">No photos available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 40], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: false,
            preserveDrawingBuffer: true
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#ffffff']} />
          <SphereScene photos={photos} />
        </Canvas>
      </Suspense>
    </div>
  );
}

