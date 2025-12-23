import { Suspense } from "react";
import {
  BrandMarquee,
  HeroHeader,
  DealsOfTheMonth,
  ProductShowcase,
  InstagramFeed,
  NewArrivalsSection,
  TestimonialSlider,
} from "./components/homepage";
import {
  DealsOfTheMonthSkeleton,
  NewArrivalsSkeleton,
} from "./components/skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <HeroHeader />
      <BrandMarquee />
      <Suspense fallback={<DealsOfTheMonthSkeleton />}>
        <DealsOfTheMonth />
      </Suspense>
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivalsSection searchParams={params} />
      </Suspense>
      <Suspense>
        <ProductShowcase />
      </Suspense>
      <Suspense>
        <InstagramFeed />
      </Suspense>
      <Suspense>
        <TestimonialSlider />
      </Suspense>
    </div>
  );
}
