"use client"

import {
  Bell,
  Plus,
  Sparkles,
  Mic,
  Send,
  FileText,
  FolderOpen,
  Shapes,
  Archive,
  ArrowBigUp,
  MoreVertical,
  Check,
  ClipboardList,
  RefreshCw,
  ChevronRight,
  HelpCircle,
  Folder,
} from "lucide-react"

import { useState } from 'react'
import TypingText from '@/components/TypingText'

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar Implementation (Collapsible) */}

      {/* TopAppBar Implementation (Shifted) */}
      

      {/* Main Content (Shifted) */}
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Hero Section */}
          <section className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-on-surface mb-4 animate-fadeInUp min-h-[1.2em]">
              <TypingText
                phrases={[
                  'Welcome back, Alex.',
                  'Analyze contracts with AI.',
                  'Generate legal documents.',
                  'Manage your workflows.'
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseTime={2200}
              />
            </h1>
            <p className="text-[#615e59] text-lg mb-10 leading-relaxed animate-fadeInUp animation-delay-100">
              Your archive is synchronized and up to date.
            </p>
            <div className="relative group animate-fadeInUp animation-delay-200">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary-container/10 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-surface-container-lowest shadow-[0px_12px_32px_rgba(29,28,22,0.06)] rounded-2xl p-2 transition-all border border-outline-variant/10 focus-within:border-primary/30 focus-within:shadow-[0px_12px_32px_rgba(153,70,42,0.08)]">
                <span className="material-symbols-outlined ml-4 text-primary"><Sparkles className="text-primary" /></span>
                <input className="flex-1 border-none outline-none bg-transparent py-4 px-4 text-lg placeholder:text-[#615e59]/40" placeholder="Ask me to generate a contract or find a document..." type="text"/>
                <div className="flex items-center gap-2 mr-1">
                  <button className="p-3 rounded-xl text-primary hover:bg-primary/5 transition-colors flex items-center justify-center" title="Voice input">
                    <span className="material-symbols-outlined"><Mic /></span>
                  </button>
                  <button className="bg-primary text-white p-3 rounded-xl font-semibold flex items-center justify-center hover:bg-[#7a2f15] transition-colors" title="Send">
                    <span className="material-symbols-outlined"><ArrowBigUp /></span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 rounded-xl bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer animate-scaleIn animation-delay-300 hover:scale-105">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><FileText /></span>
                </div>
                <h3 className="font-bold text-lg mb-2">Generate Document</h3>
                <p className="text-[#615e59] text-sm leading-relaxed">Create AI-drafted contracts in seconds.</p>
              </div>
              <div className="group p-8 rounded-xl bg-surface-container-lowest border border-outline-variant/5 hover:border-[#006b5f]/20 hover:shadow-lg transition-all duration-300 cursor-pointer animate-scaleIn animation-delay-400 hover:scale-105">
                <div className="w-12 h-12 rounded-lg bg-[#006b5f]/5 flex items-center justify-center text-[#006b5f] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><FolderOpen /></span>
                </div>
                <h3 className="font-bold text-lg mb-2">View Folders</h3>
                <p className="text-[#615e59] text-sm leading-relaxed">Organize and navigate your legal library.</p>
              </div>
              <div className="group p-8 rounded-xl bg-surface-container-lowest border border-outline-variant/5 hover:border-[#7a2f15]/20 hover:shadow-lg transition-all duration-300 cursor-pointer animate-scaleIn animation-delay-500 hover:scale-105">
                <div className="w-12 h-12 rounded-lg bg-[#7a2f15]/5 flex items-center justify-center text-[#7a2f15] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><Shapes /></span>
                </div>
                <h3 className="font-bold text-lg mb-2">Create Template</h3>
                <p className="text-[#615e59] text-sm leading-relaxed">Build reusable modular clause sets.</p>
              </div>
              <div className="group p-8 rounded-xl bg-surface-container-lowest border border-outline-variant/5 hover:border-[#615e59]/20 hover:shadow-lg transition-all duration-300 cursor-pointer animate-scaleIn animation-delay-600 hover:scale-105">
                <div className="w-12 h-12 rounded-lg bg-[#615e59]/5 flex items-center justify-center text-[#615e59] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><Archive /></span>
                </div>
                <h3 className="font-bold text-lg mb-2">Client Archive</h3>
                <p className="text-[#615e59] text-sm leading-relaxed">Secure historical document storage.</p>
              </div>
            </div>
          </section>

          {/* Recent Folders (Now in a single large card) */}
          <section className="mb-12">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm animate-fadeInUp animation-delay-400">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary"><Folder /></span>
                  Recent Folders
                </h2>
                <button className="text-primary text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TechCorp Card */}
                <div className="group relative bg-surface p-5 rounded-2xl border border-outline-variant/5 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl"><Folder /></span>
                      </div>
                      <span className="material-symbols-outlined text-[#615e59]/30 group-hover:text-primary transition-colors"><MoreVertical /></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">TechCorp Q3 Audits</h4>
                      <div className="flex items-center gap-2 text-[#615e59]">
                        <span className="text-[11px] font-medium">124 items</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="text-[11px] font-medium">Modified 2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Global Logistics Card */}
                <div className="group relative bg-surface p-5 rounded-2xl border border-outline-variant/5 hover:border-[#006b5f]/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#006b5f]/5 flex items-center justify-center text-[#006b5f] group-hover:bg-[#006b5f] group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl"><Folder /></span>
                      </div>
                      <span className="material-symbols-outlined text-[#615e59]/30 group-hover:text-[#006b5f] transition-colors"><MoreVertical /></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-1 group-hover:text-[#006b5f] transition-colors">Global Logistics NDA Master</h4>
                      <div className="flex items-center gap-2 text-[#615e59]">
                        <span className="text-[11px] font-medium">48 items</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="text-[11px] font-medium">Modified 5h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Personal Research Card */}
                <div className="group relative bg-surface p-5 rounded-2xl border border-outline-variant/5 hover:border-[#615e59]/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#615e59]/10 flex items-center justify-center text-[#615e59] group-hover:bg-[#615e59] group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl"><Folder /></span>
                      </div>
                      <span className="material-symbols-outlined text-[#615e59]/30 group-hover:text-[#615e59] transition-colors"><MoreVertical /></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-1 group-hover:text-[#615e59] transition-colors">Personal Research Papers</h4>
                      <div className="flex items-center gap-2 text-[#615e59]">
                        <span className="text-[11px] font-medium">215 items</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="text-[11px] font-medium">Modified yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modular Widgets Layout */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Tasks */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm h-full animate-fadeInUp animation-delay-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary"><Check /></span>
                  Tasks
                </h2>
                <button className="text-primary text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors group">
                  <button className="w-6 h-6 rounded-md border-2 border-outline-variant flex items-center justify-center mr-4 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[0px] group-hover:text-[16px] text-primary"><Check /></span>
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold">Review NDA</p>
                    <p className="text-xs text-[#615e59]">TechCorp Solutions • Due Today</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container text-[10px] font-bold uppercase tracking-wider">High Priority</span>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors group">
                  <button className="w-6 h-6 rounded-md border-2 border-outline-variant flex items-center justify-center mr-4 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[0px] group-hover:text-[16px] text-primary"><Check /></span>
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold">Update Client File</p>
                    <p className="text-xs text-[#615e59]">Venture Capital Partners • Due in 2 days</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">Internal</span>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors group border-l-4 border-primary">
                  <button className="w-6 h-6 rounded-md border-2 border-outline-variant flex items-center justify-center mr-4 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[0px] group-hover:text-[16px] text-primary"><Check /></span>
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold">Sign Master Agreement</p>
                    <p className="text-xs text-[#615e59]">Global Logistics Ltd • Awaiting Signature</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-tertiary-container/20 text-tertiary text-[10px] font-bold uppercase tracking-wider">Action Required</span>
                </div>
              </div>
            </div>
            {/* Right Column: Recent Processes */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm h-full animate-fadeInUp animation-delay-600">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#615e59]"><RefreshCw /></span>
                  Recent Processes
                </h2>
                <button className="text-primary text-sm font-semibold hover:underline">History</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl border border-outline-variant/10 hover:bg-surface transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl"><FileText /></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">Contract Review - Apex Corp</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1.5 w-16 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-3/4"></div>
                      </div>
                      <span className="text-[10px] text-[#615e59] font-medium uppercase tracking-tighter">75% Complete</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#615e59]/40 text-lg group-hover:text-primary transition-colors"><ChevronRight /></span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl border border-outline-variant/10 hover:bg-surface transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#006b5f]/5 flex items-center justify-center text-[#006b5f]">
                    <span className="material-symbols-outlined text-xl"><FileText /></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">NDA Generation - Project Zenith</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1.5 w-16 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-[#006b5f] w-full"></div>
                      </div>
                      <span className="text-[10px] text-[#006b5f] font-bold uppercase tracking-tighter">Finalized</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#615e59]/40 text-lg group-hover:text-[#006b5f] transition-colors"><ChevronRight /></span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Contextual Floating Utility */}
      <div className="fixed bottom-8 right-8 z-50 animate-scaleIn animation-delay-700">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden animate-pulse-subtle">
          <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300"><HelpCircle className="w-6 h-6" /></span>
        </button>
      </div>
    </div>
  )
}
