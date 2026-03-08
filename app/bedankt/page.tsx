"use client";

import Link from "next/link";
import { CheckCircle2, Home, ArrowRight, Heart } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-in fade-in zoom-in duration-700">
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-100/50 border border-gray-100 p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
          
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-20"></div>
              <div className="bg-purple-600 text-white p-6 rounded-full relative shadow-lg shadow-purple-200">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Lekker bezig!
            </h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
              Je feedback is verzonden. Dankzij jou kan ik mijn portfolio blijven verbeteren.
            </p>
          </div>

          {/* Actie knoppen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Link 
              href="/home" 
              className="group flex items-center justify-between bg-gray-900 text-white p-5 rounded-3xl hover:bg-black transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <Home size={20} className="text-purple-400" />
                <span className="font-bold text-sm text-left">Terug naar Home</span>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 p-5 rounded-3xl">
              <div className="flex items-center gap-3 text-gray-600">
                <Heart size={20} className="text-red-400 fill-red-400 animate-bounce" />
                <span className="font-bold text-sm italic">Je bent de beste!</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-center">
             <span className="text-xs font-black uppercase text-gray-300 tracking-[0.2em]">Data verzonden naar Google Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}