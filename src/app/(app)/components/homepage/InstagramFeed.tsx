import { getLatestProductsImages } from "@/src/services/products";
import { InstagramCarsoul } from "./InstagramCarousel";

export const InstagramFeed = async () => {

  const images = await getLatestProductsImages();

  if (images.length === 0) return null;

  return (
    <section className="pt-10 md:pt-15 pb-20 bg-white">
        <div className="text-center mb-12 mx-auto px-5 md:px-20 lg:px-30">
          <h2 className="text-lg md:text-xl lg:text-4xl font-serif text-gray-600 lg:font-medium text-center tracking-wide mb-4">
            Follow Us On Instagram
          </h2>
          <p className="text-center text-[10px] md:text-xs sm:max-w-md md:max-w-lg mx-auto lg:text-sm text-gray-400 mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem, feugiatque quis ultrices
            sollicitudin.
          </p>
        </div>

        <div className="relative lg:py-15">
          <InstagramCarsoul images={images} />
        </div>
    </section>
  );
};
