'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const [zoomed, setZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setZoomed(true);
  };

  const handleMouseLeave = () => {
    setZoomed(false);
    setBackgroundPosition('center');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full border rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: zoomed ? '200%' : '100%',
        backgroundPosition: zoomed ? backgroundPosition : 'center',
        transition: 'background-size 0.3s ease, background-position 0.3s ease',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="opacity-0"
      />
    </div>
  );
}
