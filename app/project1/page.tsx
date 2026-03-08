"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Image as ImageIcon, Palette, Layout } from "lucide-react";

export default function ProjectPagina() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      
      {/* 1. Header met Terug-knop */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b pb-8 gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <Link 
            href="/home" 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Terug naar Dashboard
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Brewtopia in de Stad</h1>
          <p className="text-gray-500 mt-2 font-medium">Grafisch Ontwerp & Mockup Visualisatie</p>
        </div>
        
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest border border-green-100">
            Project Voltooid
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Linker kolom: De Mockup */}
        <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="group relative w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-2xl">
            <Link href="/project1-mockup.png" target="_blank" className="cursor-pointer">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
              </div>
              <Image
                src="/project1-mockup.png" 
                alt="Brewtopia Mockup"
                width={800}
                height={500}
                className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          <main className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4 block">Project Beschrijving</label>
            <p className="text-gray-600 text-lg leading-relaxed">
              Voor dit project lag de focus op het vertalen van een productconcept naar een realistische omgeving. 
              Ik heb een poster ontworpen voor mijn eigen drankenmerk, <strong>Brewtopia</strong>, waarbij de typografie 
              en het kleurgebruik het unieke karakter van het blikje moesten versterken. 
              Vervolgens is deze poster verwerkt in een high-quality mockup om de impact in het straatbeeld te visualiseren.
            </p>
          </main>
        </div>

        {/* Rechter kolom: Specificaties */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-6">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Details</h3>
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600">
                <Palette size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Tooling</p>
                <p className="text-sm font-black text-gray-700">Photoshop & Illustrator</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-purple-600">
                <Layout size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Medium</p>
                <p className="text-sm font-black text-gray-700">Digital Poster / OOH</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-green-600">
                <ImageIcon size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Type</p>
                <p className="text-sm font-black text-gray-700">Mockup Visualisatie</p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/project1-mockup.png" 
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95"
              >
                Bekijk Full-res <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}