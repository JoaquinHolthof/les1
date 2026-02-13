import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Project1() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-white dark:bg-black">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Titel en beschrijving */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Project 1: [Naam]</h1>
          <p className="text-zinc-500">Klik op de afbeelding hieronder om de live demo of broncode te bekijken.</p>
        </div>

        {/* De Aanklikbare Afbeelding */}
        <div className="relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Link href="https://github.com/joaquinholthof/les1" target="_blank">
            <div className="overflow-hidden">
              <Image 
                src="/project1-screenshot.png" // Zorg dat deze foto in je 'public' map staat!
                alt="Screenshot van mijn project"
                width={800}
                height={450}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Overlay die verschijnt bij hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full">
                Bekijk Project
              </span>
            </div>
          </Link>
        </div>

        <div className="pt-8">
          <Button asChild variant="outline">
            <Link href="holthofj/home">← Terug naar Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}