"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Briefcase, Monitor, PenTool } from "lucide-react";

export default function ProjectPaginaKlant() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      
      {/* 1. Header met Navigatie */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b pb-8 gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <Link 
            href="/home" 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Terug naar Dashboard
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mockup voor een klant</h1>
          <p className="text-gray-500 mt-2 font-medium">B2B Branding & Product Visualisatie</p>
        </div>
        
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest border border-blue-100">
            Client Project
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Linker kolom: De Visuals */}
        <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="group relative w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-2xl">
            <Link href="/project2-foto.png" target="_blank" className="cursor-pointer">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
              </div>
              <Image
                src="/project2-foto.png" 
                alt="Client Mockup Screenshot"
                width={800}
                height={500}
                className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          <main className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4 block">Over de opdracht</label>
            <p className="text-gray-600 text-lg leading-relaxed">
              Voor een externe klant van mijn eigen bedrijf heb ik een op maat gemaakte mockup ontwikkeld. 
              Het doel was om de nieuwe identiteit van de klant op een realistische en professionele manier 
              te presenteren, zodat zij een duidelijk beeld kregen van het eindresultaat.
            </p>
          </main>
        </div>

        {/* Rechter kolom: Project Stats */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-6">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Specificaties</h3>
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Context</p>
                <p className="text-sm font-black text-gray-700">Eigen Bedrijf</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-orange-600">
                <PenTool size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Services</p>
                <p className="text-sm font-black text-gray-700">Design & Mockup</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600">
                <Monitor size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Platform</p>
                <p className="text-sm font-black text-gray-700">Digital Presentation</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/home" 
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95"
              >
                Sluiten
              </Link>
            </div>
          </div>
          
          {/* Extra info box */}
          <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-100">
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">Resultaat</h4>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              De klant was zeer tevreden met de visuele vertaling van hun concept.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}