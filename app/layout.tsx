import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fonte para textos comuns
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Fonte com serifa para um toque mais gótico/clássico nos títulos
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Metal Oracle | Moth Piercing",
  description: "Descubra qual subgênero de metal domina sua alma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#050505] text-zinc-400 selection:bg-red-900 selection:text-white`}
      >
        {/* Camada de textura de ruído ou vinheta (opcional) */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none z-50 opacity-40" />
        
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}