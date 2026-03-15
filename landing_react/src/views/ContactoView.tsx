import { ContactForm } from "../components/contact/ContactForm";
import { SocialLinkButton } from "../components/contact/SocialLinkButton";
import { contactSocialLinks } from "../data/content";

export function ContactoView() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-black/10 bg-accent/15"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            Hablemos de tu proyecto
          </h2>
          <p className="text-black/85">
            Contame que problematica tienes o que queres mejorar y te propongo
            una solucion concreta.
          </p>
          <div className="space-y-2 text-sm text-black/75 sm:text-base">
            <p>
              <span className="font-bold">Email:</span> marcosbruur@gmail.com
            </p>
            <p>
              <span className="font-bold">Respuesta estimada:</span> dentro de
              24 horas habiles
            </p>
            <p>
              <span className="font-bold">Numero tel:</span> +543865452354
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {contactSocialLinks.map((link) => (
              <SocialLinkButton key={link.label} link={link} />
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
