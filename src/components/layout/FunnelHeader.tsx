import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FunnelHeaderProps {
  onVolverClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export default function FunnelHeader({ onVolverClick, title = "Acrux Consultores" }: FunnelHeaderProps) {
  const handleVolver = (e: React.MouseEvent) => {
    if (onVolverClick) {
      onVolverClick(e);
    } else {
      window.location.href = 'https://acrux.life';
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm py-4 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <a className="flex items-center gap-2 md:gap-3" href="https://acrux.life" onClick={handleVolver}>
                <img src="/acrux_logo.svg" alt="ACRUX" className="h-8 md:h-10 w-auto" />
                <span className="block font-display font-bold tracking-tight text-slate-900 text-xl leading-7">
                  {title}
                </span>
              </a>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <a 
                href="https://acrux.life" 
                onClick={handleVolver}
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold font-display shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Volver a Acrux
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
            <div className="lg:hidden">
              <a 
                href="https://acrux.life" 
                onClick={handleVolver}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors p-2 flex items-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-24" />
    </>
  );
}
