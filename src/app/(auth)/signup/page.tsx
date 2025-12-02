import Image from "next/image";
import signupImg from "@/public/images/auth/signup.jpg";
import { Logo } from "@/src/components/shared";
import { GoogleButton, OrSeparator, SignupForm } from "../components";

const page = () => {
  return (
    <main className="m-10 lg:my-15 lg:mx-30 xl:mx-40 border-gray-200 border md:grid lg:grid-cols-3 items-center">
      <div className="hidden lg:block relative h-full lg:col-span-1">
        <Image src={signupImg} alt="My photo" fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between items-left px-5 py-5 w-full lg:col-span-2">
        <Logo />
        <h1 className="text-sm lg:text-lg font-serif font-extralight text-gray-800 tracking-wider pt-5">
          Sign in to FASCO
        </h1>
        <div className="text-center pt-2">
          <GoogleButton />
        </div>
        <div className="flex justify-center items-center">
          <OrSeparator />
        </div>
        <SignupForm />
      </div>
    </main>
  );
};

export default page;
