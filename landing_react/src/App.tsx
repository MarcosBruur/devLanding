import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { HeroSection } from "./components/layout/HeroSection";
import { CasosExitoView } from "./views/CasosExitoView";
import { ContactoView } from "./views/ContactoView";
import { ServiciosView } from "./views/ServiciosView";

import { SobreMiView } from "./views/SobreMiView";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-black">
      <Header />
      <HeroSection />
      <ServiciosView />
      <CasosExitoView />
      <SobreMiView />
      <ContactoView />
      <Footer />
    </main>
  );
}
