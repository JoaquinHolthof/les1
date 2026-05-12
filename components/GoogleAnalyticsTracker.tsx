'use client'

/**
 * GoogleAnalyticsTracker
 *
 * 1. Tracks page-view events op elke route-change (SPA-navigatie).
 * 2. Luistert globaal naar klik-events en pusht GA4 'custom_click' events
 *    voor elk element dat een [data-analytics-label] attribuut heeft.
 *
 * GA4 event schema per klik:
 *   event_name  : "custom_click"
 *   event_label : waarde van data-analytics-label  (bv. "hero_cta_work_click")
 *   element_id  : id van het geklikte element       (bv. "hero-cta-work")
 *   page_path   : huidige URL-pad                   (bv. "/")
 *
 * Hoe te koppelen in GA4:
 *   Maak een custom event trigger "custom_click" aan in GTM of GA4 UI.
 *   Gebruik event_label als dimension voor segmentatie per knop.
 */

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname()

  // ── 1. Page-view tracking ───────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
        page_path: pathname,
      })
    }
  }, [pathname])

  // ── 2. Globale click-event tracking via data-analytics-label ───────────────
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Loop door de event path om het dichtstbijzijnde gelabelde element te vinden
      const path = event.composedPath() as HTMLElement[]
      for (const el of path) {
        if (el instanceof HTMLElement && el.dataset?.analyticsLabel) {
          const label    = el.dataset.analyticsLabel   // bv. "hero_cta_work_click"
          const id       = el.id || '(no-id)'          // bv. "hero-cta-work"

          // Push naar GA4 via gtag
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'custom_click', {
              event_label : label,
              element_id  : id,
              page_path   : pathname,
            })
          }

          // Push naar dataLayer voor GTM
          if (Array.isArray((window as any).dataLayer)) {
            ;(window as any).dataLayer.push({
              event       : 'custom_click',
              event_label : label,
              element_id  : id,
              page_path   : pathname,
            })
          }

          break // stop bij het eerste gelabelde voorouder
        }
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return null
}
