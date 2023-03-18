import { ContactForm } from "@/components/contactPage/ContactForm";
import { Footer } from "@/components/reusableComponents/Footer";
import Header from "@/components/reusableComponents/Header";
import { PreFooter } from "@/components/reusableComponents/PreFooter";
import TopScrollProgress from "@/components/reusableComponents/TopScrollProgress";



export default function ContactPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
      <ContactForm />
      <PreFooter />
      <Footer />
    </>
  );
}
