'use client'
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/src/constants';
import { useState } from 'react';
// import { Product } from '@/src/constants';
// import Link from 'next/link';

// async function getProducts(category: string): Promise<Product[]> {  
//   if (category === 'All') return products.slice(0, 6);
  
//   return products.filter(p => p.category === category).slice(0, 6);
// }

export function NewArrivalsSection() {
  // { initialCategory }: { initialCategory: string }
  const [initialCategory, setInitialCategory] = useState("Men's Fashion")
  // const products = getProducts(initialCategory);
  const categories = ["Men's Fashion", "Women's Fashion", "Women Accessories", "Men Accessories", "Discount Deals"];
 
  return (
    <section className="py-5 sm:py-8 md:py-12 lg:py-20 px-10 md:px-20 lg:px-30">
      
      <h2 className="text-lg md:text-xl lg:text-4xl font-serif text-gray-600 lg:font-medium text-center tracking-wide mb-4">New Arrivals</h2>
      <p className="text-center text-[10px] md:text-xs lg:text-sm text-gray-400 mb-10 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
        ultrices solliciitudin sem. scelerisque duid uitrices solicitudin.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setInitialCategory(cat)}
            variant={cat === initialCategory ? 'default' : 'outline'}
            className={`text-xs lg:text-base rounded-lg px-3 p-1 md:px-5 md:py-2 lg:px-8 lg:py-6 border-none transition-colors ${
              cat === initialCategory 
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-50'
            }`}
            style={cat === initialCategory ? {boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"} : {}}
          >
            {/* <Link href={} scroll={false}> */}
                {cat}
            {/* </Link> */}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-15 pt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-20 pb-10">
        <Button
          className="bg-black text-white hover:bg-gray-800 rounded-lg px-12 py-6 tracking-wide text-md"
           style={{boxShadow: "10px 30px 30px rgba(0,0,0,0.1)"}}
        >
          View More
        </Button>
      </div>
      
    </section>
  );
}