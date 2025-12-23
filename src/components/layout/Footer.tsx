"use client";
import Image from "next/image";
import Link from "next/link";
import menFooter from "@/public/images/footer/menFooter.png";
import womenFooter from "@/public/images/footer/womenFooter.png";
import { FormFooter } from "./FormFooter";
import { Logo } from "../shared";

const footerLinks = [
  { name: "Support Center", href: "/support" },
  { name: "About Us", href: "/about-us" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ.s", href: "/faq" },
];
export const Footer = () => {
  return (
    <footer className="px-5 md:px-20 lg:px-30 bg-white">
      <div className="w-full py-8 lg:pt-20 lg:pb-12 flex items-center justify-between gap-5">
        <div className="hidden lg:block">
          <Image
            src={menFooter}
            alt="Model in gray coat"
            width={250}
            height={400}
            loading="lazy"
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="mx-auto text-center">
          <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-medium text-gray-800 mb-6 tracking-wider">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-[8px] sm:text-xs lg:text-sm text-gray-600 mb-8 max-w-lg mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin.
          </p>
          <FormFooter />
        </div>

        <div>
          <Image
            src={womenFooter}
            alt="Model in gray coat"
            width={250}
            height={400}
            className="h-auto w-auto"
            style={{ width: "auto", height: "auto" }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full  border-t border-gray-100">
        <div className="py-4 flex items-center justify-between">
          <div>
            <Logo />
          </div>

          <ul className="text-xs text-gray-600 flex items-center gap-4 md:gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-black transition-colors whitespace-nowrap mb-2 sm:mb-0"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-xs text-gray-500 py-3">
          Copyright © 2023 Xpro. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
