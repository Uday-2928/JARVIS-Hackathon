'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SlideConfirm } from '@/components/SlideToConfirm';

export default function LandingPage() {
  const router = useRouter();
  
  // Auth Modal State
  const [authRole, setAuthRole] = useState<'student' | 'admin' | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll('.cursor-reactive-container').forEach((container) => {
        const el = container.querySelector('.cursor-reactive') as HTMLElement;
        if (el) {
          const rect = container.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          if (e.clientY >= rect.top - window.innerHeight && e.clientY <= rect.bottom + window.innerHeight) {
            el.style.setProperty('--mouse-x', `${x}%`);
            el.style.setProperty('--mouse-y', `${y}%`);
          }
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/student');
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/60 bg-white/40 dark:bg-surface-dim/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] z-50 flex justify-between items-center px-8 py-3">
        <Link className="font-display-xl text-headline-md tracking-tighter text-primary dark:text-primary-fixed-dim flex items-center gap-2" href="#">
          <svg className="h-8 w-8 text-primary" fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="currentColor" opacity="0.8"/>
            <path d="M2 23L16 30L30 23V16L16 23L2 16V23Z" fill="currentColor" opacity="0.6"/>
            <path d="M2 16L16 23L30 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">CampusPilot</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link className="text-primary font-bold font-body-md text-body-md scale-95 active:scale-90 transition-transform" href="#">AI Engine</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform" href="#">For Students</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform" href="#">For Institutions</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform" href="#">Training</Link>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setAuthRole('student'); setAuthMode('signin'); }}
            className="bg-white/40 text-on-surface border border-white/60 shadow-sm backdrop-blur-md font-body-md text-body-md font-medium px-6 py-2 rounded-full hover:bg-white/60 transition-colors duration-300 scale-95 active:scale-90 transition-transform"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-[1728px] mx-auto w-full">
        {/* Section 1: Hero */}
        <section className="relative pt-48 pb-section-gap px-container-padding min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden cursor-reactive-container">
          <div className="absolute inset-0 hero-dynamic-gradient cursor-reactive -z-10"></div>
          <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-label-caps text-label-caps px-2 py-1 rounded-full uppercase shadow-sm">AI POWERED</span>
            <span className="font-body-md text-body-md text-on-surface">The smartest way to navigate your career</span>
          </div>
          <h1 className="font-display-xl text-[64px] leading-[1.1] tracking-tighter text-on-surface max-w-4xl mb-6">
            Your Personal AI Career Agent
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
            CampusPilot understands your academic profile, parses your resume, and uses intelligent semantic matching to automatically recommend the exact campus drives, internships, and hackathons tailored for you.
          </p>
          <div className="w-full max-w-[650px] flex flex-col md:flex-row items-center justify-center gap-8 mb-8 mt-6">
            <SlideConfirm label="Slide for Student Login" onConfirm={() => { setAuthRole('student'); setAuthMode('signin'); }} />
            <SlideConfirm label="Slide for Admin Login" onConfirm={() => { setAuthRole('admin'); setAuthMode('signin'); }} />
          </div>
        </section>

        {/* Section 2: Minimal Slogan */}
        <section className="py-section-gap px-container-padding bg-surface relative min-h-[400px] flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="font-display-xl text-[62px] leading-[1.2] font-normal text-on-surface tracking-tight">
              Stop searching.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Let opportunities find you.</span>
            </h2>
          </div>
        </section>

        {/* Section 3: Feature 01 */}
        <section className="py-section-gap px-container-padding relative">
          <div className="max-w-[1118px] mx-auto bg-white/40 backdrop-blur-2xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[596px]">
            <div className="p-card-internal flex-1 flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-primary mb-6 tracking-widest font-bold">SMART PARSING</span>
              <h3 className="font-headline-lg text-[32px] text-on-surface mb-6 leading-tight">Upload your resume. AI does the rest.</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
                Don't waste time filling out forms. Our advanced document extraction pipeline parses your PDF, identifies your core technical skills, and analyzes your project experience to build a comprehensive skills profile instantly.
              </p>
            </div>
            <div className="flex-1 bg-white/20 relative overflow-hidden flex items-center justify-end border-l border-white/40">
              <div className="w-[120%] h-[80%] bg-white/40 backdrop-blur-xl rounded-l-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 absolute right-[-10%] translate-y-[5%]">
                <div className="flex items-center justify-between border-b border-white/40 pb-4 mb-4">
                  <span className="text-on-surface font-headline-md text-headline-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">document_scanner</span>
                    AI Detected Information
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-[8px] p-4 border border-teal-500/30 shadow-sm flex items-start gap-4">
                    <span className="material-symbols-outlined text-teal-500">code</span>
                    <div>
                      <div className="font-bold text-on-surface text-sm mb-1">Programming Languages</div>
                      <div className="flex gap-2">
                        <span className="text-xs bg-teal-500/10 text-teal-700 px-2 py-1 rounded">Python</span>
                        <span className="text-xs bg-teal-500/10 text-teal-700 px-2 py-1 rounded">TypeScript</span>
                        <span className="text-xs bg-teal-500/10 text-teal-700 px-2 py-1 rounded">SQL</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-[8px] p-4 border border-purple-500/30 shadow-sm flex items-start gap-4">
                    <span className="material-symbols-outlined text-purple-500">memory</span>
                    <div>
                      <div className="font-bold text-on-surface text-sm mb-1">Technical Skills</div>
                      <div className="flex gap-2">
                        <span className="text-xs bg-purple-500/10 text-purple-700 px-2 py-1 rounded">Machine Learning</span>
                        <span className="text-xs bg-purple-500/10 text-purple-700 px-2 py-1 rounded">React</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Feature 02 */}
        <section className="py-section-gap px-container-padding relative">
          <div className="max-w-[1118px] mx-auto bg-white/40 backdrop-blur-2xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[596px]">
            <div className="p-card-internal flex-1 flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-[#FF5E3A] mb-6 tracking-widest font-bold">PREPARATION</span>
              <h3 className="font-headline-lg text-[32px] text-on-surface mb-6 leading-tight">Identify skill gaps & train smartly</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
                Match your profile against your dream roles. CampusPilot identifies missing skills and generates a personalized learning roadmap spanning aptitude, technical training, and interview preparation.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#FF5E3A]/80 to-[#FF2A6D]/80 relative overflow-hidden flex items-center justify-center backdrop-blur-md">
              <div className="w-[80%] bg-white/50 backdrop-blur-xl border border-white/60 rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 relative">
                <div className="flex items-center gap-2 mb-6 border-b border-white/40 pb-4">
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                  <span className="font-headline-md text-headline-md text-on-surface text-lg">AI Skill Gap Analysis</span>
                </div>
                <div className="space-y-4 font-body-md text-body-md">
                  <div className="flex items-start justify-between">
                    <span className="text-on-surface font-semibold">Python (Data Science)</span>
                    <span className="text-emerald-600 font-bold">Match ✅</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-on-surface font-semibold">Database Design (SQL)</span>
                    <span className="text-emerald-600 font-bold">Match ✅</span>
                  </div>
                  <div className="flex items-start justify-between border-t border-white/40 pt-4 mt-2">
                    <div>
                      <span className="text-on-surface font-semibold block">AWS / Cloud</span>
                      <span className="text-xs text-on-surface-variant">Required for target role</span>
                    </div>
                    <span className="text-rose-600 font-bold">Missing ❌</span>
                  </div>
                  <div className="bg-white/40 p-3 rounded mt-2 text-sm text-on-surface-variant">
                    <strong>AI Recommendation:</strong> Start with AWS Cloud Practitioner module. Estimated time: 2 weeks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: User Types */}
        <section className="py-section-gap px-container-padding bg-surface-container-lowest relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 via-[#C084FC]/5 to-transparent pointer-events-none"></div>
          <div className="max-w-[1516px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 2: Free */}
              <div className="p-8 bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/10 to-transparent -z-10"></div>
                <h3 className="font-headline-md text-[32px] text-on-surface mb-2 font-bold">For Students</h3>
                <p className="text-on-surface-variant mb-6 text-sm">Navigate your career effortlessly.</p>
                <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#38BDF8]">check</span> AI Resume Parsing & Scoring</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#38BDF8]">check</span> Personalized Opportunity Matching</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#38BDF8]">check</span> Skill Gap Detection & Training</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#38BDF8]">check</span> Deadline Tracking & CRM</li>
                </ul>
              </div>
              {/* Column 3: Pro */}
              <div className="p-8 bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#C084FC]/20 to-[#FF9A9E]/20 -z-10"></div>
                <h3 className="font-headline-md text-[32px] text-on-surface mb-2 font-bold">For Institutions & Admins</h3>
                <p className="text-on-surface-variant mb-6 text-sm">Manage placements and student readiness.</p>
                <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-purple-600">check</span> AI Extraction of Notice PDFs</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-purple-600">check</span> Opportunity Publishing & Management</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-purple-600">check</span> Student Readiness Analytics</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-purple-600">check</span> Targeted Placement Drives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Final CTA */}
        <section className="py-section-gap px-container-padding relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh] cursor-reactive-container">
          {/* Vibrant moving gradient background */}
          <div className="absolute inset-0 cta-dynamic-gradient cursor-reactive -z-10 opacity-90"></div>
          <h2 className="font-display-xl text-[54px] leading-tight text-white mb-10 text-center relative z-10 max-w-2xl drop-shadow-sm">
              Ready to launch your career?
          </h2>
          <button onClick={() => { setAuthRole('student'); setAuthMode('signup'); }} className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-md border border-white/60 text-white font-body-lg text-body-lg font-medium px-10 py-5 rounded-full hover:bg-white/40 hover:scale-105 transition-all shadow-sm group relative z-10 cursor-pointer">
              Get started now
              <div className="w-6 h-6 rounded-full bg-white/60 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
          </button>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="bg-transparent w-full py-8 text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md relative z-20 -mt-[80px]">
        <div className="max-w-[1515px] mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display-xl text-headline-md text-white opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg className="h-6 w-6 grayscale opacity-70" fill="none" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="currentColor" opacity="0.8"/>
              <path d="M2 23L16 30L30 23V16L16 23L2 16V23Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 16L16 23L30 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold">CampusPilot</span>
          </div>
          <div className="text-white/70 text-sm">
            © 2024 CampusPilot AI. Built for the future of student careers.
          </div>
        </div>
      </footer>

      {/* Authentication Modal Portal */}
      {authRole && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setAuthRole(null)}></div>
          
          <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_16px_64px_rgba(0,0,0,0.15)] w-full max-w-md rounded-[28px] p-8 relative z-10 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setAuthRole(null)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${authRole === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-[#38BDF8] to-[#0284c7]'}`}>
                {authRole === 'admin' ? 'A' : 'S'}
              </div>
              <div>
                <h2 className="font-display-md text-2xl text-on-surface leading-tight tracking-tight">
                  {authRole === 'admin' ? 'Admin Portal' : 'Student Portal'}
                </h2>
                <p className="text-on-surface-variant text-sm font-medium">
                  {authMode === 'signin' ? 'Sign in to continue' : 'Create a new account'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-6 p-1 bg-white/50 border border-white/60 rounded-xl">
              <button 
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'signin' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'signup' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {authMode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
                </div>
              )}
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email Address</label>
                <input type="email" required placeholder="you@university.edu" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
                  {authMode === 'signin' && (
                    <a href="#" className="text-xs font-semibold text-[#0284c7] hover:underline">Forgot?</a>
                  )}
                </div>
                <input type="password" required placeholder="••••••••" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
              </div>

              <button type="submit" className={`mt-4 w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] ${authRole === 'admin' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' : 'bg-gradient-to-r from-[#38BDF8] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1]'}`}>
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-8 relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
              <span className="relative bg-white/50 px-4 text-xs font-semibold text-on-surface-variant">OR CONTINUE WITH</span>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" className="flex-1 bg-white/50 border border-white/60 hover:bg-white/80 transition-colors py-2.5 rounded-xl flex justify-center shadow-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button type="button" className="flex-1 bg-white/50 border border-white/60 hover:bg-white/80 transition-colors py-2.5 rounded-xl flex justify-center shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
