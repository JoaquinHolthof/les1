"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ACCENT = "#C8102E";
const BG     = "#FAFAF8";
const FG     = "#0D0D0D";
const BORDER = "#EAE8E3";
const MUTED  = "#9E9B94";

const PROJECTS = [
  {
    index:  "01",
    title:  "Brewtopia",
    italic: "in de Stad.",
    tag:    "Grafisch Ontwerp",
    year:   "2024",
    desc:   "Poster en mockup visualisatie voor een eigen drankenmerk. Typografie en kleur versterken het product in het straatbeeld.",
    href:   "/project1",
    image:  "/project1-mockup.png",
  },
  {
    index:  "02",
    title:  "CineCity",
    italic: "",
    tag:    "GRAFISCH ONTWERP",
    year:   "2025",
    desc:   "Brand identity voor een fictief filmfestival: poster, mockups, typografie en kleurpalet.",
    href:   "/project2",
    image:  "/project2-foto2.png",
  },
  {
    index:  "03",
    title:  "LightLine",
    italic: "Astrid.",
    tag:    "Interactief Design",
    year:   "2025",
    desc:   "Een interactieve lichtinstallatie op Astrid Plaats om mensen zich veiliger te laten voelen in publieke ruimte.",
    href:   "/project3",
    image:  "/project3-foto2.png",
  },
];

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={p.href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        {/* Image */}
        <div style={{
          position:     "relative",
          aspectRatio:  "4/3",
          overflow:     "hidden",
          background:   "#F0EEE9",
          borderRadius: 4,
          marginBottom: "1.25rem",
        }}>
          <Image
            src={p.image}
            alt={p.title}
            fill
            style={{
              objectFit:  "cover",
              transition: "transform 0.5s ease",
              transform:  hov ? "scale(1.04)" : "scale(1)",
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Red bar on hover */}
          <div style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            height:     3,
            width:      hov ? "100%" : "0%",
            background: ACCENT,
            transition: "width 0.35s ease",
          }} />
        </div>

        {/* Info row */}
        <div style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          gap:            "1rem",
        }}>
          <div>
            {/* Tag + year */}
            <div style={{
              display:       "flex",
              alignItems:    "center",
              gap:           12,
              marginBottom:  "0.5rem",
            }}>
              <span style={{
                fontFamily:    "'Syne', sans-serif",
                fontSize:      10,
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         hov ? ACCENT : MUTED,
                transition:    "color 0.2s",
              }}>
                {p.tag}
              </span>
              <span style={{
                width:      3,
                height:     3,
                borderRadius: "50%",
                background: BORDER,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily:    "'Syne', sans-serif",
                fontSize:      10,
                letterSpacing: "0.08em",
                color:         MUTED,
              }}>
                {p.year}
              </span>
            </div>

            {/* Title */}
            <div style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      "clamp(1.2rem, 2.2vw, 1.6rem)",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
              color:         FG,
            }}>
              {p.title}
              {p.italic && (
                <span style={{ fontStyle: "italic", color: ACCENT }}> {p.italic}</span>
              )}
            </div>

            {/* Desc */}
            <p style={{
              fontFamily:  "'Inter', sans-serif",
              fontSize:    13,
              color:       MUTED,
              lineHeight:  1.65,
              marginTop:   "0.5rem",
              maxWidth:    320,
              opacity:     1,
            }}>
              {p.desc}
            </p>
          </div>

          {/* Arrow */}
          <div style={{
            width:          36,
            height:         36,
            borderRadius:   "50%",
            border:         `1px solid ${hov ? ACCENT : BORDER}`,
            background:     hov ? ACCENT : "transparent",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            marginTop:      "0.25rem",
            transition:     "all 0.2s ease",
          }}>
            <ArrowUpRight size={14} color={hov ? "#fff" : MUTED} />
          </div>
        </div>

        {/* Number label */}
        <div style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      10,
          letterSpacing: "0.1em",
          color:         BORDER,
          marginTop:     "0.75rem",
        }}>
          {p.index}
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100 }}>

      {/* ── Header ── */}
      <section style={{
        padding:      isMobile ? "2rem 1.5rem 2rem" : "3rem 4rem 2.5rem",
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
            marginBottom:  "1.25rem",
          }}>
            <span style={{ width: 20, height: 1, background: ACCENT, display: "inline-block" }} />
            Geselecteerde projecten
          </div>

          <h1 style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "clamp(2.5rem, 6vw, 5rem)",
            fontWeight:    700,
            letterSpacing: "-0.03em",
            lineHeight:    1,
            color:         FG,
            margin:        0,
          }}>
            Werk <em style={{ color: ACCENT }}>dat telt.</em>
          </h1>
        </motion.div>
      </section>

      {/* ── Project grid ── */}
      <section style={{
        padding: isMobile ? "2rem 1.5rem" : "4rem",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap:     isMobile ? "2.5rem" : "3rem",
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.index} p={p} i={i} />
        ))}
      </section>

      {/* ── Contact strip ── */}
      <section style={{
        borderTop:      `1px solid ${BORDER}`,
        padding:        isMobile ? "2rem 1.5rem" : "3rem 4rem",
        display:        "flex",
        alignItems:     isMobile ? "flex-start" : "center",
        flexDirection:  isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap:            "1.5rem",
        flexWrap:       "wrap",
      }}>
        <div>
          <div style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         MUTED,
            marginBottom:  "0.5rem",
          }}>
            Nieuwe opdracht?
          </div>
          <p style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "clamp(1.4rem, 3vw, 2.2rem)",
            fontWeight:    700,
            fontStyle:     "italic",
            letterSpacing: "-0.02em",
            color:         FG,
            margin:        0,
          }}>
            Let&apos;s werk samen.
          </p>
        </div>
        <Link
          href="/contact"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            8,
            background:     ACCENT,
            color:          "#fff",
            padding:        "12px 24px",
            borderRadius:   99,
            fontFamily:     "'Syne', sans-serif",
            fontSize:       12,
            fontWeight:     600,
            letterSpacing:  "0.06em",
            textTransform:  "uppercase",
            textDecoration: "none",
          }}
        >
          Stuur een bericht <ArrowUpRight size={13} />
        </Link>
      </section>

    </div>
  );
}
