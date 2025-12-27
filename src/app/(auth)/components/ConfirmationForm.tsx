"use client"
import { Button, Input } from "@/components/ui";
import { verifyOtpAction } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const ConfirmationForm = ({email}: {email: string}) => {
    const [code, setCode] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const [isPending, startTransition] = useTransition();
    
      const router = useRouter();

       const handleVerify = () => {
          if (code.length < 6) return;
      
          startTransition(async () => {
            const result = await verifyOtpAction(email, code);
            if (result.success) {
              router.push("/new-password");
            } else {
              setErrorMessage(result.message || "Invalid Code");
            }
          });
        };

  return (
    <div className="space-y-4 pt-7 lg:max-w-lg xl:max-w-xl">
       <Input
            placeholder="Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border-t-0 border-x-0 border-b rounded-none focus-visible:ring-0 px-0 pl-2 text-xs md:text-sm lg:text-md"
          />

          <Button
            onClick={handleVerify}
            disabled={isPending || code.length < 6}
            className="bg-black text-white hover:bg-gray-800 w-full text-sm md:text-md font-light h-10 md:h-12"
          >
            {isPending ? "Verifying..." : "Recover Account"}
          </Button>
          {errorMessage && <p className="text-center text-xs text-red-500">{errorMessage}</p>}
        </div>
  )
}
