import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectPagina() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        
        {/* 1. De H1 (Titel) */}
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Brewtopia in de Stad
        </h1>

        {/* 2. De P (Beschrijving) */}
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          We moesten een poster maken over ons eigen blikje en deze verwerken in een mockup zodat je de poster in straatbeeld kon zien. 
        </p>

        {/* 3. De Foto (Aanklikbaar om te openen) */}
<div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 shadow-lg transition-transform hover:scale-[1.02]">
  {/* Verander href naar de naam van je foto en voeg target="_blank" toe */}
  <Link href="/pproject1-mockup.png" target="_blank" className="cursor-pointer"> 
    <Image
      src="/project3-foto.png" 
      alt="Project Screenshot"
      width={800}
      height={500}
      className="object-cover"
      priority
    />
  </Link>
</div>

        {/* 4. De Knop (Terug naar Home) */}
        <Button asChild variant="outline" className="mt-4">
          <Link href="/home">
            Terug naar Home
          </Link>
        </Button>

      </main>
    </div>
  );
}