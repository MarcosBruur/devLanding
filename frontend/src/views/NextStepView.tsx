import { SiteFooter } from '../components/SiteFooter'
import { products } from '../data/products'

interface Props {
  productId: string
  planId: string
}

export function NextStepView({ productId, planId }: Props) {
  const product = products.find((item) => item.id === productId)
  const plan = product?.plans.find((item) => item.id === planId)

  return (
    <>
      <main id="top" className="next-page">
        <div className="next-top"><a className="wordmark" href="/" aria-label="MBU, inicio">MBU<span className="brand-dot">.</span></a><span>SIGUIENTE PASO / 01</span></div>
        <section className="next-content" aria-labelledby="next-title">
          <p className="eyebrow"><span className="small-star" aria-hidden="true">✳</span> {plan ? 'TU SELECCIÓN' : 'ENLACE NO DISPONIBLE'}</p>
          <h1 id="next-title">{plan ? <>Un paso <em>más cerca.</em></> : <>No encontramos<br /><em>esa selección.</em></>}</h1>
          <p className="next-lead">{plan ? 'Esta es la versión que elegiste. El proceso de contratación estará disponible próximamente.' : 'El producto o la versión del enlace no está disponible. Volvé al catálogo para elegir una opción.'}</p>
          {plan && product && <div className="selection-summary"><div><span>PRODUCTO</span><strong>{product.name}</strong></div><div><span>VERSIÓN</span><strong>{plan.name}</strong></div><div><span>PRECIO</span><strong>{plan.price ? plan.price.amount === 0 ? 'Gratis' : new Intl.NumberFormat('es-AR', { style: 'currency', currency: plan.price.currency }).format(plan.price.amount) : 'A definir'}</strong></div></div>}
          <a className="back-link" href="/#productos"><span aria-hidden="true">←</span> Volver a los productos</a>
        </section>
        <span className="next-deco" aria-hidden="true">↗</span>
      </main>
      <SiteFooter />
    </>
  )
}
