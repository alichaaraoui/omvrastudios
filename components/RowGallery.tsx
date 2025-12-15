"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { Photo } from "@/lib/data";

interface RowGalleryProps {
  photos: Photo[];
}

function IsometricPhotoPlane({ photo, basePosition, scrollOffset, index }: { photo: Photo; basePosition: [number, number, number]; scrollOffset: number; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const router = useRouter();
  const { camera } = useThree();
  const targetY = useRef(0);
  
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

  // Update target Y position on hover
  useEffect(() => {
    targetY.current = hovered ? 3 : 0;
  }, [hovered]);

  // Animate Y position and keep images vertical (upright)
  useFrame(() => {
    if (meshRef.current) {
      // Smoothly animate Y position upward on hover
      const currentY = meshRef.current.position.y;
      const newY = currentY + (targetY.current - currentY) * 0.15;
      meshRef.current.position.y = newY;
      
      // Update X position based on scroll offset
      meshRef.current.position.x = basePosition[0] + scrollOffset;
      
      // Keep images vertical (upright) but rotated 90 degrees
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = Math.PI / 2; // 90 degrees
      meshRef.current.rotation.z = 0;
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
      position={[basePosition[0] + scrollOffset, basePosition[1], basePosition[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      scale={hovered ? 1.2 : 1.0}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        emissive={hovered ? new THREE.Color(0x222222) : new THREE.Color(0x000000)}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

function CameraLock({ scrollOffset }: { scrollOffset: number }) {
  const { camera } = useThree();
  const fixedDistance = 35;
  
  useFrame(() => {
    // Calculate 65-degree isometric position with fixed distance
    const azimuthAngle = Math.PI / 4; // 45 degrees azimuth for isometric
    const elevationAngle = (65 * Math.PI) / 180; // 65 degrees elevation
    
    // Lock camera to isometric position with fixed distance, but allow horizontal panning
    const baseX = fixedDistance * Math.sin(elevationAngle) * Math.cos(azimuthAngle);
    camera.position.x = baseX + scrollOffset * 0.3;
    camera.position.y = fixedDistance * Math.cos(elevationAngle);
    camera.position.z = fixedDistance * Math.sin(elevationAngle) * Math.sin(azimuthAngle);
    
    // Always look at center (adjusted for scroll)
    camera.lookAt(scrollOffset * 0.3, 0, 0);
  });
  
  return null;
}

function IsometricRowScene({ photos }: { photos: Photo[] }) {
  const spacing = 4.5;
  const startX = -(photos.length * spacing) / 2;
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Arrange photos in a straight row along X-axis
  const basePositions: [number, number, number][] = photos.map((_, index) => {
    const x = startX + index * spacing;
    const y = 0;
    const z = 0;
    return [x, y, z];
  });

  // Handle wheel scroll for horizontal scrolling with limits
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 0.5;
      setScrollOffset((prev) => {
        const maxOffset = (photos.length * spacing) / 2;
        const minOffset = -(photos.length * spacing) / 2;
        const newOffset = prev - e.deltaY * scrollSpeed;
        return Math.max(minOffset, Math.min(maxOffset, newOffset));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [photos.length, spacing]);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[15, 15, 10]} intensity={2.0} />
      <directionalLight position={[-15, 15, -10]} intensity={1.0} />
      <directionalLight position={[0, 20, 0]} intensity={1.5} />
      <CameraLock scrollOffset={scrollOffset} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minDistance={20}
        maxDistance={60}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
        target={[scrollOffset * 0.3, 0, 0]}
      />
      {photos.map((photo, index) => (
        <IsometricPhotoPlane
          key={photo.id}
          photo={photo}
          basePosition={basePositions[index]}
          scrollOffset={scrollOffset}
          index={index}
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

export default function RowGallery({ photos }: RowGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-black">No photos available</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-white overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ 
            position: [22.4, 14.8, 22.4],
            fov: 45,
            up: [0, 1, 0]
          }}
          gl={{ 
            antialias: true, 
            alpha: false,
            preserveDrawingBuffer: true
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#ffffff']} />
          <IsometricRowScene photos={photos} />
        </Canvas>
      </Suspense>
    </div>
  );
}

