import type { Service } from '../types/service'

export const services: Service[] = [
  {
    id: 'saas',
    title: 'Productos SaaS',
    description: 'Soluciones de software en la nube, listas para usar y pensadas para simplificar la gestión diaria de tu negocio.',
    icon: 'cloud',
  },
  {
    id: 'sistemas-a-medida',
    title: 'Sistemas a medida',
    description: 'Sistemas de stock, caja, facturación y reportes. Todo adaptado a tu negocio.',
    icon: 'tools',
  },
  {
    id: 'desarrollo-web',
    title: 'Desarrollo web',
    description: 'Dale presencia en internet a tu negocio con nuestros sitios web optimizados para buscadores.',
    icon: 'code',
  },
]
