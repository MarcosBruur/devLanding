import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: Props) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.classList.add('is-visible')
      observer.unobserve(element)
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={elementRef} className={`scroll-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}
