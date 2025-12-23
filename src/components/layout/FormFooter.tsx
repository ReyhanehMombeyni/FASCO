"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { subscribeToNewsletter } from "@/src/actions/newsletter";

export const FormFooter = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleAction(formData: FormData) {
    setIsPending(true);
    const result = await subscribeToNewsletter(formData);
    setIsPending(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Succesfull");
      setEmail("");
    }
  }

  return (
    <form action={handleAction} className="w-full">
      <div style={{ boxShadow: "20px 70px 70px rgba(0, 0, 0, 0.2)" }}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
