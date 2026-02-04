
import React, { useState, useMemo } from 'react';
import { DEFAULT_LLMS_STATE } from '../constants';

const LLMSGenerator: React.FC = () => {
  const [data, setData] = useState(DEFAULT_LLMS_STATE);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = [
      '# llms.txt version 1.0',
      `# last-updated: ${new Date().toISOString().split('T')[0]}`,
      `owner: ${data.owner}`,
      '',
      `# ${data.brand || 'Site Brand'}`,
      `> ${data.description || 'Short description here.'} | (URL: ${data.site}) | (Type: ${data.type})`,
      '',
      '## Directivas y Contacto (Human-Readable)',
      `- **Contacto IA:** ${data.email}`,
      `- **Teléfono:** ${data.phone}`,
      `- **Dirección:** ${data.address}`,
      `- **Horarios:** ${data.hours}`,
      `- **Check-in/out:** ${data.checkin} / ${data.checkout}`,
      `- **Sitemap:** ${data.sitemap}`,
      '',
      '# Directivas de Acceso (Machine-Readable)',
      'user-agent: *',
      'allow: /',
      ...data.restrictions,
      '',
      '## Important Pages',
      ...data.pages.map(p => `- ${p.title}: ${p.path}`),
      data.pages.length === 0 ? '- (No pages listed)' : '',
      '',
      '## Semantic classification',
      `- Type: ${data.type}`,
      `- Categories: ${data.categories.join(', ')}`,
      `- Languages: ${data.languages.join(', ')}`,
      '',
      '# NOTA: Este archivo sigue el borrador del estándar llms.txt'
    ];
    return lines.join('\n');
  }, [data]);

  const addPage = () => setData(prev => ({ ...prev, pages: [...prev.pages, { title: '', path: '' }] }));
  
  const updatePage = (idx: number, f: 'title' | 'path', v: string) => {
    const next = [...data.pages];
    next[idx][f] = v;
    setData(prev => ({ ...prev, pages: next }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            LLMS Core Identity
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Site URL</label>
              <input 
                type="url" 
                value={data.site}
                onChange={e => setData(prev => ({ ...prev, site: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
                placeholder="https://www.example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Brand Name</label>
              <input 
                type="text" 
                value={data.brand}
                onChange={e => setData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
                placeholder="Colima 71"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Owner Line</label>
              <input 
                type="text" 
                value={data.owner}
                onChange={e => setData(prev => ({ ...prev, owner: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
                placeholder="Colima 71 Casa de Arte Hotel"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">AI-Focused Description</label>
              <textarea 
                value={data.description}
                onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none h-24 resize-none"
                placeholder="Briefly describe the site for AI models."
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Important Pages
            </h3>
            <button 
              onClick={addPage}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              + Add Page
            </button>
          </div>
          <div className="space-y-3">
            {data.pages.map((p, i) => (
              <div key={i} className="flex gap-2">
                <input 
                  type="text" 
                  value={p.title}
                  onChange={e => updatePage(i, 'title', e.target.value)}
                  placeholder="Title (e.g. Rooms)"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none"
                />
                <input 
                  type="text" 
                  value={p.path}
                  onChange={e => updatePage(i, 'path', e.target.value)}
                  placeholder="Path (e.g. /rooms)"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">llms.txt Preview</span>
            <button 
              onClick={copyToClipboard}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                copied ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <pre className="p-6 text-sm font-mono text-slate-300 overflow-auto max-h-[70vh] whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LLMSGenerator;
