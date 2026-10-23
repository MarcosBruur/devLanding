export type ServiceIcon = 'cloud' | 'tools' | 'code'

export interface Service {
  id: string
  title: string
  description: string
  icon: ServiceIcon
}
