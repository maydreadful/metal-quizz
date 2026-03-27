import MetalQuizz from "./components/MetalQuizz"; // Agora o endereço está certo!

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Metal <span className="text-red-700">Oracle</span>
          </h1>
          <p className="text-zinc-500 mt-4 font-serif italic">Descubra qual vertente do caos ressoa com sua alma.</p>
        </header>
        <MetalQuizz />
      </div>
    </main>
  );
}