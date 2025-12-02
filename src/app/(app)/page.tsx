import { BrandMarquee, HeroHeader, DealsOfTheMonth, ProductShowcase, InstagramFeed, TestimonialCarousel, NewArrivalsSection } from "./components/homepage";
// import TestimonialSlider from "./components/homepage/TestimonialSlider";

export default function Home() {
  return (
    <div className="">
      <HeroHeader/>
      <BrandMarquee />
      <DealsOfTheMonth />
      <NewArrivalsSection />
      <ProductShowcase />
      <InstagramFeed />
      <TestimonialCarousel />
      {/* <TestimonialSlider /> */}
    </div>
  );
}
