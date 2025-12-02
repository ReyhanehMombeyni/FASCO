"use client";

import React from "react";
import Image from "next/image";
import img1 from "@/public/images/homepage/dress1.jpg";
import img2 from "@/public/images/homepage/dress2.jpg";
import img3 from "@/public/images/homepage/dress3.jpg";
import img4 from "@/public/images/homepage/dress4.jpg";
import img5 from "@/public/images/homepage/dress5.jpg";
import img6 from "@/public/images/homepage/dress6.jpg";
import img7 from "@/public/images/homepage/dress7.jpg";
import img8 from "@/public/images/homepage/dress8.jpg";
import img9 from "@/public/images/homepage/dress9.jpg";
import img10 from "@/public/images/homepage/dress10.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui";

const instagramImages = [
  { src: img1, alt: "Fashion Model 1" },
  { src: img2, alt: "Fashion Model 2" },
  { src: img3, alt: "Fashion Model 3" },
  { src: img4, alt: "Fashion Model 4" },
  { src: img5, alt: "Fashion Model 5" },
  { src: img6, alt: "Fashion Model 6" },
  { src: img7, alt: "Fashion Model 7" },
  { src: img8, alt: "Fashion Model 8" },
  { src: img9, alt: "Fashion Model 9" },
  { src: img10, alt: "Fashion Model 10" },
];

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

export const InstagramFeed = () => {
  return (
    <section className="py-20 bg-white">
        <div className="text-center mb-12 max-w-xl mx-auto px-10">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 tracking-wider">
            Follow Us On Instagram
          </h2>
          <p className="text-xs md:text-sm font-extralight text-gray-500 mt-4 px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem, feugiatque quis ultrices
            sollicitudin.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <AutoplayHandler />
            <CarouselContent>
              {instagramImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 sm:basis-1/5 lg:basis-1/7 px-0 flex items-center"
                >
                  <div
                    className={`${
                      index % 2
                        ? "h-[300px] md:h-[350px]"
                        : "h-[250px] md:h-[300px]"
                    } relative w-full`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 16.6vw"
                      style={{ objectFit: "cover" }}
                      className="hover:opacity-90 transition-opacity duration-300 cursor-pointer"
                      priority={index < 3}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
    </section>
  );
};
