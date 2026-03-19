import { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Chat from './components/Chat';
import ZodiacSigns from './components/ZodiacSigns';
import FortuneWheel from './components/FortuneWheel';
import Biblioteca from './components/Biblioteca';
import { Scroll } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const chatRef = useRef<HTMLDivElement>(null);
  const oraculoRef = useRef<HTMLDivElement>(null);
  const signosRef = useRef<HTMLDivElement>(null);
  const bibliotecaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'chat' && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'oraculo' && oraculoRef.current) {
      oraculoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'signos' && signosRef.current) {
      signosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'biblioteca' && bibliotecaRef.current) {
      bibliotecaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-navy font-inter">
      <Navigation onNavigate={handleNavigate} currentSection={currentSection} />

      <section className="relative">
        <div className="relative aspect-[1920/400] w-full bg-navy">
          <img
            src="/banner.png"
            alt="O Eremita Solitário"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/20 to-navy/50" />
        </div>

        <div className="relative mt-8 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-charcoal/80 to-navy/80 backdrop-blur-lg rounded-lg border-2 border-gold/30 p-8 shadow-2xl">
              <Scroll className="w-16 h-16 text-gold mx-auto mb-4" />
              <h1 className="font-cinzel text-3xl md:text-4xl text-gold mb-4">
                Bem-vindo, Peregrino
              </h1>
              <p className="text-gray-300 font-inter leading-relaxed text-lg">
                Adentrastes a caverna do Eremita Solitário, onde jazem as sabedorias
                ancestrais e os mistérios dos astros. Busca a tua sorte nas escrituras
                antigas, contempla os signos celestiais, ou dialoga com o sábio que
                habita estas penumbras há cem anos.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* SEÇÃO DO CHAT COM FUNDO DE CAVERNA MÍSTICA POSTERIZADA */}
      <section 
        ref={chatRef} 
        className="relative py-16 border-t border-gold/10 scroll-mt-16 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Camada de gradiente preto translúcido (80% de opacidade) sobre a imagem
          // para garantir a leitura do conteúdo do chat.
          backgroundImage: "linear-gradient(rgba(10, 15, 20, 0.8), rgba(10, 15, 20, 0.9)), url('/cave.png')" 
        }}
      >
        <Chat
          onFocusSection={() => {
            chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      </section>

      <section ref={oraculoRef} className="py-16 border-t border-gold/10 bg-charcoal/20 scroll-mt-16">
        <FortuneWheel />
      </section>

      <section ref={signosRef} className="py-16 border-t border-gold/10 scroll-mt-16">
        <ZodiacSigns />
      </section>

      <section ref={bibliotecaRef} className="py-16 border-t border-gold/10 bg-charcoal/20 scroll-mt-16">
        <Biblioteca />
      </section>

      <footer className="border-t border-gold/20 bg-navy py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-inter text-sm">
            © {new Date().getFullYear()} O Eremita Solitário. Todas as revelações reservadas.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;