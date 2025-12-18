import { useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryKey: ["site_testimonials"], 
    queryFn: async () => {
      const supabase = createClient(); 
      const { data, error } = await supabase
        .from("site_testimonials")
        .select(`
          id,
          rating,
          quote,
          created_at,
          user:user_display_info(username)
        `)
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      
      return data as unknown as CommentDisplay[];
    },
    staleTime: 1000 * 60 * 30,
  });
};