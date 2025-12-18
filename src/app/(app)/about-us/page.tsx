import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import aboutHero from "@/public/images/homepage/nav1.jpg";
import { CommentForm } from "@/src/components/layout/commentForm";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={aboutHero}
          alt="FASCO Branding"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10 text-center text-white space-y-4 px-4 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tighter">
            Redefining Modern Fashion
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
            FASCO is more than a brand; it is a statement of quality and
            timeless style.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
            Our Story
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
            Founded on the principle of elegance and comfort.
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
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
            {[
              {
                title: "High Quality",
                desc: "Using the finest global fabrics and materials.",
              },
              {
                title: "Timeless Design",
                desc: "Designs that never go out of style.",
              },
              {
                title: "Sustainability",
                desc: "Committed to sustainable production and environmental respect.",
              },
            ].map((value, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-2xl font-serif italic">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-8">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center space-y-8 bg-white">
        <h2 className="text-3xl md:text-4xl font-serif">
          Want to see our collection?
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            asChild
            className="bg-black text-white px-10 h-12 rounded-none hover:bg-zinc-800 transition-all"
          >
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="px-10 h-12 rounded-none border-black text-black"
          >
            <Link href="#">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
