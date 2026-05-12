"use client";

/**
 * Editorial Red — My Profile (Admin-user)
 *
 * GDPR-compliance overzicht (AVG / GDPR artikel-rechten):
 * ────────────────────────────────────────────────────────
 * ① Recht op inzage (Art. 15)          : alle opgeslagen gegevens zijn zichtbaar.
 * ② Recht op rectificatie (Art. 16)    : naam en e-mail zijn bewerkbaar.
 * ③ Recht op overdraagbaarheid (Art. 20): export als JSON-bestand.
 * ④ Recht op verwijdering (Art. 17)    : account + data permanent verwijderen.
 * ⑤ Toestemming (Art. 7)               : expliciete consent checkbox + intrekken consent.
 * ⑥ Transparantie (Art. 13/14)         : uitleg doel verwerking + contactgegevens.
 *
 * Design: past volledig binnen het Editorial Red systeem (ACCENT #C8102E, BG #FAFAF8).
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, Check, X, Edit3, Download, Trash2,
  ChevronRight, Shield, Mail, AlertCircle, FileText,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Design tokens (identiek aan de rest van het systeem) ────────────────────
const ACCENT  = "#C8102E";
const BG      = "#FAFAF8";
const FG      = "#0D0D0D";
const BORDER  = "#EAE8E3";
const MUTED   = "#9E9B94";
const DARK    = "#1A1A1A";
const SURFACE = "#FFFFFF";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProfileData {
  voornaam: string;
  achternaam: string;
  email: string;
  /** AVG Art. 7 — expliciete toestemming voor verwerking persoonsgegevens */
  gdprConsent: boolean;
}

interface ProfileErrors {
  voornaam?: string;
  achternaam?: string;
  email?: string;
  gdprConsent?: string;
}

// ─── Styled input (Master Component — herbruikbaar) ───────────────────────────
function ProfileInput({
  id, label, type = "text", value, onChange, error, placeholder, readOnly = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (v: string) => void;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <label
        htmlFor={id}
        style={{
          display:       "block",
          fontFamily:    "'Syne', sans-serif",
          fontSize:      10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         error ? ACCENT : focused ? ACCENT : MUTED,
          marginBottom:  "0.5rem",
          transition:    "color 0.2s",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width:        "100%",
          fontFamily:   "'Inter', sans-serif",
          fontSize:     15,
          color:        readOnly ? MUTED : FG,
          background:   readOnly ? BG : SURFACE,
          border:       `1px solid ${error ? ACCENT : focused ? DARK : BORDER}`,
          borderRadius: 8,
          padding:      "12px 15px",
          outline:      "none",
          transition:   "border-color 0.2s",
          boxSizing:    "border-box",
          cursor:       readOnly ? "default" : "text",
        }}
      />
      {error && (
        <div
          id={`${id}-error`}
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           5,
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            color:         ACCENT,
            letterSpacing: "0.04em",
            marginTop:     5,
          }}
        >
          <AlertCircle size={11} /> {error}
        </div>
      )}
    </div>
  );
}

// ─── Sectie-header (herbruikbaar patroon) ─────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           8,
        fontFamily:    "'Syne', sans-serif",
        fontSize:      10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color:         MUTED,
        marginBottom:  "0.75rem",
      }}>
        <span style={{ width: 14, height: 1, background: ACCENT, display: "inline-block" }} />
        {label}
      </div>
      <div style={{
        fontFamily:    "'Playfair Display', serif",
        fontSize:      "1.6rem",
        fontWeight:    700,
        fontStyle:     "italic",
        letterSpacing: "-0.02em",
        color:         FG,
      }}>
        {title}
      </div>
    </div>
  );
}

// ─── GDPR-recht rij ───────────────────────────────────────────────────────────
function GdprRow({
  icon: Icon, artikel, recht, omschrijving,
}: {
  icon: React.ElementType;
  artikel: string;
  recht: string;
  omschrijving: string;
}) {
  return (
    <div style={{
      display:       "flex",
      gap:           14,
      padding:       "1.1rem 0",
      borderBottom:  `1px solid ${BORDER}`,
    }}>
      <div style={{
        width:          36,
        height:         36,
        borderRadius:   "50%",
        border:         `1px solid ${BORDER}`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexShrink:     0,
        marginTop:      2,
      }}>
        <Icon size={15} color={ACCENT} />
      </div>
      <div>
        <div style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         MUTED,
          marginBottom:  2,
        }}>
          {artikel}
        </div>
        <div style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      13,
          fontWeight:    700,
          color:         FG,
          marginBottom:  3,
        }}>
          {recht}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   13,
          color:      MUTED,
          lineHeight: 1.6,
        }}>
          {omschrijving}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MyProfilePage() {
  const isMobile = useIsMobile();

  // ── State ──────────────────────────────────────────────────────────────────
  const [saved,    setSaved]    = React.useState<ProfileData>({
    voornaam:    "Joaquin",
    achternaam:  "Holthof",
    email:       "vyzo.studios@gmail.com",
    gdprConsent: true,
  });
  const [draft,      setDraft]      = React.useState<ProfileData>(saved);
  const [errors,     setErrors]     = React.useState<ProfileErrors>({});
  const [isEditing,  setIsEditing]  = React.useState(false);
  const [saveToast,  setSaveToast]  = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleted,    setDeleted]    = React.useState(false);
  const [revokeModal, setRevokeModal] = React.useState(false);

  // ── Validatie ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: ProfileErrors = {};
    if (draft.voornaam.trim().length < 2)       e.voornaam    = "Minimaal 2 tekens vereist.";
    if (draft.achternaam.trim().length < 2)      e.achternaam  = "Minimaal 2 tekens vereist.";
    if (!/\S+@\S+\.\S+/.test(draft.email))       e.email       = "Ongeldig e-mailadres.";
    if (!draft.gdprConsent)                      e.gdprConsent = "Toestemming is vereist om gegevens op te slaan (AVG Art. 7).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    setSaved(draft);
    setIsEditing(false);
    setErrors({});
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  }

  function handleCancel() {
    setDraft(saved);
    setErrors({});
    setIsEditing(false);
  }

  // ── GDPR Art. 20 — Recht op overdraagbaarheid ─────────────────────────────
  function handleExport() {
    const exportData = {
      exportDatum:   new Date().toISOString(),
      verantwoordelijke: "Joaquin Holthof Portfolio",
      doel:          "Portfoliobeheer en contactverwerking",
      gegevens: {
        voornaam:    saved.voornaam,
        achternaam:  saved.achternaam,
        email:       saved.email,
        gdprConsent: saved.gdprConsent,
        consentDatum: new Date().toLocaleDateString("nl-BE"),
      },
      rechten: {
        inzage:          "AVG Art. 15 — toegepast via dit scherm",
        rectificatie:    "AVG Art. 16 — bewerkbaar via Bewerken",
        overdraagbaarheid: "AVG Art. 20 — dit bestand",
        verwijdering:    "AVG Art. 17 — Account verwijderen knop",
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `mijn-gegevens-${saved.voornaam.toLowerCase()}-${saved.achternaam.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── GDPR Art. 17 — Recht op verwijdering ──────────────────────────────────
  function handleDelete() {
    setSaved({ voornaam: "", achternaam: "", email: "", gdprConsent: false });
    setDraft({ voornaam: "", achternaam: "", email: "", gdprConsent: false });
    setDeleteModal(false);
    setDeleted(true);
  }

  // ── GDPR Art. 7 — Consent intrekken ───────────────────────────────────────
  function handleRevokeConsent() {
    setSaved((prev) => ({ ...prev, gdprConsent: false }));
    setDraft((prev) => ({ ...prev, gdprConsent: false }));
    setRevokeModal(false);
  }

  if (deleted) {
    return (
      <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem", padding: "2rem" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check size={22} color={ACCENT} />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, fontStyle: "italic", color: FG, textAlign: "center", margin: 0 }}>
          Account verwijderd<span style={{ color: ACCENT }}>.</span>
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: MUTED, textAlign: "center", maxWidth: 380, lineHeight: 1.7, margin: 0 }}>
          Je persoonsgegevens zijn conform AVG Art. 17 gewist uit het systeem. Je ontvangt geen verdere communicatie.
        </p>
        <Link
          href="/"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           8,
            fontFamily:    "'Syne', sans-serif",
            fontSize:      12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         MUTED,
            textDecoration:"none",
          }}
        >
          ← Terug naar home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Save toast ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position:   "fixed",
              bottom:     28,
              right:      28,
              background: DARK,
              color:      "#fff",
              padding:    "12px 22px",
              borderRadius: 99,
              display:    "flex",
              alignItems: "center",
              gap:        10,
              fontFamily: "'Syne', sans-serif",
              fontSize:   12,
              zIndex:     9999,
              boxShadow:  "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Check size={13} color={ACCENT} /> Profiel opgeslagen
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete bevestigingsmodal (AVG Art. 17) ─────────────────────────── */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position:       "fixed",
              inset:          0,
              background:     "rgba(0,0,0,0.45)",
              zIndex:         200,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              padding:        "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9, opacity: 0 }}
              style={{
                background:   SURFACE,
                border:       `1px solid ${BORDER}`,
                borderRadius: 16,
                padding:      "2.5rem",
                maxWidth:     440,
                width:        "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <Trash2 size={18} color={ACCENT} />
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: FG }}>
                  Account permanent verwijderen
                </div>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7, margin: "0 0 0.75rem" }}>
                Op basis van <strong style={{ color: FG }}>AVG Artikel 17</strong> (Recht op vergetelheid) worden alle opgeslagen persoonsgegevens onmiddellijk en onomkeerbaar verwijderd:
              </p>
              <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.8, margin: "0 0 1.75rem", paddingLeft: "1.25rem" }}>
                <li>Naam en e-mailadres</li>
                <li>Toestemmingsrecord</li>
                <li>Alle profielgegevens</li>
              </ul>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  id="profile-delete-confirm"
                  data-analytics-label="profile_delete_account_confirm"
                  onClick={handleDelete}
                  style={{
                    flex:          1,
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    gap:           8,
                    background:    ACCENT,
                    color:         "#fff",
                    padding:       "12px 20px",
                    borderRadius:  99,
                    border:        "none",
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      12,
                    fontWeight:    700,
                    letterSpacing: "0.06em",
                    cursor:        "pointer",
                  }}
                >
                  <Trash2 size={13} /> Definitief verwijderen
                </button>
                <button
                  onClick={() => setDeleteModal(false)}
                  style={{
                    flex:          1,
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    gap:           8,
                    background:    "transparent",
                    color:         FG,
                    padding:       "12px 20px",
                    borderRadius:  99,
                    border:        `1px solid ${BORDER}`,
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      12,
                    cursor:        "pointer",
                  }}
                >
                  <X size={13} /> Annuleren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Consent intrekken modal (AVG Art. 7) ───────────────────────────── */}
      <AnimatePresence>
        {revokeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position:       "fixed",
              inset:          0,
              background:     "rgba(0,0,0,0.45)",
              zIndex:         200,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              padding:        "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9, opacity: 0 }}
              style={{
                background:   SURFACE,
                border:       `1px solid ${BORDER}`,
                borderRadius: 16,
                padding:      "2.5rem",
                maxWidth:     440,
                width:        "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <Shield size={18} color={ACCENT} />
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: FG }}>
                  Toestemming intrekken
                </div>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7, margin: "0 0 1.75rem" }}>
                Op basis van <strong style={{ color: FG }}>AVG Artikel 7 lid 3</strong> kun je je toestemming op elk moment intrekken. Hierna worden je gegevens niet langer verwerkt. Je kunt je consent opnieuw verlenen via het bewerkingsformulier.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  id="profile-revoke-consent-confirm"
                  data-analytics-label="profile_revoke_consent_confirm"
                  onClick={handleRevokeConsent}
                  style={{
                    flex:          1,
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    gap:           8,
                    background:    DARK,
                    color:         "#fff",
                    padding:       "12px 20px",
                    borderRadius:  99,
                    border:        "none",
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      12,
                    fontWeight:    700,
                    letterSpacing: "0.06em",
                    cursor:        "pointer",
                  }}
                >
                  <Shield size={13} /> Toestemming intrekken
                </button>
                <button
                  onClick={() => setRevokeModal(false)}
                  style={{
                    flex:          1,
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    gap:           8,
                    background:    "transparent",
                    color:         FG,
                    padding:       "12px 20px",
                    borderRadius:  99,
                    border:        `1px solid ${BORDER}`,
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      12,
                    cursor:        "pointer",
                  }}
                >
                  <X size={13} /> Annuleren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA BODY
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100, fontFamily: "'Inter', sans-serif" }}>

        {/* ── Topbar (breadcrumb + acties) ─────────────────────────────────── */}
        <div style={{
          padding:       isMobile ? "0.875rem 1.25rem" : "1rem 2.5rem",
          borderBottom:  `1px solid ${BORDER}`,
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          background:    SURFACE,
          gap:           "1rem",
          flexWrap:      "wrap",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              href="/admin"
              id="profile-breadcrumb-admin"
              data-analytics-label="profile_breadcrumb_admin_click"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED, textDecoration: "none" }}
            >
              Admin
            </Link>
            <ChevronRight size={11} color={MUTED} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG }}>
              My Profile
            </span>
          </div>

          {/* Acties */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isEditing ? (
              <>
                <button
                  id="profile-cancel-btn"
                  data-analytics-label="profile_edit_cancel"
                  onClick={handleCancel}
                  style={{
                    display:    "flex", alignItems: "center", gap: 5,
                    padding:    "7px 14px", borderRadius: 99,
                    border:     `1px solid ${BORDER}`, background: "transparent",
                    cursor:     "pointer", fontFamily: "'Syne', sans-serif",
                    fontSize:   11, color: MUTED,
                  }}
                >
                  <X size={11} /> Annuleren
                </button>
                <button
                  id="profile-save-btn"
                  data-analytics-label="profile_save_click"
                  onClick={handleSave}
                  style={{
                    display:       "flex", alignItems: "center", gap: 5,
                    padding:       "7px 16px", borderRadius: 99,
                    border:        "none", background: FG, color: "#fff",
                    cursor:        "pointer", fontFamily: "'Syne', sans-serif",
                    fontSize:      11,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = ACCENT)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = FG)}
                >
                  <Check size={11} /> Opslaan
                </button>
              </>
            ) : (
              <button
                id="profile-edit-btn"
                data-analytics-label="profile_edit_start"
                onClick={() => { setDraft(saved); setIsEditing(true); }}
                style={{
                  display:    "flex", alignItems: "center", gap: 5,
                  padding:    "7px 14px", borderRadius: 99,
                  border:     `1px solid ${BORDER}`, background: SURFACE,
                  color:      FG, cursor: "pointer",
                  fontFamily: "'Syne', sans-serif", fontSize: 11,
                }}
              >
                <Edit3 size={11} /> Bewerken
              </button>
            )}
          </div>
        </div>

        {/* ── Unsaved changes indicator ──────────────────────────────────── */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              style={{
                background:   "rgba(200,16,46,0.05)",
                borderBottom: `1px solid rgba(200,16,46,0.15)`,
                padding:      "0.625rem 2.5rem",
                display:      "flex",
                alignItems:   "center",
                gap:          8,
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT }}
              />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Bewerkingsmodus actief — klik Opslaan om te bevestigen
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Twee kolommen (stacks op mobile) ─────────────────────────────── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          minHeight:           "calc(100vh - 160px)",
          alignItems:          "start",
        }}>

          {/* ════════════════════════════════════════
              LINKS — Profielgegevens
          ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding:      isMobile ? "2rem 1.5rem" : "3rem 3.5rem",
              borderRight:  isMobile ? "none" : `1px solid ${BORDER}`,
              borderBottom: isMobile ? `1px solid ${BORDER}` : "none",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "2.5rem" }}>
              <div style={{
                width:          52,
                height:         52,
                borderRadius:   "50%",
                background:     ACCENT,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                  {saved.voornaam ? saved.voornaam[0].toUpperCase() : "?"}
                  {saved.achternaam ? saved.achternaam[0].toUpperCase() : ""}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, fontStyle: "italic", color: FG, letterSpacing: "-0.02em" }}>
                  {saved.voornaam || "—"} {saved.achternaam}
                  <span style={{ color: ACCENT }}>.</span>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: MUTED, marginTop: 2 }}>
                  {saved.email || "Geen e-mail ingesteld"}
                </div>
              </div>
            </div>

            <SectionHeader label="Profielgegevens" title={<>Mijn <em style={{ color: ACCENT }}>gegevens.</em></>} />

            {/* ── AVG Art. 15 — Recht op inzage ─────────────────────────────
                Alle opgeslagen velden zijn altijd zichtbaar voor de gebruiker.
            ─────────────────────────────────────────────────────────────────── */}
            <ProfileInput
              id="voornaam"
              label="Voornaam"
              value={isEditing ? draft.voornaam : saved.voornaam}
              onChange={(v) => setDraft((p) => ({ ...p, voornaam: v }))}
              error={errors.voornaam}
              placeholder="Jouw voornaam"
              readOnly={!isEditing}
            />
            <ProfileInput
              id="achternaam"
              label="Achternaam"
              value={isEditing ? draft.achternaam : saved.achternaam}
              onChange={(v) => setDraft((p) => ({ ...p, achternaam: v }))}
              error={errors.achternaam}
              placeholder="Jouw achternaam"
              readOnly={!isEditing}
            />

            {/* ── E-mail — AVG Art. 13: transparantie over contactgegeven ── */}
            <ProfileInput
              id="email"
              label="E-mailadres"
              type="email"
              value={isEditing ? draft.email : saved.email}
              onChange={(v) => setDraft((p) => ({ ...p, email: v }))}
              error={errors.email}
              placeholder="jij@voorbeeld.com"
              readOnly={!isEditing}
            />

            {/* ── AVG Art. 7 — Toestemmingscontrole ─────────────────────────
                Expliciete, geïnformeerde toestemming voor gegevensverwerking.
                Altijd intrekbaar — ook als geen bewerkingsmodus actief is.
            ─────────────────────────────────────────────────────────────────── */}
            <div style={{
              padding:      "1.25rem",
              borderRadius: 10,
              background:   saved.gdprConsent ? "rgba(200,16,46,0.04)" : BG,
              border:       `1px solid ${saved.gdprConsent ? "rgba(200,16,46,0.18)" : BORDER}`,
              marginBottom: "2rem",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {/* Consent checkbox — klikbaar in bewerkingsmodus */}
                <div
                  id="gdpr-consent-checkbox"
                  data-analytics-label="profile_gdpr_consent_toggle"
                  onClick={() => isEditing && setDraft((p) => ({ ...p, gdprConsent: !p.gdprConsent }))}
                  role="checkbox"
                  aria-checked={isEditing ? draft.gdprConsent : saved.gdprConsent}
                  aria-label="AVG toestemming"
                  style={{
                    width:          20,
                    height:         20,
                    borderRadius:   5,
                    border:         `1.5px solid ${(isEditing ? draft.gdprConsent : saved.gdprConsent) ? ACCENT : BORDER}`,
                    background:     (isEditing ? draft.gdprConsent : saved.gdprConsent) ? ACCENT : SURFACE,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    cursor:         isEditing ? "pointer" : "default",
                    marginTop:      2,
                    transition:     "all 0.18s",
                  }}
                >
                  {(isEditing ? draft.gdprConsent : saved.gdprConsent) && (
                    <Check size={12} color="#fff" />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: FG, marginBottom: 4 }}>
                    Toestemming gegevensverwerking{" "}
                    <span style={{
                      fontFamily:    "'Syne', sans-serif",
                      fontSize:      9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding:       "2px 7px",
                      borderRadius:  99,
                      background:    saved.gdprConsent ? "rgba(200,16,46,0.1)" : "#F5F4F0",
                      color:         saved.gdprConsent ? ACCENT : MUTED,
                      marginLeft:    4,
                    }}>
                      AVG Art. 7
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.65, margin: 0 }}>
                    Ik geef toestemming aan Joaquin Holthof Portfolio voor de verwerking van mijn naam en e-mailadres met als doel: portfoliobeheer en contactverwerking. Toestemming kan op elk moment worden ingetrokken.
                  </p>
                  {errors.gdprConsent && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, marginTop: 6 }}>
                      <AlertCircle size={11} /> {errors.gdprConsent}
                    </div>
                  )}
                </div>
              </div>

              {/* Consent intrekken — altijd zichtbaar (niet alleen in edit modus) */}
              {!isEditing && saved.gdprConsent && (
                <div style={{ marginTop: "0.875rem", paddingTop: "0.875rem", borderTop: `1px solid rgba(200,16,46,0.12)` }}>
                  <button
                    id="profile-revoke-consent-btn"
                    data-analytics-label="profile_revoke_consent_open"
                    onClick={() => setRevokeModal(true)}
                    style={{
                      background:    "none",
                      border:        "none",
                      fontFamily:    "'Syne', sans-serif",
                      fontSize:      11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color:         MUTED,
                      cursor:        "pointer",
                      padding:       0,
                      display:       "flex",
                      alignItems:    "center",
                      gap:           5,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
                  >
                    <Shield size={11} /> Toestemming intrekken (AVG Art. 7)
                  </button>
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: saved.gdprConsent ? ACCENT : BORDER, flexShrink: 0 }}
              />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>
                Toestemming: <strong style={{ color: saved.gdprConsent ? ACCENT : FG }}>
                  {saved.gdprConsent ? "Verleend" : "Ingetrokken"}
                </strong>
              </span>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════
              RECHTS — GDPR-rechten & Gegevensbeheer
          ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding:  isMobile ? "2rem 1.5rem" : "3rem 3rem",
              display:  "flex",
              flexDirection: "column",
              gap:      "2.5rem",
            }}
          >
            {/* ── Jouw AVG-rechten (informatief) ──────────────────────────── */}
            <div>
              <SectionHeader label="GDPR / AVG" title={<>Jouw <em style={{ color: ACCENT }}>rechten.</em></>} />

              <div style={{ borderTop: `1px solid ${BORDER}` }}>
                <GdprRow
                  icon={User}
                  artikel="AVG Art. 15"
                  recht="Recht op inzage"
                  omschrijving="Alle opgeslagen persoonsgegevens zijn zichtbaar op dit scherm."
                />
                <GdprRow
                  icon={Edit3}
                  artikel="AVG Art. 16"
                  recht="Recht op rectificatie"
                  omschrijving="Je kunt naam en e-mail op elk moment aanpassen via de Bewerken-knop."
                />
                <GdprRow
                  icon={Download}
                  artikel="AVG Art. 20"
                  recht="Recht op overdraagbaarheid"
                  omschrijving="Download al je gegevens als leesbaar JSON-bestand via de knop hieronder."
                />
                <GdprRow
                  icon={Trash2}
                  artikel="AVG Art. 17"
                  recht="Recht op vergetelheid"
                  omschrijving="Je kunt je account en alle bijbehorende gegevens permanent wissen."
                />
                <GdprRow
                  icon={Shield}
                  artikel="AVG Art. 7"
                  recht="Recht om consent in te trekken"
                  omschrijving="Je toestemming is op elk moment intrekbaar, zonder gevolgen voor jou."
                />
              </div>
            </div>

            {/* ── Gegevensbeheer acties ────────────────────────────────────── */}
            <div>
              <div style={{
                fontFamily:    "'Syne', sans-serif",
                fontSize:      10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         MUTED,
                marginBottom:  "1rem",
                display:       "flex",
                alignItems:    "center",
                gap:           8,
              }}>
                <span style={{ width: 14, height: 1, background: ACCENT, display: "inline-block" }} />
                Gegevensbeheer
              </div>

              {/* AVG Art. 13 — Transparantie over verwerking */}
              <div style={{
                padding:      "1rem 1.25rem",
                background:   BG,
                border:       `1px solid ${BORDER}`,
                borderRadius: 8,
                marginBottom: "1rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <FileText size={13} color={MUTED} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: FG }}>
                    Doel van verwerking
                  </span>
                  <span style={{
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding:       "2px 7px",
                    borderRadius:  99,
                    background:    "#F5F4F0",
                    color:         MUTED,
                  }}>
                    AVG Art. 13
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.65, margin: 0 }}>
                  Je gegevens worden uitsluitend gebruikt voor portfoliobeheer en zijn niet gedeeld met derden. Verwerkingsverantwoordelijke: Joaquin Holthof — <a href="mailto:vyzo.studios@gmail.com" style={{ color: ACCENT, textDecoration: "none" }}>vyzo.studios@gmail.com</a>
                </p>
              </div>

              {/* ── AVG Art. 20 — Download knop ─────────────────────────────
                  Exporteert persoonsgegevens als gestructureerd JSON-bestand.
              ─────────────────────────────────────────────────────────────── */}
              <motion.button
                id="profile-export-btn"
                data-analytics-label="profile_export_data_click"
                onClick={handleExport}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            10,
                  width:          "100%",
                  background:     DARK,
                  color:          "#fff",
                  padding:        "13px 24px",
                  borderRadius:   99,
                  border:         "none",
                  fontFamily:     "'Syne', sans-serif",
                  fontSize:       12,
                  fontWeight:     700,
                  letterSpacing:  "0.06em",
                  textTransform:  "uppercase",
                  cursor:         "pointer",
                  marginBottom:   "0.75rem",
                }}
              >
                <Download size={14} /> Download mijn data (JSON)
              </motion.button>

              {/* ── AVG Art. 17 — Account verwijderen ───────────────────────
                  Opent confirmatiemodal om onomkeerbare actie te bevestigen.
              ─────────────────────────────────────────────────────────────── */}
              <motion.button
                id="profile-delete-btn"
                data-analytics-label="profile_delete_account_open"
                onClick={() => setDeleteModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            10,
                  width:          "100%",
                  background:     "transparent",
                  color:          ACCENT,
                  padding:        "13px 24px",
                  borderRadius:   99,
                  border:         `1px solid rgba(200,16,46,0.3)`,
                  fontFamily:     "'Syne', sans-serif",
                  fontSize:       12,
                  fontWeight:     700,
                  letterSpacing:  "0.06em",
                  textTransform:  "uppercase",
                  cursor:         "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Trash2 size={14} /> Account verwijderen (AVG Art. 17)
              </motion.button>
            </div>

            {/* ── Terug naar Admin ─────────────────────────────────────────── */}
            <div style={{ paddingTop: "1rem", borderTop: `1px solid ${BORDER}` }}>
              <Link
                href="/admin"
                id="profile-back-to-admin"
                data-analytics-label="profile_back_to_admin_click"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           6,
                  fontFamily:    "'Syne', sans-serif",
                  fontSize:      11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:         MUTED,
                  textDecoration:"none",
                  transition:    "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = FG)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
              >
                <Mail size={11} /> ← Terug naar Admin Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
