

export default function FunnelFooter() {
  return (
    <footer className="w-full bg-primary text-white border-t border-gray-800 py-8 mt-auto z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="https://acrux.life" className="inline-block mb-2">
            <span className="block font-display font-bold text-white text-lg tracking-tight leading-none">Acrux Consultores</span>
          </a>
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a href="https://acrux.life/privacidad" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors">
            Política de Privacidad
          </a>
          <a href="https://acrux.life/terminos" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors">
            Términos y Condiciones
          </a>
          <a href="https://acrux.life/cookies" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors">
            Política de Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
