import { ShopContent } from "../components/shoppage";
import { InstagramFeed, ProductShowcase } from "../components/homepage";
import { SearchParams } from "@/src/types/shop";
import { Suspense } from "react";
import { ShopPageSkeleton } from "../components/skeleton";

const page = async ({ searchParams }: SearchParams) => {
  
  return (
    <main>
      <Suspense fallback={<ShopPageSkeleton />}>
      <ShopContent searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-50" />}>
        <ProductShowcase />
      </Suspense>
      <Suspense>
        <InstagramFeed />
      </Suspense>
    </main>
  );
};

export default page;
