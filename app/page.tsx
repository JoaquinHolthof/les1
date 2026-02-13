import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Belangrijk voor navigatie naar projecten later

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        {/* Jouw Branding/Logo sectie */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
            Portfolio
          </h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Joaquin Holthof
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            AP Webdeveloper
          </p>
        </div>

        {/* Introductie tekst */}
        <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Welkom op mijn portfolio. Ik focus op het bouwen van moderne webervaringen 
          met een strak design en solide code.
        </p>

        {/* Call to Action Knoppen */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/projecten">
              Bekijk mijn werk
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <a href="/contact">
              Contact opnemen
            </a>
          </Button>
        </div>

      </main>
    </div>
  );
}