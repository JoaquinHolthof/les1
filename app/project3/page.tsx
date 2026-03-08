"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Type, Sparkles, ShieldCheck } from "lucide-react";

export default function ProjectPaginaLogo() {
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
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Logo VYZO Agency</h1>
          <p className="text-gray-500 mt-2 font-medium">Brand Identity & Typografie Design</p>
        </div>
        
        <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest border border-purple-100">
            Internal Branding
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Linker kolom: Het Logo Design */}
        <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="group relative w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-2xl">
            <Link href="/project3-foto.png" target="_blank" className="cursor-pointer">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
              </div>
              <Image
                src="/project3-foto.png" 
                alt="VYZO Agency Logo Design"
                width={800}
                height={500}
                className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          <main className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4 block">Design Filosofie</label>
            <p className="text-gray-600 text-lg leading-relaxed">
              Voor mijn eigen agency, <strong>VYZO</strong>, was de missie het creëren van een identiteit die zowel minimalistisch als modern aanvoelt. 
              De kern van dit ontwerp ligt in de typografie: door gebruik te maken van twee contrasterende lettertypes is er een balans ontstaan 
              tussen autoriteit en elegantie. Dit resulteert in een <strong>High End</strong> uitstraling die de professionaliteit van de agency direct communiceert.
            </p>
          </main>
        </div>

        {/* Rechter kolom: Design Specs */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-6">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Brand Details</h3>
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-purple-600">
                <Type size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Typografie</p>
                <p className="text-sm font-black text-gray-700">Contrast Serif & Sans</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-yellow-500">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Stijl</p>
                <p className="text-sm font-black text-gray-700">Modern Minimalisme</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Agency</p>
                <p className="text-sm font-black text-gray-700">VYZO Agency</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/home" 
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95"
              >
                Dashboard
              </Link>
            </div>
          </div>
          
          {/* USP Highlight */}
          <div className="p-6 bg-purple-600 rounded-3xl text-white shadow-lg shadow-purple-100">
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">High End Focus</h4>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              Geselecteerd op basis van contrast en leesbaarheid voor premium merkpositionering.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}