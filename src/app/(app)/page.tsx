import { Suspense } from "react";
import {
  BrandMarquee,
  HeroHeader,
  DealsOfTheMonth,
  ProductShowcase,
  InstagramFeed,
  NewArrivalsSection,
} from "./components/homepage";
import {
  DealsOfTheMonthSkeleton,
  InstagramSkeleton,
  NewArrivalsSkeleton,
  ProductShowcaseSkeleton,
} from "./components/skeleton";
import Testimonial from "./components/homepage/Testimonial";

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
      <Suspense fallback={<ProductShowcaseSkeleton />}>
        <ProductShowcase />
      </Suspense>
      <Suspense fallback={<InstagramSkeleton />}>
        <InstagramFeed />
      </Suspense>
      <Suspense>
        <Testimonial />
      </Suspense>
    </div>
  );
}
