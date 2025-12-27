"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage, Button, Input } from "@/components/ui";
import { resetPasswordAction } from "@/src/actions/auth";

const schema = z.object({ email: z.string().email("Invalid email address") });

export const ForgetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = (data: z.infer<typeof schema>) => {
    startTransition(async () => {
      const result = await resetPasswordAction(data.email);
      setMessage(result.message);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-7 lg:max-w-lg xl:max-w-xl">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Email Address" {...field} className="text-xs md:text-sm lg:text-md" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-sm md:text-md font-light h-10 md:h-12 bg-black text-white" disabled={isPending}>
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
        {message && <p className="text-center text-xs text-blue-600">{message}</p>}
      </form>
    </Form>
  );
};