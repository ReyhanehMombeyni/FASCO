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
    <div className="flex items-center gap-4">
      <Icon className="h-10 w-10 text-gray-800 mb-2" />
      <div className="text-left">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );


export const ProductShowcase = () => {

  return (
    <section className="w-full">
      <div className="flex bg-gray-200 h-[500px]">

        <div className="hidden lg:block md:relative md:w-[50%]">
          <Image
            src={peakyBlinders}
            alt="peakyBlinders"
            fill
            priority
          />

        </div>

        <div className="p-8 md:py-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto md:mx-0">
            <p className="text-sm text-gray-500 mb-3">{product.collection}</p>
            <h1 className="text-5xl tracking-wide font-serif text-gray-700 mb-8">{product.title}</h1>
            
            <p className="text-xs uppercase font-semibold text-gray-700 tracking-wider underline cursor-pointer mb-4">Description</p>
            <p className="text-sm font-light text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-center space-x-2 mb-8">
              <p className="text-sm text-gray-500 tracking-wider">Size:</p>
              <div className="px-5 py-1 bg-black text-white text-sm rounded-lg shadow-md opacity-90">
                {product.size}
              </div>
            </div>
            
            <p className="text-2xl font-medium mb-8">${product.price.toFixed(2)}</p>
            
            <Button className="bg-black text-white hover:opacity-90 w-full md:w-auto px-14 py-6 text-md font-extralight rounded-lg shadow-lg">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-30 grid grid-cols-2 gap-3 lg:grid-cols-4 py-8 md:py-12 bg-white">
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

