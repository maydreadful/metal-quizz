import "./globals.css";
import { Skull } from "lucide-react";

export const metadata = {
  title: "METAL ORACLE | O Veredito",
  description: "Descubra se você é True Metal ou apenas um poser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        {/* HEADER BRUTALISTA */}
        <header className="border-b-8 border-white bg-black p-6 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Skull size={32} className="text-white" />
            
          </div>
          <span className="text-[10px] font-mono bg-white text-black px-2 py-1 font-bold">V.2.0_STABLE</span>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 flex flex-col justify-center items-center">
          {children}
        </main>

        {/* FOOTER INDUSTRIAL */}
        <footer className="border-t-8 border-white bg-white text-black p-4 flex justify-between items-center">
          <p className="font-black uppercase text-xs tracking-widest">© 2026 ADS_PROJECT</p>
          <div className="flex gap-4 font-black uppercase text-[10px]">
            <a href="#" className="hover:underline italic">GITHUB</a>
            
          </div>
        </footer>
      </body>
    </html>
  );
}