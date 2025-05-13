// Projeto: Direito Descomplicado – SaaS Jurídico
// Tecnologias: React + TailwindCSS + Supabase

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<SEU_PROJETO>.supabase.co';
const supabaseKey = '<SUA_CHAVE_ANON>'; // Substitua pelos seus dados
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [atualizacoes, setAtualizacoes] = useState([]);
  const [clt, setClt] = useState([]);
  const [faq, setFaq] = useState([]);
  const [busca, setBusca] = useState('');
  const [chatPergunta, setChatPergunta] = useState('');
  const [chatResposta, setChatResposta] = useState('');
  const [usuarioNome, setUsuarioNome] = useState('');
  const [saudacao, setSaudacao] = useState('');

  const mensagensMotivacionais = [
    "Você é importante e merece ser valorizado!",
    "Lembre-se: sua saúde mental vem primeiro.",
    "Você está indo muito bem, continue assim!",
    "Respire fundo e se permita uma pausa."
  ];

  const piadas = [
    "Por que o livro foi ao médico? Porque ele tinha muitas páginas em branco!",
    "Sabe qual o cúmulo do esquecimento? Esquecer o porquê do esquecimento!",
    "Por que a CLT não conta piada? Porque ela é séria por natureza."
  ];

  const carregarAtualizacoes = async () => {
    const { data } = await supabase.from('atualizacoes').select('*');
    setAtualizacoes(data || []);
  };

  const buscarChat = async () => {
    if (!chatPergunta) return;
    const texto = chatPergunta.toLowerCase();

    if (texto.includes("triste") || texto.includes("mal") || texto.includes("deprimido")) {
      const piada = piadas[Math.floor(Math.random() * piadas.length)];
      setChatResposta(`Sinto muito por isso. 😢 Que tal uma piada pra te animar?
"${piada}"`);
      return;
    }
    if (texto.includes("cansado") || texto.includes("exausto")) {
      const dica = mensagensMotivacionais[Math.floor(Math.random() * mensagensMotivacionais.length)];
      setChatResposta(`Poxa, entendo que esteja difícil. Aqui vai um lembrete:
"${dica}"`);
      return;
    }
    if (texto.includes("qual seu nome") || texto.includes("como te chamo")) {
      setChatResposta("Você pode me chamar de Assistente da Dra. Sirlene 😊. Mas antes, como você gostaria de ser chamado?");
      return;
    }
    if (texto.includes("me chame de") || texto.includes("pode me chamar de")) {
      const nome = texto.split("de").pop().trim();
      setUsuarioNome(nome);
      setChatResposta(`Combinado! De agora em diante, vou te chamar de ${nome}. 💛`);
      return;
    }
    if (texto.includes("obrigado") || texto.includes("valeu")) {
      setChatResposta(`Eu que agradeço, ${usuarioNome || 'trabalhador'}! Estou aqui sempre que precisar.`);
      return;
    }

    // Busca no FAQ
    const faqData = await supabase
      .from('faq')
      .select('*')
      .ilike('pergunta', `%${chatPergunta}%`);

    if (faqData.data && faqData.data.length > 0) {
      setChatResposta(faqData.data[0].resposta);
      return;
    }

    // Busca na CLT
    const cltData = await supabase
      .from('clt')
      .select('*')
      .ilike('artigo', `%${chatPergunta}%`);

    if (cltData.data && cltData.data.length > 0) {
      setChatResposta(`${cltData.data[0].artigo}
Resumo: ${cltData.data[0].resumo}

${cltData.data[0].conteudo}`);
      return;
    }

    setChatResposta('Ainda não tenho uma resposta cadastrada para isso. Fale com a Dra. Sirlene pelo WhatsApp:');
  };

  useEffect(() => {
    carregarAtualizacoes();
    const nome = usuarioNome ? `Olá, ${usuarioNome}! ` : '';
    setSaudacao(nome + "Como está seu dia hoje? Estou aqui pra te ajudar no que for preciso. 💼");
  }, [usuarioNome]);

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-yellow-600 mb-6">Chat Jurídico com Cuidado e Carinho</h1>
      <div className="mb-4 bg-yellow-100 text-black p-3 rounded shadow">
        <p className="text-sm">{saudacao}</p>
      </div>
      <div className="mb-6 bg-gray-100 p-4 rounded-xl">
        <input
          type="text"
          placeholder="Digite sua dúvida ou conte como você está..."
          value={chatPergunta}
          onChange={(e) => setChatPergunta(e.target.value)}
          className="p-2 border w-full"
        />
        <button onClick={buscarChat} className="bg-black text-yellow-400 px-4 py-2 mt-2">
          Enviar
        </button>
        {chatResposta && (
          <div className="mt-4 p-4 bg-white border rounded-xl shadow">
            <p className="text-sm mb-2 whitespace-pre-line">{chatResposta}</p>
            {chatResposta.includes('WhatsApp') && (
              <a
                href="https://wa.me/5531996289908"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Falar com a Dra. Sirlene no WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}