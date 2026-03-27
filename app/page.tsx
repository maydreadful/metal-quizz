import MetalQuizz from "./components/MetalQuizz"; // Agora o endereço está certo!

export default function Home() {
  return (
    <section className="w-full min-h-full bg-[#050505] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Metal <span className="text-red-700">Oracle</span>
          </h1>
          <p className="text-zinc-500 mt-4 font-serif italic">Descubra qual vertente do caos ressoa com sua alma.</p>
        </header>
        <MetalQuizz />
      </div>
    </section>
  );
}