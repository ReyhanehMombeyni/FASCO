import Image, { StaticImageData } from "next/image"

export interface HeaderProps {
        src: StaticImageData;
        title?: string;
        description?: string;
    }

export const HeaderSection = ({src, title="", description=""}: HeaderProps) => {
    
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt="FASCO Branding"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10 text-center text-white space-y-4 px-4 shadow-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif tracking-tighter">
            {title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl font-light max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        </div>
      </section>
  )
}
