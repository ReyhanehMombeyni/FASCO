"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage, Button, Input } from "@/components/ui";
import { updatePasswordAction } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const NewPasswordForm = () => {
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { password: "", confirmPassword: "" } });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await updatePasswordAction(data.password);
    if (result.success) {
      toast.success("Password updated!");
      router.push("/login");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-7 lg:max-w-lg xl:max-w-xl">
        <div className="flex gap-3">
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormControl><Input placeholder="New Password" type="password" className="text-xs md:text-sm lg:text-md" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormControl><Input placeholder="Confirm New Password" type="password" className="text-xs md:text-sm lg:text-md" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" className="w-full text-sm md:text-md font-light h-10 md:h-12 bg-black text-white">Update Password</Button>
      </form>
    </Form>
  );
};