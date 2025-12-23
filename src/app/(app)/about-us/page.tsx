import Link from "next/link";
import { Button } from "@/components/ui";
import { CommentForm } from "@/src/components/layout/commentForm";
import { headerSectionData, Highlights } from "@/src/constants";
import { HeaderSection } from "@/src/components/shared";

export default function AboutPage() {
  const {about_us} = headerSectionData;
  return (
    <main className="flex flex-col w-full">
      <HeaderSection {...about_us} />

      <section className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-sm uppercase tracking-widest md:tracking-widest xl:tracking-[0.3em] text-gray-400 font-medium">
            Our Story
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-900 leading-tight">
            Founded on the principle of elegance and comfort.
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed xl:text-lg">
            At FASCO, we believe that clothing is more than just an outfit; it
            is a reflection of your personality and self-confidence. Our journey
            began in 2023, driven by a mission to blend unparalleled quality
            with minimalist designs.
          </p>
        </div>
        <div className="relative h-[500px] bg-gray-50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center font-serif italic p-10 w-full">
            <CommentForm />
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {Highlights.map((value, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-serif italic">{value.title}</h3>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed border-t border-white/10 pt-8">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center space-y-8 bg-white">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-serif">
          Want to see our collection?
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            asChild
            className="bg-black text-white h-10 md:px-5 lg:px-10 lg:h-12 rounded-none hover:bg-zinc-800 transition-all"
          >
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="lg:px-10 h-10 md:px-5 lg:h-12 rounded-none border-black text-black"
          >
            <Link href="/support">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
