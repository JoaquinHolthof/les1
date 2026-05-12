"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ACCENT  = "#C8102E";
const BORDER  = "#EAE8E3";
const MUTED   = "#9E9B94";

const LINKS = [
  { label: "Terms",   href: "/terms-of-agreement"    },
  { label: "Copyright", href: "/copyright-regulations" },
  { label: "Cookies",   href: "/cookie-settings"       },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:      "relative",
        fontFamily:    "'Syne', sans-serif",
        fontSize:      11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:         hov ? "#0D0D0D" : MUTED,
        textDecoration: "none",
        paddingBottom: 2,
        transition:    "color 0.15s",
      }}
    >
      {label}
      <motion.span
        animate={{ width: hov ? "100%" : "0%" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:  "absolute",
          bottom:    0,
          left:      0,
          height:    1,
          background: ACCENT,
          display:   "block",
        }}
      />
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width:          "100%",
        borderTop:      `1px solid ${BORDER}`,
        background:     "#FAFAF8",
        padding:        "0.9rem 2.5rem",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "1rem",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          fontFamily:    "'Playfair Display', serif",
          fontSize:      14,
          fontWeight:    700,
          fontStyle:     "italic",
          letterSpacing: "-0.01em",
          color:         "#0D0D0D",
        }}>
          JH<span style={{ color: ACCENT }}>.</span>
        </span>
        <span style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      11,
          color:         BORDER,
          letterSpacing: "0.04em",
        }}>
          © {year}
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {LINKS.map((l) => <FooterLink key={l.href} {...l} />)}
      </div>
    </motion.footer>
  );
}
