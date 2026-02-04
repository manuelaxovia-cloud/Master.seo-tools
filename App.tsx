
import React, { useState, useEffect } from 'react';
import { AppTool } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SchemaGenerator from './components/SchemaGenerator';
import LLMSGenerator from './components/LLMSGenerator';
import ImageValidator from './components/ImageValidator';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<AppTool>('schema');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar activeTool={activeTool} onToolChange={setActiveTool} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header activeTool={activeTool} />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTool === 'schema' && <SchemaGenerator />}
            {activeTool === 'llms' && <LLMSGenerator />}
            {activeTool === 'validator' && <ImageValidator />}
          </div>
        </div>
        
        <footer className="py-4 px-8 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <div>&copy; 2025 Master Suite Optimization Tools</div>
          <div className="flex gap-4">
            <a href="https://search.google.com/test/rich-results" target="_blank" className="hover:text-emerald-400 transition-colors">Google Rich Results</a>
            <a href="https://llmstxt.org/" target="_blank" className="hover:text-emerald-400 transition-colors">llms.txt Standard</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
