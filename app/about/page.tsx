"use client";

import { User, Code2, GraduationCap, ExternalLink, Edit3, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
            

      {/* 2. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b pb-8 gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Over Mij</h1>
          <p className="text-gray-500 mt-2 font-medium">Welkom op mijn persoonlijke portfolio website.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest border border-blue-100">
            Student UI/UX & Development
        </div>
      </div>

      {/* 3. Main Content Card */}
      <main className="animate-in fade-in slide-in-from-bottom duration-700 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="space-y-8">
          
          {/* Introductie */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest block">Introductie</label>
            <h2 className="text-3xl font-extrabold text-gray-800">Ik ben Joaquin Holthof</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Dit is mijn digitale ruimte waar ik mijn passie voor technologie en design deel. 
              Als gedreven student focus ik op het bouwen van moderne, schaalbare en vooral 
              gebruiksvriendelijke applicaties. Mijn doel is om complexe problemen op te lossen 
              met schone code en een strak design.
            </p>
          </div>

          {/* Core Values / Features stijl */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-6 bg-gray-50 rounded-2xl space-y-3 border border-transparent hover:border-blue-200 transition-all">
              <div className="text-blue-600"><Code2 size={24} /></div>
              <h4 className="font-black text-gray-900">Modern Dev</h4>
              <p className="text-sm text-gray-500">Gespecialiseerd in Next.js, React en Tailwind CSS.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl space-y-3 border border-transparent hover:border-purple-200 transition-all">
              <div className="text-purple-600"><User size={24} /></div>
              <h4 className="font-black text-gray-900">UX Focus</h4>
              <p className="text-sm text-gray-500">Gebruikerservaring staat centraal in elk project dat ik maak.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl space-y-3 border border-transparent hover:border-green-200 transition-all">
              <div className="text-green-600"><GraduationCap size={24} /></div>
              <h4 className="font-black text-gray-900">Leren</h4>
              <p className="text-sm text-gray-500">Altijd bezig met de nieuwste tools en technieken binnen de sector.</p>
            </div>
          </div>

          {/* Footer van de kaart */}
          <div className="pt-8 border-t border-gray-50 flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-2 text-sm font-medium">
                <Heart size={16} className="text-red-400" />
                <span>Gemaakt voor schoolopdracht 2024</span>
            </div>
            <div className="text-xs font-black uppercase tracking-widest">
                Versie 1.0.2
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}