import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Navigation({ onNavigate, currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'chat', label: 'Chat' },
    { id: 'oraculo', label: 'Oráculo' },
    { id: 'signos', label: 'Signos' },
    { id: 'biblioteca', label: 'Biblioteca' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigate('home')}
            className="font-cinzel text-gold text-xl md:text-2xl font-bold tracking-wider hover:text-gold/80 transition-colors"
          >
            O Eremita
          </button>

          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`font-inter text-sm font-medium tracking-wide transition-all duration-300 border-b-2 ${
                  currentSection === item.id
                    ? 'text-gold border-gold'
                    : 'text-gray-300 hover:text-gold border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden text-gold p-2"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-2 font-inter transition-colors ${
                  currentSection === item.id
                    ? 'text-gold bg-gold/10'
                    : 'text-gray-300 hover:text-gold hover:bg-gold/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}