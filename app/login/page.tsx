"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const ACCENT = "#C8102E";
const FG     = "#0D0D0D";
const BORDER = "#EAE8E3";
const MUTED  = "#9E9B94";
const BG     = "#FAFAF8";

type Tab = "login" | "register" | "reset";

// ─── Styled Input ─────────────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder }: {
  label: string; type?: string; placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{
        fontFamily: "'Syne', sans-serif", fontSize: 11,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? ACCENT : MUTED, transition: "color 0.2s",
      }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", fontFamily: "'Inter', sans-serif", fontSize: 14, color: FG,
          background: "#FFFFFF",
          border: `1px solid ${focused ? ACCENT : BORDER}`,
          borderRadius: 8, padding: "13px 15px", outline: "none",
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <motion.button
      type="submit" disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        background: loading ? MUTED : ACCENT, color: "#fff",
        padding: "14px 28px", borderRadius: 99,
        fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.08em", textTransform: "uppercase",
        border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s",
      }}
    >
      {loading ? "Even geduld…" : label}
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const isMobile              = useIsMobile();
  const [tab,     setTab]     = React.useState<Tab>("login");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const TABS: { id: Tab; label: string }[] = [
    { id: "login",    label: "Inloggen"    },
    { id: "register", label: "Registreren" },
    { id: "reset",    label: "Reset"       },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  }

  return (
    <div style={{ background: BG, paddingTop: isMobile ? "72px" : 100, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <section style={{
        padding: isMobile ? "2rem 1.5rem 2rem" : "4rem 4rem 3.5rem",
        borderBottom: `1px solid ${BORDER}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: "3rem", top: "1.5rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(5rem, 14vw, 11rem)",
          fontWeight: 700, fontStyle: "italic",
          color: "transparent", WebkitTextStroke: `1px ${BORDER}`,
          letterSpacing: "-0.06em", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>
          AUTH
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Syne', sans-serif", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "1.5rem",
          }}
        >
          <span style={{ width: 20, height: 1, background: ACCENT, display: "inline-block" }} />
          Authenticatie
        </motion.div>

        <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
          <motion.div
            initial={{ y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.03em",
              paddingBottom: "0.06em", color: FG,
            }}
          >
            Welkom.
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
        gap: isMobile ? "2rem" : "5rem",
        padding: isMobile ? "2rem 1.5rem" : "4rem",
        alignItems: "start",
      }}>

        {/* Left meta — hidden on mobile */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: isMobile ? "none" : "block" }}
        >
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "1.5rem",
          }}>
            — Account
          </div>

          {[
            { label: "Platform", value: "Portfolio JH." },
            { label: "Versie",   value: "v1.0.2"         },
            { label: "Status",   value: "Actief"          },
          ].map((row) => (
            <div key={row.label} style={{
              padding: "1.25rem 0", borderBottom: `1px solid ${BORDER}`,
              display: "grid", gridTemplateColumns: "90px 1fr", gap: "1rem",
            }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: BORDER }}>
                {row.label}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: FG }}>
                {row.value}
              </span>
            </div>
          ))}

          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.08em",
              textTransform: "uppercase", color: MUTED, textDecoration: "none", transition: "color 0.2s",
            }}>
              ← Terug naar home
            </Link>
          </div>
        </motion.div>

        {/* Right form */}
        <div>
          {/* Tab bar */}
          <div style={{
            display: "flex", gap: 2, marginBottom: "2rem",
            background: "#F0EDE8", borderRadius: 99, padding: "4px", width: "fit-content",
          }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "8px 16px", borderRadius: 99, border: "none",
                background: tab === t.id ? ACCENT : "transparent",
                color: tab === t.id ? "#fff" : MUTED,
                fontFamily: "'Syne', sans-serif", fontSize: 11,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.18s ease",
              }}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "login" && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <Field label="E-mail"     type="email"    placeholder="jij@voorbeeld.com" />
                  <Field label="Wachtwoord" type="password" placeholder="••••••••" />
                  <button type="button" onClick={() => setTab("reset")} style={{
                    alignSelf: "flex-end", background: "none", border: "none",
                    fontFamily: "'Syne', sans-serif", fontSize: 11,
                    letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, cursor: "pointer",
                  }}>
                    Wachtwoord vergeten?
                  </button>
                  <SubmitBtn loading={loading} label="Inloggen" />
                </form>
              )}

              {tab === "register" && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <Field label="E-mail"              type="email"    placeholder="jij@voorbeeld.com" />
                  <Field label="Wachtwoord"          type="password" placeholder="••••••••" />
                  <Field label="Bevestig wachtwoord" type="password" placeholder="••••••••" />
                  <SubmitBtn loading={loading} label="Account aanmaken" />
                </form>
              )}

              {tab === "reset" && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7, opacity: 1, marginTop: 0 }}>
                    Vul je e-mailadres in en je ontvangt een resetlink.
                  </p>
                  <Field label="E-mail" type="email" placeholder="jij@voorbeeld.com" />
                  <SubmitBtn loading={loading} label="Resetlink sturen" />
                </form>
              )}

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{
                      marginTop: "1rem", display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px",
                      background: "rgba(200,16,46,0.06)", border: `1px solid ${ACCENT}`, borderRadius: 8,
                      fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, letterSpacing: "0.06em",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                    Actie succesvol uitgevoerd.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
