"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { dealItems } from "@/src/constants";

export function DealSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = dealItems.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [itemsCount]);


  const currentItem = dealItems[currentIndex];
  const getRightSideItems = () => {
    const afterCurrent = dealItems.slice(currentIndex + 1);
    const beforeCurrent = dealItems.slice(0, currentIndex);

    return [...afterCurrent, ...beforeCurrent];
  };

  const rightSideItems = getRightSideItems();

  return (
    <div className="relative w-full h-60 lg:h-[500px] overflow-hidden grid grid-cols-5">
      <div className="col-span-2 w-full relative">
        <Image
          src={currentItem.imageUrl}
          alt={currentItem.caption}
          className="transition-opacity duration-500 object-cover"
          fill
        />
        <div className="absolute bottom-2 md:bottom-5 py-2 px-1 w-full lg:bottom-10 lg:p-4 text-center bg-gray-200 opacity-90"> 
          <div className="text-[6px] sm:text-[9px] lg:text-sm lg:font-medium">
            {currentItem.name} — {currentItem.caption}
          </div>
          <div className="text-[8px] sm:text-xs lg:text-lg lg:font-semibold text-red-600">
            {currentItem.discount}
          </div>
        </div>
      </div>
      <div className="col-span-3 grid grid-rows-6 ml-2 sm:ml-4">
        <div className="row-span-5 flex">
          {rightSideItems.map(
            ({ id, imageUrl, caption }) =>
              id !== currentIndex + 1 && (
                <div
                  key={id}
                  className="relative min-w-[60%] overflow-hidden"
                >
                  <Image
                    src={imageUrl}
                    alt={caption}
                    className="transition-opacity duration-500 object-cover ml-1 sm:ml-4"
                    fill
                  />
                </div>
              )
          )}
        </div>
        <div className="row-span-1 ml-1 sm:ml-4 mt-5">
          <div className="flex space-x-2">
            {dealItems.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-gray-300 w-6" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
