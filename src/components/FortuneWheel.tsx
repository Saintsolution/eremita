import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FortuneWheel() {
  const [fortunes, setFortunes] = useState<string[]>([]);
  const [fortune, setFortune] = useState<string | null>(null);
  const [pendingFortune, setPendingFortune] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // Controla o ângulo atual para travar

  // Carrega as sortes uma única vez para evitar piscadas no site
  useEffect(() => {
    fetch('/sortes.json')
      .then(res => res.json())
      .then(data => setFortunes(data))
      .catch(() => setFortunes(['Os astros se ocultam...']));
  }, []);

  const spinWheel = () => {
    if (isSpinning || fortunes.length === 0) return;

    setIsSpinning(true);
    setFortune(null);
    setPendingFortune(null);

    // Sorteia a frase da memória
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setPendingFortune(fortunes[randomIndex]);

    // Soma mais 1080 graus ao ângulo atual para ela girar e TRAVAR no novo ponto
    setRotation(prev => prev + 1080);
  };

  const handleAnimationComplete = () => {
    if (isSpinning) {
      setIsSpinning(false);
      setFortune(pendingFortune);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">
          Oráculo da Sorte
        </h2>
        <p className="text-gray-400 font-inter max-w-2xl mx-auto">
          Consulta as antigas escrituras e recebe uma mensagem do Eremita
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <motion.div
          className="relative w-72 h-72 md:w-96 md:h-96"
          animate={{ rotate: rotation }} // Usa o estado de rotação acumulada
          transition={{
            duration: 2.5,
            ease: "circOut", // Para de forma suave
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold/80 to-gold/60 rounded-full shadow-2xl shadow-gold/40 border-4 border-gold/50" />
          
          <div className="absolute inset-2 bg-navy rounded-full border-2 border-charcoal overflow-hidden flex items-center justify-center">
            <img
              src="/roda_fortuna.png"
              alt="Roda da Fortuna"
              className="w-[92%] h-[92%] object-contain"
              loading="eager"
            />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 50 + 44 * Math.cos(angle);
              const y1 = 50 + 44 * Math.sin(angle);
              const x2 = 50 + 50 * Math.cos(angle);
              const y2 = 50 + 50 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4af37" strokeWidth="1.5" />
              );
            })}
          </svg>
        </motion.div>

        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="group relative px-10 py-5 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-navy font-cinzel text-xl font-bold rounded-full shadow-xl hover:shadow-gold/50 transition-all duration-300 disabled:opacity-50"
        >
          <span className="relative z-10">
            {isSpinning ? 'O Destino se move...' : 'Girar a Roda da Sorte'}
          </span>
        </button>

        <AnimatePresence mode="wait">
          {fortune && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mt-8"
            >
              <div className="bg-charcoal/80 backdrop-blur-md rounded-2xl border-2 border-gold/40 p-8 shadow-[0_0_30px_rgba(212,175,55,0.2)] text-center">
                <img src="/roda_fortuna.png" className="w-12 h-12 mx-auto mb-4" alt="Ícone" />
                <h3 className="font-cinzel text-2xl text-gold mb-4">Revelação do Eremita</h3>
                <p className="text-gray-200 font-inter italic text-xl leading-relaxed">
                  "{fortune}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}