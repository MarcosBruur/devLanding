export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p>
          Tu próximo paso
          <br />
          <em>empieza en</em>
          <br />
          <em>BRUTECH</em>
        </p>
        <div className="footer-main-links">
          <a href="/#productos">
            Explorar productos <span aria-hidden="true">↗</span>
          </a>
          <a href="/#contacto">
            Contacto <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          <span>
            © {new Date().getFullYear()} MBRUTECH - Córdoba, Argentina
          </span>
          <div className="footer-socials" aria-label="Redes sociales">
            <a
              href="https://github.com/MarcosBruur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (abre en otra pestaña)"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.95 2.13 3.27 1.5.1-.72.39-1.2.71-1.48-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.2c.95 0 1.9.13 2.79.38 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.07v3.02c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/marcos_bruno_ur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (abre en otra pestaña)"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="18"
                  cy="6"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
          </div>
        </div>
        <span className="footer-brand">
          <img src="/static/logo.jpeg" alt="" width="32" height="32" />
          BRUTECH, de ideas a código
        </span>
        <a href="#top">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
