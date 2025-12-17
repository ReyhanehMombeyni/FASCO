import { getReviewsProduct, ProductReview } from "@/src/services/products";
import { CardReview } from "./CardReview";

export const ReviewList = async ({id}: {id: string;}) => {
    const reviews: ProductReview[] | null = await getReviewsProduct(id);

  return (
    <div className="px-5 md:px-20 lg:px-30 pb-10 lg:pb-15">
        <h1 className="text-sm font-serif font-semibold lg:text-xl text-gray-900">Review Comment User For This Product: </h1>
        <div className="flex flex-col space-y-5 pt-5 pl-5">
            { reviews?.length ?
                (reviews?.map(review => <CardReview key={review.id} review={review} />)) : (<div>
                    Not Exist Any Review.
                </div>)
            }
        </div>
    </div>
  )
}
