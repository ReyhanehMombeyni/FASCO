import Image from "next/image";
import peakyBlinders from "@/public/images/homepage/peakyBlinders.png";
import { getShowcaseProduct } from "@/src/services/products";
import { ButtonLink } from "@/src/components/shared";
import { FeatureCardProps } from "@/src/types/homepage";
import { featureCards } from "@/src/constants";

const fallbackProduct = {
  id: "fallback",
  name: "Peaky Blinders Edition",
  description: "High-quality crafted suit for special occasions...",
  collections: { name: "Best Sellers" },
  price: 299.00,
  sizes: [{ symbol: "M" }]
};

const FeatureCard = ({ icon: Icon, title, subtitle }: FeatureCardProps) => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Icon className="h-7 w-7 md:h-10 md:w-10 text-gray-800 mb-2" />
      <div className="text-left">
        <h4 className="text-xs md:text-sm font-medium">{title}</h4>
        <p className="text-[10px] md:text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export const ProductShowcase = async () => {
  const product = await getShowcaseProduct() || fallbackProduct;
  const {id, name, description, collections, price, sizes} = product;
  const symbol = sizes[0]?.symbol;
  return (
    <section className="w-full">
      <div className="flex bg-gray-200 h-90 lg:h-110 xl:h-120">
        <div className="hidden lg:block md:relative md:w-[50%]">
          <Image
            src={peakyBlinders}
            alt="peakyBlinders"
            fill
            className="object-fit"
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>

        <div className="p-5 pr-15 flex flex-col justify-center items-start md:pr-10 md:py-15 md:pl-20">
          <p className="text-xs md:text-sm text-gray-500 mb-3">
            {collections?.name}
          </p>
          <h2 className="text-4xl font-serif text-gray-700 mb-5 lg:text-5xl lg:tracking-wide lg:mb-8">
            {name}
          </h2>
          <p className="text-xs lg:text-sm uppercase font-semibold text-gray-700 tracking-wider underline cursor-pointer mb-4">
            Description
          </p>
          <p className="text-[10px] sm:text-xs md:max-w-lg font-extralight text-gray-600 mb-3 xl:mb-6 lg:text-sm">
            {description}
          </p>
          <div className="flex items-center space-x-2 mb-4">
            <p className="text-sm text-gray-500 tracking-wider">Size:</p>
            <div className="bg-black text-white text-xs px-3 md:text-sm rounded-md shadow-md opacity-90">
              {symbol || "M"}
            </div>
          </div>

          <p className="text-lg font-medium mb-5 lg:text-xl lg:mb-8">
            ${price.toFixed(2)}
          </p>
          <ButtonLink href={`/product/${id}`} />
        </div>
      </div>

      <div className="px-5 md:px-20 lg:px-30 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 py-8 md:py-12 bg-white">
        {
          featureCards.map(({id, icon, title, subtitle}) => <FeatureCard key={id} icon={icon} title={title} subtitle={subtitle} />)
        }
      </div>
    </section>
  );
};
