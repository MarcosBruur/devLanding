import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { SocialLinkButton } from "../components/contact/SocialLinkButton";
import { aboutMe, aboutSocialLinks } from "../data/content";

export function SobreMiView() {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isProfileMobilePlaying, setIsProfileMobilePlaying] = useState(false);

  return (
    <section
      id="sobre-mi"
      className="scroll-mt-24 border-y border-black/10 bg-white"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-16 lg:px-8">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-medium text-highlight">
            Sobre mi
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            {aboutMe.name}
          </h2>
          <p className="text-base font-semibold text-black/85">
            {aboutMe.role}
          </p>
          <p className="text-sm text-black/70">{aboutMe.years}</p>
          <p className="text-black/80">{aboutMe.intro}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {aboutSocialLinks.map((link) => (
              <SocialLinkButton key={link.label} link={link} />
            ))}
          </div>
        </div>
        <div className="rounded-none p-0 sm:rounded-2xl sm:p-3">
          <div className="relative left-1/2 mb-4 w-screen -translate-x-1/2 sm:hidden">
            <div className="relative aspect-[16/10] overflow-hidden rounded-none">
              {isProfileMobilePlaying ? (
                <video
                  src="/marcos2.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <img
                  src="/marcos.png"
                  alt="Marcos Bruno"
                  className="h-full w-full object-cover object-center"
                />
              )}
              <button
                type="button"
                aria-label={
                  isProfileMobilePlaying
                    ? "Pausar video de perfil"
                    : "Reproducir video de perfil"
                }
                onClick={() => setIsProfileMobilePlaying((prev) => !prev)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition hover:bg-black/30"
              >
                {isProfileMobilePlaying ? (
                  <PauseIcon className="h-12 w-12" />
                ) : (
                  <PlayIcon className="h-12 w-12" />
                )}
              </button>
            </div>
          </div>

          <div
            className="mb-4 hidden overflow-hidden rounded-xl sm:block"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            {isProfileHovered ? (
              <video
                src="/marcos2.mp4"
                muted
                autoPlay
                loop
                playsInline
                className="h-full w-full bg-white object-contain object-center"
              />
            ) : (
              <img
                src="/marcos.png"
                alt="Marcos Bruno"
                className="h-full w-full bg-white object-contain object-center"
              />
            )}
          </div>
          <p className="text-lg text-black/80 font-bold">
            Si queres saber mas sobre mi y mi trabajo, te invito a ingresar a{" "}
            <a
              href="https://mbuportfolio.netlify.app/"
              className="text-primary hover:underline"
              target="_blank"
            >
              mi portfolio
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
