export function HeroSection() {
  return (
    <section
      id="inicio"
      className="scroll-mt-24 grid gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:px-8"
    >
      <div className="order-2 space-y-6 lg:order-1">
        <div className="inline-flex items-center gap-3">
          <span className="inline-block rounded-full border border-primary/40 bg-linear-to-r from-secondary/25 to-accent/30 px-3 py-1 text-sm font-medium text-highlight">
            Desarrollo de software independiente
          </span>
          <img src="/cohete_3.png" alt="" className="size-20" />
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          Creamos el Software <br />
          <span className="text-primary">que tu empresa necesita</span>
        </h1>
        <p className="text-base text-black/80 sm:text-lg">
          Diseno y construyo soluciones a medida para empresas que quieren vender mas,
          trabajar mejor y automatizar procesos clave.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#contacto"
            className="rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white transition hover:bg-secondary"
          >
            Solicitar propuesta
          </a>
          <a
            href="#casos"
            className="rounded-lg border border-highlight px-5 py-3 text-center font-semibold text-highlight transition hover:bg-highlight/10"
          >
            Ver resultados reales
          </a>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl shadow-black/15">
          <img
            src="/imagen_1.jpg"
            alt="Cohete de MBRU Desarrollo"
            className="h-[320px] w-full object-cover sm:h-[480px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/75 to-transparent p-5 sm:p-6">
            <p className="text-center text-lg font-bold text-white sm:text-2xl">
              De idea a sistema funcionando, con foco en resultados medibles y
              experiencia de usuario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
