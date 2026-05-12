"use client";

/**
 * Editorial Red — GlobalNavbar
 *
 * Data-Driven Design refactor (User Research les):
 * ─────────────────────────────────────────────────
 * ① Recruiter Behavior Flow : MAIN pill = Home / Work / Contact (primaire doelen).
 *   UTILITY pill = Admin / Login (secondaire functies, visueel teruggedrongen).
 *   "Work" krijgt een subtiele rode accentring zodat recruiters direct de CTA zien.
 *
 * ② Event-Based Tracking    : elk nav-element heeft id + data-analytics-label.
 *   Hiermee meten we welke nav-items het vaakst worden geklikt → Behavior Flow data.
 *
 * ③ Hamburger button        : ook voorzien van id + analytics-label voor mobile tracking.
 *
 * Desktop: floating white pill (left: Home/Work/Contact) + dark utility pill (right)
 * Mobile:  slim bar + full-screen dark overlay met grote Playfair links
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Design tokens (identiek aan page.tsx — nooit lokaal aanpassen) ────────────
const ACCENT = "#C8102E";
const DARK   = "#1A1A1A";
const BORDER = "#EAE8E3";
const FG     = "#0D0D0D";

// ─── Desktop: white pill link ─────────────────────────────────────────────────
// Recruiter hint: 'Work' is het primaire doel van een recruiter die dit portfolio
// bezoekt. Visueel staat het centraal tussen Home en Contact.
function PillLink({
  label, href, active, id, analyticsLabel, highlight = false,
}: {
  label: string;
  href: string;
  active: boolean;
  id: string;
  analyticsLabel: string;
  /** highlight = true geeft 'Work' een subtiele rode ring om de aandacht te trekken */
  highlight?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Subtiele ring op Work-link: visual cue voor recruiter behavior flow */}
      {highlight && !active && (
        <motion.div
          animate={{ opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position:     "absolute",
            inset:        -1,
            borderRadius: 99,
            border:       `1.5px solid ${ACCENT}`,
            pointerEvents: "none",
            zIndex:       0,
          }}
        />
      )}
      <Link
        href={href}
        id={id}
        // Tracking: welke nav-links worden het meest gebruikt door bezoekers? (Behavior Flow)
        data-analytics-label={analyticsLabel}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:       "relative",
          zIndex:         1,
          fontFamily:     "'Syne', sans-serif",
          fontSize:       13,
          fontWeight:     active ? 700 : 600,
          letterSpacing:  "-0.01em",
          color:          active ? ACCENT : FG,
          textDecoration: "none",
          padding:        "7px 14px",
          borderRadius:   99,
          background:     active ? "rgba(200,16,46,0.08)" : hov ? "#F5F4F0" : "transparent",
          transition:     "background 0.18s ease, color 0.18s ease",
          whiteSpace:     "nowrap",
          display:        "block",
        }}
      >
        {label}
      </Link>
    </div>
  );
}

// ─── Desktop: dark pill link ──────────────────────────────────────────────────
function UtilLink({
  label, href, active, id, analyticsLabel,
}: {
  label: string;
  href: string;
  active: boolean;
  id: string;
  analyticsLabel: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      id={id}
      // Tracking: admin/login gebruik (utility flow, gescheiden van recruiter flow)
      data-analytics-label={analyticsLabel}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:     "'Syne', sans-serif",
        fontSize:       12,
        fontWeight:     600,
        letterSpacing:  "-0.01em",
        color:          active ? ACCENT : hov ? "#FFFFFF" : "rgba(255,255,255,0.75)",
        textDecoration: "none",
        transition:     "color 0.18s ease",
        whiteSpace:     "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

// ─── Hamburger icon (3 lines → X morphing) ────────────────────────────────────
function HamburgerIcon({ open, color }: { open: boolean; color: string }) {
  const bar: React.CSSProperties = {
    display:         "block",
    width:           22,
    height:          2,
    background:      color,
    borderRadius:    99,
    transformOrigin: "center",
    transition:      "transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
      <span style={{ ...bar, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
      <span style={{ ...bar, opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
      <span style={{ ...bar, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GlobalNavbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Recruiter Behavior Flow hiërarchie ──────────────────────────────────────
  // MAIN_LINKS = primaire navigatiestroom voor recruiters: Home → Work → Contact
  // UTIL_LINKS = admin-functies, visueel teruggedrongen in dark utility pill
  const MAIN_LINKS = [
    { label: "Home",    href: "/",        id: "nav-home",    analyticsLabel: "nav_home_click",    highlight: false },
    { label: "Work",    href: "/work",    id: "nav-work",    analyticsLabel: "nav_work_click",    highlight: true  },
    { label: "Contact", href: "/contact", id: "nav-contact", analyticsLabel: "nav_contact_click", highlight: false },
  ];
  const UTIL_LINKS = [
    { label: "Admin", href: "/admin", id: "nav-admin", analyticsLabel: "nav_admin_click" },
    { label: "Login", href: "/login", id: "nav-login", analyticsLabel: "nav_login_click" },
  ];
  const ALL_LINKS = [...MAIN_LINKS, ...UTIL_LINKS];

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP  (md and up)
      ══════════════════════════════════════ */}
      <div
        className="hidden md:flex"
        style={{
          position:       "fixed",
          top:            20,
          left:           0,
          right:          0,
          zIndex:         50,
          justifyContent: "center",
          alignItems:     "flex-start",
          gap:            12,
          padding:        "0 2rem",
          pointerEvents:  "none",
        }}
      >
        {/* White pill — primaire navigatie (recruiter flow) */}
        <motion.div
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents:       "auto",
            display:             "flex",
            alignItems:          "center",
            background:          "rgba(255,255,255,0.96)",
            backdropFilter:      "blur(20px)",
            WebkitBackdropFilter:"blur(20px)",
            border:              `1px solid ${BORDER}`,
            borderRadius:        99,
            padding:             "5px 5px 5px 20px",
            boxShadow:           scrolled
              ? "0 8px 40px rgba(0,0,0,0.13), 0 1px 0 rgba(0,0,0,0.05)"
              : "0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.03)",
            transition:          "box-shadow 0.35s ease",
          }}
        >
          {/* Logo — Tracking: logo klik = terug naar home (navigatie reset) */}
          <Link
            href="/"
            id="nav-logo"
            data-analytics-label="nav_logo_click"
            style={{
              fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
              fontStyle: "italic", letterSpacing: "-0.01em", color: FG,
              textDecoration: "none", flexShrink: 0, lineHeight: 1,
            }}
          >
            JH<span style={{ color: ACCENT }}>.</span>
          </Link>
          <div style={{ width: 1, height: 18, background: BORDER, margin: "0 16px", flexShrink: 0 }} />
          {/* Recruiter-friendly nav: Home | Work★ | Contact */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {MAIN_LINKS.map((l) => (
              <PillLink
                key={l.href}
                label={l.label}
                href={l.href}
                active={pathname === l.href}
                id={l.id}
                analyticsLabel={l.analyticsLabel}
                highlight={l.highlight}
              />
            ))}
          </nav>
        </motion.div>

        {/* Dark utility pill — secundaire navigatie (teruggedrongen, visueel afgescheiden) */}
        <motion.div
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents: "auto",
            display:       "flex",
            alignItems:    "center",
            gap:           16,
            background:    DARK,
            borderRadius:  99,
            padding:       "8px 8px 8px 20px",
            boxShadow:     "0 4px 24px rgba(0,0,0,0.28)",
            flexShrink:    0,
          }}
        >
          {UTIL_LINKS.map((l, i) => (
            <div key={l.href} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <UtilLink
                label={l.label}
                href={l.href}
                active={pathname === l.href}
                id={l.id}
                analyticsLabel={l.analyticsLabel}
              />
              {i < UTIL_LINKS.length - 1 && (
                <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
              )}
            </div>
          ))}
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: ACCENT,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              JH
            </span>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE BAR  (below md)
      ══════════════════════════════════════ */}
      <motion.header
        className="flex md:hidden"
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         60,
          background:     isOpen ? DARK : (scrolled ? "rgba(250,250,248,0.97)" : "#FAFAF8"),
          backdropFilter: (!isOpen && scrolled) ? "blur(16px)" : "none",
          borderBottom:   isOpen ? "none" : `1px solid ${BORDER}`,
          transition:     "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 1.5rem",
          height:         "60px",
          width:          "100%",
        }}>
          {/* Logo mobile — Tracking: logo klik op mobile */}
          <Link
            href="/"
            id="nav-mobile-logo"
            data-analytics-label="nav_mobile_logo_click"
            style={{
              fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
              fontStyle: "italic", color: isOpen ? "#fff" : FG, textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            JH<span style={{ color: ACCENT }}>.</span>
          </Link>

          {/* Hamburger button
              Tracking: open/sluit frequentie meet mobile menu engagement */}
          <button
            id="nav-hamburger"
            data-analytics-label={isOpen ? "nav_hamburger_close" : "nav_hamburger_open"}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Sluit menu" : "Open menu"}
            style={{
              background:     "none",
              border:         "none",
              padding:        "8px 0 8px 8px",
              marginRight:    -2,
              cursor:         "pointer",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "flex-end",
            }}
          >
            <HamburgerIcon open={isOpen} color={isOpen ? "#fff" : FG} />
          </button>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
          Recruiter flow: Work en Contact staan bovenaan de lijst (positie 2 en 3)
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{   opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:       "fixed",
              inset:          0,
              zIndex:         55,
              background:     DARK,
              flexDirection:  "column",
              paddingTop:     72,
              paddingBottom:  "2rem",
              paddingLeft:    "1.75rem",
              paddingRight:   "1.75rem",
              overflowY:      "auto",
            }}
          >
            {/* Nav links */}
            <nav style={{ flex: 1 }}>
              {ALL_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    id={`nav-mobile-${link.id}`}
                    // Tracking: welke mobile nav-items worden het meest geklikt? (Behavior Flow mobile)
                    data-analytics-label={`mobile_${link.analyticsLabel}`}
                    style={{
                      display:        "flex",
                      alignItems:     "baseline",
                      gap:            20,
                      padding:        "1.35rem 0",
                      borderBottom:   "1px solid rgba(255,255,255,0.07)",
                      textDecoration: "none",
                    }}
                  >
                    {/* Index */}
                    <span style={{
                      fontFamily:    "'Syne', sans-serif",
                      fontSize:      11,
                      fontWeight:    700,
                      color:         ACCENT,
                      letterSpacing: "0.1em",
                      flexShrink:    0,
                      lineHeight:    1,
                      paddingTop:    4,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Label */}
                    <span style={{
                      fontFamily:    "'Playfair Display', serif",
                      fontSize:      "clamp(2rem, 9vw, 3rem)",
                      fontWeight:    700,
                      fontStyle:     "italic",
                      letterSpacing: "-0.02em",
                      lineHeight:    1,
                      color:         pathname === link.href ? ACCENT : "#fff",
                      transition:    "color 0.2s",
                    }}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop:      "2.5rem",
                paddingTop:     "1.5rem",
                borderTop:      "1px solid rgba(255,255,255,0.08)",
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "center",
                flexWrap:       "wrap",
                gap:            "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: ACCENT,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700, color: "#fff" }}>JH</span>
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  Joaquin Holthof
                </span>
              </div>
              <span style={{
                fontFamily:    "'Syne', sans-serif",
                fontSize:      11,
                color:         "rgba(255,255,255,0.3)",
                letterSpacing: "0.02em",
              }}>
                joaquin.holthof@gmail.com
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
