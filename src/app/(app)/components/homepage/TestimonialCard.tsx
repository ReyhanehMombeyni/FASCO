import { Star } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';


interface TestType {
name: string;
    title: string;
    avatarUrl: StaticImageData,
    quote: string;
    rating: number,
}

interface PropTpe{
 testimonial: TestType;
 isActive: boolean;
}

export const TestimonialCard = ({ testimonial, isActive }: PropTpe) => {
  const { name, title, avatarUrl, quote, rating } = testimonial;

  return (
      <div className={`
         px-3 sm:px-8 py-10 bg-white
        shadow-xl rounded-lg
        flex items-center lg:gap-3 xl:gap-8
        ${isActive ? 'opacity-100' : 'opacity-80 overflow-x-auto'}
      `}>
        <div className='hidden lg:block relative w-30 h-30  xl:3-40 xl:w-40 xl:mb-5'>
          <Image src={avatarUrl} alt={name} fill className="object-contain" />
        </div>
        <div className='flex flex-col items-center'>

          <p className="text-gray-700 text-xs text-center leading-relaxed italic sm:max-w-md md:text-sm lg:text-sm xl:text-base xl:max-w-xl">
            {quote}
          </p> 
          <div className="flex space-x-0.5 py-2 md:py-5 lg:py-2 xl:py-5">
            {Array.from({ length: 5 }, (_, i) => (
                  <Star
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:h-4 lg:w-4 xl:w-5 xl:h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
              ))}
          </div>

          <div className="w-full h-0.5 bg-gray-200"></div>

          <div className="pt-3 text-center">
              <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl text-gray-900">{name}</p>
              <p className="text-xs md:text-sm lg:text-xs xl:text-sm text-gray-500">{title}</p>
          </div>
        </div>

      </div>
  );
};

