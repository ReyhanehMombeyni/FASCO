import { RatingStar } from '@/src/components/shared';
import User from '@/public/images/homepage/user.png'
import Image from 'next/image';
import { TestimonialCardProps } from '@/src/types/homepage';

export const TestimonialCard = ({ comment, isActive }: TestimonialCardProps ) => {
  const { quote, rating,  created_at, user } = comment;

  return (
      <div className={`
         px-3 sm:px-8 py-10 bg-white
        shadow-xl rounded-lg
        flex items-center lg:gap-3 xl:gap-8
        ${isActive ? 'opacity-100' : 'opacity-80 overflow-x-auto'}
      `}>
        <div className='hidden lg:block relative w-30 h-30  xl:3-40 xl:w-40 xl:mb-5'>
          <Image src={User} alt="user" fill className="object-contain" sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 120px, 160px" />
        </div>
        <div className='flex flex-col items-center'>

          <p className="text-gray-700 text-xs text-center leading-relaxed italic sm:max-w-md md:text-sm lg:text-sm xl:text-base xl:max-w-xl">
            {quote}
          </p> 
          <div className="py-2 md:py-5 lg:py-2 xl:py-5">
            <RatingStar rating={rating} />
          </div>

          <div className="w-full h-0.5 bg-gray-200"></div>

          <div className="pt-3 text-center">
              <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl text-gray-900">{user?.username}</p>
              <p className="text-xs md:text-sm lg:text-xs xl:text-sm text-gray-500">{created_at.split('T')[0]}</p>
          </div>
        </div>

      </div>
  );
};

