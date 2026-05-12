"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";

// ─── Font import (add to <head> via next/font or _document if preferred) ───────
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap');
`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  index: string;
  title: string;
  description: string;
  tech: string[];
  tag: string;
  year: string;
  href: string;
  accent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    index: "01",
    title: "Archetype Studio",
    description: "Brand identity systeem voor een Belgisch architectenbureau",
    tech: ["Next.js", "GSAP", "Figma"],
    tag: "Web & Brand",
    year: "2025",
    href: "/project1",
    accent: "#E8FF47",
  },
  {
    id: 2,
    index: "02",
    title: "Pulse Analytics",
    description: "Real-time dashboard met GTM-integratie en event-tracking",
    tech: ["React", "D3.js", "GTM"],
    tag: "Analytics",
    year: "2025",
    href: "/project2",
    accent: "#FF6B35",
  },
  {
    id: 3,
    index: "03",
    title: "Morph Design System",
    description: "Modulair UI-componentensysteem voor scale-ups",
    tech: ["Storybook", "Radix", "Tailwind"],
    tag: "UI/UX",
    year: "2024",
    href: "/project3",
    accent: "#A78BFA",
  },
  {
    id: 4,
    index: "04",
    title: "Terrain Commerce",
    description: "Headless e-commerce met edge-rendering en A/B testing",
    tech: ["Shopify", "Next.js", "Vercel"],
    tag: "E-commerce",
    year: "2024",
    href: "/project4",
    accent: "#34D399",
  },
];

const SKILLS = [
  "Next.js", "React", "TypeScript", "Framer Motion",
  "Tailwind CSS", "Figma", "GTM", "Node.js",
  "GSAP", "Vercel", "PostgreSQL", "Prisma",
];

// ─── Custom Cursor ────────────────────────────────────────────────────────────

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const target = el?.closest("[data-cursor]");
      if (target) {
        setIsHovering(true);
        setCursorText(target.getAttribute("data-cursor") || "");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          backgroundColor: isHovering ? "var(--accent)" : "var(--foreground)",
          opacity: isHovering ? 0.9 : 0.4,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {isHovering && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                color: "var(--accent-foreground)",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Gradient Background ──────────────────────────────────────────────────────

function GradientBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: -1,
      overflow: "hidden",
      background: "var(--background)",
    }}>
      {/* Soft moving gradients */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "10%",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(circle, oklch(0.8 0.15 280 / 0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 60, -60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "50vw",
          height: "50vh",
          background: "radial-gradient(circle, oklch(0.85 0.2 100 / 0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      
      {/* Subtle Grain Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", padding: "4rem 0" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "6rem", whiteSpace: "nowrap" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: i % 2 === 0 ? "rgba(255, 255, 255, 0.05)" : "#E8FF47",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={project.href}
        data-cursor="View"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none", display: "block" }}
      >
        <motion.div
          animate={{
            borderColor: hovered ? project.accent : "#1e1e1e",
          }}
          transition={{ duration: 0.3 }}
          style={{
            border: "1px solid #1e1e1e",
            borderRadius: 2,
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            cursor: "none",
          }}
        >
          {/* Accent fill on hover */}
          <motion.div
            animate={{
              opacity: hovered ? 0.04 : 0,
              scale: hovered ? 1 : 0.92,
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              background: project.accent,
              borderRadius: 2,
            }}
          />

          {/* Index + Year */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "#444",
              letterSpacing: "0.12em",
            }}>
              {project.index}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "#444",
              letterSpacing: "0.1em",
            }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <motion.div
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "0.02em",
              color: "#f0ede6",
              marginBottom: "0.6rem",
              lineHeight: 1,
            }}>
              {project.title}
            </h3>
          </motion.div>

          {/* Description */}
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#555",
            lineHeight: 1.7,
            letterSpacing: "0.04em",
            marginBottom: "1.75rem",
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {project.tech.map((t) => (
                <span key={t} style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#444",
                  border: "0.5px solid #2a2a2a",
                  padding: "3px 8px",
                  borderRadius: 100,
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : -8,
                color: project.accent,
              }}
              transition={{ duration: 0.22 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `1px solid ${project.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke={project.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Tag badge */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: project.accent,
              border: `0.5px solid ${project.accent}`,
              padding: "4px 10px",
              borderRadius: 100,
            }}
          >
            {project.tag}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    const duration = 1200;
    const steps = 40;
    const increment = numeric / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numeric]);

  if (isNaN(numeric)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      <span style={{ color: "#E8FF47" }}>{suffix}</span>
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  // Magnetic button effect
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleBtnMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setBtnPos({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{`
        * { cursor: none !important; }
        ::selection { background: #E8FF47; color: #111; }
        body { background: #0a0a0a; }
      `}</style>

      <CustomCursor />
      <GradientBackground />

      <div style={{
        fontFamily: "'DM Mono', monospace",
        background: "#0a0a0a",
        color: "#f0ede6",
        minHeight: "100vh",
        margin: "-5rem -5rem 0",
      }}>

        {/* ── HERO ── */}
        <motion.section
          ref={heroRef}
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 3rem 3.5rem",
            position: "relative",
            overflow: "hidden",
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
          }}
        >
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${(i / 6) * 100}%`,
                width: "0.5px",
                background: "#141414",
                transformOrigin: "top",
              }}
            />
          ))}

          {/* "PORTFOLIO" watermark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "3rem",
              right: "3rem",
              transform: "translateY(-50%)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(5rem, 18vw, 16rem)",
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke: "0.5px #1a1a1a",
              pointerEvents: "none",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            PORTFOLIO
          </motion.div>

          {/* Top-right number */}
          <div style={{ position: "absolute", top: "7rem", right: "3rem" }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "#2e2e2e",
                textAlign: "right",
              }}
            >
              <div>2025</div>
              <div style={{ color: "#E8FF47", marginTop: 4 }}>v.3.0</div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", right: "3rem", bottom: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #E8FF47, transparent)" }}
            />
            <span style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#333", writingMode: "vertical-lr" }}>
              Scroll
            </span>
          </div>

          {/* Main headline */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1.5rem",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ height: 1, background: "#E8FF47" }}
              />
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
                Joaquin Holthof — Creative Developer
              </span>
            </motion.div>

            {/* Staggered headline */}
            {[
              { text: "Digitale", italic: false },
              { text: "bouwer", italic: true },
              { text: "van morgen.", italic: false },
            ].map(({ text, italic }, wi) => (
              <div key={wi} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + wi * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: italic ? "'Instrument Serif', serif" : "'Bebas Neue', sans-serif",
                    fontSize: "clamp(4rem, 10vw, 9rem)",
                    letterSpacing: italic ? "-0.01em" : "0.01em",
                    lineHeight: 0.9,
                    paddingBottom: "0.08em",
                    fontStyle: italic ? "italic" : "normal",
                    color: wi === 2 ? "#E8FF47" : "#f0ede6",
                  }}
                >
                  {text}
                </motion.div>
              </div>
            ))}

            {/* Subline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginTop: "2.5rem",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              <ScrollReveal delay={1}>
                <p style={{
                  fontSize: 10,
                  color: "#888",
                  lineHeight: 2,
                  maxWidth: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  Portfolio van Joaquin Holthof. Meest recente projecten,
                  UI/UX-experimenten en technische deep-dives — gebouwd met
                  aandacht voor elk detail.
                </p>
              </ScrollReveal>

              {/* Magnetic CTA */}
              <motion.a
                ref={btnRef}
                href="#werk"
                data-cursor="View"
                onMouseMove={handleBtnMouse}
                onMouseLeave={() => setBtnPos({ x: 0, y: 0 })}
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#E8FF47",
                  color: "#0a0a0a",
                  padding: "14px 28px",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: 100,
                  textDecoration: "none",
                  fontFamily: "'DM Mono', monospace",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Bekijk mijn werk
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* ── MARQUEE ── */}
        <Marquee items={SKILLS} />

        {/* ── STATS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid #141414",
        }}>
          {[
            { num: "10+", label: "Projecten" },
            { num: "100%", label: "Responsive" },
            { num: "4", label: "Jaar ervaring" },
            { num: "∞", label: "Koffie cups" },
          ].map(({ num, label }, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });
            return (
              <motion.div
                key={label}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 3 ? "1px solid #141414" : "none",
                }}
              >
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  marginBottom: 8,
                  color: "#f0ede6",
                }}>
                  <AnimatedCounter value={num} />
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#333" }}>
                  {label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── PROJECTS ── */}
        <section id="werk" style={{ padding: "15rem 3rem" }}>
          {/* Section header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #141414",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 24, height: 1, background: "#E8FF47" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#444" }}>
                Geselecteerde projecten
              </span>
            </div>
            <motion.a
              href="/projects"
              data-cursor="All"
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#333",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              whileHover={{ color: "#f0ede6", x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Alle projecten
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "#141414",
          }}>
            {PROJECTS.map((project, i) => (
              <div key={project.id} style={{ background: "#0a0a0a", padding: "1px" }}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT STRIP ── */}
        <section id="over" style={{
          padding: "15rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8rem",
          alignItems: "start",
        }}>
          {(() => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 0.92,
                  color: "#f0ede6",
                  marginBottom: "1.5rem",
                }}>
                  Gebouwd op<br />
                  <span style={{ color: "#E8FF47", fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>passie</span> &<br />
                  precisie.
                </div>
                <p style={{
                  fontSize: 10,
                  color: "#888",
                  lineHeight: 2,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  maxWidth: 420,
                }}>
                  Ik combineer sterke technische kennis met een scherp oog voor design.
                  Van pixel-perfecte interfaces tot schaalbare architectuur — ik bouw
                  digitale producten die mensen écht willen gebruiken.
                </p>
              </motion.div>
            );
          })()}

          {/* Skills list */}
          {(() => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}
              >
                {SKILLS.slice(0, 8).map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    style={{
                      padding: "1rem 0",
                      borderBottom: "1px solid #141414",
                      borderRight: i % 2 === 0 ? "1px solid #141414" : "none",
                      paddingRight: i % 2 === 0 ? "1.5rem" : "0",
                      paddingLeft: i % 2 === 1 ? "1.5rem" : "0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#E8FF47", flexShrink: 0 }} />
                      <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555" }}>
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          ref={contactRef}
          style={{
            padding: "6rem 3rem",
            borderTop: "1px solid #141414",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Big BG text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={contactInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(6rem, 20vw, 18rem)",
              letterSpacing: "-0.03em",
              color: "transparent",
              WebkitTextStroke: "0.5px #141414",
              pointerEvents: "none",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            CONTACT
          </motion.div>

          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginBottom: "2rem",
              }}
            >
              <div style={{ width: 20, height: 1, background: "#E8FF47" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444" }}>
                Samen iets bouwen?
              </span>
              <div style={{ width: 20, height: 1, background: "#E8FF47" }} />
            </motion.div>

            {/* CTA headline */}
            <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
              <motion.div
                initial={{ y: "110%" }}
                animate={contactInView ? { y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  color: "#f0ede6",
                }}
              >
                Stuur me een bericht
              </motion.div>
            </div>

            {/* Email link */}
            <motion.a
  href="mailto:joaquin@holthof.dev"
  data-cursor="Mail"
  initial={{ opacity: 0 }}
  animate={contactInView ? { opacity: 1 } : {}}
  // VOEG DEZE SAMEN:
  transition={{ 
    delay: 0.5, 
    duration: 0.4 
  }}
  style={{
    fontFamily: "'Instrument Serif', serif",
    fontStyle: "italic",
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
    color: "#E8FF47",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "3rem",
  }}
  whileHover={{ letterSpacing: "0.05em" }}
>
  joaquin@holthof.dev
</motion.a>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              {["LinkedIn", "GitHub", "Dribbble"].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  data-cursor={s}
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#333",
                    textDecoration: "none",
                  }}
                  whileHover={{ color: "#f0ede6", y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {s}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid #141414",
          padding: "1.5rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 9, letterSpacing: "0.1em", color: "#2a2a2a" }}>
            © 2025 Joaquin Holthof
          </span>
          <span style={{ fontSize: 9, letterSpacing: "0.1em", color: "#2a2a2a" }}>
            Gebouwd met Next.js & Framer Motion
          </span>
        </footer>
      </div>
    </>
  );
}