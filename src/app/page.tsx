import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Services from "@/components/Services";
import Barbers from "@/components/Barbers";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <Hero />
      <Schedule />
      <Services />
      <Barbers />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
