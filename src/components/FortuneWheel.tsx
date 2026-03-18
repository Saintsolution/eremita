import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FortuneWheel() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFortune(null);

    try {
      const response = await fetch('/sortes.json');
      const fortunes: string[] = await response.json();
      const randomIndex = Math.floor(Math.random() * fortunes.length);

      setTimeout(() => {
        setFortune(fortunes[randomIndex]);
        setIsSpinning(false);
      }, 2000);
    } catch (error) {
      setFortune(
        'Os astros se ocultam nas brumas... Tentai novamente, Peregrino.'
      );
      setIsSpinning(false);
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
          className="relative w-64 h-64 md:w-80 md:h-80"
          animate={{
            rotate: isSpinning ? 360 : 0,
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: isSpinning ? Infinity : 0,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold/80 to-gold/60 rounded-full shadow-2xl shadow-gold/50" />
          <div className="absolute inset-4 bg-navy rounded-full border-4 border-charcoal flex items-center justify-center">
            <img
              src="/roda_fortuna.png"
              alt="Roda da Fortuna"
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 50 + 45 * Math.cos(angle);
              const y1 = 50 + 45 * Math.sin(angle);
              const x2 = 50 + 50 * Math.cos(angle);
              const y2 = 50 + 50 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#d4af37"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </motion.div>

        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="group relative px-8 py-4 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-navy font-cinzel text-xl font-bold rounded-lg shadow-lg hover:shadow-gold/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {isSpinning ? 'Consultando os Astros...' : 'Girar a Roda da Sorte'}
          </span>
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <AnimatePresence mode="wait">
          {fortune && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-gradient-to-br from-charcoal/50 to-navy/50 backdrop-blur-lg rounded-lg border-2 border-gold/30 p-8 shadow-2xl">
                <div className="flex items-start space-x-4">
                  <img
                    src="/roda_fortuna.png"
                    alt="Ícone da Roda da Fortuna"
                    className="w-6 h-6 object-contain flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-cinzel text-xl text-gold mb-4">
                      Mensagem do Eremita
                    </h3>
                    <p className="text-gray-300 font-inter leading-relaxed text-lg">
                      {fortune}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}