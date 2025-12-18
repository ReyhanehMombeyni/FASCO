"use client";

import { useEffect } from "react";
import { createClient } from "@/src/supabase/client";
import { useUserStore } from "@/src/store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          email: session.user.email!,
          username: session.user.user_metadata.username,
        });
      } else {
        clearUser();
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email!,
          username: session.user.user_metadata.username,
        });
      } else {
        clearUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, clearUser]);

  return <>{children}</>;
};