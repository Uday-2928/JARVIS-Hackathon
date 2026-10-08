import React from 'react';
import Link from 'next/link';

const metrics = [
  { label: 'Total Students', value: '14,842', trend: '+12% this week', color: 'from-[#38BDF8] to-[#0284c7]' },
  { label: 'Active Students', value: '9,310', trend: '62% engagement', color: 'from-emerald-400 to-teal-500' },
  { label: 'Opportunities', value: '486', trend: '+24 new today', color: 'from-purple-400 to-indigo-500' },
  { label: 'Applications', value: '8,114', trend: 'High volume', color: 'from-amber-400 to-orange-500' },
];

const recentApplicants = [
  { name: 'Aarav Sharma', college: 'VIT', branch: 'ECE', completion: '92%', status: 'Resume uploaded', statusColor: 'bg-teal-500/20 text-teal-700' },
  { name: 'Meera Nair', college: 'NIT Trichy', branch: 'CSE', completion: '88%', status: 'Interview shortlist', statusColor: 'bg-purple-500/20 text-purple-700' },
  { name: 'Rohan Iyer', college: 'SRM', branch: 'EEE', completion: '76%', status: 'Opportunity matched', statusColor: 'bg-blue-500/20 text-blue-700' },
  { name: 'Kavya Rao', college: 'BITS Pilani', branch: 'AI & DS', completion: '96%', status: 'Training plan active', statusColor: 'bg-amber-500/20 text-amber-700' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background relative flex">
      {/* Background gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 h-screen sticky top-0 border-r border-white/40 p-6 flex flex-col gap-8 bg-white/20 backdrop-blur-md z-10 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            A
          </div>
          <span className="font-display-md text-on-surface text-xl">Admin Portal</span>
        </div>

        <nav className="flex flex-col gap-2">
          <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Overview</div>
          {[
            { icon: 'bar_chart', label: 'Dashboard', active: true },
            { icon: 'stars', label: 'Opportunities' },
            { icon: 'business', label: 'Campus Drives' },
            { icon: 'work', label: 'Internships' },
            { icon: 'emoji_events', label: 'Hackathons' },
            { icon: 'school', label: 'Workshops' },
            { icon: 'group', label: 'Students' },
            { icon: 'insights', label: 'Analytics' },
            { icon: 'description', label: 'Documents' },
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'shield', label: 'Audit Logs' },
            { icon: 'settings', label: 'Settings' },
          ].map((item) => (
            <Link
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                item.active
                  ? 'bg-white/60 shadow-sm border border-white/60 text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-white/40 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Topbar */}
        <header className="h-20 border-b border-white/40 bg-white/10 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-20">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search students, opportunities, drives..." 
                className="w-full bg-white/40 border border-white/60 rounded-full py-2.5 pl-12 pr-6 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-6">
            <button className="bg-white/40 border border-white/60 text-on-surface font-semibold text-sm px-5 py-2 rounded-full hover:bg-white/60 transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Publish Opportunity
            </button>
            <div className="flex items-center gap-3 bg-white/40 border border-white/60 pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white/60 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold">
                AD
              </div>
              <span className="font-body-md text-sm font-semibold text-on-surface">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          
          {/* Welcome Card */}
          <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/50 border border-white/60 text-xs font-semibold text-on-surface-variant mb-4 uppercase tracking-wide">
                  Institution Dashboard
                </div>
                <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
                  Opportunity & Student Intelligence
                </h1>
                <p className="text-on-surface-variant font-body-md max-w-2xl">
                  Manage campus drives, extract opportunity details with AI, and track student placement readiness across the institution.
                </p>
              </div>
              <button className="shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-md flex items-center gap-2 active:scale-95">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Create with AI
              </button>
            </div>
          </section>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-md flex flex-col relative overflow-hidden group hover:bg-white/50 transition-colors">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${metric.color}`}></div>
                <div className="text-on-surface-variant text-sm font-medium mb-2">{metric.label}</div>
                <div className="font-display-md text-4xl text-on-surface mb-2">{metric.value}</div>
                <div className="text-on-surface-variant text-xs font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  {metric.trend}
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Opportunities Table */}
            <section className="bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 backdrop-blur-xl flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display-md text-xl text-on-surface">Opportunity Pipeline</h2>
                <button className="text-sm font-semibold text-purple-600 hover:underline">Manage all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/40 text-on-surface-variant">
                      <th className="pb-3 font-medium">Opportunity</th>
                      <th className="pb-3 font-medium">Deadline</th>
                      <th className="pb-3 font-medium">Eligibility</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface">
                    <tr className="border-b border-white/20 hover:bg-white/30 transition-colors">
                      <td className="py-4">
                        <div className="font-semibold text-on-surface">AI Internship Program</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Internship</div>
                      </td>
                      <td className="py-4">3 days</td>
                      <td className="py-4 text-xs">CSE, ECE, IT</td>
                      <td className="py-4 text-right">
                        <span className="inline-block px-2.5 py-1 bg-teal-500/20 text-teal-700 border border-teal-500/30 rounded-full text-xs font-bold">Published</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/30 transition-colors">
                      <td className="py-4">
                        <div className="font-semibold text-on-surface">Core Engineering Drive</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Campus Drive</div>
                      </td>
                      <td className="py-4">5 days</td>
                      <td className="py-4 text-xs">EEE, ECE</td>
                      <td className="py-4 text-right">
                        <span className="inline-block px-2.5 py-1 bg-blue-500/20 text-blue-700 border border-blue-500/30 rounded-full text-xs font-bold">Review</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="py-4">
                        <div className="font-semibold text-on-surface">Robotics Hackathon</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Hackathon</div>
                      </td>
                      <td className="py-4">7 days</td>
                      <td className="py-4 text-xs">All branches</td>
                      <td className="py-4 text-right">
                        <span className="inline-block px-2.5 py-1 bg-purple-500/20 text-purple-700 border border-purple-500/30 rounded-full text-xs font-bold">Live</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Students Table */}
            <section className="bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 backdrop-blur-xl flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display-md text-xl text-on-surface">Student Overview</h2>
                <button className="text-sm font-semibold text-purple-600 hover:underline">Filter directory</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/40 text-on-surface-variant">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">College</th>
                      <th className="pb-3 font-medium">Branch</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface">
                    {recentApplicants.map((student, i) => (
                      <tr key={i} className={`hover:bg-white/30 transition-colors ${i !== recentApplicants.length - 1 ? 'border-b border-white/20' : ''}`}>
                        <td className="py-4">
                          <div className="font-semibold text-on-surface">{student.name}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5">{student.completion} completed</div>
                        </td>
                        <td className="py-4">{student.college}</td>
                        <td className="py-4 text-xs">{student.branch}</td>
                        <td className="py-4 text-right">
                          <span className={`inline-block px-2.5 py-1 border rounded-full text-xs font-bold ${student.statusColor} border-current opacity-80`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
