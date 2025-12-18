"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Label, Textarea, Button } from "@/components/ui";
import { createClient } from "@/src/supabase/client";

export const CommentForm = ({ onSuccess }: {onSuccess?: () => void;}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string | null }>({
    type: null,
    message: null,
  });

  const supabase = createClient();

  const handleSubmit = async () => {
    if (rating === 0) {
      setStatus({ type: "error", message: "Please select a star rating." });
      return;
    }
    
    setLoading(true);
    setStatus({ type: null, message: null });

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setStatus({ type: "error", message: "Please login to submit your feedback." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("site_testimonials").insert({
      user_id: user.id,
      rating,
      quote,
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      setStatus({ type: "success", message: "Successfully submitted! It will appear after review." });
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          How would you rate us?
        </Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="transition-transform active:scale-90 outline-none"
            >
              <Star
                className={`w-5 h-5 ${
                  (hover || rating) >= star 
                    ? "fill-yellow-500 text-yellow-500" 
                    : "text-gray-200"
                } transition-colors cursor-pointer`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 flex-1">
        <Label htmlFor="quote" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Your Feedback
        </Label>
        <Textarea
          id="quote"
          placeholder="Tell us about your experience..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="min-h-[150px] border-gray-200 focus-visible:ring-black rounded-none shadow-none text-base"
        />
      </div>

      {status.message && (
          <p className={`text-sm font-medium ${
            status.type === "success" ? "text-green-600" : "text-red-500"
          } animate-in fade-in slide-in-from-bottom-2`}>
            {status.message}
          </p>
        )}

      <div className="pt-4 border-t space-y-4">
        <Button 
          onClick={handleSubmit} 
          disabled={loading || !quote || rating === 0}
          className="w-full bg-black text-white hover:bg-zinc-800 h-12 rounded-none transition-all uppercase tracking-widest text-xs"
        >
          {loading ? "Sending..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
};
