import { useState } from 'react';
import { X } from 'lucide-react';

interface ZodiacSign {
  id: string;
  name: string;
  videoId: string;
  dates: string;
}

const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Áries', videoId: 'dQw4w9WgXcQ', dates: '21/03 - 19/04' },
  { id: 'touro', name: 'Touro', videoId: 'dQw4w9WgXcQ', dates: '20/04 - 20/05' },
  { id: 'gemeos', name: 'Gêmeos', videoId: 'dQw4w9WgXcQ', dates: '21/05 - 20/06' },
  { id: 'cancer', name: 'Câncer', videoId: 'dQw4w9WgXcQ', dates: '21/06 - 22/07' },
  { id: 'leao', name: 'Leão', videoId: 'dQw4w9WgXcQ', dates: '23/07 - 22/08' },
  { id: 'virgem', name: 'Virgem', videoId: 'dQw4w9WgXcQ', dates: '23/08 - 22/09' },
  { id: 'libra', name: 'Libra', videoId: 'dQw4w9WgXcQ', dates: '23/09 - 22/10' },
  { id: 'escorpiao', name: 'Escorpião', videoId: 'dQw4w9WgXcQ', dates: '23/10 - 21/11' },
  { id: 'sagitario', name: 'Sagitário', videoId: 'dQw4w9WgXcQ', dates: '22/11 - 21/12' },
  { id: 'capricornio', name: 'Capricórnio', videoId: 'dQw4w9WgXcQ', dates: '22/12 - 19/01' },
  { id: 'aquario', name: 'Aquário', videoId: 'dQw4w9WgXcQ', dates: '20/01 - 18/02' },
  { id: 'peixes', name: 'Peixes', videoId: 'dQw4w9WgXcQ', dates: '19/02 - 20/03' },
];

export default function ZodiacSigns() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">
          Os Doze Signos Celestiais
        </h2>
        <p className="text-gray-400 font-inter max-w-2xl mx-auto">
          Descobre as revelações dos astros para cada um dos signos sagrados do zodíaco
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign)}
            className="group relative aspect-square bg-gradient-to-br from-navy to-charcoal rounded-full border-4 border-gold/30 hover:border-gold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gold/50"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              {/* Imagem Ilustrada do Signo (Dinamica com base no ID) */}
              <img 
                src={`/${sign.id}.png`} 
                alt={sign.name}
                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" 
              />
              
              {/* Legenda (Nome do Signo) - Visível no Hover */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-cinzel text-xs md:text-sm text-gold mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {sign.name}
              </span>
            </div>
            {/* Datas de Nascimento - Visível no Hover */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-gray-500 font-inter whitespace-nowrap">
                {sign.dates}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedSign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedSign(null)}
        >
          <div
            className="relative bg-navy border-2 border-gold rounded-lg max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gold/20">
              <div className="flex items-center space-x-3">
                {/* Imagem no Modal */}
                <img 
                  src={`/${selectedSign.id}.png`} 
                  alt={selectedSign.name}
                  className="w-12 h-12 object-contain" 
                />
                <div>
                  <h3 className="font-cinzel text-2xl text-gold">
                    {selectedSign.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-inter">
                    {selectedSign.dates}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSign(null)}
                className="text-gold hover:text-gold/70 transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedSign.videoId}`}
                title={`${selectedSign.name} - Previsão`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}