"use client";

import { useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
import user from "@/public/images/homepage/user.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "James K.",
    title: "Traveler",
    avatarUrl: user,
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
  },
  {
    id: 2,
    name: "Susan W.",
    title: "Entrepreneur",
    avatarUrl: user,
    quote:
      "Fantastic! Exactly what I was looking for. Thank you for making it awesome and most of all hassle free.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael R.",
    title: "Developer",
    avatarUrl: user,
    quote:
      "A truly outstanding experience. Highly recommend this product to everyone looking for quality.",
    rating: 5,
  },
  {
    id: 4,
    name: "James K. 2",
    title: "Traveler",
    avatarUrl: user,
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
  },
  {
    id: 5,
    name: "Susan W. 2",
    title: "Entrepreneur",
    avatarUrl: user,
    quote:
      "Fantastic! Exactly what I was looking for. Thank you for making it awesome and most of all hassle free.",
    rating: 4,
  },
  {
    id: 5,
    name: "Michael R. 2",
    title: "Developer",
    avatarUrl: user,
    quote:
      "A truly outstanding experience. Highly recommend this product to everyone looking for quality.",
    rating: 5,
  },
];
export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalSlides = testimonials.length;

  const goToNext = () => {
    if (currentIndex === 5) setCurrentIndex(0);
    else setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrev = () => {
    if (currentIndex === 0) setCurrentIndex(5);
    else setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const getIndex = (offset: number) => {
    return (currentIndex + offset + totalSlides) % totalSlides;
  };

  return (
    <section className="px-5 md:px-20 lg:px-30 py-10 bg-gray-50">
      <h2 className="text-lg md:text-xl lg:text-4xl font-serif text-gray-600 lg:font-medium text-center tracking-wide mb-4">
        This Is What Our Customers Say
      </h2>
      <p className="text-center text-[10px] md:text-xs lg:text-sm text-gray-400 mb-10 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis
      </p>

      <div className="relative w-full flex justify-center items-center">
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;
          const isLeft = index === getIndex(-1);
          const isRight = index === getIndex(1);

          let positionClasses = "";

          if (isActive) {
            positionClasses = "z-20 scale-100 w-3/4 md:w-3/5";
          } else if (isLeft) {
            positionClasses = "absolute left-5 z-10 scale-75 opacity-70 w-3/4 md:w-3/5 xl:w-3/4";
          } else if (isRight) {
            positionClasses = "absolute right-5 z-10 scale-75 opacity-70 w-3/4 md:w-3/5 xl:w-3/4";
          } else {
            return null;
          }

          return (
            <div
              key={index}
              className={positionClasses + " transition-all duration-700"}
            >
              <TestimonialCard
                testimonial={testimonial}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-5 space-x-4">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-white border-none text-gray-600 hover:bg-gray-100 transition shadow-xl"
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-white border-none text-gray-600 hover:bg-gray-100 transition shadow-md"
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
