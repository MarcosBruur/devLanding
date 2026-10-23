import { useState } from "react";
import type { Product } from "../types/catalog";
import { PlanSelector } from "./PlanSelector";
import { ProductMedia } from "./ProductMedia";

interface Props {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPlan = product.plans.find((plan) => plan.id === selectedId);

  return (
    <article
      className="product-card"
      aria-labelledby={`product-title-${product.id}`}
    >
      <ProductMedia product={product} index={index} />
      <div className="product-content">
        <div className="product-info">
          <h3 id={`product-title-${product.id}`}>{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="product-choose">
          <PlanSelector
            plans={product.plans}
            productId={product.id}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          {selectedPlan ? (
            <a
              className="continue-button"
              href={`/contratar/${encodeURIComponent(product.id)}/${encodeURIComponent(selectedPlan.id)}`}
              aria-label={`Continuar con ${selectedPlan.name} de ${product.name}`}
            >
              <span>Continuar</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button
              className="continue-button"
              type="button"
              disabled
              aria-label={`Elegí un plan de ${product.name} para continuar`}
            >
              <span>Seleccioná un plan para continuar</span>
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
