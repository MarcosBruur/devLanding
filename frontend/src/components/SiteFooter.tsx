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
        <a href="/#productos">
          Explorar productos <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MBRUTECH - Córdoba, Argentina</span>
        <span className="footer-brand">
          <img src="/static/logo.jpeg" alt="" width="32" height="32" />
          BRUTECH, de ideas a código
        </span>
        <a href="#top">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
