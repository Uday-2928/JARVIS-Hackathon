import React from 'react';

export default function ResumeBuilderPage() {
  return (
    <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-sm p-8 backdrop-blur-xl relative overflow-hidden h-[80vh]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#38BDF8]/20 to-transparent rounded-bl-full pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10 mb-8 border-b border-white/40 pb-6">
        <div>
          <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
            AI Resume Builder
          </h1>
          <p className="text-on-surface-variant font-body-md">
            Let our AI optimize your resume based on your current skills and targeted roles.
          </p>
        </div>
        <div className="flex gap-3 h-fit">
          <button className="bg-white/50 border border-white/60 text-on-surface px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/80 transition-all shadow-sm">
            Import LinkedIn
          </button>
          <button className="bg-on-surface text-surface px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-on-surface/90 transition-all shadow-md">
            Generate PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 h-[calc(100%-120px)]">
        {/* Editor Sidebar */}
        <div className="col-span-1 border-r border-white/40 pr-6 overflow-y-auto flex flex-col gap-4">
          {['Basic Info', 'Education', 'Experience', 'Projects', 'Skills', 'Certifications'].map((section, idx) => (
            <div key={idx} className="bg-white/50 border border-white/60 p-4 rounded-2xl cursor-pointer hover:bg-white/70 transition-colors flex items-center justify-between">
              <span className="font-semibold text-on-surface">{section}</span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">edit</span>
            </div>
          ))}
          
          <div className="mt-4 bg-[#38BDF8]/10 border border-[#38BDF8]/30 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-[#0284c7] font-bold mb-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              AI Suggestions
            </div>
            <p className="text-sm text-on-surface-variant">Add action verbs to your 'Hackathon' project to increase ATS score.</p>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="col-span-2 bg-white rounded-xl shadow-inner border border-gray-200 p-8 overflow-y-auto">
           {/* Mock Resume Document */}
           <div className="max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center text-gray-400">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-50">description</span>
             <h3 className="text-xl font-medium mb-2 text-gray-600">Resume Preview</h3>
             <p className="text-sm">Select a section on the left to start editing.</p>
           </div>
        </div>
      </div>
    </section>
  );
}
