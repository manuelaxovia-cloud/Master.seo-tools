
import React, { useState, useCallback } from 'react';
import { HOTELS, VALID_FORMATS, MAX_SIZE_KB, KEYWORDS } from '../constants';
import { ImageValidationResult } from '../types';

const ImageValidator: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState('');
  const [results, setResults] = useState<ImageValidationResult[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFiles = useCallback((files: FileList) => {
    const newResults: ImageValidationResult[] = Array.from(files).map(file => {
      const fileName = file.name.split('.').slice(0, -1).join('.').toLowerCase();
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      const fileSizeKb = file.size / 1024;

      const formatOk = VALID_FORMATS.includes(fileExt);
      const sizeOk = fileSizeKb <= MAX_SIZE_KB;
      let nameOk = KEYWORDS.some(keyword => fileName.includes(keyword));
      
      // Special rule for icons
      if (fileExt === 'svg') nameOk = true;

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        format: fileExt,
        sizeKb: fileSizeKb,
        formatOk,
        sizeOk,
        nameOk,
        overallOk: formatOk && sizeOk && nameOk
      };
    });

    setResults(prev => [...newResults, ...prev]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!selectedHotel) {
      alert("Please select a hotel first.");
      return;
    }
    validateFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!selectedHotel) {
        alert("Please select a hotel first.");
        return;
      }
      validateFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-slate-900 rounded-xl p-8 border border-slate-800 shadow-xl max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Batch Image Validator</h3>
        
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest text-center">Step 1: Select Property</label>
          <select 
            value={selectedHotel}
            onChange={e => setSelectedHotel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium outline-none text-center cursor-pointer hover:border-emerald-500/50 transition-colors"
          >
            <option value="">-- Choose Hotel --</option>
            {HOTELS.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest text-center">Step 2: Upload or Drop Assets</label>
          <div 
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('image-upload')?.click()}
            className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
              isDragging 
                ? 'border-emerald-500 bg-emerald-500/5' 
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
            }`}
          >
            <svg className={`w-12 h-12 transition-transform ${isDragging ? 'scale-110 text-emerald-500' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-300">Drop images here</p>
              <p className="text-xs text-slate-500 mt-1">Accepts multiple WebP and SVG files</p>
            </div>
            <input 
              id="image-upload"
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileInput}
              accept="image/webp,image/svg+xml"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-950/50 rounded-lg border border-slate-800/50">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 text-center tracking-widest">Compliance Rules</h4>
          <ul className="text-[10px] text-slate-400 grid grid-cols-2 gap-y-2">
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Formats: .webp, .svg</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Max Size: 300KB</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> SEO Keywords: Required</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Icons: Bypass keyword check</li>
          </ul>
        </div>
      </section>

      {results.length > 0 && (
        <section className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Validation History</h3>
            <button 
              onClick={() => setResults([])}
              className="text-xs font-medium text-rose-400 hover:text-rose-300"
            >
              Clear Results
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Filename</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Weight</th>
                  <th className="px-6 py-4">SEO Name</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200 truncate max-w-[200px]">{r.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.formatOk ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {r.format}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-xs ${r.sizeOk ? 'text-slate-400' : 'text-rose-400 font-bold'}`}>
                        {r.sizeKb.toFixed(1)} KB
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={r.nameOk ? 'text-emerald-400' : 'text-rose-400'}>
                        {r.nameOk ? '✓ Valid' : '✗ Keyword Missing'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${r.overallOk ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'}`}>
                        {r.overallOk ? 'Pass' : 'Reject'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default ImageValidator;
