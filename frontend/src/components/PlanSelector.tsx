import type { Plan } from "../types/catalog";

interface Props {
  plans: Plan[];
  productId: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PlanSelector({
  plans,
  productId,
  selectedId,
  onSelect,
}: Props) {
  return (
    <fieldset className="plan-fieldset">
      <div className="plan-grid">
        {plans.map((plan) => (
          <label
            className={`plan-option ${selectedId === plan.id ? "is-selected" : ""}`}
            key={plan.id}
          >
            <input
              type="radio"
              name={`plan-${productId}`}
              value={plan.id}
              checked={selectedId === plan.id}
              onChange={() => onSelect(plan.id)}
            />
            <span className="plan-top">
              <span className="plan-radio" aria-hidden="true" />
            </span>
            <span className="plan-name">{plan.name}</span>

            {plan.features.length + plan.restrictions.length > 0 ? (
              <span className="plan-feature-list" role="list">
                {plan.features.map((feature) => (
                  <span
                    className="plan-feature"
                    role="listitem"
                    key={`feature-${feature}`}
                  >
                    <span className="plan-feature-icon" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <span className="sr-only">Incluye: </span>
                      {feature}
                    </span>
                  </span>
                ))}
                {plan.restrictions.map((restriction) => (
                  <span
                    className="plan-feature is-unavailable"
                    role="listitem"
                    key={`restriction-${restriction}`}
                  >
                    <span className="plan-feature-icon" aria-hidden="true">
                      ×
                    </span>
                    <span>
                      <span className="sr-only">No incluye: </span>
                      {restriction}
                    </span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="plan-details">Características por definir.</span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
