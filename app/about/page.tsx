"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, User, GraduationCap } from "lucide-react";

const ACCENT = "#C8102E";
const FG     = "#0D0D0D";
const BORDER = "#EAE8E3";
const MUTED  = "#9E9B94";
const BG     = "#FAFAF8";

const SKILLS = [
  {
    icon: Code2,
    index: "01",
    title: "Modern Dev",
    desc: "Gespecialiseerd in Next.js, React en Tailwind CSS.",
  },
  {
    icon: User,
    index: "02",
    title: "UX Focus",
    desc: "Gebruikerservaring staat centraal in elk project dat ik maak.",
  },
  {
    icon: GraduationCap,
    index: "03",
    title: "Leren",
    desc: "Altijd bezig met de nieuwste tools en technieken binnen de sector.",
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function SkillCard({ icon: Icon, index, title, desc, i }: {
  icon: typeof Code2; index: string; title: string; desc: string; i: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      custom={i}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      style={{
        padding:      "2rem",
        border:       `1px solid ${BORDER}`,
        borderRadius: 12,
        background:   "#FFFFFF",
        display:      "flex",
        flexDirection: "column",
        gap:          "1rem",
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Index */}
      <span style={{
        position:      "absolute",
        top:           "1rem",
        right:         "1.25rem",
        fontFamily:    "'Syne', sans-serif",
        fontSize:      11,
        color:         BORDER,
        letterSpacing: "0.06em",
      }}>
        {index}
      </span>

      {/* Icon */}
      <div style={{
        width:          40,
        height:         40,
        borderRadius:   8,
        background:     "#F5F3EE",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}>
        <Icon size={18} color={MUTED} />
      </div>

      <div>
        <div style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      "1rem",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         FG,
          marginBottom:  6,
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   13,
          color:      MUTED,
          lineHeight: 1.65,
          opacity:    1,
          margin:     0,
        }}>
          {desc}
        </p>
      </div>

      {/* Red accent bar on hover */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
        style={{
          position:   "absolute",
          bottom:     0,
          left:       0,
          height:     2,
          background: ACCENT,
        }}
      />
    </motion.div>
  );
}

export default function AboutPage() {
  const introRef   = useRef(null);
  const introInView = useInView(introRef, { once: true });

  return (
    <div style={{ background: BG, paddingTop: 100, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <section style={{
        padding:      "4rem 4rem 3rem",
        borderBottom: `1px solid ${BORDER}`,
        position:     "relative",
        overflow:     "hidden",
      }}>
        {/* Bg text */}
        <div style={{
          position:      "absolute",
          right:         "3rem",
          top:           "1rem",
          fontFamily:    "'Playfair Display', serif",
          fontSize:      "clamp(6rem, 14vw, 11rem)",
          fontWeight:    700,
          fontStyle:     "italic",
          color:         "#EAE8E3",
          letterSpacing: "-0.06em",
          lineHeight:    1,
          pointerEvents: "none",
          userSelect:    "none",
        }}>
          About
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Syne', sans-serif", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED,
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ width: 20, height: 1, background: ACCENT, display: "inline-block" }} />
          Student UI/UX & Development
        </motion.div>

        {["Over", "Mij."].map((word, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 0.92 }}>
            <motion.div
              initial={{ y: "110%" }} animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily:    "'Playfair Display', serif",
                fontSize:      "clamp(3rem, 7vw, 6rem)",
                fontWeight:    700,
                fontStyle:     i === 1 ? "italic" : "normal",
                letterSpacing: "-0.03em",
                paddingBottom: "0.06em",
                color:         i === 1 ? ACCENT : FG,
              }}
            >
              {word}
            </motion.div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 15,
            color: MUTED, lineHeight: 1.7, maxWidth: 440,
            marginTop: "1rem", opacity: 1,
          }}
        >
          Welkom op mijn persoonlijke portfolio website.
        </motion.p>
      </section>

      {/* ── Intro ── */}
      <motion.section
        ref={introRef}
        initial={{ opacity: 0 }}
        animate={introInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          padding:             "3.5rem 4rem",
          borderBottom:        `1px solid ${BORDER}`,
          display:             "grid",
          gridTemplateColumns: "220px 1fr",
          gap:                 "4rem",
          alignItems:          "start",
        }}
      >
        {/* Left label */}
        <div>
          <div style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         MUTED,
            marginBottom:  "0.75rem",
          }}>
            — Introductie
          </div>
          <div style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            color:         BORDER,
            letterSpacing: "0.06em",
          }}>
            2024 / v1.0
          </div>
        </div>

        {/* Right */}
        <div>
          <motion.h2
            custom={0} initial="hidden"
            animate={introInView ? "visible" : "hidden"} variants={fadeUp}
            style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight:    700,
              fontStyle:     "italic",
              letterSpacing: "-0.02em",
              lineHeight:    1.15,
              color:         FG,
              marginBottom:  "1.25rem",
              marginTop:     0,
            }}
          >
            Ik ben Joaquin Holthof
          </motion.h2>
          <motion.p
            custom={1} initial="hidden"
            animate={introInView ? "visible" : "hidden"} variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 15,
              color: "#555", lineHeight: 1.85, opacity: 1, margin: 0,
            }}
          >
            Dit is mijn digitale ruimte waar ik mijn passie voor technologie en design deel.
            Als gedreven student focus ik op het bouwen van moderne, schaalbare en vooral
            gebruiksvriendelijke applicaties. Mijn doel is om complexe problemen op te lossen
            met schone code en een strak design.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Skills ── */}
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{
          padding:      "1.75rem 4rem 1.25rem",
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <span style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         MUTED,
          }}>
            — Specialisaties
          </span>
        </div>

        <div style={{
          padding:             "2.5rem 4rem",
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "1.25rem",
        }}>
          {SKILLS.map((s, i) => (
            <SkillCard key={s.index} {...s} i={i} />
          ))}
        </div>
      </section>

      {/* ── Footer row ── */}
      <div style={{
        padding:        "1.5rem 4rem",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
          <span style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      11,
            color:         MUTED,
            letterSpacing: "0.06em",
          }}>
            Gemaakt voor schoolopdracht 2024
          </span>
        </div>
        <span style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      11,
          color:         BORDER,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          v1.0.2
        </span>
      </div>

    </div>
  );
}
