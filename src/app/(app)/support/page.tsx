import { HeaderSection } from "@/src/components/shared";
import { headerSectionData } from "@/src/constants";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function SupportPage() {
  const {about_us} = headerSectionData;
  return (
    <main>
      <HeaderSection {...about_us} />
    <section className="text-center py-20">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-serif mb-4 text-gray-800 mx-auto">How can we help?</h1>
      <p className="text-gray-500 mb-15 text-xs md:text-sm">Our team is here to support you 24/7.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-950 text-white md:px-5 lg:px-30">
        <div className="p-10 hover:shadow-lg transition-shadow">
          <Mail className="mx-auto mb-4 w-10 h-10" />
          <h3 className="mb-2">Email Us</h3>
          <p className="text-xs md:text-sm text-gray-500">support@fasco.com</p>
        </div>
        <div className="p-10 hover:shadow-lg transition-shadow">
          <Phone className="mx-auto mb-4 w-10 h-10" />
          <h3 className="mb-2">Call Us</h3>
          <p className="text-xs md:text-sm text-gray-500">+1 (555) 000-1234</p>
        </div>
        <div className="p-10 hover:shadow-lg transition-shadow">
          <MessageSquare className="mx-auto mb-4 w-10 h-10" />
          <h3 className="mb-2">Live Chat</h3>
          <p className="text-xs md:text-sm text-gray-500">Available on business days</p>
        </div>
      </div>
    </section>
    </main>
  );
}