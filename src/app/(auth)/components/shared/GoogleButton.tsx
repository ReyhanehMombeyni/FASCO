"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import GoogleImg from "@/public/images/auth/google.svg";
import { signInWithGoogle } from "@/src/actions/auth";

export const GoogleButton = () => {

  return (
    <form action={signInWithGoogle}>
      <Button size="lg" variant="outline" type="submit" className="cursor-pointer">
          <div className="flex items-center gap-2">
          <Image src={GoogleImg} alt="google image" width={20} height={20} />
          <span>continue with google</span>
        </div>
        </Button>
        
      </form>
    
  );
};


