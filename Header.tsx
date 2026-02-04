
import React from 'react';
import { AppTool } from '../types';

interface HeaderProps {
  activeTool: AppTool;
}

const Header: React.FC<HeaderProps> = ({ activeTool }) => {
  const titles = {
    schema: 'Schema.org JSON-LD Generator',
    llms: 'llms.txt AI Discovery Builder',
    validator: 'Strict Image Validator',
  };

  const subtitles = {
    schema: 'Generate structured data for LodgingBusiness and WebSite modules.',
    llms: 'Optimizing for AI agents like ChatGPT, Perplexity, and Gemini.',
    validator: 'Ensure assets meet 2025 speed and accessibility standards.',
  };

  return (
    <header className="py-6 px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{titles[activeTool]}</h1>
        <p className="text-slate-400 text-sm mt-1">{subtitles[activeTool]}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          2025 Version
        </div>
      </div>
    </header>
  );
};

export default Header;
