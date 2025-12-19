"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search, User } from "lucide-react";
import { LogoutButton } from "@/src/app/(auth)/components/LogoutButton";
import { useUserStore } from "@/src/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Skeleton,
} from "@/components/ui";
import { CommentForm } from "./commentForm";
import { CartDrawer } from "./CartDrawer";

export const RightNav = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <Search className="h-5 w-5 text-gray-700 cursor-pointer hover:text-black" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <User
                className="h-5 w-5 text-gray-700 cursor-pointer hover:text-black"
                aria-label="user menu"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="end">
              <DropdownMenuLabel className="text-lg font-serif">
                {user ? user.username : "Hello User"}
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-400" />

              <div className="px-3">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogoutButton />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-all group outline-none">
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 group-hover:fill-red-500" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[450px] p-6">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="font-serif text-xl">
                    Customer Feedback
                  </SheetTitle>
                </SheetHeader>

                <CommentForm onSuccess={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
          <div className="relative cursor-pointer">
            <CartDrawer />
          </div>
        </div>
      ) : (
        <div className="space-x-5">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
