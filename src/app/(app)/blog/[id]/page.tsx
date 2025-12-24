import { articles } from "@/src/constants";
import { ParamsId } from "@/src/types/products"
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params }: ParamsId) => {
    const { id:articleId } = await params;
    const article = articles.find(a => (a.id===Number(articleId)));
    if (!article) {
      return notFound();
    }
    const {title, excerpt, image_url} = article;

  return (
    <main className="min-h-screen bg-white mx-auto px-5 md:px-20 lg:px-30 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-5 lg:pt-20 pb-20">
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-4/3 lg:aspect-3/4 w-full overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={image_url}
                alt={title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <nav className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">
              <span className="hover:text-black cursor-pointer">Journal</span>
              <span className="mx-1 lg:mx-2">/</span>
              <span className="text-black">Article</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl mb-5 xl:mb-8 font-serif text-gray-900 leading-tight">
              {title}
            </h1>

            <div className="flex items-center space-x-5 text-[10px] sm:text-xs text-gray-500 pb-1 xl:pb-2 border-b">
              <span>By FASCO Editorial</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span>5 min read</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none md:mt-4">
              {excerpt.split('. ').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 xl:mb-6 text-sm sm:text-base xl:text-lg font-light">
                  {paragraph}{index !== excerpt.split('. ').length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
    </main>
  )
}

export default page