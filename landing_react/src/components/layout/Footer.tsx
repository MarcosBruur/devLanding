export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/cohete_3.png" alt="Logo de MBRU Desarrollo" className="h-10 w-10" />
          <span className="text-sm font-semibold tracking-wide">MBRU Desarrollo</span>
        </div>
        <p className="text-sm text-black/70">
          © {currentYear} MBRU Desarrollo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
