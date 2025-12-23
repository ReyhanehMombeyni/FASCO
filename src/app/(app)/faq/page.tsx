import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { HeaderSection } from "@/src/components/shared";
import { faqs, headerSectionData } from "@/src/constants";

export default function FAQPage() {
  const { about_us } = headerSectionData;
  return (
    <main>
      <HeaderSection {...about_us} />
      <section className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-serif text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm text-gray-700 lg:text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs lg:text-sm text-gray-500">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
