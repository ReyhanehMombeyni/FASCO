"use client";

import Image from "next/image";
import { Check, Shield, Truck, Headset, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui";
import peakyBlinders from '@/public/images/homepage/peakyBlinders.png';

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const product = {
  title: "Peaky Blinders",
  collection: "Women Collection",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem, feugiatque quis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  price: 100.00,
  size: "M",
};

  const FeatureCard = ({ icon: Icon, title, subtitle }: FeatureCard) => (
    <div className="flex items-center gap-2 md:gap-4">
      <Icon className="h-7 w-7 md:h-10 md:w-10 text-gray-800 mb-2" />
      <div className="text-left">
        <h4 className="text-xs md:text-sm font-medium">{title}</h4>
        <p className="text-[10px] md:text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );


export const ProductShowcase = () => {

  return (
    <section className="w-full">
      <div className="flex bg-gray-200 h-90 lg:h-110 xl:120">

        <div className="hidden lg:block md:relative md:w-[50%]">
          <Image
            src={peakyBlinders}
            alt="peakyBlinders"
            fill
            priority
          />

        </div>

        <div className="p-5 pr-15 flex flex-col justify-center items-start md:pr-10 md:py-15"> 
            <p className="text-xs md:text-sm text-gray-500 mb-3">{product.collection}</p>
            <h1 className="text-4xl font-serif text-gray-700 mb-5 lg:text-5xl lg:tracking-wide lg:mb-8">{product.title}</h1>
            <p className="text-xs lg:text-sm uppercase font-semibold text-gray-700 tracking-wider underline cursor-pointer mb-4">Description</p>
            <p className="text-[10px] sm:text-xs md:max-w-lg font-extralight text-gray-600 mb-3 xl:mb-6 lg:text-sm">{product.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              <p className="text-sm text-gray-500 tracking-wider">Size:</p>
              <div className="bg-black text-white text-xs px-3 md:text-sm rounded-md shadow-md opacity-90">
                {product.size}
              </div>
            </div>
            
            <p className="text-lg font-medium mb-5 lg:text-xl lg:mb-8">${product.price.toFixed(2)}</p>
            <Button className="text-sm font-light shadow-lg md:text-md md:px-8 md:py-4 xl:text-lg xl:py-5">
              Buy Now
            </Button>
          </div>
      </div>

      <div className="px-5 md:px-20 lg:px-30 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 py-8 md:py-12 bg-white">
        <FeatureCard 
          icon={Check} 
          title="High Quality" 
          subtitle="crafted from top materials" 
        />
        <FeatureCard 
          icon={Shield} 
          title="Warranty Protection" 
          subtitle="Over 2 years" 
        />
        <FeatureCard 
          icon={Truck} 
          title="Free Shipping" 
          subtitle="order over 150 $" 
        />
        <FeatureCard 
          icon={Headset} 
          title="24/7 Support" 
          subtitle="Dedicated support" 
        />
      </div>
    </section>
  );
}

