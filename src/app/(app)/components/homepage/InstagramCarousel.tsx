"use client"

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui";
import { InstagramCarsoulProps } from "@/src/types/homepage";

export const InstagramCarsoul = ({images}: InstagramCarsoulProps) => {  

  const AutoplayHandler = () => {
    const { api: carouselApi } = useCarousel();
    const intervalTime = 2500;
  
    React.useEffect(() => {
      if (!carouselApi) {
        return;
      }
  
      const autoplay = () => carouselApi.scrollNext();
      const interval = setInterval(autoplay, intervalTime);
  
      return () => {
        clearInterval(interval);
      };
    }, [carouselApi]);
  
    return null;
  };


  return (
    <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <AutoplayHandler />
            <CarouselContent>
              {images.map(({id, alt, src}, index) => (
                <CarouselItem
                  key={id}
                  className="basis-1/3 sm:basis-1/5 lg:basis-1/7 px-0 flex items-center"
                >
                  <div
                    className={`${
                      index % 2
                        ? "h-[300px] lg:h-[350px]"
                        : "h-[250px] lg:h-[300px]"
                    } relative w-full`}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 16.6vw"
                      style={{ objectFit: "cover" }}
                      className="hover:opacity-90 transition-opacity duration-300 cursor-pointer"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
  )
}
