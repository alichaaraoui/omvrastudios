"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/lib/data";
import BackButton from "./BackButton";

interface PhotoDetailViewProps {
  photo: Photo;
  allPhotos: Photo[];
}

export default function PhotoDetailView({ photo, allPhotos }: PhotoDetailViewProps) {
  const [dominantColor, setDominantColor] = useState<string>("#000000");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const extractColor = () => {
      const img = imageRef.current;
      if (!img) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth || 100;
      canvas.height = img.naturalHeight || 100;

      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Sample pixels from the bottom center area of the image
        const sampleSize = 50;
        const startX = Math.floor((canvas.width - sampleSize) / 2);
        const startY = Math.floor(canvas.height - sampleSize);
        const imageData = ctx.getImageData(startX, startY, sampleSize, sampleSize);
        const data = imageData.data;

        // Calculate average color
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        if (count > 0) {
          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);
          
          // Convert to hex
          const hex = `#${[r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('')}`;
          
          setDominantColor(hex);
        }
      } catch (e) {
        console.error("Error extracting color:", e);
      }
    };

    // Wait for image to load
    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        extractColor();
      } else {
        img.addEventListener("load", extractColor);
        return () => img.removeEventListener("load", extractColor);
      }
    }
  }, [photo.imageUrl]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Fullscreen Image */}
      <div className="relative w-full h-full">
        <img
          ref={imageRef}
          src={photo.imageUrl}
          alt={`Photo: ${photo.title}`}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          style={{ display: 'none' }}
        />
        <Image
          src={photo.imageUrl}
          alt={`Photo: ${photo.title}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Back Button - Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>

      {/* Color Bar - Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 z-10 flex items-center justify-center"
        style={{ backgroundColor: dominantColor }}
      >
        <p className="text-sm text-white text-center">{photo.title}</p>
      </div>
    </div>
  );
}

