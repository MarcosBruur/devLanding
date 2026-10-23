import React from 'react'
import { createRoot } from 'react-dom/client'
import { LandingView } from './views/LandingView'
import { NextStepView } from './views/NextStepView'
import { LoadingScreen } from './components/LoadingScreen'
import { WhatsAppButton } from './components/WhatsAppButton'
import './app.css'

const segments = window.location.pathname.split('/').filter(Boolean)
let view: React.ReactNode = <LandingView />

if (segments[0] === 'contratar') {
  let productId = ''
  let planId = ''
  try {
    if (segments.length === 3) {
      productId = decodeURIComponent(segments[1])
      planId = decodeURIComponent(segments[2])
    }
  } catch {
    // Invalid URL components lead to the same unavailable-selection view.
  }
  view = <NextStepView productId={productId} planId={planId} />
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><LoadingScreen />{view}<WhatsAppButton /></React.StrictMode>)
