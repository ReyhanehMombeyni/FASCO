// components/TestimonialSlider.jsx
'use client'; // برای استفاده از State و Effect در Next.js App Router

import { useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import Image from 'next/image';
import user from "@/public/images/homepage/user.png";

const testimonials = [
  {
    name: "James K.",
    title: "Traveler",
    avatarUrl: user,
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
  },
  {
    name: "Susan W.",
    title: "Entrepreneur",
    avatarUrl: user,
    quote:
      "Fantastic! Exactly what I was looking for. Thank you for making it awesome and most of all hassle free.",
    rating: 4,
  },
  {
    name: "Michael R.",
    title: "Developer",
    avatarUrl: user,
    quote:
      "A truly outstanding experience. Highly recommend this product to everyone looking for quality.",
    rating: 5,
  },
];
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = testimonials.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
    );
  };

  // تابع کمکی برای گرفتن index های قبلی و بعدی
  const getIndex = (offset: number) => {
    return (currentIndex + offset + totalSlides) % totalSlides;
  };

  // رندر آواتار های کناری
  const renderSideAvatars = (offset: number, isRight: boolean) => {
    const index = getIndex(offset);
    const testimonial = testimonials[index];

    return (
      <div 
        className={`absolute top-1/2 -translate-y-1/2 
          w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden 
          shadow-lg ring-4 ring-white transition-all duration-500
          ${isRight ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}
          ${(offset === -1 || offset === 1) ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <Image
          src={testimonial.avatarUrl}
          alt={`Avatar of ${testimonial.name}`}
          layout="fill"
          objectFit="cover"
          className="opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    );
  };


  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* آواتار سمت چپ (قبلی) */}
        {renderSideAvatars(-1, false)}

        {/* آواتار سمت راست (بعدی) */}
        {renderSideAvatars(1, true)}
        
        {/* کانتینر اسلایدر و کارت ها */}
        <div className="relative flex justify-center items-center overflow-hidden">
          {/* کارت ها */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              // جابجایی کارت‌ها برای نمایش آیتم مرکزی
              transform: `translateX(calc(-${currentIndex * 100}% + 0px))`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="shrink-0 w-full flex justify-center"
                style={{ width: '100%', maxWidth: '600px' }} 
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isVisible={index === currentIndex || index === getIndex(-1) || index === getIndex(1)}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>

        </div>
        
        {/* دکمه‌های کنترل */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition shadow-md"
            aria-label="Previous testimonial"
          > left
            {/* <ChevronLeftIcon className="h-6 w-6" /> */}
          </button>
          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition shadow-md"
            aria-label="Next testimonial"
          >right
            {/* <ChevronRightIcon className="h-6 w-6" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;