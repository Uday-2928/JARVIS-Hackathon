import React from 'react';

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-sm p-12 backdrop-blur-xl flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="w-20 h-20 bg-gradient-to-br from-[#38BDF8] to-[#0284c7] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
        <span className="material-symbols-outlined text-4xl">construction</span>
      </div>
      <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-on-surface-variant font-body-md max-w-md">
        We are currently building this module. Check back soon for intelligent AI matching, insights, and opportunities.
      </p>
    </section>
  );
}
