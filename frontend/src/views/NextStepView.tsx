import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WHATSAPP_URL } from "../api/contact";
import { products } from "../data/products";

interface Props {
  productId: string;
  planId: string;
}

export function NextStepView({ productId, planId }: Props) {
  const product = products.find((item) => item.id === productId);
  const plan = product?.plans.find((item) => item.id === planId);
  const requestUrl = new URL(WHATSAPP_URL);

  if (product && plan) {
    requestUrl.searchParams.set(
      "text",
      `Hola, hablo para solicitar el producto ${product.name} en su plan ${plan.name}`,
    );
  }

  return (
    <>
      <main id="top" className="next-page">
        <SiteHeader />
        <section className="next-content" aria-labelledby="next-title">
          <h1 id="next-title">
            {plan ? (
              <>
                Un paso <em>más cerca.</em>
              </>
            ) : (
              <>
                No encontramos
                <br />
                <em>esa selección.</em>
              </>
            )}
          </h1>

          {plan && product && (
            <div className="selection-summary">
              <div>
                <span>PRODUCTO</span>
                <strong>{product.name}</strong>
              </div>
              <div>
                <span>VERSIÓN</span>
                <strong>{plan.name}</strong>
              </div>
              <div>
                <a
                  className="request-button"
                  href={requestUrl.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Solicitar ${plan.name} de ${product.name} por WhatsApp (abre una nueva pestaña)`}
                >
                  Solicitar
                </a>
              </div>
            </div>
          )}
          <a className="back-link" href="/#productos">
            <span aria-hidden="true">←</span> Volver
          </a>
        </section>
        <span className="next-deco" aria-hidden="true">
          ↗
        </span>
      </main>
      <SiteFooter />
    </>
  );
}
