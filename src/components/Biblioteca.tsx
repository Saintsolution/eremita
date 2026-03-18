import { ExternalLink, BookOpen } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  affiliateLink: string;
}

const books: Book[] = [
  {
    id: '1',
    title: 'O Livro dos Espíritos',
    author: 'Allan Kardec',
    imageUrl: 'https://images.pexels.com/photos/1426044/pexels-photo-1426044.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'Um grimório ancestral que desvenda os mistérios do além, revelando as verdades que jazem entre o véu dos mundos visível e invisível.',
    affiliateLink: '#',
  },
  {
    id: '2',
    title: 'A República',
    author: 'Platão',
    imageUrl: 'https://images.pexels.com/photos/2203683/pexels-photo-2203683.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'As meditações do filósofo sobre a justiça e a sabedoria, escrituras que guiaram reis e sábios através dos séculos.',
    affiliateLink: '#',
  },
  {
    id: '3',
    title: 'Meditações',
    author: 'Marco Aurélio',
    imageUrl: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'Os pensamentos de um imperador-filósofo, pergaminhos de sabedoria estoica para fortalecer a alma contra as tempestades da vida.',
    affiliateLink: '#',
  },
  {
    id: '4',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    imageUrl: 'https://images.pexels.com/photos/2228557/pexels-photo-2228557.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'A jornada de um pastor em busca de seu tesouro pessoal, uma parábola mística sobre seguir os sinais do destino.',
    affiliateLink: '#',
  },
  {
    id: '5',
    title: 'O Poder do Agora',
    author: 'Eckhart Tolle',
    imageUrl: 'https://images.pexels.com/photos/3393649/pexels-photo-3393649.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'Ensinamentos sobre a arte de viver no momento presente, dissolvendo as ilusões do tempo e alcançando a iluminação interior.',
    affiliateLink: '#',
  },
  {
    id: '6',
    title: 'As Profecias Celestinas',
    author: 'James Redfield',
    imageUrl: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'Nove revelações encontradas em manuscritos antigos que desvendam os segredos da energia espiritual e da consciência humana.',
    affiliateLink: '#',
  },
  {
    id: '7',
    title: 'O Livro Completo da Astrologia',
    author: 'Kris Brandt Riske',
    imageUrl: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4c5?auto=compress&cs=tinysrgb&w=400',
    description:
      'Muitos olham para o céu e veem apenas luzes distantes. Este guia é o teu cajado para decifrar como os planetas moldam o teu temperamento e as tuas escolhas.',
    affiliateLink: '#',
  },
  {
    id: '8',
    title: 'A Bíblia dos Cristais',
    author: 'Judy Hall',
    imageUrl: 'https://images.unsplash.com/photo-1567883116243-485185c4f50d?auto=compress&cs=tinysrgb&w=400',
    description:
      'A terra guarda o poder de eras. Aprende a usar as joias da criação, luzes sólidas da montanha, para equilibrar o teu espírito e fortalecer a tua jornada.',
    affiliateLink: '#',
  },
  {
    id: '9',
    title: 'Tarot Mitológico',
    author: 'Liz Greene',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=compress&cs=tinysrgb&w=400',
    description:
      'As imagens falam onde as palavras falham. Através dos arquétipos dos deuses antigos, verás refletido o teu momento atual e os desafios na curva da estrada.',
    affiliateLink: '#',
  }
];

export default function Biblioteca() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BookOpen className="w-10 h-10 text-gold" />
          <h2 className="font-cinzel text-4xl md:text-5xl text-gold">
            Grimórios Sugeridos
          </h2>
        </div>
        <p className="text-gray-400 font-inter max-w-2xl mx-auto">
          Obras ancestrais cuidadosamente selecionadas pelo Eremita para iluminar tua jornada espiritual
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="group bg-gradient-to-br from-charcoal/50 to-navy/50 backdrop-blur-lg rounded-lg border border-gold/20 overflow-hidden shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="font-cinzel text-xl text-gold mb-2 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-400 font-inter text-sm mb-4">
                por {book.author}
              </p>
              <p className="text-gray-300 font-inter text-sm leading-relaxed mb-6 line-clamp-3">
                {book.description}
              </p>

              <a
                href={book.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-lg font-inter font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold/50"
              >
                <span>Adquirir Sabedoria</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}