"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpFormData } from "@/src/schemas/SignupSchema";
import { useState, useTransition } from "react";
import Link from "next/link";
import { signUpUser } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
} from "@/components/ui";

export const SignupForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (userData: SignUpFormData) => {
    setSubmissionStatus(null);
    startTransition(async () => {
      const result = await signUpUser(userData);
      if (!result.success) {
        setSubmissionStatus(
          result.message || "error: An unknown error occurred."
        );
        return;
      }

      if (result.user) {
        const {
          email,
          user_metadata: { username },
        } = result?.user;
        setUser({ email: email!, username });
        router.push("/dashboard");
      }
    });
  };

  return (
    <section className="w-full pt-10 space-y-6 lg:max-w-lg xl:max-w-xl bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="User Name" {...field}
                                          className="text-xs md:text-sm lg:text-md"
 />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                      type="email"
                                          className="text-xs md:text-sm lg:text-md"
/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password"                      className="text-xs md:text-sm lg:text-md"
 />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      type="password"
                                            className="text-xs md:text-sm lg:text-md"

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-sm h-10 md:text-md font-light md:h-12 mt-4"
            disabled={isPending}
          >
            {isPending ? "Sending" : "Create Account"}
          </Button>

          {submissionStatus && (
            <p className="text-center text-xs md:text-sm">{submissionStatus}</p>
          )}

          <div className="text-center pt-2">
            <span className="text-xs md:text-sm text-gray-600">
              Already have an account?
            </span>
            <Link href="/login" className="text-blue-500 hover:underline ml-1">
              login
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
};
