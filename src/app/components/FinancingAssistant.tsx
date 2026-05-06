import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  from: "user" | "assistant";
  text: string;
}

const quickReplies = [
  "Quanto posso financiar?",
  "Que documentos preciso?",
  "Quanto tempo demora?",
  "Como funciona o pagamento?",
  "Quem pode candidatar-se?",
];

function getResponse(input: string): string {
  const msg = input.toLowerCase();

  if (msg.includes("olá") || msg.includes("ola") || msg.includes("bom dia") || msg.includes("boa tarde") || msg.includes("boa noite") || msg.includes("oi")) {
    return "Olá! 👋 Sou o Assistente INAPEM. Estou aqui para o ajudar com todas as suas dúvidas sobre financiamento. Como posso ajudar?";
  }

  if (msg.includes("quanto") && (msg.includes("financ") || msg.includes("valor") || msg.includes("máximo") || msg.includes("maximo"))) {
    return "💰 O INAPEM oferece financiamento até **1.000.000 Kz** (1 milhão de Kwanzas). O valor aprovado depende da análise de crédito da sua empresa, do volume de negócios e da finalidade do financiamento.";
  }

  if (msg.includes("document")) {
    return "📋 Para solicitar financiamento precisa de:\n\n• Certidão comercial da empresa\n• Estatutos sociais\n• Declaração fiscal recente\n• Extratos bancários dos últimos 3 meses\n• BI/Passaporte dos sócios\n• Plano de negócios (opcional mas recomendado)";
  }

  if (msg.includes("tempo") || msg.includes("demora") || msg.includes("prazo") || msg.includes("rapidez") || msg.includes("48")) {
    return "⏱️ O processo de análise demora até **48 horas** após a entrega completa da documentação. Em casos mais complexos pode demorar até 5 dias úteis. Receberá uma notificação por email com a decisão.";
  }

  if (msg.includes("pagamento") || msg.includes("pagar") || msg.includes("prestação") || msg.includes("prestacao") || msg.includes("reembolso")) {
    return "💳 O pagamento funciona assim:\n\n1. O INAPEM paga **directamente ao fornecedor**\n2. A sua empresa paga ao INAPEM em **prestações mensais**\n3. As taxas são as mais competitivas do mercado angolano\n4. O prazo de reembolso é negociado caso a caso";
  }

  if (msg.includes("quem") || msg.includes("elegível") || msg.includes("elegivel") || msg.includes("candidat") || msg.includes("pme") || msg.includes("empresa")) {
    return "🏢 Podem candidatar-se ao financiamento:\n\n• Pequenas e Médias Empresas (PMEs) angolanas\n• Empresas com pelo menos 1 ano de actividade\n• Empresas com situação fiscal regularizada\n• Empresas com conta bancária activa em Angola";
  }

  if (msg.includes("taxa") || msg.includes("juro") || msg.includes("juros") || msg.includes("custo")) {
    return "📊 As taxas de juro do INAPEM são as mais competitivas do mercado angolano. O valor exacto é definido na análise de crédito e depende do perfil da empresa e do montante solicitado. Contacte-nos para uma simulação personalizada.";
  }

  if (msg.includes("como") && msg.includes("solicitar") || msg.includes("começar") || msg.includes("comecar") || msg.includes("iniciar") || msg.includes("processo")) {
    return "🚀 Para solicitar financiamento:\n\n1. **Registe-se** na plataforma como Empresa\n2. **Escolha** os produtos/serviços no Marketplace\n3. **Submeta** o pedido de financiamento\n4. **Envie** a documentação necessária\n5. **Aguarde** a aprovação em até 48h\n\nQuer que o ajude a começar agora?";
  }

  if (msg.includes("fornecedor") || msg.includes("produto") || msg.includes("comprar") || msg.includes("serviço")) {
    return "🛒 No Marketplace INAPEM encontra mais de **1.200 produtos e serviços** de fornecedores certificados. Pode filtrar por categoria (Tecnologia, Equipamentos, Serviços, etc.) e solicitar financiamento directamente para os itens que escolher.";
  }

  if (msg.includes("contacto") || msg.includes("contato") || msg.includes("falar") || msg.includes("humano") || msg.includes("atendente")) {
    return "📞 Para falar com um consultor INAPEM:\n\n• **Email:** suporte@inapem.pt\n• **Telefone:** +351 21 000 0000\n• **Horário:** Segunda a Sexta, 8h–17h\n\nTambém pode submeter o seu pedido online e entraremos em contacto em 48h.";
  }

  if (msg.includes("obrigad") || msg.includes("obrigado") || msg.includes("obrigada") || msg.includes("ótimo") || msg.includes("otimo") || msg.includes("excelente")) {
    return "De nada! 😊 Estou sempre disponível para ajudar. Se tiver mais alguma dúvida sobre o financiamento INAPEM, é só perguntar!";
  }

  return "Não tenho uma resposta específica para essa questão, mas posso ajudar com:\n\n• Valores de financiamento disponíveis\n• Documentos necessários\n• Prazos de aprovação\n• Como funciona o pagamento\n• Quem pode candidatar-se\n\nO que gostaria de saber?";
}

export function FinancingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "assistant",
      text: "Olá! 👋 Sou o **Assistente INAPEM**. Estou aqui para responder às suas dúvidas sobre financiamento. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: "assistant",
        text: getResponse(text),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 800);
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  };

  return (
    <>
      {/* Painel de Chat */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="bg-coral text-white px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Assistente INAPEM</div>
              <div className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block"></span>
                Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto hover:bg-white/20 rounded-lg p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "assistant" && (
                  <div className="w-7 h-7 bg-coral/10 rounded-full flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Bot className="w-4 h-4 text-coral" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-coral text-white rounded-br-sm"
                    : "bg-white border border-border text-foreground rounded-bl-sm shadow-sm"
                }`}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-coral/10 rounded-full flex items-center justify-center mr-2 shrink-0">
                  <Bot className="w-4 h-4 text-coral" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Respostas Rápidas */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 bg-gray-50 border-t border-border flex gap-2 overflow-x-auto scrollbar-hide">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="shrink-0 text-xs bg-white border border-coral text-coral px-3 py-1.5 rounded-full hover:bg-coral hover:text-white transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Escreva a sua dúvida..."
              className="flex-1 text-sm border border-border rounded-xl px-3 py-2 focus:outline-none focus:border-coral transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="bg-coral text-white w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Botão Flutuante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-coral text-white rounded-full shadow-xl flex items-center justify-center hover:opacity-90 transition-all z-50 hover:scale-105"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    </>
  );
}
