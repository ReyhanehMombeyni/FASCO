import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold tracking-tight">My Account</h2>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start font-normal">
              Overview
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start font-normal text-gray-500">
              Go to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="ghost" className="w-full justify-start font-normal text-gray-500">
              Go to Shop
            </Button>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}