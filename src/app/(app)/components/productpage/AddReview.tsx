"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { createClient } from "@/src/supabase/client";
import { Button } from "@/components/ui/button";

export const AddReview = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const supabase = createClient();

  const handleSubmit = async () => {
    setStatus({ type: null, message: null });

    if (rating === 0) {
      setStatus({ type: "error", message: "Please select a rating!" });
      return;
    }
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
    setStatus({ type: "error", message: "Please login to submit a review." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      user_id: user.id,
      rating,
      comment,
    });

    if (error) {
    setStatus({ type: "error", message: "occur an error " + error.message });
    } else {
      setComment("");
      setRating(0);
      setStatus({ type: "success", message: "Thank you! Your review has been submitted." });
      
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 p-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Rating</label>
        <div className="flex space-x-2 pt-3 pl-5">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onMouseEnter={() => setHover(num)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(num)}
            >
              <Star 
                className={`w-5 h-5 transition-colors ${
                  (hover || rating) >= num ? "fill-yellow-500 text-yellow-500" : "text-gray-200"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Message</label>
        <textarea
          className="w-full min-h-[120px] mt-3 p-3 border rounded-md focus:ring-1 focus:ring-black outline-none transition-all text-xs"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={loading}
        className="w-full bg-black text-white hover:bg-gray-800 h-12"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>

      {status.message && (
          <p className={`text-sm text-center font-medium animate-in fade-in slide-in-from-top-1 ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {status.message}
          </p>
        )}
    </div>
  );
};