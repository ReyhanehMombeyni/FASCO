'use client'

import louisVuitton from "@/public/images/homepage/louisVuitton.svg"
import prada from "@/public/images/homepage/prada.svg"
import calvinKlein from "@/public/images/homepage/calvinKlein.svg"
import denim from "@/public/images/homepage/denim.svg"
import chanel from "@/public/images/homepage/chanel.svg"
import Image from "next/image"

const BRANDS = [
  chanel, 
  louisVuitton , 
  prada, 
  calvinKlein, 
  denim,
  chanel, 
  louisVuitton , 
  prada, 
  calvinKlein, 
  denim,
];

export const BrandMarquee = () => {
  return (
    <section className="overflow-hidden py-8 bg-white mb-10 md:mx-20 lg:mx-30">
      <div 
        className="flex animate-marquee w-fit" 
        style={{ animationDuration: '30s' }}
      >
        {BRANDS.map((brand, index) => (
          <span 
            key={index} 
            className="shrink-0 mx-8 whitespace-nowrap"
          >
            <Image src={brand} alt="image brand" width={170} height={50} />
          </span>
        ))}
      </div>
    </section>
  );
}