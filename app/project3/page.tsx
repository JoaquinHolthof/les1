"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ACCENT   = "#C8102E";
const FG       = "#0D0D0D";
const BORDER   = "#EAE8E3";
const MUTED    = "#9E9B94";
const BG       = "#FAFAF8";

const LIVE_URL = "https://joaquinholthof.github.io/lightline.github.io/";

const META = [
  { label: "Jaar",      value: "2025"                    },
  { label: "Type",      value: "Interactief Design"       },
  { label: "Locatie",   value: "Astrid Plaats, Antwerpen" },
  { label: "Tooling",   value: "Figma & Webdesign"        },
];

export default function Project3Page() {
  const isMobile    = useIsMobile();
  const [prevHov, setPrevHov] = useState(false);
  const [nextHov, setNextHov] = useState(false);
  const [liveHov, setLiveHov] = useState(false);

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100 }}>

      {/* ── Kader ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 1.5rem" : "0 3rem" }}>

        {/* ── Header ── */}
        <section style={{ padding: "3rem 0 2.5rem", borderBottom: `1px solid ${BORDER}` }}>
          <motion.div
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }} style={{ marginBottom: "2rem" }}
          >
            <Link href="/work" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: MUTED, textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = FG)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              <ArrowLeft size={13} /> Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "0.875rem" }}
          >
            <span style={{ width: 18, height: 1, background: ACCENT, display: "inline-block" }} />
            03 — Interactief Design · 2025
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, color: FG, margin: 0 }}
            >
              LightLine <em style={{ color: ACCENT }}>Astrid.</em>
            </motion.h1>
          </div>

          {/* Live website knop */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{ marginTop: "1.5rem" }}
          >
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLiveHov(true)}
              onMouseLeave={() => setLiveHov(false)}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            8,
                padding:        "10px 22px",
                borderRadius:   99,
                background:     liveHov ? ACCENT : FG,
                color:          "#fff",
                fontFamily:     "'Syne', sans-serif",
                fontSize:       12,
                fontWeight:     700,
                letterSpacing:  "0.05em",
                textTransform:  "uppercase",
                textDecoration: "none",
                transition:     "background 0.2s ease",
              }}
            >
              <ExternalLink size={13} />
              Bekijk live website
            </a>
          </motion.div>
        </section>

        {/* ── Block 1: tekst links · foto1 rechts ── */}
        <section style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "5rem", padding: isMobile ? "2rem 0" : "4rem 0",
          borderBottom: `1px solid ${BORDER}`, alignItems: "center",
        }}>
          {/* Tekst */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "1.25rem" }}>
              Projectbeschrijving
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: "0 0 1.25rem" }}>
              LightLine is een interactief lichtontwerp voor <strong style={{ color: FG, fontWeight: 600 }}>Astrid Plaats</strong> in Antwerpen. Het concept vertaalt het gevoel van onveiligheid in publieke ruimtes naar een tastbare oplossing: een lichtbox waarmee voorbijgangers kunnen interageren.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: 0 }}>
              Door licht als middel in te zetten creëren we een warme, uitnodigende sfeer die sociale aanwezigheid stimuleert — mensen trekken mensen aan.
            </p>

            {/* Meta grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid ${BORDER}` }}>
              {META.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 3 }}>
                    {m.label}
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG, letterSpacing: "-0.01em" }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Foto 1 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            style={{ position: "relative", aspectRatio: "4/5", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
          >
            <Image src="/project3-foto1.png" alt="LightLine Astrid — overzicht" fill priority style={{ objectFit: "cover" }} />
          </motion.div>
        </section>

        {/* ── Block 2: foto2 links · tekst rechts ── */}
        <section style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "5rem", padding: isMobile ? "2rem 0" : "4rem 0",
          borderBottom: `1px solid ${BORDER}`, alignItems: "center",
        }}>
          {/* Foto 2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ position: "relative", aspectRatio: "4/5", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
          >
            <Image src="/project3-foto2.png" alt="LightLine Astrid — interactie" fill style={{ objectFit: "cover" }} />
          </motion.div>

          {/* Tekst */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "1.25rem" }}>
              Interactie & Concept
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: "0 0 1.25rem" }}>
              De lichtbox reageert op de aanwezigheid en beweging van passanten. Raak je het object aan, dan versterkt het licht — een directe terugkoppeling die uitnodigt tot contact en verblijf.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: "0 0 2rem" }}>
              Het ontwerp is bewust minimalistisch: geen opdringerige signalisatie, maar een subtiele aanmoediging om de ruimte te claimen als eigen.
            </p>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: ACCENT, textDecoration: "none",
                borderBottom: `1px solid ${ACCENT}`, paddingBottom: 2,
              }}
            >
              Live website bekijken ↗
            </a>
          </motion.div>
        </section>

        {/* ── Block 3: foto3 + foto4 naast elkaar ── */}
        <section style={{ padding: "4rem 0", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "1.75rem" }}>
            Beeldmateriaal
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ position: "relative", aspectRatio: "3/2", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
            >
              <Image src="/project3-foto3.png" alt="LightLine Astrid — sfeer" fill style={{ objectFit: "cover" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{ position: "relative", aspectRatio: "3/2", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
            >
              <Image src="/project3-foto4.jpeg" alt="LightLine Astrid — detail" fill style={{ objectFit: "cover" }} />
            </motion.div>
          </div>
        </section>

        {/* ── Nav ── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2rem 0" }}>
          <Link
            href="/project2"
            onMouseEnter={() => setPrevHov(true)}
            onMouseLeave={() => setPrevHov(false)}
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", opacity: prevHov ? 1 : 0.6, transition: "opacity 0.2s" }}
          >
            <ArrowLeft size={14} color={FG} />
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Vorig</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, fontStyle: "italic", color: FG }}>CINE CITY.</div>
            </div>
          </Link>
          <Link
            href="/work"
            onMouseEnter={() => setNextHov(true)}
            onMouseLeave={() => setNextHov(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, textDecoration: "none", opacity: nextHov ? 1 : 0.6, transition: "opacity 0.2s" }}
          >
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Overzicht</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG }}>Alle projecten</div>
            </div>
            <ArrowRight size={14} color={nextHov ? ACCENT : FG} style={{ transition: "color 0.2s" }} />
          </Link>
        </section>

      </div>
    </div>
  );
}
