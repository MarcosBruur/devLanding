export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            MBRU Desarrollo
          </span>
        </a>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#sobre-mi" className="transition hover:text-highlight">
            Sobre mi
          </a>
          <a href="#servicios" className="transition hover:text-highlight">
            Servicios
          </a>
          <a href="#casos" className="transition hover:text-highlight">
            Casos de exito
          </a>
          <a href="#contacto" className="transition hover:text-highlight">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
