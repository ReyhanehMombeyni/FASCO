"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import { InstagramCarsoulProps } from "@/src/types/homepage";
import Autoplay from "embla-carousel-autoplay";

export const InstagramCarsoul = ({ images }: InstagramCarsoulProps) => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        watchSlides: true,
      }}
      plugins={[plugin]}
      onMouseEnter={() => plugin.stop()} 
      onMouseLeave={() => plugin.play()}
      className="w-full"
    >
      <CarouselContent>
        {images.map(({ id, alt, src }, index) => (
          <CarouselItem
            key={id}
            className="basis-1/3 sm:basis-1/5 lg:basis-1/7 px-0 flex items-center"
          >
            <div
              className={`${
                index % 2 ? "h-[300px] lg:h-[350px]" : "h-[250px] lg:h-[300px]"
              } relative w-full`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 15vw"
                className="hover:opacity-90 transition-opacity duration-300 cursor-pointer object-cover"
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
