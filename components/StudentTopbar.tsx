import React from 'react';

export function StudentTopbar() {
  return (
    <header className="h-20 border-b border-white/40 bg-white/10 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-20">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            type="text" 
            placeholder="Search opportunities, internships, hackathons..." 
            className="w-full bg-white/40 border border-white/60 rounded-full py-2.5 pl-12 pr-6 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 ml-6">
        <button className="w-10 h-10 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-on-surface hover:bg-white/60 transition-colors shadow-sm">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="flex items-center gap-3 bg-white/40 border border-white/60 pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white/60 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
          <span className="font-body-md text-sm font-semibold text-on-surface">Aarav M.</span>
        </div>
      </div>
    </header>
  );
}
