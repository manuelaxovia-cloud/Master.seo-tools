
import React from 'react';
import { AppTool } from '../types';

interface SidebarProps {
  activeTool: AppTool;
  onToolChange: (tool: AppTool) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolChange }) => {
  const tools = [
    { id: 'schema', name: 'Schema Builder', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'llms', name: 'LLMS Builder', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'validator', name: 'Image Validator', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-slate-950 font-bold">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Master Suite</span>
        </div>
        
        <nav className="space-y-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id as AppTool)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTool === tool.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
              </svg>
              {tool.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Optimization Hub</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All tools use current 2025 standards for high-performance SEO and AI discovery.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
