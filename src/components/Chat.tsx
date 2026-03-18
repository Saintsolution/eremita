import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  onFocusSection?: () => void;
}

export default function Chat({ onFocusSection }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Aproxima-te da luz da vela, peregrino... Que buscais saber?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    onFocusSection?.();

    const userMessage: Message = {
      role: 'user',
      content: trimmedInput,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      let data: { reply?: string; error?: string } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.error || `Erro HTTP ${response.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply?.trim() ||
            'Peregrino, os pergaminhos silenciaram por um instante.',
        },
      ]);
    } catch (error) {
      console.error('Erro no chat:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Peregrino, os ventos místicos se agitam... Um obstáculo se interpôs em nosso diálogo com o oráculo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-charcoal/50 to-navy/50 backdrop-blur-lg rounded-lg border border-gold/20 shadow-2xl overflow-hidden">
        <div className="bg-navy/80 px-6 py-4 border-b border-gold/20 flex items-center justify-center space-x-3">
          <img
  src="/sabio_eremita_chat.png"
  alt="Sábio Eremita"
  className="w-12 h-12 object-contain"
/>
          <div className="text-center">
            <h2 className="font-cinzel text-2xl text-gold">Consulta ao Sábio</h2>
            <p className="text-gray-400 text-xs font-inter">Vozes da Montanha da Sorte</p>
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-navy/30">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 font-inter mt-20 italic">
              <p className="text-lg">"Aproxima-te da luz da vela, Peregrino..."</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-gold/10 text-gray-100 border border-gold/30 rounded-tr-none'
                    : 'bg-charcoal/80 text-gray-300 border border-gold/10 rounded-tl-none font-serif'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-navy/50 text-gold/60 border border-gold/10 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs italic">O Eremita consulta os pergaminhos...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-navy/90 px-6 py-4 border-t border-gold/20">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="O que buscais saber, viajante?"
              className="flex-1 bg-charcoal/40 text-gray-100 border border-gold/20 rounded-full px-5 py-3 font-inter focus:border-gold/60 focus:outline-none transition-all"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gold hover:bg-gold/80 disabled:opacity-30 text-navy p-3 rounded-full transition-all flex items-center justify-center"
              aria-label="Enviar mensagem"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}