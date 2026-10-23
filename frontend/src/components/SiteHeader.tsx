interface Props {
  homeHref?: string;
}

export function SiteHeader({ homeHref = "/" }: Props) {
  return (
    <header className="hero-meta">
      <a className="landing-logo" href={homeHref} aria-label="Ir al inicio">
        <img src="/static/logo.jpeg" alt="" width="72" height="72" />
      </a>
      <span className="hero-meta-right">BRUTECH</span>
    </header>
  );
}
