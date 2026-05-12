"use client";

/**
 * Editorial Red — Homepage
 *
 * Data-Driven Design refactor (User Research les):
 * ─────────────────────────────────────────────────
 * ① Event-Based Tracking  : elk interactief element heeft id + data-analytics-label.
 *   De GlobalAnalyticsTracker pikt deze automatisch op en pusht naar GA4 / GTM.
 * ② Scroll Progress bar   : visuele feedback op scrolldiepte → vermindert drop-off.
 * ③ Back-to-top knop      : verschijnt na 400 px scroll → anti-drop-off maatregel.
 * ④ Pulse-animatie CTA    : pulserende ring op primaire knop verhoogt CTR.
 * ⑤ Master Components     : HeroButton is herbruikbaar; zelfde stijl als ContactPage submit.
 *
 * Sections:
 *   1. Hero            – floating project-photo cards + Framer wow effect + title
 *   2. Stats Bar       – 4-column grid
 *   3. Skills Marquee  – infinite scroll strip
 *   4. Project Carousel – dark section with photo cards, draggable
 *   5. CTA Strip       – full-width red invitation
 */

import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Design tokens ────────────────────────────────────────────────────────────
// Master tokens: ook gebruikt in GlobalNavbar, Contact en Footer.
// Wijzig hier → wijzigt overal.
const ACCENT  = "#C8102E";
const BG      = "#FAFAF8";
const FG      = "#0D0D0D";
const BORDER  = "#EAE8E3";
const MUTED   = "#9E9B94";
const DARK    = "#1A1A1A";
const SURFACE = "#FFFFFF";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: "10+",  label: "Projecten",   sub: "Afgerond" },
  { num: "3+",   label: "Jaar",        sub: "Ervaring"  },
  { num: "100%", label: "Responsive",  sub: "Design"    },
  { num: "GTM",  label: "Gecertified", sub: "Analytics" },
];

const SKILLS = [
  "Next.js", "React", "Tailwind CSS", "Framer Motion",
  "TypeScript", "Figma", "Google Analytics", "UI/UX Design",
  "Node.js", "Photoshop",
];

interface Project {
  id: number;
  index: string;
  title: string;
  tech: string[];
  tag: string;
  href: string;
  year: string;
  desc: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1, index: "01", title: "Brewtopia",
    tech: ["Photoshop", "Illustrator"], tag: "Grafisch Ontwerp",
    href: "/project1", year: "2024",
    desc: "Poster- en mockup visualisatie voor een eigen drankenmerk.",
    image: "/project1-mockup.png",
  },
  {
    id: 2, index: "02", title: "CineCity",
    tech: ["Film", "CineCity", "Brand"], tag: "Visual Design",
    href: "/project2", year: "2025",
    desc: "Real-time analytics dashboard met Google Tag Manager integratie.",
    image: "/project2-foto2.png",
  },
  {
    id: 3, index: "03", title: "LightLine Astrid",
    tech: ["Figma", "Webdesign"], tag: "Interactief Design",
    href: "/project3", year: "2025",
    desc: "Interactieve lichtinstallatie op Astrid Plaats om mensen zich veiliger te laten voelen.",
    image: "/project3-foto2.png",
  },
];

// ─── Floating card positions + rotations ──────────────────────────────────────
const FLOAT_CARDS = [
  {
    project: PROJECTS[0],
    style: { top: "14%", left: "2%" },
    rotate: -5,
    parallaxFactor: { x: -0.018, y: -0.01 },
    delay: 0.55,
    width: 230,
  },
  {
    project: PROJECTS[1],
    style: { top: "28%", right: "2%" },
    rotate: 4,
    parallaxFactor: { x: 0.016, y: -0.014 },
    delay: 0.75,
    width: 210,
  },
  {
    project: PROJECTS[2],
    style: { bottom: "14%", right: "8%" },
    rotate: -3,
    parallaxFactor: { x: 0.012, y: 0.018 },
    delay: 0.9,
    width: 190,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ num, label, sub, index, isLast }: {
  num: string; label: string; sub: string; index: number; isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref} custom={index} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={fadeUp}
      style={{ padding: "2.5rem 2rem", borderRight: !isLast ? `1px solid ${BORDER}` : "none", display: "flex", flexDirection: "column", gap: 6 }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: FG }}>
        {num.replace(/[+%]/, "")}
        {(num.includes("+") || num.includes("%")) && <span style={{ color: ACCENT }}>{num.includes("+") ? "+" : "%"}</span>}
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: FG }}>{label}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED }}>{sub}</div>
    </motion.div>
  );
}

// ─── Floating Hero Image Card ─────────────────────────────────────────────────
function FloatingCard({
  project, style, rotate, parallaxFactor, delay, width, mouseX, mouseY,
}: {
  project: Project;
  style: React.CSSProperties;
  rotate: number;
  parallaxFactor: { x: number; y: number };
  delay: number;
  width: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };
  const px = useSpring(useTransform(mouseX, (v) => v * parallaxFactor.x), springConfig);
  const py = useSpring(useTransform(mouseY, (v) => v * parallaxFactor.y), springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, rotate: rotate - 8, y: 40 }}
      animate={{ opacity: 1, scale: 1, rotate, y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        ...style,
        x: px,
        y: py,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {/* Continuous float */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
        style={{
          width,
          background: SURFACE,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="240px"
          />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ACCENT,
          }} />
        </div>
        <div style={{
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: FG, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              {project.title}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, letterSpacing: "0.04em", marginTop: 2 }}>
              {project.tag}
            </div>
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: MUTED, flexShrink: 0 }}>
            {project.year}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Photo Carousel Card ──────────────────────────────────────────────────────
// Master Component: herbruikbare kaart. Stijl NOOIT lokaal overschrijven.
// Tracking: Engagement-event 'carousel_card_click' meet welk project het meest
//           aanspreekt en helpt de volgorde in de portfolio te optimaliseren.
function CarouselCard({ project, cardWidth = 300 }: { project: Project; cardWidth?: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={project.href}
      id={`carousel-card-${project.id}`}
      // Tracking: welk project wordt het vaakst aangeklikt? (Engagement)
      data-analytics-label={`carousel_card_${project.id}_click`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "flex",
        flexDirection:  "column",
        width:          cardWidth,
        flexShrink:     0,
        background:     "#242424",
        borderRadius:   16,
        textDecoration: "none",
        color:          "inherit",
        border:         `1px solid ${hov ? ACCENT : "rgba(255,255,255,0.07)"}`,
        transition:     "border-color 0.3s, transform 0.3s",
        overflow:       "hidden",
        transform:      hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow:      hov ? "0 24px 48px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{
            objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.55s ease",
          }}
          sizes="300px"
        />
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }} />
        <span style={{
          position:      "absolute",
          top:           "0.875rem",
          left:          "0.875rem",
          fontFamily:    "'Syne', sans-serif",
          fontSize:      10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding:       "3px 10px",
          borderRadius:  99,
          background:    hov ? ACCENT : "rgba(0,0,0,0.45)",
          color:         "#fff",
          backdropFilter: "blur(8px)",
          transition:    "background 0.25s",
          border:        `1px solid ${hov ? "rgba(200,16,46,0.4)" : "rgba(255,255,255,0.12)"}`,
        }}>
          {project.tag}
        </span>
        <span style={{
          position:   "absolute",
          top:        "0.875rem",
          right:      "0.875rem",
          fontFamily: "'Syne', sans-serif",
          fontSize:   10,
          color:      "rgba(255,255,255,0.6)",
          letterSpacing: "0.04em",
        }}>
          {project.year}
        </span>
        <motion.div
          animate={{ width: hov ? "100%" : "0%" }}
          transition={{ duration: 0.35 }}
          style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: ACCENT }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "1.35rem",
            fontWeight:    700,
            fontStyle:     hov ? "italic" : "normal",
            letterSpacing: "-0.02em",
            lineHeight:    1.1,
            color:         "#fff",
            marginBottom:  "0.6rem",
            transition:    "font-style 0.2s",
          }}>
            {project.title}
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   13,
            lineHeight: 1.65,
            color:      "rgba(255,255,255,0.45)",
            opacity:    1,
            margin:     0,
          }}>
            {project.desc}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontFamily:    "'Syne', sans-serif",
                fontSize:      10,
                letterSpacing: "0.04em",
                color:         "rgba(255,255,255,0.3)",
                padding:       "2px 7px",
                borderRadius:  4,
                border:        "1px solid rgba(255,255,255,0.08)",
              }}>
                {t}
              </span>
            ))}
          </div>
          {/* Tracking: pijl-click = hoge intentie naar project detail (Engagement) */}
          <motion.div
            animate={{ x: hov ? 4 : 0 }}
            style={{
              width:          32,
              height:         32,
              borderRadius:   "50%",
              border:         `1px solid ${hov ? ACCENT : "rgba(255,255,255,0.12)"}`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     hov ? ACCENT : "transparent",
              flexShrink:     0,
              transition:     "all 0.25s",
            }}
          >
            <span style={{
              display:     "inline-block",
              width:       7,
              height:      7,
              borderTop:   `1.5px solid ${hov ? "#fff" : "rgba(255,255,255,0.4)"}`,
              borderRight: `1.5px solid ${hov ? "#fff" : "rgba(255,255,255,0.4)"}`,
              transform:   "rotate(45deg) translateX(-1px)",
              transition:  "border-color 0.25s",
            }} />
          </motion.div>
        </div>
      </div>
    </Link>
  );
}

// ─── Hero Button (Master Component) ──────────────────────────────────────────
// MASTER COMPONENT: gebruik ALTIJD deze knop voor primaire/secundaire acties.
// Stijl is identiek aan de submit-knop in ContactPage (zelfde padding, radius, font).
// Dit garandeert een consistent design system over pagina's heen.
function HeroButton({
  children, href, primary, id, analyticsLabel,
}: {
  children: React.ReactNode;
  href: string;
  primary: boolean;
  id: string;
  analyticsLabel: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      id={id}
      // Tracking: meet welke CTA-variant (primary/secondary) meer kliks genereert
      data-analytics-label={analyticsLabel}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "14px 28px", borderRadius: 99,
        fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
        letterSpacing: "0.02em", textDecoration: "none", flexShrink: 0,
        transition: "all 0.2s ease",
        background: primary ? (hov ? "#a00d25" : ACCENT) : (hov ? FG : "transparent"),
        color:  primary ? "#fff" : hov ? "#fff" : FG,
        border: primary ? "none" : `1.5px solid ${hov ? FG : BORDER}`,
      }}
    >
      {children}
      {primary && (
        <span style={{ display: "inline-block", width: 9, height: 9, borderTop: "1.5px solid #fff", borderRight: "1.5px solid #fff", transform: "rotate(45deg)" }} />
      )}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const isMobile    = useIsMobile();
  const heroRef     = useRef<HTMLElement>(null);
  const statsRef    = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Hero parallax scroll
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScrollY, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.65], [1, 0]);
  const bgTextY     = useTransform(heroScrollY, [0, 1], [0, 60]);

  // ── Scroll Progress bar (volledige pagina) ──────────────────────────────────
  // Data: meet de scrolldiepte van bezoekers → hoge pageProgress = hoge engagement.
  const { scrollYProgress: pageProgress } = useScroll();

  // ── Back-to-top knop (verschijnt na 400px scroll) ──────────────────────────
  // Doel: verminder drop-off op lange pagina's door eenvoudige hernavigatie.
  const [showBackTop, setShowBackTop] = useState(false);
  useEffect(() => {
    const handler = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Mouse tracking for floating card parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      rawMouseX.set(e.clientX - cx);
      rawMouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rawMouseX, rawMouseY]);

  const marqueeTech = [...SKILLS, ...SKILLS];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: BG }}>

      {/* ── Scroll Progress bar ──────────────────────────────────────────────
          Metric: scrolldiepte. Bezoekers die 80%+ scrollen = hoge engagement.
          Visueel signaal dat ook de gebruiker bewust maakt van zijn voortgang.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.div
        id="scroll-progress-bar"
        data-analytics-label="scroll_progress_bar"
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          height:          3,
          background:      ACCENT,
          transformOrigin: "left center",
          scaleX:          pageProgress,
          zIndex:          200,
          pointerEvents:   "none",
        }}
      />

      {/* ── Back-to-top knop ─────────────────────────────────────────────────
          Verschijnt op basis van scroll-data (> 400 px).
          Doel: verlaag drop-off rate op lange pagina's.
      ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            id="back-to-top"
            // Tracking: hoe vaak klikken gebruikers terug naar boven? (Drop-off preventie)
            data-analytics-label="back_to_top_click"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{   opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Terug naar boven"
            style={{
              position:     "fixed",
              bottom:       "calc(56px + 1.5rem)",
              right:        "1.5rem",
              zIndex:       90,
              width:        44,
              height:       44,
              borderRadius: "50%",
              background:   ACCENT,
              color:        "#fff",
              border:       "none",
              cursor:       "pointer",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              boxShadow:    "0 4px 20px rgba(200,16,46,0.35)",
              fontFamily:   "'Syne', sans-serif",
              fontSize:     18,
              fontWeight:   700,
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{
          position:      "relative",
          minHeight:     "100vh",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent: "center",
          textAlign:     "center",
          padding:       isMobile ? "100px 1.5rem 80px" : "140px 2rem 120px",
          overflow:      "hidden",
          y:             heroY,
          opacity:       heroOpacity,
        }}
      >
        {/* Background PORTFOLIO text */}
        <motion.div
          style={{
            position:      "absolute",
            top:           "50%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "clamp(6rem, 18vw, 18rem)",
            fontWeight:    700,
            fontStyle:     "italic",
            color:         "#EAE8E3",
            letterSpacing: "-0.06em",
            lineHeight:    1,
            whiteSpace:    "nowrap",
            pointerEvents: "none",
            userSelect:    "none",
            y:             bgTextY,
            zIndex:        0,
          }}
        >
          PORTFOLIO
        </motion.div>

        {/* Floating project image cards — desktop only */}
        {!isMobile && FLOAT_CARDS.map((card, i) => (
          <FloatingCard
            key={i}
            project={card.project}
            style={card.style}
            rotate={card.rotate}
            parallaxFactor={card.parallaxFactor}
            delay={card.delay}
            width={card.width}
            mouseX={rawMouseX}
            mouseY={rawMouseY}
          />
        ))}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 820, margin: "0 auto" }}>

          {/* Main title */}
          <div style={{ marginBottom: "2rem" }}>
            {[
              { text: "Digitale",    italic: false },
              { text: "bouwer",      italic: true  },
              { text: "van morgen.", italic: false },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: 0.92 }}>
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily:    "'Playfair Display', serif",
                    fontSize:      "clamp(3.5rem, 9vw, 8rem)",
                    fontWeight:    700,
                    fontStyle:     line.italic ? "italic" : "normal",
                    letterSpacing: "-0.03em",
                    paddingBottom: "0.06em",
                    color:         line.italic ? ACCENT : FG,
                  }}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Subtitle + CTAs */}
          <motion.div
            custom={4} initial="hidden" animate="visible" variants={fadeUp}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.75, color: MUTED, maxWidth: 480, opacity: 1 }}>
              Welkom op het portfolio van Joaquin Holthof. UI/UX experimenten,
              technische deep-dives en afgeronde projecten.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>

              {/* ── Visual Cue: pulserende ring op primaire CTA ─────────────
                  Metric: CTR verhogen door pre-attentieve visuele aandacht.
                  De ring trekt het oog naar de primaire actie zonder opdringerig te zijn.
              ───────────────────────────────────────────────────────────────── */}
              <div style={{ position: "relative", display: "inline-flex" }}>
                {/* Pulse ring — verhoogt click-through rate op hero CTA */}
                <motion.div
                  animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }}
                  style={{
                    position:     "absolute",
                    inset:        -7,
                    borderRadius: 99,
                    border:       `2px solid ${ACCENT}`,
                    pointerEvents: "none",
                    zIndex:       0,
                  }}
                />
                {/* Tracking: primaire CTA klik — direct werk bekijken (Engagement) */}
                <HeroButton
                  id="hero-cta-work"
                  analyticsLabel="hero_cta_work_click"
                  href="/work"
                  primary
                >
                  Bekijk mijn werk
                </HeroButton>
              </div>

              {/* Tracking: secundaire CTA — interesse in samenwerken (Conversion intent) */}
              <HeroButton
                id="hero-cta-contact"
                analyticsLabel="hero_cta_contact_click"
                href="/contact"
                primary={false}
              >
                Contact opnemen
              </HeroButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
            Scroll
          </span>
          <div style={{ position: "relative", width: 1, height: 60, background: BORDER, overflow: "hidden" }}>
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: ACCENT, borderRadius: 99 }}
            />
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)" }}
      >
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} isLast={isMobile ? (i % 2 === 1) : i === STATS.length - 1} />
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SKILLS MARQUEE
      ══════════════════════════════════════════════════════ */}
      <section style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 0", overflow: "hidden", background: BG }}>
        <div className="marquee-track">
          {marqueeTech.map((tech, i) => (
            <div key={`${tech}-${i}`} style={{ display: "flex", alignItems: "center", gap: 20, paddingRight: 20, flexShrink: 0 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: FG, whiteSpace: "nowrap" }}>
                {tech}
              </span>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. PROJECT CAROUSEL (dark section, photo cards)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "5rem 0" }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: isMobile ? "0 1.5rem 2rem" : "0 4rem 3rem", gap: "2rem", flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
              marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ display: "inline-block", width: 20, height: 1, background: ACCENT }} />
              Geselecteerde projecten
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em",
              lineHeight: 1.05, color: "#FFFFFF", margin: 0,
            }}>
              Werk dat telt.
            </h2>
          </div>

          {/* Tracking: 'Alle projecten' klik vanuit carousel header (Engagement) */}
          <motion.a
            id="carousel-all-projects-link"
            data-analytics-label="carousel_all_projects_click"
            href="/work"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              textDecoration: "none", paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            Alle projecten
            <span style={{ display: "inline-block", width: 9, height: 9, borderTop: "1.5px solid currentColor", borderRight: "1.5px solid currentColor", transform: "rotate(45deg)" }} />
          </motion.a>
        </div>

        {/* Draggable photo card track
            Tracking: sleep-interactie meet carousel-engagement (Time-on-page proxy)
        */}
        <div style={{ paddingLeft: isMobile ? "1.5rem" : "4rem", overflow: "hidden" }}>
          <motion.div
            ref={carouselRef}
            id="project-carousel-track"
            data-analytics-label="carousel_drag_interact"
            drag="x"
            dragConstraints={{ right: 0, left: -(PROJECTS.length - 1) * 320 }}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 280, bounceDamping: 36 }}
            style={{ display: "flex", gap: "1.25rem", width: "max-content", paddingRight: isMobile ? "1.5rem" : "4rem" }}
            whileDrag={{ cursor: "grabbing" }}
          >
            {PROJECTS.map((p) => (
              <CarouselCard
                key={p.id}
                project={p}
                cardWidth={isMobile ? Math.min(300, (typeof window !== "undefined" ? window.innerWidth : 375) - 56) : 300}
              />
            ))}

            {/* See all card
                Tracking: 'Alle werk' klik vanuit carousel einde (Funnel stap) */}
            <Link
              href="/work"
              id="carousel-see-all-card"
              data-analytics-label="carousel_see_all_click"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "1rem", width: 180, minHeight: 380,
                flexShrink: 0, border: "1.5px dashed rgba(255,255,255,0.1)",
                borderRadius: 16, textDecoration: "none", color: "rgba(255,255,255,0.25)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                →
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Alle werk
              </span>
            </Link>
          </motion.div>

          {/* Drag hint */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "1.5rem", fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            <span>←</span> {isMobile ? "swipe" : "sleep om te navigeren"} <span>→</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. CTA STRIP
          Tracking: klik vanuit CTA Strip = hoge conversie-intentie.
          Dit event toont hoeveel bezoekers de volledige pagina doorlopen.
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: ACCENT, padding: isMobile ? "3rem 1.5rem" : "5rem 4rem",
        display: "flex", alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: "2rem", flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>
            — Nieuwe opdracht?
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.03em", color: "#fff", margin: 0, lineHeight: 1.05 }}>
            Let&apos;s connect.
          </h2>
        </div>

        {/* Tracking: CTA Strip knop klik = bottom-of-page conversion event */}
        <Link
          href="/contact"
          id="cta-strip-contact"
          data-analytics-label="cta_strip_contact_click"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", color: ACCENT, padding: "16px 32px",
            borderRadius: 99, fontFamily: "'Syne', sans-serif", fontSize: 11,
            fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", flexShrink: 0, transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.03)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        >
          Stuur een bericht
          <span style={{ display: "inline-block", width: 10, height: 10, borderTop: `1.5px solid ${ACCENT}`, borderRight: `1.5px solid ${ACCENT}`, transform: "rotate(45deg)" }} />
        </Link>
      </section>

    </div>
  );
}
