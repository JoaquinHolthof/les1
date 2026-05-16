"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  LayoutGrid, FileText, ChevronRight, Check, X,
  Plus, Trash2, Edit3, Globe, AlertCircle, ExternalLink,
  Users, TrendingUp, MousePointer, UserCircle,
} from "lucide-react";
import Link from "next/link";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const ACCENT  = "#C8102E";
const BG      = "#FAFAF8";
const FG      = "#0D0D0D";
const BORDER  = "#EAE8E3";
const MUTED   = "#9E9B94";
const DARK    = "#1A1A1A";
const SURFACE = "#FFFFFF";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageField  { label: string; key: string; multiline?: boolean; isList?: boolean }
interface PageConfig { id: string; name: string; route: string; icon: typeof FileText; fields: PageField[] }
interface PageData   { [key: string]: string | string[] }
interface AllData    { [id: string]: PageData }

// ─── KPI sparkline data ───────────────────────────────────────────────────────
const KPI = [
  {
    icon:    Users,
    label:   "Bezoekers",
    value:   "2,847",
    change:  "+12%",
    up:      true,
    points:  "0,28 12,22 24,26 36,18 48,14 60,10 72,8 84,6",
  },
  {
    icon:    TrendingUp,
    label:   "Populair Project",
    value:   "Brewtopia",
    change:  "64% van clicks",
    up:      true,
    points:  "0,26 12,24 24,20 36,16 48,14 60,10 72,8 84,5",
  },
  {
    icon:    MousePointer,
    label:   "Conversie Contact",
    value:   "3.2%",
    change:  "+0.4%",
    up:      true,
    points:  "0,28 12,26 24,25 36,22 48,18 60,15 72,10 84,8",
  },
];

// ─── Project statuses ─────────────────────────────────────────────────────────
const PROJECT_ROWS = [
  { id: "project1", name: "Brewtopia in de Stad",  tag: "Grafisch Ontwerp", year: "2024", status: "published" },
  { id: "project2", name: "CINE CITY",             tag: "Festival Branding", year: "2025", status: "published" },
  { id: "project3", name: "LightLine Astrid",       tag: "Interactief Design", year: "2025", status: "published" },
];

// ─── CMS page configs ─────────────────────────────────────────────────────────
const PAGES: PageConfig[] = [
  {
    id: "home", name: "Home", route: "/", icon: LayoutGrid,
    fields: [
      { label: "Headline regel 1", key: "headline1" },
      { label: "Headline regel 2", key: "headline2" },
      { label: "Beschrijving",     key: "description", multiline: true },
      { label: "CTA knoptekst",    key: "ctaLabel" },
    ],
  },
  {
    id: "project1", name: "Project 1", route: "/project1", icon: FileText,
    fields: [
      { label: "Projecttitel",  key: "title" },
      { label: "Subtitel",      key: "subtitle" },
      { label: "Beschrijving",  key: "description", multiline: true },
      { label: "Tooling",       key: "tooling" },
    ],
  },
  {
    id: "project2", name: "Project 2", route: "/project2", icon: FileText,
    fields: [
      { label: "Projecttitel",  key: "title" },
      { label: "Subtitel",      key: "subtitle" },
      { label: "Beschrijving",  key: "description", multiline: true },
      { label: "Tooling",       key: "tooling" },
    ],
  },
  {
    id: "project3", name: "Project 3", route: "/project3", icon: FileText,
    fields: [
      { label: "Projecttitel",  key: "title" },
      { label: "Subtitel",      key: "subtitle" },
      { label: "Beschrijving",  key: "description", multiline: true },
      { label: "Tooling",       key: "tooling" },
    ],
  },
];

const DEFAULT_DATA: AllData = {
  home:     { headline1: "Digitale", headline2: "bouwer van morgen.", description: "Portfolio van Joaquin Holthof.", ctaLabel: "Bekijk mijn werk" },
  project1: { title: "Brewtopia in de Stad", subtitle: "Grafisch Ontwerp", description: "Poster en mockup visualisatie voor een eigen drankenmerk.", tooling: "Photoshop & Illustrator" },
  project2: { title: "CINE CITY",            subtitle: "Festival Branding", description: "Volledige brand identity voor een fictief filmfestival: poster, mockups, typografie en kleurpalet.", tooling: "Adobe Suite" },
  project3: { title: "LightLine Astrid",      subtitle: "Interactief Design", description: "Een interactieve lichtinstallatie op Astrid Plaats in Antwerpen om mensen zich veiliger te laten voelen in publieke ruimte.", tooling: "Figma & Webdesign" },
};

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ points }: { points: string }) {
  return (
    <svg viewBox="0 0 84 32" fill="none" style={{ width: 84, height: 32 }}>
      <polyline
        points={points}
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points={`0,32 ${points} 84,32`}
        fill="rgba(200,16,46,0.06)"
        stroke="none"
      />
    </svg>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────
function Field({ field, value, isEditing, onChange }: {
  field: PageField; value: string | string[]; isEditing: boolean;
  onChange: (v: string | string[]) => void;
}) {
  const base: React.CSSProperties = {
    width:        "100%",
    fontFamily:   "'Inter', sans-serif",
    fontSize:     14,
    color:        FG,
    background:   SURFACE,
    border:       `1px solid ${BORDER}`,
    borderRadius: 6,
    padding:      "10px 12px",
    outline:      "none",
    resize:       "none",
    lineHeight:   1.6,
    boxSizing:    "border-box",
  };

  if (field.isList) {
    const list = (value as string[]) || [];
    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          <label style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
            {field.label}
          </label>
          {isEditing && (
            <button type="button" onClick={() => onChange([...list, ""])} style={{ background: "none", border: "none", cursor: "pointer", color: ACCENT, fontFamily: "'Syne', sans-serif", fontSize: 11 }}>
              + voeg toe
            </button>
          )}
        </div>
        {list.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
            {isEditing ? (
              <>
                <input value={item} onChange={(e) => { const n = [...list]; n[idx] = e.target.value; onChange(n); }} style={{ ...base, flex: 1 }} />
                <button type="button" onClick={() => onChange(list.filter((_, i) => i !== idx))} style={{ background: "none", border: "none", cursor: "pointer", color: MUTED, flexShrink: 0 }}>
                  <Trash2 size={13} />
                </button>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${BORDER}`, width: "100%" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: FG }}>{item}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ display: "block", fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "0.5rem" }}>
        {field.label}
      </label>
      {isEditing ? (
        field.multiline
          ? <textarea rows={4} value={value as string} onChange={(e) => onChange(e.target.value)} style={base} />
          : <input value={value as string} onChange={(e) => onChange(e.target.value)} style={{ ...base, fontWeight: 600 }} />
      ) : (
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: value ? FG : MUTED, lineHeight: 1.7, padding: "8px 0", borderBottom: `1px solid ${BORDER}`, fontStyle: value ? "normal" : "italic" }}>
          {(value as string) || "Niet ingevuld"}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const isMobile     = useIsMobile();

  // ── Password gate ──────────────────────────────────────────────────────────
  const [unlocked,   setUnlocked]   = useState(false);
  const [pwInput,    setPwInput]    = useState("");
  const [pwError,    setPwError]    = useState(false);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput === "AP") {
      setUnlocked(true);
    } else {
      setPwError(true);
      setPwInput("");
      setTimeout(() => setPwError(false), 2400);
    }
  }

  const [view,       setView]       = useState<"overview" | string>("overview");
  const [isEditing,  setIsEditing]  = useState(false);
  const [isSaved,    setIsSaved]    = useState(false);
  const [allData,    setAllData]    = useState<AllData>(DEFAULT_DATA);
  const [draft,      setDraft]      = useState<PageData>({});
  const [errors,     setErrors]     = useState<Record<string, string>>({});

  const currentPage = PAGES.find((p) => p.id === view);

  function selectPage(id: string) {
    setView(id);
    setDraft({ ...allData[id] });
    setIsEditing(false);
    setErrors({});
  }

  function handleChange(key: string, value: string | string[]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    currentPage?.fields.forEach((f) => {
      if (!f.isList && !(draft[f.key] as string)?.trim()) newErrors[f.key] = "Verplicht";
    });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setAllData((prev) => ({ ...prev, [view]: draft }));
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  }

  // ── Password gate screen ────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div style={{
        minHeight:      "100vh",
        background:     BG,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "2rem",
        fontFamily:     "'Inter', sans-serif",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:   SURFACE,
            border:       `1px solid ${BORDER}`,
            borderRadius: 20,
            padding:      "2.75rem 2.5rem",
            maxWidth:     400,
            width:        "100%",
            textAlign:    "center",
            boxShadow:    "0 8px 48px rgba(0,0,0,0.07)",
          }}
        >
          {/* JH avatar */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: ACCENT,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.75rem",
          }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>JH</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", color: FG, margin: "0 0 0.5rem" }}>
            Admin Panel<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: MUTED, letterSpacing: "0.04em", margin: "0 0 2.25rem" }}>
            Beveiligde omgeving — voer het wachtwoord in.
          </p>

          <form onSubmit={handleUnlock} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <input
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Wachtwoord"
              autoFocus
              style={{
                width:        "100%",
                padding:      "13px 16px",
                borderRadius: 10,
                border:       `1.5px solid ${pwError ? ACCENT : BORDER}`,
                fontFamily:   "'Inter', sans-serif",
                fontSize:     14,
                color:        FG,
                background:   BG,
                outline:      "none",
                boxSizing:    "border-box",
                transition:   "border-color 0.2s",
                textAlign:    "center",
                letterSpacing: "0.08em",
              }}
            />

            <AnimatePresence>
              {pwError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, margin: 0, letterSpacing: "0.04em" }}
                >
                  Ongeldig wachtwoord — probeer opnieuw.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              style={{
                padding:      "13px",
                borderRadius: 10,
                background:   FG,
                color:        "#fff",
                border:       "none",
                cursor:       "pointer",
                fontFamily:   "'Syne', sans-serif",
                fontSize:     13,
                fontWeight:   700,
                letterSpacing: "0.04em",
                transition:   "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = ACCENT)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = FG)}
            >
              Toegang krijgen →
            </button>
          </form>

          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED, margin: "1.75rem 0 0", letterSpacing: "0.04em" }}>
            Joaquin Holthof Portfolio — v1.0
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            style={{ position: "fixed", bottom: 28, right: 28, background: DARK, color: "#fff", padding: "12px 22px", borderRadius: 99, display: "flex", alignItems: "center", gap: 10, fontFamily: "'Syne', sans-serif", fontSize: 12, zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
          >
            <Check size={13} color={ACCENT} /> Gepubliceerd — {currentPage?.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile tab bar ── */}
      {isMobile && (
        <div style={{
          position:   "sticky",
          top:        72,
          zIndex:     40,
          background: SURFACE,
          borderBottom: `1px solid ${BORDER}`,
          overflowX:  "auto",
          display:    "flex",
          padding:    "0 0.5rem",
          scrollbarWidth: "none",
        }}>
          <button
            onClick={() => { setView("overview"); setIsEditing(false); }}
            style={{
              flexShrink: 0, padding: "0.875rem 1rem", background: "none",
              border: "none", borderBottom: `2px solid ${view === "overview" ? ACCENT : "transparent"}`,
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              color: view === "overview" ? ACCENT : MUTED, cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            Overzicht
          </button>
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => selectPage(page.id)}
              style={{
                flexShrink: 0, padding: "0.875rem 1rem", background: "none",
                border: "none", borderBottom: `2px solid ${view === page.id ? ACCENT : "transparent"}`,
                fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                color: view === page.id ? ACCENT : MUTED, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {page.name}
            </button>
          ))}
        </div>
      )}

      <div style={{ background: BG, minHeight: "100vh", paddingTop: isMobile ? 72 : 100, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", fontFamily: "'Inter', sans-serif" }}>

        {/* ════ SIDEBAR — hidden on mobile ════ */}
        <aside style={{ background: SURFACE, borderRight: `1px solid ${BORDER}`, display: isMobile ? "none" : "flex", flexDirection: "column", position: "sticky", top: 100, height: "calc(100vh - 100px)", overflowY: "auto" }}>

          {/* Branding */}
          <div style={{ padding: "1.75rem 1.5rem 1.25rem", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "0.4rem" }}>
              Admin Panel
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, fontStyle: "italic", color: FG }}>
              Dashboard<span style={{ color: ACCENT }}>.</span>
            </div>
          </div>

          {/* Feedback banner */}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc1R1B5Vp4erze6S75_fZVpnOr7TZ75fsqQF6cxaIekUlHAuA/viewform" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} data-analytics="admin-feedback-link">
            <div style={{ margin: "0.875rem 1rem", padding: "0.75rem 1rem", background: DARK, borderRadius: 8, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>Feedback formulier</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Vragen of suggesties?</div>
              </div>
              <ExternalLink size={11} color="rgba(255,255,255,0.3)" />
            </div>
          </a>

          {/* Nav */}
          <div style={{ padding: "0.5rem 1.5rem 0.25rem", fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
            Overzicht
          </div>
          <button
            onClick={() => { setView("overview"); setIsEditing(false); }}
            data-analytics="admin-nav-overview"
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "0.75rem 1.5rem", background: view === "overview" ? "rgba(200,16,46,0.06)" : "transparent",
              border: "none", borderLeft: `3px solid ${view === "overview" ? ACCENT : "transparent"}`,
              cursor: "pointer", textAlign: "left",
            }}
          >
            <LayoutGrid size={13} color={view === "overview" ? ACCENT : MUTED} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: view === "overview" ? ACCENT : FG }}>Overzicht</span>
          </button>

          <div style={{ padding: "0.75rem 1.5rem 0.25rem", fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
            Pagina&apos;s
          </div>
          <nav style={{ flex: 1 }}>
            {PAGES.map((page) => {
              const Icon   = page.icon;
              const active = view === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => selectPage(page.id)}
                  data-analytics={`admin-nav-${page.id}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "0.75rem 1.5rem", background: active ? "rgba(200,16,46,0.06)" : "transparent",
                    border: "none", borderLeft: `3px solid ${active ? ACCENT : "transparent"}`,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <Icon size={13} color={active ? ACCENT : MUTED} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: active ? ACCENT : FG }}>{page.name}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED, marginTop: 1 }}>{page.route}</div>
                  </div>
                  {active && <ChevronRight size={12} color={ACCENT} />}
                </button>
              );
            })}
          </nav>

          {/* User footer — link naar My Profile pagina */}
          <Link
            href="/admin-user"
            data-analytics-label="admin_sidebar_profile_click"
            style={{
              padding:        "1rem 1.5rem",
              borderTop:      `1px solid ${BORDER}`,
              display:        "flex",
              alignItems:     "center",
              gap:            10,
              textDecoration: "none",
              transition:     "background 0.18s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = BG)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, color: "#fff" }}>JH</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: FG }}>Joaquin Holthof</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>My Profile →</div>
            </div>
            <UserCircle size={14} color={MUTED} />
          </Link>
        </aside>

        {/* ════ CONTENT ════ */}
        <main style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 100px)" }}>

          {/* Top bar */}
          <div style={{ padding: isMobile ? "0.875rem 1.25rem" : "1rem 2.5rem", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: SURFACE, gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>Admin</span>
              <ChevronRight size={11} color={MUTED} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG }}>
                {view === "overview" ? "Overzicht" : currentPage?.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {view !== "overview" && isEditing && (
                <>
                  {Object.keys(errors).length > 0 && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT }}>
                      <AlertCircle size={11} /> {Object.keys(errors).length} fout
                    </span>
                  )}
                  <button onClick={() => { setDraft({ ...allData[view] }); setIsEditing(false); setErrors({}); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 99, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>
                    <X size={11} /> Annuleren
                  </button>
                  <button type="submit" form="cms-form" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 16px", borderRadius: 99, border: "none", background: FG, color: "#fff", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = ACCENT)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = FG)}
                  >
                    <Globe size={11} /> Publiceer
                  </button>
                </>
              )}
              {view !== "overview" && !isEditing && (
                <button onClick={() => { setDraft({ ...allData[view] }); setIsEditing(true); }} data-analytics="admin-edit-btn" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 99, border: `1px solid ${BORDER}`, background: SURFACE, color: FG, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11 }}>
                  <Edit3 size={11} /> Bewerken
                </button>
              )}
              {/* Quick Action */}
              <button
                data-analytics="admin-quick-action"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 4, border: "none", background: ACCENT, color: "#fff", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}
              >
                <Plus size={12} /> Nieuw Project
              </button>
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {view === "overview" && (
            <div style={{ flex: 1, padding: isMobile ? "1.5rem 1.25rem" : "2.5rem" }}>

              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {KPI.map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <motion.div
                      key={k.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      data-analytics={`admin-kpi-${k.label.toLowerCase().replace(/\s+/g, "-")}`}
                      style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Icon size={14} color={MUTED} />
                          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>
                            {k.label}
                          </span>
                        </div>
                        <Sparkline points={k.points} />
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: FG, lineHeight: 1 }}>
                        {k.value}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: ACCENT }}>
                          {k.change}
                        </span>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>
                          vs vorige maand
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Project Table */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}
              >
                {/* Table header */}
                <div style={{ padding: "1.25rem 1.75rem", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG, letterSpacing: "-0.01em" }}>
                    Projecten
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>
                    {PROJECT_ROWS.length} totaal
                  </div>
                </div>

                {/* Column headers */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 100px 70px" : "2fr 1fr 80px 100px 80px", gap: "1rem", padding: "0.75rem 1.75rem", borderBottom: `1px solid ${BORDER}`, background: BG }}>
                  {(isMobile ? ["Project", "Status", ""] : ["Project", "Type", "Jaar", "Status", ""]).map((h) => (
                    <div key={h} style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {PROJECT_ROWS.map((row, i) => (
                  <div
                    key={row.id}
                    data-analytics={`admin-project-row-${row.id}`}
                    style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 100px 70px" : "2fr 1fr 80px 100px 80px", gap: "1rem", padding: "1rem 1.75rem", borderBottom: i < PROJECT_ROWS.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center" }}
                  >
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: FG, letterSpacing: "-0.01em" }}>
                      {row.name}
                    </div>
                    {!isMobile && <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>{row.tag}</div>}
                    {!isMobile && <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: MUTED }}>{row.year}</div>}
                    {/* Status badge */}
                    <div>
                      <span style={{
                        display:       "inline-flex",
                        alignItems:    "center",
                        gap:           5,
                        padding:       "3px 10px",
                        borderRadius:  99,
                        background:    row.status === "published" ? "rgba(200,16,46,0.07)" : "#F5F4F0",
                        border:        `1px solid ${row.status === "published" ? "rgba(200,16,46,0.2)" : BORDER}`,
                        fontFamily:    "'Syne', sans-serif",
                        fontSize:      10,
                        fontWeight:    700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color:         row.status === "published" ? ACCENT : MUTED,
                      }}>
                        {row.status === "published" && (
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                        )}
                        {row.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    {/* Edit action */}
                    <button
                      onClick={() => selectPage(row.id)}
                      data-analytics={`admin-edit-${row.id}`}
                      style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED, display: "flex", alignItems: "center", gap: 4 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = FG; (e.currentTarget as HTMLElement).style.color = FG; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                    >
                      <Edit3 size={11} /> Edit
                    </button>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {/* ── CMS EDITOR ── */}
          {view !== "overview" && currentPage && (
            <>
              {/* Page header */}
              <div style={{ padding: "2rem 2.5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 14, height: 1, background: ACCENT, display: "inline-block" }} />
                  {currentPage.fields.length} velden
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", color: FG, margin: "0 0 0.4rem" }}>
                  {currentPage.name}<span style={{ color: ACCENT }}>.</span>
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: MUTED, margin: 0, opacity: 1 }}>
                  {isEditing ? "Bewerkingsmodus actief — klik Publiceer om op te slaan." : "Klik Bewerken om content aan te passen."}
                </p>
              </div>

              {/* Edit strip */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    style={{ background: "rgba(200,16,46,0.05)", borderBottom: `1px solid rgba(200,16,46,0.15)`, padding: "0.625rem 2.5rem", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT }} />
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Niet-opgeslagen wijzigingen
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form fields */}
              <form id="cms-form" onSubmit={handleSubmit} style={{ flex: 1, padding: "2rem 2.5rem" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    {currentPage.fields.map((field) => (
                      <Field
                        key={field.key}
                        field={field}
                        value={draft[field.key] ?? (field.isList ? [] : "")}
                        isEditing={isEditing}
                        onChange={(v) => handleChange(field.key, v)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </form>

              {/* Footer */}
              <div style={{ padding: "1rem 2.5rem", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: SURFACE }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>Joaquin Holthof Portfolio — v1.0</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E" }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: MUTED }}>Systeem operationeel</span>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
