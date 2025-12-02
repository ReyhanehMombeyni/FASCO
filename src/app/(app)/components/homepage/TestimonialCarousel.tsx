import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
} from "@/components/ui";
import { Star } from "lucide-react";
import user from "@/public/images/homepage/user.png";
import Image from "next/image";

const testimonials = [
  {
    name: "James K.",
    title: "Traveler",
    avatarUrl: user,
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
  },
  {
    name: "Susan W.",
    title: "Entrepreneur",
    avatarUrl: user,
    quote:
      "Fantastic! Exactly what I was looking for. Thank you for making it awesome and most of all hassle free.",
    rating: 4,
  },
  {
    name: "Michael R.",
    title: "Developer",
    avatarUrl: user,
    quote:
      "A truly outstanding experience. Highly recommend this product to everyone looking for quality.",
    rating: 5,
  },
];

const renderStars = (rating: number) => (
  <div className="flex space-x-0.5 justify-center">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export function TestimonialCarousel() {

  return (
    <section className="w-full py-30 px-10 md:px-20 lg:px-30 bg-gray-100">
      <div className="text-center mb-12 mx-auto">
        <h2 className="text-2xl lg:text-4xl font-serif text-gray-800 tracking-wider">
          This Is What Our Customers Say
        </h2>
        <p className="text-xs lg:text-sm font-extralight text-gray-500 mt-4 px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis
        </p>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="flex items-center">
          {testimonials.map(
            ({ quote, avatarUrl, rating, name, title }, index) => (
              <CarouselItem
                key={index}
                className= "transition-transform duration-300 basis-full md:basis-4/5 lg:basis-3/5 2xl:basis-2/5 px-0">
                <Card
                  className="my-1 rounded-xl max-w-2xl bg-white">
                  <CardContent className="flex items-center gap-5 justify-center py-15 relative">
                    <div>
                      <Image
                        src={avatarUrl}
                        alt={name}
                        width={250}
                        height={250}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-700 text-center italic mb-4 mt-2">
                        {quote}
                      </p>
                      {renderStars(rating)}
                      <div className="w-1/4 h-px bg-gray-300 my-4"></div>
                      <p className="text-xl font-bold text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">{title}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="flex justify-center items-center space-x-4">
          <CarouselPrevious className="h-10 w-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
          />
          <CarouselNext className="h-10 w-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
          />
        </div>
      </Carousel>
    </section>
  );
}
