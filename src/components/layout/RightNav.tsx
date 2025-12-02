"use client";

import { Button } from "@/components/ui";
import { LogoutButton } from "@/src/app/(auth)/components/LogoutButton";
import { useUserStore } from "@/src/store";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

export const RightNav = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => (state.user))

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
                {user ? user.username : "Hello User" }
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-400" />

              <div className="px-3">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                >
                  <LogoutButton />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Heart className="h-5 w-5 text-gray-700 cursor-pointer hover:text-black" />
          <div className="relative cursor-pointer">
            <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-black" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
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

