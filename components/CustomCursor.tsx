"use client";

/**
 * Dual-cursor — Editorial Red style
 *
 * • cursor-dot  : 8 px  solid red circle – snaps to mouse position instantly
 * • cursor-ring : 36 px transparent ring – follows with spring lag
 *
 * Ring grows to 56 px and goes semi-transparent on hover over interactive elements.
 * Everything disappears when the mouse leaves the viewport.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const ACCENT = "#C8102E";

export default function CustomCursor() {
  // ── Raw mouse position (updates every frame) ──────────────────────────────
  const mouseX = useRef(-200);
  const mouseY = useRef(-200);

  // ── Dot position (state – set directly in mousemove) ─────────────────────
  const [dot,     setDot]     = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // ── Ring position via Framer springs (smooth lag) ─────────────────────────
  const ringSpringX = useSpring(-200, { stiffness: 120, damping: 22, mass: 0.6 });
  const ringSpringY = useSpring(-200, { stiffness: 120, damping: 22, mass: 0.6 });

  // Ring size spring
  const ringSize = useSpring(36, { stiffness: 260, damping: 26 });
  const ringOpacity = useSpring(0, { stiffness: 260, damping: 26 });

  // Translate springs so the ring is centered on cursor
  const ringX = useTransform(ringSpringX, (v) => v - (hovered ? 28 : 18));
  const ringY = useTransform(ringSpringY, (v) => v - (hovered ? 28 : 18));

  useEffect(() => {
    // Update ring size + opacity based on hover
    ringSize.set(hovered ? 56 : 36);
    ringOpacity.set(visible ? 1 : 0);
  }, [hovered, visible, ringSize, ringOpacity]);

  useEffect(() => {
    // rAF loop — feeds spring with latest mouse position
    let rafId: number;
    const tick = () => {
      ringSpringX.set(mouseX.current);
      ringSpringY.set(mouseY.current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ringSpringX, ringSpringY]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setDot({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const isInteractive = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof Element)) return false;
      return (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        !!el.closest("a") ||
        !!el.closest("button") ||
        el.getAttribute("role") === "button" ||
        el.getAttribute("tabindex") !== null
      );
    };

    const onOver  = (e: MouseEvent) => { if (isInteractive(e.target)) setHovered(true);  };
    const onOut   = (e: MouseEvent) => { if (isInteractive(e.target)) setHovered(false); };
    const onLeave = () => { setVisible(false); setHovered(false); };
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    window.addEventListener("mouseout",   onOut,   { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <>
      {/* ── Cursor ring (lags behind) ── */}
      <motion.div
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          x:             ringX,
          y:             ringY,
          width:         ringSize,
          height:        ringSize,
          borderRadius:  "50%",
          border:        `1.5px solid ${ACCENT}`,
          background:    hovered ? "rgba(200,16,46,0.06)" : "transparent",
          opacity:       ringOpacity,
          pointerEvents: "none",
          zIndex:        99998,
          willChange:    "transform",
          transition:    "background 0.2s",
        }}
      />

      {/* ── Cursor dot (instant) ── */}
      <div
        style={{
          position:      "fixed",
          top:           dot.y - 4,
          left:          dot.x - 4,
          width:         8,
          height:        8,
          borderRadius:  "50%",
          background:    ACCENT,
          opacity:       visible ? 1 : 0,
          pointerEvents: "none",
          zIndex:        99999,
          transition:    "opacity 0.15s",
          willChange:    "transform",
          transform:     hovered ? "scale(0)" : "scale(1)",
        }}
      />
    </>
  );
}
