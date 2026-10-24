import { ProductCard } from "../components/ProductCard";
import { SiteFooter } from "../components/SiteFooter";
import { products } from "../data/products";
import { ScrollReveal } from "../components/ScrollReveal";
import { ServiceDetail } from "../components/ServiceDetail";
import { services } from "../data/services";
import { ContactSection } from "../components/ContactSection";
import { SiteHeader } from "../components/SiteHeader";

export function LandingView() {
  return (
    <>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <SiteHeader homeHref="#top" />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker">
                <span className="hero-kicker-line" aria-hidden="true" />
                Somos BRUTECH
                <span className="hero-kicker-line" aria-hidden="true" />
              </p>
              <h1 id="hero-title">
                <span className="hero-title-line">Tu negocio</span>
                <span className="hero-title-line">merece un</span>
                <span className="hero-title-line hero-title-accent">
                  sistema propio.
                </span>
              </h1>
              <p className="hero-description">
                Creamos herramientas digitales para potenciar tu negocio al
                siguiente nivel. Explorá nuestros productos y encontrá el que va
                con vos.
              </p>
              <a className="hero-link" href="#productos">
                Conocé nuestros productos <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="hero-art" aria-label="Productos de software MBU">
              <div className="hero-art-glow" />
              <div className="hero-product hero-product-back">
                <div className="mock-window-bar">
                  <i />
                  <i />
                  <i />
                  <span>Panel de control</span>
                </div>
                <div className="mock-dashboard">
                  <div className="mock-sidebar">
                    <b>MBU.</b>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="mock-main">
                    <span className="mock-label">RESUMEN GENERAL</span>
                    <b>Todo en orden.</b>
                    <div className="mock-stats">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="mock-chart">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-product hero-product-front">
                <div className="mock-window-bar">
                  <i />
                  <i />
                  <i />
                  <span>Tu negocio, en movimiento</span>
                </div>
                <div className="mock-highlight">
                  <span>UNA MEJOR FORMA DE TRABAJAR</span>
                  <b>
                    Menos tareas.
                    <br />
                    Más posibilidades.
                  </b>
                  <i>EXPLORÁ TU PRÓXIMO PASO ↗</i>
                </div>
              </div>
              <div className="art-caption">
                <span className="brand-dot">✳</span> TECNOLOGÍA PENSADA PARA VOS
              </div>
            </div>
          </div>
          <div className="hero-bottom"></div>
        </section>
        <section className="services-section" aria-labelledby="services-title">
          <div className="services-inner">
            <ScrollReveal>
              <div className="services-heading">
                <p className="eyebrow">NUESTROS SERVICIOS</p>
                <h2 id="services-title">¿Qué hacemos?</h2>
              </div>
            </ScrollReveal>
            <div className="services-grid">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} delay={index * 100}>
                  <ServiceDetail service={service} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <section
          className="catalog-section"
          id="productos"
          aria-labelledby="catalog-title"
        >
          <ScrollReveal className="section-heading-reveal">
            <div className="section-heading">
              <div>
                <h2 id="catalog-title">
                  Echale un vistazo a
                  <br />
                  <em>Nuestros productos.</em>
                </h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="product-list">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 120}>
                <ProductCard product={product} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
