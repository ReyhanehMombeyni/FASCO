import { HeaderSection } from "@/src/components/shared";
import { articles, headerSectionData } from "@/src/constants";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const {about_us} = headerSectionData;
  return (
    <main>
      <HeaderSection {...about_us} />
      <div className="max-w-6xl mx-auto py-20 px-5">
        <h1 className="text-xl md:text-3xl xl:text-4xl font-serif mb-12">FASCO Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map(({id, title, image_url, excerpt}) => (
            <div key={id} className="group cursor-pointer border rounded-xl shadow-2xl">
              <div className="relative h-50 overflow-hidden rounded-t-xl">
                <Image
                  src={image_url}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-5 pb-7">
                <h2 className="text-lg font-medium mb-2"><Link href={`/blog/${id}`}>
                  {title}
                </Link></h2>
                <p className="text-xs md:text-sm text-gray-500 mb-4">{`${excerpt.slice(0,215)} ...`}</p>
                <Link href={`/blog/${id}`} className="text-black font-semibold border-b border-black pb-1">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}