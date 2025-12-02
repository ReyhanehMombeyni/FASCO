'use client'
import Image from "next/image";
import menFooter from "@/public/images/footer/menFooter.png";
import womenFooter from "@/public/images/footer/womenFooter.png";
import { FormFooter } from "./FormFooter";
import { Logo } from "../shared";
import Link from "next/link";

const footerLinks = [
  { name: "Support Center", href: "#" },
  { name: "Invoicing", href: "#" },
  { name: "Contract", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Blog", href: "#" },
  { name: "FAQ.s", href: "#" },
];
export const Footer = () => {

  return (
    <footer className="px-5 md:px-20 lg:px-30">
      <div className="w-full bg-white py-8 lg:pt-20 lg:pb-12 flex items-center justify-between gap-5">
          <div className="hidden lg:block">
            <Image
              src={menFooter}
              alt="Model in gray coat"
              width={250} 
              height={400} 
            />
          </div>

          <div className="mx-auto text-center">
            <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-medium text-gray-800 mb-6 tracking-wider">
              Subscribe To Our Newsletter
            </h2>
            <p className="text-[8px] sm:text-xs lg:text-sm text-gray-600 mb-8 max-w-lg mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
              duis ultrices sollicitudin.
            </p>
            <FormFooter />
          </div>

          <div>
            <Image
              src={womenFooter}
              alt="Model in gray coat"
              width={250} 
              height={400} 
            />
          </div>
      </div>
      <div className="w-full bg-white border-t border-gray-100">
        <div className="mx-auto py-4 gap-4 flex flex-col items-start md:flex-row md:items-center justify-between">
            <Logo />

          <ul className="grid grid-cols-3 text-xs w-full gap-2 sm:grid-cols-6 lg:space-x-8 text-gray-600">
            {footerLinks.map((link) => ( <li key={link.name}>
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
