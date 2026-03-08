"use client";

import { ArrowRight, Code2, Layout, Sparkles, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // Voorbeeld data voor je projecten
  const projects = [
    { id: 1, title: "Project 1", tech: "Next.js & Tailwind", color: "bg-blue-500" },
    { id: 2, title: "Project 2", tech: "React & GTM", color: "bg-purple-500" },
    { id: 3, title: "Project 3", tech: "UI/UX Design", color: "bg-green-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 min-h-screen">

      {/* 2. Hero Section */}
      <header className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
            Portfolio v1.0
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Bouwen aan de <span className="text-blue-600">digitale</span> ervaring van morgen.
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl">
          Welkom op het platform van Joaquin Holthof. Hier vind je mijn meest recente projecten, 
          UI/UX experimenten en technische deep-dives.
        </p>
        <div className="pt-4">
          <Link href="/project1" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200">
            Bekijk mijn werk <ArrowRight size={20} />
          </Link>
        </div>
      </header>

      {/* 3. Projecten "Carrousel" (Grid Layout) */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest">Recente Projecten</h2>
          <Link href="/project1" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
            Alle projecten zien <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className={`w-12 h-12 ${project.color} rounded-2xl mb-4 flex items-center justify-center text-white shadow-lg`}>
                <Code2 size={24} />
              </div>
              <h3 className="text-lg font-black text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500 font-medium">{project.tech}</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Details bekijken <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stats / Features mini-sectie */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-1000 delay-500">
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
          <p className="text-2xl font-black text-gray-900">10+</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Projecten</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
          <p className="text-2xl font-black text-gray-900">100%</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Responsive</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
          <p className="text-2xl font-black text-gray-900">Clean</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Code</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
          <p className="text-2xl font-black text-gray-900">GTM</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified</p>
        </div>
      </footer>
    </div>
  );
}