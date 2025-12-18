"use client";
import { RatingStar } from "@/src/components/shared";
import { ProductReview } from "@/src/services/products";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { createClient } from "@/src/supabase/client";
import { useReducer } from "react";
import { initialState, reducer } from "@/src/utils/reducer";

export const CardReview = ({ review }: { review: ProductReview }) => {
const [state, dispatch] = useReducer(reducer, review, initialState);
const {likes, dislikes, userAction} = state;
const { comment, rating, user } = review;

const supabase = createClient();
  const handleAction = async (type: "like" | "dislike") => {
    // if (userAction) return;
    const column = type === "like" ? "helpful_count" : "unhelpful_count";
    const { error } = await supabase.rpc("increment_review_stat", {
      row_id: review.id,
      col_name: column
    });

    if (!error) {
    if (type === "like") {
        dispatch({type: "LIKE"})
    } else if(type === "dislike") {
        dispatch({type: "DISLIKE"})
    }
    }
  };

  return (
    <div className="border border-gray-200 p-5 w-full rounded-lg shadow-2xs">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm border-b w-fit">
          <span className="text-lg font-semibold font-mono">
            {user?.username}
          </span>{" "}
          Say:
        </h1>
        <div className="text-end items-end">
          <RatingStar rating={rating} />
        </div>
      </div>

      <p className="py-5 text-gray-700">{comment}</p>
      <div className="flex justify-end gap-5">
        <button
          onClick={() => handleAction("like")}
          className={`flex items-center space-x-1 text-xs transition-colors ${
            userAction === "like"
              ? "text-green-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <ThumbsUp className="w-2 h-2 md:w-4 md:h-4" />
          <span>{likes}</span>
        </button>
        <button
        onClick={() => handleAction("dislike")}
          className={`flex items-center space-x-1 text-xs transition-colors ${
            userAction === "dislike"
              ? "text-red-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <ThumbsDown className="w-2 h-2 md:w-4 md:h-4" />
          <span>{dislikes}</span>
        </button>
      </div>
    </div>
  );
};
