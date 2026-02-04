
import React, { useState, useMemo } from 'react';
import { DEFAULT_SCHEMA_STATE } from '../constants';
import { GoogleGenAI } from '@google/genai';

const SchemaGenerator: React.FC = () => {
  const [data, setData] = useState(DEFAULT_SCHEMA_STATE);
  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    const graph = [
      {
        "@type": "LodgingBusiness",
        "name": data.hotelName,
        "description": data.description,
        "url": data.url,
        "telephone": data.phone,
        "image": data.images,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address.street,
          "addressLocality": data.address.city,
          "addressRegion": data.address.region,
          "postalCode": data.address.postalCode,
          "addressCountry": data.address.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": data.geo.lat,
          "longitude": data.geo.lng
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": data.starRating
        },
        "amenityFeature": data.amenities.map(a => ({ "@type": "LocationFeatureSpecification", "name": a, "value": true })),
        "checkinTime": data.checkin,
        "checkoutTime": data.checkout,
        "priceRange": data.priceRange,
        "parentOrganization": data.parentOrg.name ? {
          "@type": "Organization",
          "name": data.parentOrg.name,
          "legalName": data.parentOrg.legalName,
          "url": data.parentOrg.url,
          "logo": data.parentOrg.logo
        } : undefined
      },
      {
        "@type": "WebSite",
        "url": data.url,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${data.url}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ];

    if (data.faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": data.faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      } as any);
    }

    return {
      "@context": "https://schema.org",
      "@graph": graph
    };
  }, [data]);

  const copyToClipboard = () => {
    const script = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListInput = (field: keyof typeof data, val: string) => {
    setData(prev => ({ ...prev, [field]: val.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const addFaq = () => setData(prev => ({ ...prev, faq: [...prev.faq, { q: '', a: '' }] }));
  
  const updateFaq = (index: number, field: 'q' | 'a', val: string) => {
    const newFaq = [...data.faq];
    newFaq[index][field] = val;
    setData(prev => ({ ...prev, faq: newFaq }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Business Name</label>
              <input 
                type="text" 
                value={data.hotelName}
                onChange={e => setData(prev => ({ ...prev, hotelName: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="Hotel Palmeras Bucerías"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1 text-xs">Description</label>
              <textarea 
                value={data.description}
                onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none h-20 resize-none"
                placeholder="Hotel boutique frente al mar..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Official URL</label>
              <input 
                type="url" 
                value={data.url}
                onChange={e => setData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Telephone</label>
              <input 
                type="tel" 
                value={data.phone}
                onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Location & Geo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Street Address</label>
              <input 
                type="text" 
                value={data.address.street}
                onChange={e => setData(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">City</label>
              <input 
                type="text" 
                value={data.address.city}
                onChange={e => setData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Postal Code</label>
              <input 
                type="text" 
                value={data.address.postalCode}
                onChange={e => setData(prev => ({ ...prev, address: { ...prev.address, postalCode: e.target.value } }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              FAQs
            </h3>
            <button 
              onClick={addFaq}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              + Add FAQ
            </button>
          </div>
          <div className="space-y-4">
            {data.faq.map((f, i) => (
              <div key={i} className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <input 
                  type="text" 
                  value={f.q}
                  onChange={e => updateFaq(i, 'q', e.target.value)}
                  placeholder="Question?"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
                <textarea 
                  value={f.a}
                  onChange={e => updateFaq(i, 'a', e.target.value)}
                  placeholder="Answer..."
                  className="w-full bg-transparent text-sm text-slate-400 outline-none h-16 resize-none border-t border-slate-700 pt-2"
                />
              </div>
            ))}
            {data.faq.length === 0 && <p className="text-xs text-slate-500 text-center py-4 italic">No FAQs added yet.</p>}
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">JSON-LD Output</span>
            <div className="flex gap-2">
               <button 
                onClick={copyToClipboard}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
          <pre className="p-6 text-sm font-mono text-emerald-300 overflow-auto max-h-[70vh] whitespace-pre-wrap leading-relaxed">
            {`<script type="application/ld+json">\n`}
            {JSON.stringify(jsonLd, null, 2)}
            {`\n</script>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SchemaGenerator;
