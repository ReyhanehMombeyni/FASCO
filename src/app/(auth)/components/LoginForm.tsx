"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/src/schemas/LoginSchema";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store";
import { signInUser } from "@/src/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
} from "@/components/ui";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userData: LoginFormData) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await signInUser(userData);
      if (!result.success) {
        setErrorMessage(result.message || "An unknown error occurred.");
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
    <section className="w-full pt-10 space-y-6 lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
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

          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" className="text-xs md:text-sm lg:text-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button
              className="w-full text-sm h-10 md:text-md text-blue-500 hover:text-blue-600 font-light md:h-12"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/signup">Register Now</Link>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="w-full text-sm md:text-md font-light h-10 md:h-12"
              disabled={isPending}
            >
              {isPending ? "Sending" : "Sign In"}
            </Button>
          </div>

          <div>
            <div className="text-end text-xs md:text-sm">
              <Link
                href="/forget-password"
                className="text-blue-500 hover:underline ml-1"
              >
                Forget Password!
              </Link>
            </div>

            <div className="text-center text-xs md:text-sm h-8 text-error">
              {errorMessage && <span>{errorMessage}</span>}
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};
