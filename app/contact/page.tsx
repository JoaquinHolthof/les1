"use client";

/**
 * Editorial Red — Contact Page
 *
 * Data-Driven Design refactor (User Research les):
 * ─────────────────────────────────────────────────
 * ① Time-on-task minimalisatie:
 *   - Formulier heeft precies 3 velden: Naam, E-mail, Project details.
 *     Geen onnodige velden (telefoonnummer, aanhef, bedrijf) → minder cognitieve belasting.
 *   - Floating labels geven directe feedback zonder extra UI-elementen.
 *   - Inline validatie toont fouten pas na submit, niet bij elk keystroke.
 *
 * ② Event-Based Tracking:
 *   - Elk interactief element heeft id + data-analytics-label.
 *   - form_submit_attempt : meet hoe vaak iemand probeert te sturen (inclusief mislukte pogingen).
 *   - form_submit_success : meet succesvolle conversies.
 *   - contact-field-* / contact-input-* : meet welk veld de meeste frictie veroorzaakt.
 *   - faq-toggle-* : meet welke FAQ het meest geopend wordt (informatiebehoefte).
 *
 * ③ Master Components:
 *   - FloatingField is herbruikbaar voor elk formulier in het project.
 *   - Submit-knop stijl is identiek aan HeroButton in page.tsx (zelfde ACCENT, radius, font).
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Design tokens (identiek aan page.tsx & GlobalNavbar — nooit lokaal aanpassen) ──
const ACCENT = "#C8102E";
const FG     = "#0D0D0D";
const BORDER = "#EAE8E3";
const MUTED  = "#9E9B94";
const BG     = "#FAFAF8";

// ─── Floating label input (Master Component) ──────────────────────────────────
// Herbruikbaar in elk formulier. Stijl NOOIT lokaal overschrijven.
// Tracking: focus op een veld = begin van tijd-op-taak meting voor dat veld.
function FloatingField({
  id, label, type = "text", rows, value, onChange, error,
}: {
  id: string;
  label: string;
  type?: string;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  const filled  = value.length > 0;
  const raised  = focused || filled;
  const isArea  = !!rows;

  const base: React.CSSProperties = {
    width:       "100%",
    fontFamily:  "'Inter', sans-serif",
    fontSize:    16,
    color:       FG,
    background:  "transparent",
    border:      "none",
    borderBottom:`2px solid ${error ? ACCENT : focused ? ACCENT : BORDER}`,
    borderRadius: 0,
    padding:     "26px 0 10px",
    outline:     "none",
    lineHeight:  1.5,
    resize:      "none",
    transition:  "border-color 0.25s ease",
    display:     "block",
    boxSizing:   "border-box",
  };

  return (
    <div
      id={`field-wrapper-${id}`}
      // Tracking: welk veld heeft de meeste interacties / fouten? (Friction measurement)
      data-analytics-label={`contact_field_${id}_interact`}
      style={{ position: "relative", width: "100%" }}
    >
      <label
        htmlFor={id}
        style={{
          position:      "absolute",
          top:           raised ? 4 : 20,
          left:          0,
          fontFamily:    "'Syne', sans-serif",
          fontSize:      raised ? 10 : 16,
          fontWeight:    raised ? 600 : 400,
          letterSpacing: raised ? "0.12em" : "0",
          textTransform: raised ? "uppercase" : "none",
          color:         error ? ACCENT : focused ? ACCENT : MUTED,
          pointerEvents: "none",
          transition:    "all 0.22s ease",
        }}
      >
        {label}
      </label>

      {isArea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {/* Growing underline on focus */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       0,
        height:     2,
        width:      focused ? "100%" : "0%",
        background: ACCENT,
        transition: "width 0.3s ease",
        pointerEvents: "none",
      }} />

      {error && (
        <div
          id={`${id}-error`}
          style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            color:         ACCENT,
            letterSpacing: "0.06em",
            marginTop:     6,
          }}
        >
          ↳ {error}
        </div>
      )}
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
// Doel: reduceer inbound vragen → verlaag friction voor de bezoeker én voor de
// portfolio-eigenaar. FAQ-opens meten onbeantwoorde vragen bij bezoekers.
const FAQ = [
  {
    q: "Beschikbaarheid — wanneer kan je starten?",
    a: "Ik ben beschikbaar voor nieuwe projecten vanaf begin 2025. Freelance opdrachten kunnen doorgaans binnen een week starten. Neem contact op voor de exacte planning.",
  },
  {
    q: "Werkwijze — hoe verloopt een samenwerking?",
    a: "Na een eerste gesprek maak ik een voorstel met scope, planning en budget. We werken in korte iteraties zodat je altijd betrokken bent en het resultaat aansluit bij jouw verwachtingen.",
  },
  {
    q: "Vergoeding — wat zijn de tarieven?",
    a: "Tarieven variëren per project en scope. Ik werk met vaste projectprijzen én dagprijzen. Stuur je project details via het formulier en ik kom snel met een eerlijke offerte.",
  },
];

function FaqItem({ item, i }: { item: typeof FAQ[0]; i: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      {/* Tracking: welke FAQ wordt het vaakst geopend? Toont welke informatie ontbreekt */}
      <button
        id={`faq-toggle-${i}`}
        data-analytics-label={`faq_toggle_${i}_click`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          width:          "100%",
          padding:        "1.5rem 0",
          background:     "none",
          border:         "none",
          textAlign:      "left",
          cursor:         "pointer",
          gap:            "1rem",
        }}
      >
        <span style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      15,
          fontWeight:    700,
          letterSpacing: "-0.01em",
          color:         FG,
        }}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={16} color={MUTED} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   15,
              color:      "#555",
              lineHeight: 1.8,
              opacity:    1,
              paddingBottom: "1.5rem",
              margin:     0,
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const isMobile  = useIsMobile();

  // ── Minimale form state (3 velden = minimale time-on-task) ─────────────────
  const [naam,    setNaam]    = React.useState("");
  const [email,   setEmail]   = React.useState("");
  const [details, setDetails] = React.useState("");
  const [errors,  setErrors]  = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [sent,    setSent]    = React.useState(false);

  // ── Validatie: inline, na submit (niet bij elk keystroke = minder friction) ─
  function validate() {
    const e: Record<string, string> = {};
    if (naam.trim().length < 2)      e.naam    = "Minimaal 2 tekens";
    if (!/\S+@\S+\.\S+/.test(email)) e.email   = "Ongeldig e-mailadres";
    if (details.trim().length < 10)  e.details = "Minimaal 10 tekens";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    // Tracking: form_submit_attempt wordt gefired door data-analytics-label op de knop.
    // Als validate() faalt, wordt form_submit_success NIET gefired → meet friction.
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setNaam(""); setEmail(""); setDetails("");
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <div style={{ background: BG, paddingTop: isMobile ? 72 : 100, minHeight: "100vh" }}>

      {/* ── Two-column body (stacks on mobile) ── */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight:           isMobile ? "auto" : "calc(100vh - 100px)",
        borderBottom:        `1px solid ${BORDER}`,
      }}>

        {/* ── LEFT — Let's Connect ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding:       isMobile ? "2.5rem 1.5rem" : "5rem 5rem",
            borderRight:   isMobile ? "none" : `1px solid ${BORDER}`,
            borderBottom:  isMobile ? `1px solid ${BORDER}` : "none",
            display:       "flex",
            flexDirection: "column",
            justifyContent:"space-between",
          }}
        >
          <div>
            {/* Eyebrow */}
            <div style={{
              display:       "flex",
              alignItems:    "center",
              gap:           10,
              fontFamily:    "'Syne', sans-serif",
              fontSize:      11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         MUTED,
              marginBottom:  "2rem",
            }}>
              <span style={{ width: 20, height: 1, background: ACCENT, display: "inline-block" }} />
              Contact
            </div>

            {/* Big heading */}
            <h1 style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      "clamp(3rem, 6vw, 5.5rem)",
              fontWeight:    700,
              letterSpacing: "-0.04em",
              lineHeight:    0.95,
              color:         FG,
              margin:        "0 0 1rem",
            }}>
              Let&apos;s
              <br />
              <em style={{ color: ACCENT }}>Connect.</em>
            </h1>

            {/* Korte, duidelijke instructie → reduceert cognitieve belasting (Time-on-task) */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   16,
              color:      MUTED,
              lineHeight: 1.7,
              margin:     "1.5rem 0 3rem",
              maxWidth:   340,
              opacity:    1,
            }}>
              Heb je een project, een idee of gewoon een vraag?
              Stuur een bericht en ik kom snel terug.
            </p>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Tracking: directe e-mail klik = hoge intentie, alternatief voor formulier */}
              <a
                href="mailto:joaquin.holthofSS@gmail.com"
                id="contact-email-link"
                data-analytics-label="contact_email_link_click"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            14,
                  textDecoration: "none",
                  color:          "inherit",
                  paddingBottom:  "1.25rem",
                  borderBottom:   `1px solid ${BORDER}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{
                  width:          44,
                  height:         44,
                  borderRadius:   "50%",
                  border:         `1px solid ${BORDER}`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}>
                  <Mail size={16} color={FG} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 3 }}>
                    E-mail
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: FG, letterSpacing: "-0.01em" }}>
                    joaquin.holthof@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={14} color={MUTED} style={{ marginLeft: "auto" }} />
              </a>

              {/* Tracking: LinkedIn klik = netwerk-intentie (ander conversie-type dan formulier) */}
              <a
                href="https://www.linkedin.com/in/joaquin-holthof-92255532b/m"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-linkedin-link"
                data-analytics-label="contact_linkedin_link_click"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            14,
                  textDecoration: "none",
                  color:          "inherit",
                  paddingBottom:  "1.25rem",
                  borderBottom:   `1px solid ${BORDER}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{
                  width:          44,
                  height:         44,
                  borderRadius:   "50%",
                  border:         `1px solid ${BORDER}`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}>
                  <Linkedin size={16} color={FG} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 3 }}>
                    LinkedIn
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: FG, letterSpacing: "-0.01em" }}>
                    Joaquin Holthof
                  </div>
                </div>
                <ArrowUpRight size={14} color={MUTED} style={{ marginLeft: "auto" }} />
              </a>
            </div>
          </div>

          {/* Availability indicator */}
          <div style={{
            display:      "flex",
            alignItems:   "center",
            gap:          10,
            padding:      "1rem 1.25rem",
            borderRadius: 8,
            background:   "#fff",
            border:       `1px solid ${BORDER}`,
            marginTop:    "3rem",
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, flexShrink: 0 }}
            />
            <span style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      12,
              fontWeight:    600,
              color:         FG,
              letterSpacing: "0.02em",
            }}>
              Beschikbaar — Antwerpen, België
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT — Form ──
            Time-on-task design: 3 velden, volgorde logisch (identiteit → contact → inhoud),
            floating labels vermijden een aparte label-rij, foutmeldingen inline.
        ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding:       isMobile ? "2.5rem 1.5rem" : "5rem 5rem",
            display:       "flex",
            flexDirection: "column",
            justifyContent:"center",
          }}
        >
          <div style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         MUTED,
            marginBottom:  "3rem",
          }}>
            Stuur een bericht
          </div>

          <form
            id="contact-form"
            data-analytics-label="contact_form_view"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
            noValidate
          >
            {/* Veld 1: Naam — eerste friction punt, moet zo laagdrempelig mogelijk zijn */}
            <FloatingField
              id="naam"
              label="Naam"
              value={naam}
              onChange={setNaam}
              error={errors.naam}
            />
            {/* Veld 2: E-mail — kritisch voor conversie, type=email activeert mobile keyboard */}
            <FloatingField
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />
            {/* Veld 3: Project details — enige open veld, bewust als laatste (progressive disclosure) */}
            <FloatingField
              id="details"
              label="Project details"
              rows={4}
              value={details}
              onChange={setDetails}
              error={errors.details}
            />

            <div>
              {/* Submit knop — MASTER COMPONENT stijl (identiek aan HeroButton primary in page.tsx)
                  Tracking: form_submit_attempt bij klik, form_submit_success na succesvolle verzending */}
              <motion.button
                type="submit"
                id="contact-submit-btn"
                // Tracking: meet het aantal submit-pogingen (attempt) vs successen (success)
                data-analytics-label={loading ? "contact_form_submitting" : "contact_form_submit_attempt"}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           10,
                  background:    loading ? MUTED : ACCENT,
                  color:         "#fff",
                  padding:       "16px 36px",
                  borderRadius:  99,
                  fontFamily:    "'Syne', sans-serif",
                  fontSize:      12,
                  fontWeight:    700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border:        "none",
                  cursor:        loading ? "not-allowed" : "pointer",
                  transition:    "background 0.2s",
                }}
              >
                {loading ? "Verzenden…" : "Verstuur bericht"}
                {!loading && <ArrowUpRight size={14} />}
              </motion.button>

              {/* Success state — bevestiging vermindert anxiety na submit */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    id="contact-success-message"
                    // Tracking: zichtbaar = succesvolle conversie (form_submit_success)
                    data-analytics-label="contact_form_submit_success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display:      "flex",
                      alignItems:   "center",
                      gap:          10,
                      marginTop:    "1.25rem",
                      padding:      "12px 18px",
                      background:   "rgba(200,16,46,0.05)",
                      border:       `1px solid rgba(200,16,46,0.2)`,
                      borderRadius: 8,
                      fontFamily:   "'Syne', sans-serif",
                      fontSize:     12,
                      color:        ACCENT,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                    Bericht verzonden — ik neem snel contact op!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ── FAQ Section ──
          Doel: veelgestelde vragen beantwoorden VOOR het formulier nodig is →
          verlaagt time-on-task door vooraf informatiefrictie weg te nemen.
      ── */}
      <section
        id="faq-section"
        data-analytics-label="faq_section_view"
        style={{
          maxWidth: 860,
          margin:   "0 auto",
          padding:  isMobile ? "3rem 1.5rem" : "5rem 4rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display:       "flex",
            alignItems:    "center",
            gap:           10,
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         MUTED,
            marginBottom:  "1.5rem",
          }}>
            <span style={{ width: 20, height: 1, background: ACCENT, display: "inline-block" }} />
            Veelgestelde vragen
          </div>

          <h2 style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "clamp(1.8rem, 4vw, 3rem)",
            fontWeight:    700,
            letterSpacing: "-0.03em",
            lineHeight:    1.05,
            color:         FG,
            margin:        "0 0 3rem",
          }}>
            Snel antwoord <em style={{ color: ACCENT }}>op je vraag.</em>
          </h2>
        </motion.div>

        <div style={{ borderTop: `1px solid ${BORDER}` }}>
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} i={i} />
          ))}
        </div>
      </section>

    </div>
  );
}
