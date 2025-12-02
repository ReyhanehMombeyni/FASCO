// components/TestimonialCard.jsx
import Image from 'next/image';
// import { StarIcon } from '@heroicons/react/20/solid'; // فرض می‌کنیم از Heroicons استفاده می‌کنید

interface TestType {
name: string;
    title: string;
    avatarUrl: any,
    quote: string;
    rating: number,
}

interface PropTpe{
 testimonial: TestType;
 isVisible: boolean;
 isActive: boolean;
}

export const TestimonialCard = ({ testimonial, isVisible, isActive }: PropTpe) => {
  const { name, title, avatarUrl, quote, rating } = testimonial;

  // رنگ‌دهی ستاره‌ها بر اساس امتیاز
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => ( <span key={i}>st</span>
        // <StarIcon
        //   key={i}
        //   className={`h-5 w-5 ${
        //     rating > i ? 'text-yellow-500' : 'text-gray-300'
        //   } transition-colors duration-300`}
        //   aria-hidden="true"
        // />
      ));
  };

  return (
    <div
      className={`
        flex-shrink-0 
        w-full sm:w-[500px] md:w-[600px] 
        transition-all duration-700 ease-in-out
        ${isVisible ? 'opacity-100 z-10' : 'opacity-0'}
      `}
      aria-hidden={!isVisible}
    >
      <div className={`
        bg-white 
        p-8 md:p-12 
        shadow-xl rounded-lg
        min-h-[300px]
        flex flex-col 
        relative 
        ${isActive ? 'scale-100' : 'scale-90 md:scale-95'}
        transition-transform duration-500
      `}>
        {/* نقل قول */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
          "{quote}"
        </p>
        
        {/* ستاره‌ها */}
        <div className="flex space-x-0.5 mb-4">
          {renderStars()}
        </div>

        {/* جداکننده */}
        <div className="w-16 h-1 bg-gray-200 mb-6"></div>

        {/* نام و سمت */}
        <div className="flex-grow">
            <p className="text-xl font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>

        {/* عکس آواتار (برای نمایش در اسلایدر قبلی/بعدی) */}
        {/* این قسمت را به TestimonialSlider منتقل می‌کنیم تا مدیریت موقعیت بهتر باشد */}

      </div>
    </div>
  );
};

