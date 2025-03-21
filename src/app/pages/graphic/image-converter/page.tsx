"use client";

import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import DropImage from "@/components/drop-imge";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useState } from "react";
import { saveAs } from "file-saver";
import PrimaryButton from "@/components/button";

const dataConversion = ["BMP", "JPEG", "PBM", "PNG", "TGA", "TIFF", "WEBP"];

export default function ImageConverterPage() {
  const [selectItemDropDown, setSelectItemDropDown] = useState("BMP");
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    try {
      for (const image of images) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(image);
        img.src = objectUrl;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (ctx) {
              const { width, height } = img;
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);

              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    saveAs(blob, `converted-image-${image.name.split('.')[0]}.${selectItemDropDown.toLowerCase()}`);
                  }
                  resolve();
                },
                selectItemDropDown
              );
            }
          };
        });
      }
    } catch (error) {
      console.error("Lỗi khi chuyển đổi ảnh", error);
    }
  };

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Image Converter</p>
      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        title="Conversion"
        content="Select the image format to convert into"
        iconRight={<DropDown
          data={dataConversion}
          selectItemDropDown={selectItemDropDown}
          onSelectItemDropDown={setSelectItemDropDown}
        />}
      />
      <br />
      <DropImage
        onChange={handleFileChange}
      />
      <div className="flex gap-2 justify-end">
        <PrimaryButton
          onClick={handleConvert}
          disabled={images.length !== 0}
          name="Convert all"
        />
        <PrimaryButton
          onClick={() => setImages([])}
          disabled={images.length !== 0}
          name="Delete all"
        />
      </div>
      <br />
      <div>
        {images.map((image, index) => (
          <Accordion
            key={index}
            iconLeft={<CurrencyExchangeIcon />}
            title={image.name}
          />
        ))}
      </div>
    </div>
  );
}
