import type { Product } from "../types/catalog";

// Illustrative content only. Replace it with approved product information before publishing.
export const products: Product[] = [
  {
    id: "1",
    name: "TPV",
    description:
      "Sistema de gestión de negocios pensado para administrar todo desde un mismo punto, podés gestionar tu stock, empleados, clientes y ventas. Además cuentas con un modulo de reportes para siempre estar al tanto de cómo va tu negocio y tomar decisiones más acertadas.",
    video: "/static/frontend/previews/tpv.mp4",
    videoPreviewAspectRatio: 2.02,
    plans: [
      {
        id: "regular",
        name: "Plan regular",

        price: null,
        features: [
          "Control de Stock",
          "Configuracion de comercio",
          "Gestión de ventas",
          "Control de gastos",
          "Gestion de equipo",
          "Reportes y estadisticas",
        ],
        restrictions: [
          "Configuracion de facturacion",
          "Emision de factura electrónica",
        ],
      },
      {
        id: "enterprise",
        name: "Plan Enterprise",

        price: null,
        features: [
          "Control de Stock",
          "Configuracion de comercio",
          "Gestión de ventas",
          "Control de gastos",
          "Gestion de equipo",
          "Reportes y estadisticas",
          "Configuracion de facturacion",
          "Emision de factura electrónica",
        ],
        restrictions: [],
      },
    ],
  },
  {
    id: "2",
    name: "Gestion Gastronomía",
    description:
      "Sistema de gestión de negocios del sector gastronómico pensado para administrar todo desde un mismo punto, podés gestionar tus pedidos, empleados, cocina y ventas. Además cuentas con un modulo de reportes para siempre estar al tanto de cómo va tu negocio y tomar decisiones más acertadas.",
    video: "/static/frontend/previews/bar.mp4",
    videoPreviewAspectRatio: 1.92,
    plans: [
      {
        id: "regular",
        name: "Plan regular",
        price: null,
        features: [
          "Gestion de pedidos",
          "Gestion de cocina",
          "Gestion de mesas",
          "Reportes y estadisticas",
        ],
        restrictions: ["Facturación electrónica", "Integración con deliverys"],
      },
      {
        id: "enterprise",
        name: "Plan Enterprise",

        price: null,
        features: [
          "Gestion de pedidos",
          "Gestion de cocina",
          "Gestion de mesas",
          "Reportes y estadisticas",
          "Facturación electrónica",
          "Integración con deliverys",
        ],
        restrictions: [],
      },
    ],
  },
];
