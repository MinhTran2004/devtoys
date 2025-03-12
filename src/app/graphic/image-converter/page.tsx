"use client";
import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import DropImage from "@/components/drop-imge";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useState } from "react";
import { saveAs } from "file-saver";

const dataConversion = ["BMP", "JPEG", "PBM", "PNG", "TGA", "TIFF", "WEBP"];
const listImage: string[] = [];

export default function ImageConverterPage() {
  const [selectItemDropDown, setSelectItemDropDown] = useState("BMP");
  const [images, setImages] = useState<File[]>([]); // Lưu mảng các file ảnh

  // Xử lý khi người dùng chọn nhiều file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // Chuyển đổi tất cả ảnh
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
        iconRight={<DropDown data={dataConversion} selectItemDropDown={selectItemDropDown} onSelectItemDropDown={setSelectItemDropDown} />}
      />

      <br />
      <DropImage onChange={handleFileChange} />

      <div className="flex gap-2 justify-end">
        <button
          className="mt-4 p-2  text-black text-sm rounded"
          style={{cursor: images.length > 0 ? "pointer" : "default", color: images.length > 0 ? "black": "#808080", backgroundColor: images.length > 0 ? "#6ebbe7" : "#2f2f2f" }}
          onClick={handleConvert}
          disabled={images.length === 0}
        >
          Convert all
        </button>
        <button
          className="mt-4 p-2 text-sm rounded"
          style={{cursor: images.length > 0 ? "pointer" : "default", color: images.length > 0 ? "white": "#808080", backgroundColor: images.length > 0 ? "#3a3a3a" : "#2f2f2f"}}
          onClick={handleConvert}
          disabled={images.length === 0}
        >
          Delete All
        </button>
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
