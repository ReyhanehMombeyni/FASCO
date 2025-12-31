'use client'

import { RatingStar } from '@/src/components/shared';
import Image from 'next/image';
import userPlaceholder from '@/public/images/homepage/user.png';
import { TestimonialCardProps } from '@/src/types/homepage';

export const TestimonialCard = ({ comment, isActive }: TestimonialCardProps) => {
  const { quote, rating,  created_at, user } = comment;
  return (
    <div className={`bg-white p-4 rounded-3xl shadow-2xl border border-gray-50 flex flex-col items-center text-center transition-all ${!isActive && 'blur-[1px]'}`}>
      <div className="mb-4 relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
        <Image 
          src={userPlaceholder} 
          alt="user" 
          fill 
          className="object-cover"
        />
      </div>
      
      <RatingStar rating={rating} />
      
      <p className="mt-3 max-w-xs text-gray-600 italic text-[10px] md:tex-xs lg:text-sm leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      
      <div className="mt-3 pt-3 border-t border-gray-100 w-full">
        <h4 className="text-sm md:text-base font-bold text-gray-900">{user?.username}</h4>
        <p className="text-[10px] md:tex-xs lg:text-sm text-gray-400 mt-1 uppercase tracking-widest">{created_at.split('T')[0]}</p>
      </div>
    </div>
  );
};