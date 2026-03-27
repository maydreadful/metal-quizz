import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { score } = await req.json();

    let nivel = "";
    let mensagemCustomizada = "";
    let descricao = "";

    if (score < 7) {
      nivel = "Iniciante";
      mensagemCustomizada = "Ainda há muito o que aprender nas profundezas do metal.";
      descricao = "Continue escutando, estudando riffs e explorando as raízes do estilo.";
    } else if (score === 7) {
      nivel = "Intermediário";
      mensagemCustomizada = "Você conhece as passagens, mas ainda não domina o trono.";
      descricao = "O caminho está aberto: agora é hora de refinar seu ouvido e sua coleção de clássicos.";
    } else {
      nivel = "True Metal";
      mensagemCustomizada = "Forjado no som mais pesado, você é puro metal!";
      descricao = "Seu conhecimento pulsa como um solo verdadeiro: agora celebre com os riffs lendários.";
    }

    return NextResponse.json({
      status: nivel,
      genero: nivel,
      mensagem: mensagemCustomizada,
      descricao,
    });

  } catch (error: any) {
    console.error("ERRO NO ORÁCULO:", error.message);
    return NextResponse.json(
      { error: "O ritual falhou.", detalhes: error.message }, 
      { status: 500 }
    );
  }
}