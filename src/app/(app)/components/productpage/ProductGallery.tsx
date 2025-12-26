"use client";
import Image from "next/image";

interface Props {
  mainImage: string;
  colorImages: { color_id: string; image_url: string }[];
  selectedColorId: string | null;
  productName: string;
  colorHandler: (id: string) => void;
}

export const ProductGallery = ({ mainImage, colorImages, selectedColorId, productName, colorHandler }: Props) => {
  
  const activeImage = colorImages.find(ci => ci.color_id === selectedColorId)?.image_url || mainImage;

  return (
    <div className="flex flex-col sm:flex-row-reverse sm:h-120 gap-2 lg:gap-5">
      <div className="w-full relative h-115 sm:min-h-full bg-gray-50">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-contain lg:object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto sm:flex-col sm:w-1/4 no-scrollbar">
        {colorImages.map((img, index) => (
          <div key={index} className={`${img.image_url===activeImage && "border-gray-400"} relative min-w-20 min-h-25 lg:min-h-30 border cursor-pointer hover:border-gray-400`} onClick={() => colorHandler(img.color_id)}>
             <Image src={img.image_url} alt="thumbnail" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};