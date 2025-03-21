"use client"

import DropImage from "@/components/drop-imge"
import { useState } from "react";

const filters = [
  '',
  'contrast(100%) brightness(100%) sepia(100%) saturate(0%) hue-rotate(90deg)',
  'contrast(100%) brightness(100%) sepia(100%) saturate(0%) hue-rotate(180deg)',
  'contrast(100%) brightness(100%) sepia(100%) saturate(0%) hue-rotate(270deg)',
];

export default function ColorBlindnessSimulatorPage() {
  const [image, setImage] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="h-full w-full" >
      <p className="text-2xl mb-2">Color Blindness Simulator</p>
      <DropImage
        onChange={handleImageUpload}
      />
      <div className="grid grid-cols-2 w-full h-12/15 mt-5 gap-2">
        {filters.map((item) => (
          <div className="flex items-center justify-center bg-[#333333]">
            <img
              style={{ maxHeight: 250, filter: item }}
              src={image}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}