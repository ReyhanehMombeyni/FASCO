import { getFeaturedComments } from "@/src/services/deals";
import { TestimonialSlider } from "./TestimonialSlider";

const Testimonial = async () => {
  const data = await getFeaturedComments();

  return (
    <section className="px-5 md:px-20 lg:px-30 py-10 bg-gray-50">
      <h2 className="text-lg md:text-xl lg:text-4xl font-serif text-gray-600 lg:font-medium text-center tracking-wide mb-4">
        This Is What Our Customers Say
      </h2>
      <p className="text-center text-[10px] md:text-xs lg:text-sm text-gray-400 mb-10 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis
      </p>
      <TestimonialSlider comments={data} />
    </section>
  );
};

export default Testimonial;
