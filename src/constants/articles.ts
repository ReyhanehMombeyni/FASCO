import jean from "@/public/images/blog/jean.jpg";
import accessories from "@/public/images/blog/acce.jpg";
import inverno from "@/public/images/blog/inverno.jpg";
import clothing from "@/public/images/blog/clothing.jpg"
import { StaticImageData } from "next/image";

export interface ArticlesType {
  id: number;
  title: string;
  excerpt: string;
  image_url: StaticImageData;
}

export const articles: ArticlesType[] = [
  {
    id: 1,
    title: "The denim jacket, an undisputed hero in the fashion!",
    excerpt:
      "The denim jacket, an undisputed hero in the world of fashion! This timeless item has found its place in both men's and women's wardrobes for decades. But did you know that a denim jacket isn't just for casual wear? With a little creativity and understanding of styling principles, you can wear it in various settings and with diverse outfits. In this article, we'll share some exciting ideas to help you shine with your denim jacket. A denim jacket is an excellent investment for your wardrobe. With just a few simple ideas, you can create diverse and appealing outfits from a single item. Don't be afraid to experiment and challenge yourself with new combinations. Now, it's time to pull out your favorite denim jacket and shine!",
    image_url: jean,
  },
  {
    id: 2,
    title: "7 Essential Accessories Every Stylish Man Must Own",
    excerpt:
      "Great style isn't just about choosing the right clothes; it's the small details that make all the difference. Accessories are powerful tools that can transform an ordinary outfit into a striking and personality-driven look. For men looking to elevate their appearance, we've compiled a list of 7 essential accessories that every stylish man should have in his wardrobe. Accessories are your personal signature on your style. By wisely choosing these 7 essential items, you can easily elevate your look and stand out in any crowd. Remember that quality and proper fit are two key principles in selecting men's accessories.",
    image_url: accessories,
  },
  {
    id: 3,
    title: "10 Essential Wardrobe Staples Every Stylish Woman Needs",
    excerpt:
      "Having a closet full of clothes you don't know how to style together is a common challenge for many women. But the secret to always having a chic and ready-to-go outfit lies in owning a few key pieces that mix and match effortlessly. In this article, we introduce 10 essential clothing items that, once you have them, will ensure you're always prepared for any occasion. Having these 10 essential clothing pieces empowers you to create countless stylish outfits with minimal effort. These are items that never go out of style and will help you always look chic and put-together. It's time to curate your wardrobe smartly and enjoy the power of their versatility!",
    image_url: inverno,
  },
];
