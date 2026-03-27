"use client";

import { useState } from "react";
import { Share2, Check, RefreshCcw, Skull } from "lucide-react";

// Perguntas técnicas sobre a história e vertentes do Metal
const PERGUNTAS_QUIZ = [
  { 
    p: "Qual banda lançou o álbum homónimo de 1970, considerado o marco inicial do Heavy Metal?", 
    o: ["Led Zeppelin", "Black Sabbath", "Deep Purple", "Iron Maiden"],
    correta: "Black Sabbath"
  },
  { 
    p: "O uso de 'corpse paint' e temáticas obscuras é marca registada de qual subgénero?", 
    o: ["Death Metal", "Black Metal", "Thrash Metal", "Doom Metal"],
    correta: "Black Metal"
  },
  { 
    p: "Qual subgénero faz parte do 'Big Four' (Metallica, Slayer, Megadeth e Anthrax)?", 
    o: ["Power Metal", "Thrash Metal", "Groove Metal", "Death Metal"],
    correta: "Thrash Metal"
  },
  { 
    p: "Guitarras extremamente lentas, afinadas em tons baixos e clima denso definem o:", 
    o: ["Doom Metal", "Speed Metal", "Symphonic Metal", "Folk Metal"],
    correta: "Doom Metal"
  },
  { 
    p: "Qual género é conhecido por vocais operáticos e arranjos orquestrais?", 
    o: ["Gothic Metal", "Symphonic Metal", "Progressive Metal", "Heavy Tradicional"],
    correta: "Symphonic Metal"
  },
  { 
    p: "O termo 'NWOBHM' refere-se ao movimento de Metal surgido em qual país?", 
    o: ["EUA", "Alemanha", "Reino Unido", "Noruega"],
    correta: "Reino Unido"
  },
  { 
    p: "Qual subgénero foca em compassos complexos e alta técnica instrumental?", 
    o: ["Nu Metal", "Progressive Metal", "Glam Metal", "Sludge Metal"],
    correta: "Progressive Metal"
  },
  { 
    p: "O Death Metal teve um cenário extremamente forte e pioneiro em qual estado americano?", 
    o: ["Califórnia", "Texas", "Flórida", "Nova York"],
    correta: "Flórida"
  },
  { 
    p: "Mistura de instrumentos folclóricos (violinos, flautas) com metal define o:", 
    o: ["Viking Metal", "Folk Metal", "Pagan Metal", "Power Metal"],
    correta: "Folk Metal"
  },
  { 
    p: "Qual banda é o maior ícone do Power Metal melódico com temática de fantasia?", 
    o: ["Helloween", "Pantera", "Sepultura", "Motorhead"],
    correta: "Helloween"
  }
];

export default function MetalQuiz() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [acertos, setAcertos] = useState(0);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const handleResposta = async (opcao: string) => {
    // Lógica de pontuação: verifica se a opção clicada é a correta
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
        // Envia as respostas e o score final para a API
        const response = await fetch("/api/metal-quizz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            respostas: listaAtualizada,
            score: novosAcertos 
          }),
        });

       if (!response.ok) throw new Error("Falha no Oráculo.");
        const data = await response.json();
        setResultado(data);
      } catch (error) {
        console.error(error);
        alert("O abismo não respondeu. Tenta novamente.");
     } finally {
        setLoading(false);
      }
   }
  };

  const compartilharResultado = async () => {
    const texto = `🤘 Metal Oracle: Fui classificado como ${resultado.status} no nível ${resultado.genero}!\n"${resultado.mensagem}"\n\nDesafia-te aqui: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Metal Oracle', text: texto, url: window.location.href });
      } catch (err) { console.log("Cancelado"); }
    } else {
      navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-red-600 animate-pulse">
      <Skull size={48} className="mb-4" />
      <h2 className="text-2xl font-black uppercase tracking-widest">Invocando o Veredito...</h2>
    </div>
  );

  if (resultado) return (
    <div className="max-w-2xl mx-auto bg-zinc-950 border border-red-900/40 p-8 shadow-[0_0_50px_rgba(136,8,8,0.1)]">
      <header className="mb-6 border-b border-zinc-900 pb-4">
        <span className="text-red-700 text-[10px] font-bold uppercase tracking-[0.4em]">{resultado.status}</span>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter">{resultado.genero}</h2>
        <p className="text-zinc-500 text-xs mt-2 font-bold">PONTUAÇÃO: {acertos} / 10</p>
      </header>
      
      <p className="text-red-500 italic text-xl mb-6 font-serif leading-tight">"{resultado.mensagem}"</p>
      <p className="text-zinc-400 mb-10 leading-relaxed text-sm">{resultado.descricao}</p>


      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={compartilharResultado}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-950/20 border border-red-900/50 text-red-500 hover:bg-red-900 hover:text-white transition-all uppercase text-[10px] font-bold tracking-widest"
        >
          {copiado ? <><Check size={14} /> Link Copiado</> : <><Share2 size={14} /> Partilhar</>}
        </button>

        <button 
          onClick={() => window.location.reload()}
          className="flex-1 flex items-center justify-center gap-2 py-4 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all uppercase text-[10px] font-bold tracking-widest"
        >
          <RefreshCcw size={14} /> Novo Ritual
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <span className="text-red-700 font-black text-3xl tracking-tighter">0{etapa + 1}</span>
          <span className="text-zinc-600 text-[10px] uppercase tracking-[0.5em]">Prova de Conhecimento</span>
        </div>
        <div className="w-full bg-zinc-900 h-[1px]">
          <div className="bg-red-700 h-full transition-all duration-1000" style={{ width: `${((etapa + 1) / 10) * 100}%` }}></div>
        </div>
      </div>

      <h3 className="text-2xl font-light text-zinc-100 mb-10 leading-snug">{PERGUNTAS_QUIZ[etapa].p}</h3>

      <div className="grid gap-3">
        {PERGUNTAS_QUIZ[etapa].o.map((opcao) => (
          <button
            key={opcao}
            onClick={() => handleResposta(opcao)}
            className="group relative text-left p-6 bg-zinc-950 border border-zinc-900 hover:border-red-900/50 transition-all"
          >
            <span className="relative z-10 text-zinc-500 group-hover:text-white transition-colors uppercase text-xs tracking-widest">
              {opcao}
            </span>
            <div className="absolute inset-0 bg-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>
    </div>
  );
}