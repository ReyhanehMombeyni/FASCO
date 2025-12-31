"use client";

import { useActionState } from "react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { subscribeToNewsletter } from "@/src/actions/newsletter";

interface FormState {
  error: string | null;
  success: boolean;
}

export const FormFooter = () => {

const [state, formAction, isPending] = useActionState(
    async (_prevStat: FormState, formData: FormData) => {
      const result = await subscribeToNewsletter(formData);
      
      if (result?.error) {
        toast.error(result.error);
        return { error: result.error, success: false };
      }
      toast.success("Successful");
      return { error: null, success: true };
    },
    { error: null, success: false }
  );
  
  return (
    <form action={formAction} className="w-full">
      <div style={{ boxShadow: "20px 70px 70px rgba(0, 0, 0, 0.2)" }}>
        <Input
          type="email"
          name="email"
          required
          key={state.success ? "reset" : "active"}
          autoComplete="email"
          placeholder="michael@ymail.com"
          className="w-full text-[8px] sm:text-xs lg:text-lg border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-0"
        />
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="text-[8px] sm:py-3 sm:px-5 sm:text-xs lg:text-base lg:py-6 lg:px-8 rounded-md transition-colors"
        >
          {isPending ? "Registering..." : "Subscribe Now"}
        </Button>
      </div>
    </form>
  );
};
