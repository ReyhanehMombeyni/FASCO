import { useEffect, useState } from "react";
import { createClient } from "@/src/supabase/client";

export interface CommentDisplay {
  id: string;
  rating: number;
  quote: string;
  created_at: string;
  user: {
    username: string;
  } | null;
}

export const useComments = () => {
  const [data, setData] = useState<CommentDisplay[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = await createClient();
        const { data: result, error: supabaseError } = await supabase.from("site_testimonials")
          .select(`
            id,
            rating,
            quote,
            created_at,
            user:user_display_info(username)
          `)
          .eq("is_featured", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;

        setData((result as unknown as CommentDisplay[]));
      } catch (err) {
        setData([]);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { data, loading };
};