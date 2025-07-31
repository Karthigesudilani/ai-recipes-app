"use client";

import Image from "next/image";

export default function BackgroundImages() {
  return (
    <>
      {/* Background Food Images */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Image
          src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=200&h=200&fit=crop&crop=center"
          alt="Fresh vegetables"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
        <Image
          src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=200&h=200&fit=crop&crop=center"
          alt="Delicious pasta"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
} 