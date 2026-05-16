"use client";

/**
 * User Profile — Editorial Red
 *
 * Publieke profielpagina voor bezoekers (recruiters, contacten).
 * Geen admin-rechten nodig. Gegevens blijven in lokale React-state.
 *
 * GDPR/AVG:
 *  • Art. 7  — expliciete toestemmingscheckbox vóór opslaan
 *  • Art. 17 — "Verwijder mijn gegevens" wist alle velden + toestemming
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const ACCENT  = "#C8102E";
const BG      = "#FAFAF8";
const FG      = "#0D0D0D";
const BORDER  = "#EAE8E3";
const MUTED   = "#9E9B94";
const DARK    = "#1A1A1A";
const SURFACE = "#FFFFFF";

// ─── Inline SVG icons ──────────────────────────────────────────────────────────
function PersonIcon({ size = 24, color = MUTED }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5,6 5,9.5 10.5,2.5" />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProfileData {
  voornaam:    string;
  achternaam:  string;
  email:       string;
  bedrijf:     string;
  functie:     string;
  gdprConsent: boolean;
}

const EMPTY: ProfileData = {
  voornaam: "", achternaam: "", email: "",
  bedrijf: "", functie: "", gdprConsent: false,
};

// ─── Floating label field ──────────────────────────────────────────────────────
function Field({
  id, label, value, onChange, type = "text", error, multiline = false,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; type?: string;
  error?: string; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const baseStyle: React.CSSProperties = {
    width:        "100%",
    padding:      "22px 16px 8px",
    borderRadius: 10,
    border:       `1.5px solid ${error ? ACCENT : focused ? FG : BORDER}`,
    fontFamily:   "'Inter', sans-serif",
    fontSize:     14,
    color:        FG,
    background:   SURFACE,
    outline:      "none",
    resize:       "none",
    boxSizing:    "border-box",
    transition:   "border-color 0.18s",
    lineHeight:   1.5,
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <label htmlFor={id} style={{
        position:   "absolute",
        left:       16,
        top:        lifted ? 8 : "50%",
        transform:  lifted ? "none" : "translateY(-50%)",
        fontFamily: "'Syne', sans-serif",
        fontSize:   lifted ? 10 : 13,
        fontWeight: 600,
        color:      error ? ACCENT : focused ? FG : MUTED,
        letterSpacing: lifted ? "0.08em" : "0",
        textTransform: lifted ? "uppercase" : "none",
        transition: "all 0.18s ease",
        pointerEvents: "none",
        zIndex: 1,
        lineHeight: 1,
      }}>
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id} rows={3} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseStyle, paddingTop: 28 }}
        />
      ) : (
        <input
          id={id} type={type} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}

      {error && (
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, margin: "4px 0 0 4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function UserProfilePage() {
  const [data,            setData]            = useState<ProfileData>(EMPTY);
  const [saved,           setSaved]           = useState(false);
  const [deleted,         setDeleted]         = useState(false);
  const [emailError,      setEmailError]      = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const displayName = [data.voornaam, data.achternaam].filter(Boolean).join(" ");

  function handleChange<K extends keyof ProfileData>(field: K, value: ProfileData[K]) {
    setData(prev => ({ ...prev, [field]: value }));
    if (field === "email") setEmailError("");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data.gdprConsent) return;
    const emailOk = !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (!emailOk) { setEmailError("Voer een geldig e-mailadres in."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDelete() {
    setData(EMPTY);
    setShowDeleteModal(false);
    setDeleted(true);
    setTimeout(() => setDeleted(false), 4000);
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Inter', sans-serif", paddingTop: 100 }}>

      {/* ── Toasts ── */}
      <AnimatePresence>
        {saved && (
          <motion.div
            key="toast-saved"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            style={{ position: "fixed", bottom: 28, right: 28, background: DARK, color: "#fff", padding: "12px 22px", borderRadius: 99, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.22)" }}
          >
            <span style={{ color: ACCENT }}>✓</span> Profiel opgeslagen
          </motion.div>
        )}
        {deleted && (
          <motion.div
            key="toast-deleted"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            style={{ position: "fixed", bottom: 28, right: 28, background: ACCENT, color: "#fff", padding: "12px 22px", borderRadius: 99, fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, zIndex: 9999 }}
          >
            ✓ Gegevens verwijderd
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Verwijder-modal ── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            key="modal-delete"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.48)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: SURFACE, borderRadius: 16, padding: "2.5rem", maxWidth: 420, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, fontStyle: "italic", color: FG, margin: "0 0 0.75rem" }}>
                Gegevens verwijderen<span style={{ color: ACCENT }}>?</span>
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.75, margin: "0 0 2rem" }}>
                Al je ingevoerde gegevens worden gewist. Dit kan niet ongedaan worden gemaakt. (AVG Art.&nbsp;17 — Recht op vergetelheid)
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{ flex: 1, padding: "12px", borderRadius: 99, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: MUTED }}
                >
                  Annuleren
                </button>
                <button
                  onClick={handleDelete}
                  style={{ flex: 1, padding: "12px", borderRadius: 99, border: "none", background: ACCENT, color: "#fff", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700 }}
                >
                  Ja, verwijder alles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "2.5rem" }}
        >
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 20, height: 1, background: ACCENT }} />
            Gebruikersprofiel
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", color: FG, margin: "0 0 0.75rem" }}>
            Jouw profiel<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.8, margin: 0, maxWidth: 480 }}>
            Vul je gegevens in voor een gepersonaliseerde ervaring. Je informatie wordt nooit gedeeld — alleen lokaal opgeslagen.
          </p>
        </motion.div>

        {/* ── Avatar preview card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          {/* Avatar circle */}
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: BG, border: `2px dashed ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PersonIcon size={28} color={MUTED} />
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: displayName ? FG : MUTED, marginBottom: 4, fontStyle: displayName ? "normal" : "italic" }}>
              {displayName || "Jouw naam"}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: MUTED, marginBottom: 2 }}>
              {[data.functie, data.bedrijf].filter(Boolean).join(" · ") || "Functie · Bedrijf"}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: MUTED }}>
              {data.email || "e-mailadres@voorbeeld.com"}
            </div>
          </div>
        </motion.div>

        {/* ── Form ── */}
        <motion.form
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          noValidate
        >
          {/* Naam */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field id="voornaam"   label="Voornaam"   value={data.voornaam}   onChange={v => handleChange("voornaam",   v)} />
            <Field id="achternaam" label="Achternaam" value={data.achternaam} onChange={v => handleChange("achternaam", v)} />
          </div>

          {/* E-mail */}
          <Field id="email" label="E-mailadres" value={data.email} onChange={v => handleChange("email", v)} type="email" error={emailError} />

          {/* Bedrijf + Functie */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field id="bedrijf" label="Bedrijf"  value={data.bedrijf}  onChange={v => handleChange("bedrijf",  v)} />
            <Field id="functie" label="Functie"  value={data.functie}  onChange={v => handleChange("functie",  v)} />
          </div>

          {/* GDPR consent ─────────────────────────────────────────────────────── */}
          <div style={{ background: SURFACE, border: `1.5px solid ${data.gdprConsent ? "rgba(200,16,46,0.25)" : BORDER}`, borderRadius: 12, padding: "1.25rem 1.5rem", margin: "0.5rem 0 1.5rem", transition: "border-color 0.2s" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
              {/* Custom checkbox */}
              <div style={{ position: "relative", flexShrink: 0, marginTop: 2 }}>
                <input
                  type="checkbox"
                  checked={data.gdprConsent}
                  onChange={e => handleChange("gdprConsent", e.target.checked)}
                  style={{ position: "absolute", opacity: 0, width: 18, height: 18, cursor: "pointer", margin: 0 }}
                />
                <div style={{
                  width: 18, height: 18, borderRadius: 5,
                  border: `1.5px solid ${data.gdprConsent ? ACCENT : BORDER}`,
                  background: data.gdprConsent ? ACCENT : SURFACE,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  {data.gdprConsent && <CheckIcon />}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: FG, marginBottom: 4 }}>
                  Ik ga akkoord met lokale opslag van mijn gegevens
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.65 }}>
                  Je gegevens worden uitsluitend lokaal opgeslagen en nooit gedeeld met derden. Je kunt ze altijd verwijderen. <span style={{ color: ACCENT, fontWeight: 600 }}>AVG Art.&nbsp;7</span>
                </div>
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={!data.gdprConsent}
              style={{
                flex: 1, minWidth: 160,
                padding: "13px 24px", borderRadius: 99, border: "none",
                background: data.gdprConsent ? FG : BORDER,
                color: data.gdprConsent ? "#fff" : MUTED,
                cursor: data.gdprConsent ? "pointer" : "not-allowed",
                fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.03em", transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (data.gdprConsent) (e.currentTarget as HTMLElement).style.background = ACCENT; }}
              onMouseLeave={e => { if (data.gdprConsent) (e.currentTarget as HTMLElement).style.background = FG; }}
            >
              Profiel opslaan →
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              style={{
                padding: "13px 24px", borderRadius: 99,
                border: `1px solid ${BORDER}`, background: "transparent",
                color: MUTED, cursor: "pointer",
                fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
            >
              Verwijder mijn gegevens
            </button>
          </div>
        </motion.form>

        {/* ── GDPR info strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, display: "flex", gap: "2rem", flexWrap: "wrap" }}
        >
          {[
            { artikel: "Art. 7",  titel: "Toestemming",       tekst: "Je geeft expliciete toestemming vóór opslaan." },
            { artikel: "Art. 17", titel: "Recht op vergetelheid", tekst: "Verwijder al je gegevens met één klik." },
          ].map(({ artikel, titel, tekst }) => (
            <div key={artikel} style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 4, fontWeight: 700 }}>
                {artikel}
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: FG, marginBottom: 4 }}>{titel}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{tekst}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Back link ── */}
        <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid ${BORDER}` }}>
          <Link
            href="/"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: MUTED, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = FG}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}
          >
            ← Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}
