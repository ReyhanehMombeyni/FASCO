import {
  BrandMarquee,
  HeroHeader,
  DealsOfTheMonth,
  ProductShowcase,
  InstagramFeed,
  NewArrivalsSection,
  TestimonialSlider,
} from "./components/homepage";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <BrandMarquee />
      <DealsOfTheMonth />
      <NewArrivalsSection />
      <ProductShowcase />
      <InstagramFeed /> 
      <TestimonialSlider />
    </div>
  );
}
