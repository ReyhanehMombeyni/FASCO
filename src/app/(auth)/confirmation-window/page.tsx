import Image from "next/image";
import { Logo } from "@/src/components/shared";
import signupImg from "@/public/images/auth/login.jpg";
import { ConfirmationForm } from "../components/ConfirmationForm";

const ConfirmationPage = async ({ searchParams }: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const resolvedParams = await searchParams;
  const email = resolvedParams.email || "";

  return (
        <main className="min-h-screen">
          <div className="mx-10 mt-10 lg:mt-20 lg:mx-30 xl:mx-40 border-gray-200 border md:grid lg:grid-cols-3 items-center">
            <div className="hidden lg:block relative h-full lg:col-span-1">
              <Image
                src={signupImg}
                alt="FASCO fashion authentication"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0vw, 33vw"
              />
            </div>
            <div className="flex flex-col justify-between items-left px-5 py-15 w-full lg:col-span-2">
              <Logo />
              <h1 className="text-sm lg:text-lg font-serif font-extralight text-gray-800 tracking-wider pt-5">
                The Confirmation Code
              </h1>
              <p className="pt-25 text-[10px] sm:text-xs lg:text-sm text-gray-600">Please enter the 6-digit code sent to {email}</p>
              <ConfirmationForm email={email} />
            </div>
          </div>
        </main>
  );
};

export default ConfirmationPage;
