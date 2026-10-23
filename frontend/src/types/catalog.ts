export interface Price {
  amount: number;
  currency: string;
}

export interface Plan {
  id: string;
  name: string;
  price: Price | null;
  features: string[];
  restrictions: string[];
}

export interface Product {
  id: string;
  name: string;
  img?: string;
  description: string;
  video?: string;
  videoPreviewAspectRatio?: number;
  plans: Plan[];
}
