"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ACCENT = "#C8102E";
const FG     = "#0D0D0D";
const BORDER = "#EAE8E3";
const MUTED  = "#9E9B94";
const BG     = "#FAFAF8";

const META = [
  { label: "Jaar",      value: "2025"              },
  { label: "Type",      value: "Festival Branding"  },
  { label: "Tooling",   value: "Adobe Suite"        },
  { label: "Medium",    value: "Print & Digitaal"   },
];

export default function Project2Page() {
  const isMobile    = useIsMobile();
  const [prevHov, setPrevHov] = useState(false);
  const [nextHov, setNextHov] = useState(false);

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100 }}>

      {/* ── Kader / container ── */}
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
            style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "'Syne', sans-serif", fontSize: 11,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: MUTED, marginBottom: "0.875rem",
            }}
          >
            <span style={{ width: 18, height: 1, background: ACCENT, display: "inline-block" }} />
            02 — Festival Branding · 2025
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 700, letterSpacing: "-0.03em",
                lineHeight: 1.05, color: FG, margin: 0,
              }}
            >
              CINE <em style={{ color: ACCENT }}>CITY.</em>
            </motion.h1>
          </div>
        </section>

        {/* ── Block 1: tekst links · foto1 rechts ── */}
        <section style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "5rem",
          padding: isMobile ? "2rem 0" : "4rem 0",
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
              CINE CITY is een volledig uitgewerkte brand identity voor een fictief filmfestival in Antwerpen. Het concept draait om de spanning tussen klassiek cinema-erfgoed en de energie van een hedendaags stadsfestival.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: 0 }}>
              De visuele taal combineert een krachtig typografisch systeem met filmische beeldtaal — zwart-wit contrast, dynamische layouts en een rood accent dat de urgentie van een festivalweek uitstraalt.
            </p>

            {/* Meta grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem 2rem", marginTop: "2.5rem",
              paddingTop: "2rem", borderTop: `1px solid ${BORDER}`,
            }}>
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
            <Image src="/project2-foto1.png" alt="CineCity — poster" fill priority style={{ objectFit: "cover" }} />
          </motion.div>
        </section>

        {/* ── Block 2: foto2 links · tekst rechts ── */}
        <section style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "5rem",
          padding: isMobile ? "2rem 0" : "4rem 0",
          borderBottom: `1px solid ${BORDER}`, alignItems: "center",
        }}>
          {/* Foto 2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ position: "relative", aspectRatio: "4/5", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
          >
            <Image src="/project2-foto2.png" alt="CineCity — branding" fill style={{ objectFit: "cover" }} />
          </motion.div>

          {/* Tekst */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "1.25rem" }}>
              Huisstijl & Typografie
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: "0 0 1.25rem" }}>
              Het kleurpalet is bewust sober: diep zwart als basis, gebroken wit voor ruimte en een krachtig rood als enige accentkleur. Deze keuze verwijst naar klassieke filmpostertraditie en maakt elk visueel element onmiddellijk herkenbaar.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.85, opacity: 1, margin: 0 }}>
              De typografie combineert een brede display-font voor titels met een neutrale sans-serif voor informatieve tekst — een contrast dat spanning en leesbaarheid in balans houdt.
            </p>
          </motion.div>
        </section>

        {/* ── Block 3: foto3 + foto4 naast elkaar ── */}
        <section style={{ padding: isMobile ? "2rem 0" : "4rem 0", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "1.75rem" }}>
            Mockups & Toepassingen
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ position: "relative", aspectRatio: "3/2", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
            >
              <Image src="/project2-foto3.png" alt="CineCity — mockup" fill style={{ objectFit: "cover" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{ position: "relative", aspectRatio: "3/2", borderRadius: 6, overflow: "hidden", background: "#F0EEE9" }}
            >
              <Image src="/project2-foto4.png" alt="CineCity — detail" fill style={{ objectFit: "cover" }} />
            </motion.div>
          </div>
        </section>

        {/* ── Nav ── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2rem 0" }}>
          <Link
            href="/project1"
            onMouseEnter={() => setPrevHov(true)}
            onMouseLeave={() => setPrevHov(false)}
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", opacity: prevHov ? 1 : 0.6, transition: "opacity 0.2s" }}
          >
            <ArrowLeft size={14} color={FG} />
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Vorig</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, fontStyle: "italic", color: FG }}>Brewtopia.</div>
            </div>
          </Link>
          <Link
            href="/project3"
            onMouseEnter={() => setNextHov(true)}
            onMouseLeave={() => setNextHov(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, textDecoration: "none", opacity: nextHov ? 1 : 0.6, transition: "opacity 0.2s" }}
          >
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Volgend</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, fontStyle: "italic", color: FG }}>LightLine Astrid.</div>
            </div>
            <ArrowRight size={14} color={nextHov ? ACCENT : FG} style={{ transition: "color 0.2s" }} />
          </Link>
        </section>

      </div>{/* /kader */}
    </div>
  );
}
