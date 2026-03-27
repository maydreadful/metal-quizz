"use client";

import { useState } from "react";
import { Skull, RefreshCcw, ChevronRight, Zap, Trophy, Ghost } from "lucide-react";

const PERGUNTAS_QUIZ = [
  { p: "Qual banda lançou o álbum de 1970 que definiu o Heavy Metal?", o: ["Led Zeppelin", "Black Sabbath", "Deep Purple", "Iron Maiden"], correta: "Black Sabbath" },
  { p: "O 'corpse paint' é marca registrada de qual subgênero?", o: ["Death Metal", "Black Metal", "Thrash Metal", "Doom Metal"], correta: "Black Metal" },
  { p: "Qual destas bandas faz parte do 'Big Four' do Thrash?", o: ["Slayer", "Mercyful Fate", "Venom", "Possessed"], correta: "Slayer" },
  { p: "Guitarras lentas, tons baixos e clima denso definem o:", o: ["Doom Metal", "Speed Metal", "Symphonic Metal", "Folk Metal"], correta: "Doom Metal" },
  { p: "Qual gênero usa vocais operísticos e orquestras?", o: ["Gothic Metal", "Symphonic Metal", "Progressive Metal", "Nu Metal"], correta: "Symphonic Metal" },
  { p: "O termo 'NWOBHM' surgiu em qual país?", o: ["EUA", "Alemanha", "Reino Unido", "Noruega"], correta: "Reino Unido" },
  { p: "Qual subgênero foca em técnica e compassos complexos?", o: ["Nu Metal", "Progressive Metal", "Glam Metal", "Sludge Metal"], correta: "Progressive Metal" },
  { p: "O Death Metal teve um cenário forte em qual estado dos EUA?", o: ["Califórnia", "Texas", "Flórida", "Nova York"], correta: "Flórida" },
  { p: "Instrumentos folclóricos com metal definem o:", o: ["Viking Metal", "Folk Metal", "Pagan Metal", "Power Metal"], correta: "Folk Metal" },
  { p: "Qual banda é ícone do Power Metal melódico e fantasia?", o: ["Helloween", "Pantera", "Sepultura", "Motorhead"], correta: "Helloween" }
];

export default function MetalQuiz() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [acertos, setAcertos] = useState(0);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleResposta = async (opcao: string) => {
    const acertouAgora = opcao === PERGUNTAS_QUIZ[etapa].correta;
    const novosAcertos = acertouAgora ? acertos + 1 : acertos;
    const listaAtualizada = [...respostas, opcao];

    if (etapa < PERGUNTAS_QUIZ.length - 1) {
      setAcertos(novosAcertos);
      setRespostas(listaAtualizada);
      setEtapa(etapa + 1);
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/metal-quizz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ respostas: listaAtualizada, score: novosAcertos }),
        });
        const data = await response.json();
        setResultado(data);
      } catch (error) {
        alert("O Oráculo silenciou.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500">
      <Ghost size={64} className="animate-pulse mb-6 text-red-900" />
      <h2 className="text-xl font-light tracking-[0.5em] uppercase">Processando...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-300 flex flex-col overflow-x-hidden">
      
      

      {/* 2. CONTEÚDO CENTRALIZADO NO MEIO DA TELA */}
      <main className="flex-1 flex items-center justify-center px-4 pt-[200px] md:pt-[240px] pb-10">
        
        {/* Container Centralizado com Largura Máxima */}
        <div className="max-w-xl w-full">
          
          {!resultado ? (
            <div className="space-y-10">
              {/* Info e Progresso */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-4xl font-black italic text-zinc-800 leading-none">0{etapa + 1}</span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600">Questão Técnica</span>
                </div>
                <div className="w-full bg-zinc-900 h-1">
                  <div 
                    className="bg-red-800 h-full transition-all duration-500" 
                    style={{ width: `${((etapa + 1) / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Pergunta */}
              <h2 className="text-2xl md:text-3xl font-light text-zinc-100 leading-snug italic border-l-2 border-red-900 pl-6">
                {PERGUNTAS_QUIZ[etapa].p}
              </h2>

              {/* Opções (Grid 1 coluna para focar no centro) */}
              <div className="grid gap-3">
                {PERGUNTAS_QUIZ[etapa].o.map((opcao) => (
                  <button
                    key={opcao}
                    onClick={() => handleResposta(opcao)}
                    className="group w-full text-left p-5 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all flex items-center gap-4"
                  >
                    <ChevronRight size={16} className="text-zinc-800 group-hover:text-red-900 transition-colors" />
                    <span className="uppercase text-xs tracking-widest text-zinc-500 group-hover:text-zinc-200 transition-colors">
                      {opcao}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* TELA DE RESULTADO CENTRALIZADA */
            <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 shadow-2xl">
              <header className="mb-8 border-b border-zinc-900 pb-6 text-center">
                <span className="text-red-800 font-bold uppercase text-[10px] tracking-[0.4em] block mb-2">{resultado.status}</span>
                <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                  {resultado.genero}
                </h2>
                <p className="text-zinc-600 text-xs mt-2 uppercase tracking-widest italic">Acertos: {acertos}/10</p>
              </header>

              <div className="text-center space-y-4 mb-10">
                <p className="text-red-700 text-xl italic leading-tight">"{resultado.mensagem}"</p>
                <p className="text-zinc-500 text-sm leading-relaxed mx-auto max-w-md italic">{resultado.descricao}</p>
              </div>

              <div className="bg-black/40 p-6 border border-zinc-900 mb-10">
                <h4 className="text-[10px] uppercase tracking-widest text-zinc-700 mb-4 italic">Arquivos Recomendados:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {resultado.bandas?.map((banda: string) => (
                    <span key={banda} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] uppercase font-bold italic">
                      {banda}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 border border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-500 transition-all uppercase text-[10px] font-bold tracking-[0.3em] flex items-center justify-center gap-3 italic"
              >
                <RefreshCcw size={14} /> Reiniciar Database
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center opacity-30">
        <p className="text-[9px] text-zinc-800 uppercase tracking-[0.5em] font-mono italic italic">
          Moth Oracle • ADS Project 2026
        </p>
      </footer>
    </div>
  );
}