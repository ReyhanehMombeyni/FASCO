import { Button } from "@/components/ui/button";
import Image from "next/image";
import LeftMen from "@/public/images/homepage/leftMen.svg";
import Womens from "@/public/images/homepage/womens.jpg";
import SmileWomens from "@/public/images/homepage/smileWomens.jpg";
import RightMen from "@/public/images/homepage/rightMen.svg";


export function HeroHeader() {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 my-5 md:my-10 lg:my-15 px-10 md:px-20 lg:px-30">
      <div className="hidden lg:block relative bg-gray-200 rounded-2xl">
        <Image
          src={LeftMen}
          alt="Man standing"
          fill
          className="object-contain pt-10"
        />
      </div>

      <div className="flex flex-col justify-between bg-white">
        <div className="flex items-end justify-center bg-gray-200 rounded-2xl h-35">
          <Image src={Womens} alt="Womens" width={360} height={200} className="rounded-2xl" />
        </div>

        <div className="text-center py-10">
          <h1 className="text-5xl font-extrabold tracking-widest leading-none opacity-50">
            ULTIMATE
          </h1>
          <h2 className="text-7xl font-thin tracking-widest border-b-2 border-t-2 border-black inline-block">
            SALE
          </h2>
          <p className="mt-2 text-sm font-light tracking-widest text-gray-600">
            NEW COLLECTION
          </p>
          <Button
            variant="default"
            className="mt-4 bg-black text-white hover:bg-gray-800 rounded-none px-10 py-5 text-sm tracking-widest font-semibold"
          >
            SHOP NOW
          </Button>
        </div>

        <div className="flex justify-center items-end rounded-2xl bg-[#FCAE9D] h-35">
          <Image
            src={SmileWomens}
            alt="Bottom models"
            width={300}
            height={200}
          />
        </div>
      </div>

      <div className="hidden lg:block relative bg-gray-200 rounded-2xl">
        <Image
          src={RightMen}
          alt="Man standing"
          fill
          className="object-contain"
        />
      </div>
    </header>
  );
}
