
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Calendar, Wallet, ShoppingCart, Zap, HelpCircle, 
  ArrowLeft, ChevronRight, Moon, Sun, ShieldCheck, ShieldAlert,
  Activity as ActivityIcon, Clock, MapPin, CheckCircle2, QrCode, Key, Users, 
  TrendingUp, Leaf, Smartphone, Package, Info, Trash2, Camera,
  RotateCcw, Gamepad2, Gift, Award, Upload, PieChart, Timer, 
  AlertCircle, Search, Filter, Hammer, MessageSquare, Phone, 
  User as UserIcon, Star, Download, LogOut, X, MousePointer2,
  Sparkles, FlaskConical, BadgeCheck, Microscope, Share2,
  Trophy, Image as ImageIcon, Target, Flame, Globe, Droplets, Lock,
  Plus, Minus, CreditCard, Box, Layout, ArrowUpRight, Layers as LayersIcon
} from 'lucide-react';
import { useApp } from '../../App';
import { JobStatus, Job, SubscriptionTier, SOPItem, UserRole } from '../../types';

// --- CUSTOM INTERNAL ICONS ---
const LuviaGlobeIcon = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20" />
    <path d="M12 2a14.5 14.5 0 0 1 0 20" />
    <path d="M2 12h20" />
  </svg>
);

// --- BUSINESS LOGIC CONSTANTS ---
const POINTS_TO_NAIRA = 0.01; 
const BASE_PRICES = { CLEANING: 15000, TECHNICAL: 25000 };
const SIZE_MULTIPLIERS: Record<string, number> = { 'Small (1-2 Rooms)': 1, 'Medium (3-4 Rooms)': 1.5, 'Large (5+ Rooms)': 2.5, 'Estate': 5 };

const TIER_CONFIGS = {
  [SubscriptionTier.SEEDLING]: { label: 'Seedling', sessions: 1, discount: 0, icon: <Leaf size={20}/>, benefit: "One-off professional deep clean/fix." },
  [SubscriptionTier.SPROUT]: { label: 'Sprout (Bronze)', sessions: 4, discount: 0.1, icon: <Zap size={20}/>, benefit: "1 session/week. 10th is 50% OFF." },
  [SubscriptionTier.SAPLING]: { label: 'Sapling (Silver)', sessions: 8, discount: 0.15, icon: <ActivityIcon size={20}/>, benefit: "2 sessions/week. Priority dispatch." },
  [SubscriptionTier.FOREST]: { label: 'Forest (Gold)', sessions: 12, discount: 0.25, icon: <LuviaGlobeIcon size={20}/>, benefit: "3 sessions/week. 24/7 VIP Access." },
};

const PROGRESSION = [
  { id: 'TRAINEE', label: 'Trainee', min: 0, color: 'text-gray-400' },
  { id: 'APPRENTICE', label: 'Apprentice', min: 1000, color: 'text-luvia-fair-blue' },
  { id: 'SPECIALIST', label: 'Specialist', min: 5000, color: 'text-luvia-rich-blue' },
  { id: 'MASTER', label: 'Master of Clean', min: 15000, color: 'text-luvia-light-green' },
];

export default function ClientDashboard() {
  const { user, theme, toggleTheme, jobs, setJobs, setUser } = useApp();
  const navigate = useNavigate();
  
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'vault' | 'gamification' | 'support' | 'verification' | 'subusers'>('home');
  const [bookingStep, setBookingStep] = useState(1);
  const [gamificationSubTab, setGamificationSubTab] = useState<'dashboard' | 'games' | 'engagement'>('dashboard');
  
  // --- DATA STATE ---
  const [selectedJobForAudit, setSelectedJobForAudit] = useState<Job | null>(null);
  const [showGuestPass, setShowGuestPass] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: 'CLEANING',
    size: 'Small (1-2 Rooms)',
    tier: SubscriptionTier.SEEDLING,
    pointsToUse: 0,
    usePoints: false
  });

  // --- DERIVED LOGIC ---
  const currentPricing = useMemo(() => {
    const base = bookingData.service === 'TECHNICAL' ? BASE_PRICES.TECHNICAL : BASE_PRICES.CLEANING;
    const mult = SIZE_MULTIPLIERS[bookingData.size] || 1;
    const tierCfg = TIER_CONFIGS[bookingData.tier as SubscriptionTier];
    const subtotal = base * mult * tierCfg.sessions * (1 - tierCfg.discount);
    const maxPointsDiscount = (user?.carbonPoints || 0) * POINTS_TO_NAIRA;
    const discount = bookingData.usePoints ? Math.min(subtotal, maxPointsDiscount) : 0;
    const total = Math.max(0, subtotal - discount);
    return { total, released: Math.round(total * 0.7), escrow: Math.round(total * 0.3) };
  }, [bookingData, user]);

  const currentLevel = useMemo(() => {
    const points = user?.carbonPoints || 0;
    return [...PROGRESSION].reverse().find(p => points >= p.min) || PROGRESSION[0];
  }, [user]);

  const levelProgress = useMemo(() => {
    const currentIdx = PROGRESSION.findIndex(p => p.id === currentLevel.id);
    const next = PROGRESSION[currentIdx + 1];
    if (!next) return 100;
    return Math.round(((user?.carbonPoints || 0) - currentLevel.min) / (next.min - currentLevel.min) * 100);
  }, [user, currentLevel]);

  // --- ACTIONS ---
  const handleBookingExecution = () => {
    const newJob: Job = {
      id: `LUV-${Math.floor(Math.random() * 9000 + 1000)}`,
      serviceName: bookingData.service === 'TECHNICAL' ? 'Technical Network' : 'Scientific Janitorial',
      clientName: user?.name || 'Client',
      clientId: user?.id || 'id',
      status: JobStatus.PENDING,
      totalAmount: currentPricing.total,
      releasedAmount: currentPricing.released,
      escrowAmount: currentPricing.escrow,
      date: new Date().toISOString().split('T')[0],
      location: user?.location || 'Port Harcourt',
      type: bookingData.service === 'TECHNICAL' ? 'technical' : 'cleaning',
      sopList: [] 
    };
    setJobs([newJob, ...jobs]);
    if (bookingData.usePoints) {
       const ptsUsed = currentPricing.total / POINTS_TO_NAIRA;
       setUser({ ...user!, carbonPoints: Math.max(0, user!.carbonPoints - ptsUsed) });
    }
    setActiveTab('home');
    setBookingStep(1);
    alert("Project Lodged. System tagging 70% for immediate release and 30% for Trust-Escrow hold.");
  };

  const handleEscrowRelease = (jobId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: JobStatus.VERIFIED } : j));
    setActiveTab('vault');
    setSelectedJobForAudit(null);
    alert("30% Trust Hold Released to Provider. Transaction Finalized.");
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue' : 'bg-luvia-slate'}`}>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 glass border-r dark:border-white/10 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <span className="text-3xl font-heading tracking-widest text-luvia-rich-blue dark:text-luvia-fair-blue">LUVIA</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Command Hub</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'home', icon: <Home size={20}/>, label: 'Control Center' },
            { id: 'booking', icon: <Calendar size={20}/>, label: 'Bookings' },
            { id: 'vault', icon: <Wallet size={20}/>, label: 'LUVIA Vault' },
            { id: 'marketplace', icon: <ShoppingCart size={20}/>, label: 'Marketplace' },
            { id: 'gamification', icon: <Zap size={20}/>, label: 'Gamification' },
            { id: 'support', icon: <HelpCircle size={20}/>, label: 'Support' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'marketplace') navigate('/app/marketplace');
                else setActiveTab(item.id as any);
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-sm transition-all ${
                activeTab === item.id 
                ? 'bg-luvia-rich-blue text-white shadow-lg scale-[1.02]' 
                : 'text-gray-500 hover:bg-white/5 hover:text-luvia-rich-blue dark:hover:text-white'
              }`}
            >
              {item.icon} <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t dark:border-white/10 space-y-4">
          <div className="p-4 bg-luvia-rich-blue/5 dark:bg-white/5 rounded-sm border dark:border-white/10">
             <div className="flex items-center gap-3">
                <Award className="text-luvia-yellow" size={18} />
                <div>
                   <p className="text-[10px] font-bold uppercase dark:text-white">{TIER_CONFIGS[user?.tier || SubscriptionTier.SEEDLING].label}</p>
                   <p className="text-[8px] text-gray-400 font-bold uppercase">{currentLevel.label}</p>
                </div>
             </div>
          </div>
          <button onClick={() => { setUser(null); navigate('/'); }} className="w-full flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase px-4"><LogOut size={16}/> Terminate Session</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative">
        
        {/* 2. HEADER */}
        <header className="sticky top-0 z-40 glass px-8 py-4 flex items-center justify-between border-b dark:border-white/10">
           <div className="flex items-center gap-6">
              {activeTab !== 'home' && (
                <button 
                  onClick={() => setActiveTab('home')}
                  className="p-2 glass rounded-full hover:bg-luvia-rich-blue hover:text-white transition-all group"
                >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
              )}
              <h2 className="text-2xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest">
                {activeTab === 'gamification' ? 'Gamification & S-Points' : activeTab.toUpperCase()}
              </h2>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">S-Points Ledger</span>
                 <span className="text-sm font-bold dark:text-white font-mono">{user?.carbonPoints?.toLocaleString()} SP</span>
              </div>
              <button onClick={toggleTheme} className="p-3 glass rounded-sm dark:text-white hover:scale-110 transition-transform">
                {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
              </button>
           </div>
        </header>

        {/* 3. DYNAMIC TAB CONTENT */}
        <div className="p-8 lg:p-12 overflow-y-auto">
          
          {/* --- HOME: CONTROL CENTER --- */}
          {activeTab === 'home' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-grow pb-20">
               
               {/* Left Column: Live Ops */}
               <div className="lg:col-span-8 space-y-8">
                  <div className="glass p-10 border-t-8 border-luvia-rich-blue space-y-10 bg-white dark:bg-luvia-dark-blue relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 p-4 opacity-5"><ActivityIcon size={150} /></div>
                     <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest">Institutional Oversight</h3>
                     
                     {jobs.filter(j => j.status !== JobStatus.VERIFIED).map(job => {
                        const progress = job.sopList.length > 0 
                           ? Math.round((job.sopList.filter(s => s.isCompleted).length / job.sopList.length) * 100) 
                           : 0;

                        return (
                          <div key={job.id} className="p-8 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 rounded-sm space-y-8 relative">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                   <p className="font-bold text-lg dark:text-white uppercase tracking-tight">{job.serviceName}</p>
                                   <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">HASH: {job.id}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-3 py-1 uppercase rounded-sm ${job.status === JobStatus.COMPLETED ? 'bg-luvia-light-green text-luvia-rich-blue animate-pulse' : 'bg-luvia-yellow text-luvia-dark-blue'}`}>
                                   {job.status}
                                </span>
                             </div>

                             <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                                   <span>Real-time SOP Verification Grid</span>
                                   <span>{progress}% Verified</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                   <div className={`h-full bg-luvia-rich-blue transition-all duration-1000 ${progress === 100 ? 'bg-luvia-light-green' : ''}`} style={{ width: `${progress}%` }}></div>
                                </div>
                             </div>

                             {job.status === JobStatus.COMPLETED && (
                               <button 
                                 onClick={() => { setSelectedJobForAudit(job); setActiveTab('verification'); }}
                                 className="w-full py-5 bg-luvia-rich-blue text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.01] transition-all animate-pulse-yellow"
                               >
                                 <ImageIcon size={18} /> Review Evidence & Release 30% Escrow
                               </button>
                             )}
                          </div>
                        );
                     })}

                     {jobs.filter(j => j.status !== JobStatus.VERIFIED).length === 0 && (
                       <div className="py-20 text-center space-y-6">
                          <Sparkles className="mx-auto text-gray-200" size={80}/>
                          <p className="text-gray-400 uppercase font-bold tracking-[0.3em] text-xs">Biological Baseline Stable</p>
                          <button onClick={() => setActiveTab('booking')} className="px-12 py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">Establish New Session</button>
                       </div>
                     )}
                  </div>

                  {/* Asset Preservation Index */}
                  <div className="glass p-10 space-y-8 bg-white dark:bg-luvia-dark-blue border-l-8 border-luvia-light-green shadow-xl">
                     <div className="flex items-center justify-between">
                        <div>
                           <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest">Asset Appreciation Tracker</h3>
                           <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Maintenance Correlation Index</p>
                        </div>
                        <div className="flex items-center gap-2 text-luvia-light-green font-bold bg-luvia-light-green/10 px-4 py-2 rounded-full">
                           <TrendingUp size={18} /> <span className="text-sm">+18.4% Preservation Value</span>
                        </div>
                     </div>
                     <div className="h-48 w-full flex items-end gap-3 px-2 border-b dark:border-white/5 pb-1">
                        {[40, 45, 55, 60, 80, 85, 95].map((h, i) => (
                           <div key={i} className="flex-1 bg-luvia-rich-blue/20 dark:bg-white/5 rounded-t-sm relative group cursor-pointer hover:bg-luvia-rich-blue transition-all" style={{ height: `${h}%` }}>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-luvia-dark-blue text-white text-[9px] font-bold px-3 py-2 rounded-sm whitespace-nowrap shadow-xl z-20">Cycle {i+1}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Column: AI Health + Keys */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="glass p-8 bg-luvia-dark-blue text-white space-y-8 relative overflow-hidden shadow-2xl border-t-4 border-luvia-yellow">
                     <div className="absolute top-0 right-0 p-4 opacity-10"><Microscope size={120} /></div>
                     <h4 className="text-lg font-heading uppercase tracking-widest text-luvia-fair-blue">Predictive Health Monitor</h4>
                     <div className="space-y-6">
                        {[
                          { label: "Microbial Load (Kitchen)", status: "Critical", color: "text-red-400", val: "1,240 RLU" },
                          { label: "HVAC Efficiency", status: "Optimal", color: "text-luvia-light-green", val: "88% Flow" }
                        ].map((m, i) => (
                          <div key={i} className="p-5 border border-white/10 bg-white/5 rounded-sm space-y-2">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
                                <span>{m.label}</span>
                                <span className={m.color}>{m.status}</span>
                             </div>
                             <p className="text-xl font-bold font-mono tracking-tight">{m.val}</p>
                          </div>
                        ))}
                     </div>
                     <button onClick={() => setActiveTab('booking')} className="w-full py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:bg-white hover:text-luvia-dark-blue transition-all">Remediation Required</button>
                  </div>

                  <div className="glass p-8 space-y-6 bg-white dark:bg-luvia-dark-blue text-center border dark:border-white/5 shadow-xl relative overflow-hidden">
                     <Key size={32} className="mx-auto text-luvia-rich-blue dark:text-luvia-fair-blue" />
                     <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] dark:text-white">Encrypted Service Passes</h4>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Temporary QR for third-party artisans.</p>
                     </div>
                     <button onClick={() => setShowGuestPass(true)} className="w-full py-4 border-2 border-luvia-rich-blue text-luvia-rich-blue dark:text-luvia-fair-blue font-bold uppercase tracking-widest text-[9px] hover:bg-luvia-rich-blue hover:text-white transition-all">Generate Token</button>
                  </div>
               </div>
            </div>
          )}

          {/* --- VERIFICATION PORTAL (TRUST-ESCROW ENGINE) --- */}
          {activeTab === 'verification' && selectedJobForAudit && (
             <div className="max-w-6xl mx-auto space-y-12 animate-grow pb-20">
                <div className="text-center space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-yellow/20 text-luvia-dark-blue dark:text-luvia-yellow text-[10px] font-bold uppercase tracking-widest mb-4 border border-luvia-yellow/30">
                      <ShieldCheck size={14} /> Trust-Escrow Logic Engaged
                   </div>
                   <h3 className="text-5xl font-heading dark:text-white uppercase tracking-widest">Binary Audit Terminal</h3>
                   <p className="text-sm text-gray-500 font-light uppercase tracking-widest">Audit Evidence Grid for Hash: {selectedJobForAudit.id}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-7 space-y-10">
                      <div className="glass p-10 space-y-8 bg-white dark:bg-luvia-dark-blue shadow-2xl">
                         <h4 className="text-xl font-heading dark:text-white uppercase tracking-widest flex items-center gap-3 border-b dark:border-white/10 pb-4"><Camera size={24} className="text-luvia-rich-blue"/> Evidence Proof Log</h4>
                         <div className="grid grid-cols-2 gap-6">
                            {selectedJobForAudit.sopList.filter(s => s.evidenceUrl).map((s, idx) => (
                              <div key={idx} className="space-y-3 group cursor-pointer relative overflow-hidden">
                                 <div className="aspect-video bg-luvia-slate dark:bg-white/5 rounded-sm overflow-hidden border dark:border-white/10 shadow-lg">
                                    <img src={s.evidenceUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                 </div>
                                 <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.task}</p>
                                    <BadgeCheck size={14} className="text-luvia-light-green" />
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-5 space-y-8">
                      <div className="glass p-10 bg-luvia-rich-blue text-white space-y-12 relative overflow-hidden shadow-2xl">
                         <h4 className="text-xl font-heading uppercase tracking-widest relative z-10">Trust Release</h4>
                         
                         <div className="space-y-6 relative z-10">
                            {selectedJobForAudit.sopList.filter(s => s.category === 'Scientific').map((s, idx) => (
                              <div key={idx} className="p-6 bg-white/10 border border-white/20 space-y-2 rounded-sm shadow-inner group hover:bg-white/20 transition-all cursor-default">
                                 <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{s.task}</p>
                                    <ActivityIcon size={16} className="text-luvia-light-green animate-pulse" />
                                 </div>
                                 <p className="text-5xl font-bold font-mono text-luvia-light-green tracking-tighter">
                                    {s.value} <span className="text-sm opacity-50 uppercase font-sans tracking-widest ml-1">{s.unit || 'RLU'}</span>
                                 </p>
                              </div>
                            ))}
                         </div>

                         <div className="space-y-4 pt-8 border-t border-white/10 relative z-10">
                            <div className="flex justify-between items-end mb-4">
                               <div className="space-y-1">
                                  <span className="text-[10px] font-bold uppercase opacity-60 tracking-[0.2em]">Locked Vault Hold</span>
                                  <p className="text-xs font-bold uppercase text-luvia-yellow opacity-80">30% Buffer</p>
                               </div>
                               <span className="text-5xl font-bold font-mono text-luvia-yellow tracking-tighter">₦{selectedJobForAudit.escrowAmount.toLocaleString()}</span>
                            </div>
                            <button 
                              onClick={() => handleEscrowRelease(selectedJobForAudit.id)}
                              className="w-full py-8 bg-luvia-light-green text-luvia-rich-blue font-bold uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-[1.02] transition-all animate-pulse-yellow"
                            >Verify & Release 30% Payment</button>
                            <div className="flex items-center justify-center gap-2 opacity-40">
                               <Lock size={10}/>
                               <p className="text-[8px] text-center uppercase tracking-widest font-bold">256-bit Encrypted Protocol</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* --- BOOKING ENGINE (MULTI-STEP) --- */}
          {activeTab === 'booking' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-grow pb-24">
               <div className="flex items-center justify-center gap-12 mb-12">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${bookingStep === s ? 'bg-luvia-rich-blue text-white border-luvia-rich-blue shadow-lg' : bookingStep > s ? 'bg-luvia-light-green border-luvia-light-green text-white' : 'border-gray-300 dark:border-white/10'}`}>
                          {bookingStep > s ? <CheckCircle2 size={18}/> : s}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="glass p-12 lg:p-16 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
                  <button onClick={() => bookingStep > 1 ? setBookingStep(bookingStep-1) : setActiveTab('home')} className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-luvia-rich-blue transition-all">
                     <ArrowLeft size={16}/> Escape/Return
                  </button>

                  {bookingStep === 1 && (
                    <div className="space-y-10">
                       <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Select Protocol</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { id: 'CLEANING', label: 'Scientific Janitorial', icon: <FlaskConical size={32}/>, desc: 'Medical-grade decontamination.' },
                            { id: 'TECHNICAL', label: 'Technical Network', icon: <Hammer size={32}/>, desc: 'Escrow-backed artisan care.' }
                          ].map(opt => (
                            <button key={opt.id} onClick={() => { setBookingData({...bookingData, service: opt.id}); setBookingStep(2); }} className={`p-10 border-2 text-left space-y-4 group transition-all ${bookingData.service === opt.id ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-fair-blue'}`}>
                               <div className={`w-14 h-14 rounded-sm flex items-center justify-center ${bookingData.service === opt.id ? 'bg-luvia-rich-blue text-white' : 'bg-luvia-slate dark:bg-white/10 text-gray-400 group-hover:text-luvia-rich-blue transition-colors'}`}>{opt.icon}</div>
                               <p className="font-bold dark:text-white uppercase tracking-widest">{opt.label}</p>
                               <p className="text-[10px] text-gray-500 uppercase font-bold">{opt.desc}</p>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-10">
                       <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Scale & Frequency</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(TIER_CONFIGS).map(([key, cfg]) => (
                            <button key={key} onClick={() => { setBookingData({...bookingData, tier: key as SubscriptionTier}); setBookingStep(3); }} className={`p-8 border-2 text-left space-y-4 group transition-all ${bookingData.tier === key ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-fair-blue'}`}>
                               <div className="flex justify-between items-start">
                                  <div className={`w-12 h-12 flex items-center justify-center rounded-sm ${bookingData.tier === key ? 'bg-luvia-rich-blue text-white' : 'bg-luvia-slate dark:bg-white/10'}`}>{cfg.icon}</div>
                                  <span className="text-[10px] font-bold text-luvia-rich-blue uppercase">{cfg.sessions} Sessions</span>
                               </div>
                               <p className="font-bold dark:text-white uppercase tracking-widest">{cfg.label} Tier</p>
                               <p className="text-[9px] text-gray-500 font-bold uppercase">{cfg.benefit}</p>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-10">
                       <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Property Matrix</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.keys(SIZE_MULTIPLIERS).map(size => (
                            <button key={size} onClick={() => { setBookingData({...bookingData, size}); setBookingStep(4); }} className={`p-8 border-2 text-left space-y-2 group transition-all ${bookingData.size === size ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-fair-blue'}`}>
                               <p className="font-bold dark:text-white uppercase tracking-widest text-sm">{size}</p>
                               <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Pricing Factor: x{SIZE_MULTIPLIERS[size]}</p>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {bookingStep === 4 && (
                    <div className="space-y-10">
                       <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Financial Audit</h3>
                       <div className="p-10 border-2 border-luvia-rich-blue bg-luvia-rich-blue/5 space-y-10 rounded-sm shadow-inner">
                          <div className="flex justify-between items-end border-b dark:border-white/10 pb-8">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Allocation</p>
                                <p className="text-6xl font-bold dark:text-white font-mono tracking-tighter">₦{currentPricing.total.toLocaleString()}</p>
                             </div>
                             <div className="text-right space-y-2">
                                <div className="inline-block px-4 py-2 bg-luvia-yellow text-luvia-dark-blue text-[10px] font-bold uppercase tracking-widest shadow-lg">70/30 Trust Split Active</div>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-12">
                             <div className="space-y-2">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Start Payout (70%)</p>
                                <p className="text-3xl font-bold text-luvia-light-green font-mono">₦{currentPricing.released.toLocaleString()}</p>
                                <p className="text-[9px] text-gray-500 uppercase">Released on-site initiation.</p>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Project Escrow (30%)</p>
                                <p className="text-3xl font-bold text-luvia-yellow font-mono">₦{currentPricing.escrow.toLocaleString()}</p>
                                <p className="text-[9px] text-gray-500 uppercase">Locked until SOP approval.</p>
                             </div>
                          </div>

                          <div className="pt-6 border-t dark:border-white/10 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <button onClick={() => setBookingData({...bookingData, usePoints: !bookingData.usePoints})} className={`w-12 h-6 rounded-full relative transition-all ${bookingData.usePoints ? 'bg-luvia-light-green' : 'bg-gray-300'}`}>
                                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${bookingData.usePoints ? 'left-7' : 'left-1'}`}></div>
                                </button>
                                <span className="text-xs font-bold uppercase dark:text-white">Use S-Points to Pay?</span>
                             </div>
                             <p className="text-sm font-bold text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest">Balance: {user?.carbonPoints} SP</p>
                          </div>
                       </div>
                       
                       <div className="text-center space-y-4">
                          <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">Mock Integration: Paystack/Flutterwave</p>
                          <button onClick={handleBookingExecution} className="w-full py-8 bg-luvia-rich-blue text-white font-bold uppercase tracking-[0.3em] text-sm shadow-2xl hover:scale-[1.01] transition-all">Execute Secured Transaction</button>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* --- VAULT (FINTECH VIEW) --- */}
          {activeTab === 'vault' && (
            <div className="max-w-7xl mx-auto space-y-12 animate-grow pb-24">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass p-12 space-y-4 border-t-8 border-luvia-rich-blue bg-white dark:bg-luvia-dark-blue relative overflow-hidden shadow-2xl">
                     <div className="absolute right-0 top-0 p-4 opacity-5"><TrendingUp size={100}/></div>
                     <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Lifecycle Investment</p>
                     <p className="text-5xl font-bold dark:text-white font-mono tracking-tighter">₦284,330</p>
                     <div className="flex items-center gap-2 text-luvia-light-green text-[10px] font-bold uppercase">
                        <ArrowUpRight size={14}/> +12% Efficiency
                     </div>
                  </div>
                  <div className="glass p-12 space-y-4 border-t-8 border-luvia-yellow bg-white dark:bg-luvia-dark-blue shadow-2xl relative overflow-hidden">
                     <div className="absolute right-0 top-0 p-4 opacity-5"><ShieldCheck size={100}/></div>
                     <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Active Project Escrow</p>
                     <p className="text-5xl font-bold text-luvia-yellow font-mono tracking-tighter">₦{jobs.filter(j => j.status !== JobStatus.VERIFIED).reduce((a,c) => a + c.escrowAmount, 0).toLocaleString()}</p>
                     <div className="flex items-center gap-2 text-luvia-yellow text-[10px] font-bold uppercase">
                        <Lock size={12}/> Systematic Lock Active
                     </div>
                  </div>
                  <div className="glass p-12 space-y-4 border-t-8 border-luvia-light-green bg-white dark:bg-luvia-dark-blue shadow-2xl relative overflow-hidden">
                     <div className="absolute right-0 top-0 p-4 opacity-5"><Leaf size={100}/></div>
                     <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">S-Point Naira Value</p>
                     <p className="text-5xl font-bold text-luvia-light-green font-mono tracking-tighter">₦{((user?.carbonPoints || 0) * POINTS_TO_NAIRA).toLocaleString()}</p>
                     <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Rate: 100 SP = ₦1</p>
                  </div>
               </div>

               <div className="glass p-10 bg-white dark:bg-luvia-dark-blue overflow-hidden shadow-2xl border dark:border-white/5">
                  <div className="flex items-center justify-between border-b dark:border-white/10 pb-8 mb-6">
                     <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest">Audited Archive</h3>
                     <div className="flex gap-4">
                        <button className="p-3 glass rounded-sm"><Filter size={18}/></button>
                        <button className="flex items-center gap-3 px-8 py-3 border dark:border-white/10 text-[10px] font-bold uppercase tracking-widest dark:text-white hover:bg-luvia-rich-blue hover:text-white transition-all shadow-lg">
                           <Download size={14}/> Export Invoices (PDF)
                        </button>
                     </div>
                  </div>
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/5">
                           <th className="py-6">Timestamp</th>
                           <th className="py-6">Logic Chain</th>
                           <th className="py-6">Trust Split (70/30)</th>
                           <th className="py-6 text-right">Investment Total</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y dark:divide-white/5">
                        {jobs.map((job, i) => (
                          <tr key={i} className="hover:bg-luvia-slate dark:hover:bg-white/5 transition-colors group border-b dark:border-white/5 cursor-pointer">
                             <td className="py-6 text-[12px] font-mono dark:text-gray-400">{job.date}</td>
                             <td className="py-6 text-[12px] font-bold uppercase tracking-widest dark:text-white">{job.serviceName}</td>
                             <td className="py-6">
                                <div className="flex gap-4 text-[10px] font-bold uppercase">
                                   <span className="text-luvia-light-green">₦{job.releasedAmount.toLocaleString()} (Rel.)</span>
                                   <span className="text-luvia-yellow">₦{job.escrowAmount.toLocaleString()} (Vault)</span>
                                </div>
                             </td>
                             <td className="py-6 text-[13px] font-bold dark:text-white text-right font-mono tracking-tight">₦{job.totalAmount.toLocaleString()}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* --- GAMIFICATION HUB (S-POINTS ENGINE) --- */}
          {activeTab === 'gamification' && (
            <div className="max-w-7xl mx-auto space-y-12 animate-grow pb-24">
               <div className="flex gap-10 border-b dark:border-white/10 pb-4 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'dashboard', label: 'Impact Dashboard', icon: <PieChart size={14}/> },
                    { id: 'games', label: 'The Games Center', icon: <Gamepad2 size={14}/> },
                    { id: 'engagement', label: 'High-Level Rewards', icon: <Trophy size={14}/> }
                  ].map(t => (
                    <button key={t.id} onClick={() => setGamificationSubTab(t.id as any)} className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all relative py-2 ${gamificationSubTab === t.id ? 'text-luvia-rich-blue dark:text-luvia-fair-blue' : 'text-gray-400'}`}>
                      {t.icon} {t.label}
                      {gamificationSubTab === t.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-luvia-rich-blue dark:bg-luvia-fair-blue animate-grow" />}
                    </button>
                  ))}
               </div>

               {gamificationSubTab === 'dashboard' && (
                 <div className="space-y-12 animate-grow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                       <div className="lg:col-span-4 glass p-12 text-center bg-luvia-dark-blue text-white space-y-6 shadow-2xl relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10"><Microscope size={200}/></div>
                          <div className="relative z-10 space-y-6">
                             <div className="w-40 h-40 mx-auto rounded-full border-8 border-luvia-light-green flex items-center justify-center relative">
                                <p className="text-4xl font-heading tracking-tighter">428.5</p>
                                <div className="absolute -bottom-2 bg-luvia-light-green text-luvia-rich-blue px-3 py-1 text-[10px] font-bold uppercase rounded-sm">kg Offset</div>
                             </div>
                             <h4 className="text-2xl font-heading uppercase tracking-widest">Biological Impact</h4>
                             <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Institutional Carbon Tracking Engaged.</p>
                          </div>
                       </div>
                       <div className="lg:col-span-8 glass p-12 space-y-10 bg-white dark:bg-white/5 border-t-8 border-luvia-rich-blue shadow-2xl">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <h4 className="text-4xl font-heading dark:text-white uppercase tracking-widest">{currentLevel.label}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Institutional Standing</p>
                             </div>
                             <p className="text-sm font-bold dark:text-white uppercase font-mono">{user?.carbonPoints?.toLocaleString()} / 15,000 SP</p>
                          </div>
                          <div className="h-6 w-full bg-luvia-slate dark:bg-white/10 rounded-full overflow-hidden p-1 shadow-inner border dark:border-white/5">
                             <div className="h-full bg-luvia-rich-blue rounded-full transition-all duration-[2s]" style={{ width: `${levelProgress}%` }}></div>
                          </div>
                          <div className="grid grid-cols-3 gap-6 pt-4">
                             {[
                               { label: 'Toxic Liters Avoided', val: '84.2L', icon: <Droplets className="text-blue-400"/> },
                               { label: 'Clean Streak', val: '5 Days', icon: <Flame className="text-orange-500"/> },
                               { label: 'Marketplace Credits', val: `₦${((user?.carbonPoints || 0) * POINTS_TO_NAIRA).toLocaleString()}`, icon: <Gift className="text-luvia-yellow"/> }
                             ].map((s, i) => (
                               <div key={i} className="text-center space-y-2">
                                  <div className="w-10 h-10 mx-auto glass flex items-center justify-center rounded-sm">{s.icon}</div>
                                  <p className="text-[9px] font-bold text-gray-400 uppercase">{s.label}</p>
                                  <p className="text-lg font-bold dark:text-white font-mono">{s.val}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-xl font-heading dark:text-white uppercase tracking-widest">Marketplace Fast-Track</h4>
                       <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                          {[
                            { name: 'Bio-Clean Refill', pts: '450 SP', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300' },
                            { name: 'HEPA Filter X1', pts: '1,200 SP', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
                            { name: 'Eco-Fragrance', pts: '300 SP', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300' },
                            { name: 'Surface Guard', pts: '800 SP', img: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=300' }
                          ].map((p, i) => (
                            <div key={i} className="min-w-[180px] glass p-4 space-y-3 bg-white dark:bg-white/5 hover:border-luvia-fair-blue transition-all cursor-pointer group">
                               <div className="aspect-square bg-luvia-slate dark:bg-white/10 rounded-sm overflow-hidden border dark:border-white/10">
                                  <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                               </div>
                               <p className="text-[10px] font-bold dark:text-white uppercase truncate">{p.name}</p>
                               <button className="w-full py-2 bg-luvia-rich-blue text-white text-[9px] font-bold uppercase tracking-widest">{p.pts}</button>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               )}

               {gamificationSubTab === 'games' && (
                 <div className="space-y-12 animate-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {[
                         { title: "Waste Sorter Mini-Game", icon: <LayersIcon />, desc: "Drag & Drop items into correct bins.", reward: "5% Discount Token" },
                         { title: "Pick-a-Litter Snap", icon: <Camera />, desc: "Before & After AI Validation.", reward: "+200 SP" },
                         { title: "Clean Streak Calendar", icon: <Calendar />, desc: "Check off 5-min daily tasks.", reward: "Badge of Honor" },
                         { title: "Virtual Room Deep Clean", icon: <Layout />, desc: "2D Drag-and-drop clinical restoration.", reward: "+50 SP" },
                         { title: "Smart Tracker Watcher", icon: <ActivityIcon />, desc: "Watch live pro for >2 mins.", reward: "+10 SP" },
                         { title: "QR Hunt", icon: <QrCode />, desc: "Scanner UI for hidden digital eggs.", reward: "Mystery Reward" }
                       ].map((game, i) => (
                         <div key={i} className="glass p-10 space-y-6 bg-white dark:bg-white/5 border-l-4 border-luvia-fair-blue group hover:border-luvia-rich-blue transition-all shadow-xl">
                            <div className="w-12 h-12 bg-luvia-slate dark:bg-white/10 flex items-center justify-center rounded-sm text-luvia-rich-blue dark:text-luvia-fair-blue group-hover:bg-luvia-rich-blue group-hover:text-white transition-all shadow-md">
                               {game.icon}
                            </div>
                            <div className="space-y-2">
                               <h4 className="text-xl font-heading dark:text-white uppercase tracking-tight leading-tight">{game.title}</h4>
                               <p className="text-xs text-gray-500 leading-relaxed">{game.desc}</p>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t dark:border-white/5">
                               <span className="text-[10px] font-bold text-luvia-light-green uppercase">{game.reward}</span>
                               <button className="p-3 bg-luvia-rich-blue text-white rounded-sm shadow-xl hover:scale-110 transition-transform"><Plus size={18}/></button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* --- SUPPORT CONCIERGE --- */}
          {activeTab === 'support' && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-grow pb-24">
               <div className="lg:col-span-8 space-y-12">
                  <div className="relative group shadow-2xl">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-luvia-rich-blue transition-colors" size={24} />
                     <input type="text" placeholder="Search Master Artisan Directory (Plumbers, AC Techs)..." className="w-full pl-16 pr-8 py-8 glass dark:bg-white/5 border-2 border-luvia-fair-blue/20 rounded-sm outline-none focus:border-luvia-rich-blue transition-all text-sm font-medium" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                       { id: 'f1', name: 'Tunde Bakare', spec: 'Master Plumber', score: 98, jobs: 142 },
                       { id: 'f2', name: 'Grace Amadi', spec: 'HVAC Specialist', score: 95, jobs: 89 }
                     ].map(fixer => (
                       <div key={fixer.id} className="glass p-10 flex flex-col justify-between group hover:border-luvia-rich-blue transition-all bg-white dark:bg-white/5 shadow-xl">
                          <div className="flex items-center gap-6 mb-8">
                             <div className="w-20 h-20 bg-luvia-rich-blue text-white rounded-sm flex items-center justify-center font-heading text-3xl shadow-2xl">{fixer.name.charAt(0)}</div>
                             <div>
                                <h4 className="text-xl font-bold uppercase tracking-tight dark:text-white">{fixer.name}</h4>
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{fixer.spec}</p>
                                <div className="flex items-center gap-2 mt-3">
                                   <div className="flex gap-1 text-luvia-yellow"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                                   <span className="text-[10px] font-bold text-gray-400 uppercase">{fixer.jobs} Verified Ops</span>
                                </div>
                             </div>
                          </div>
                          <button className="w-full py-4 bg-luvia-slate dark:bg-white/10 text-luvia-rich-blue dark:text-white text-[11px] font-bold uppercase tracking-widest hover:bg-luvia-rich-blue hover:text-white transition-all shadow-inner">Direct Hub Dispatch</button>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="lg:col-span-4 space-y-8">
                  <div className="glass p-12 bg-luvia-rich-blue text-white space-y-8 relative overflow-hidden shadow-2xl">
                     <div className="absolute -top-12 -right-12 opacity-10"><MessageSquare size={200}/></div>
                     <h4 className="text-3xl font-heading uppercase tracking-widest relative z-10">LUVIA Concierge</h4>
                     <p className="text-sm font-light leading-relaxed opacity-70 relative z-10">Human intervention required? Connect with a Technical Manager in Port Harcourt.</p>
                     <button onClick={() => window.open('https://wa.me/2349022861230', '_blank')} className="w-full py-6 bg-luvia-fair-blue text-luvia-dark-blue font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 relative z-10 shadow-2xl hover:scale-105 transition-all">
                        <Phone size={20}/> Live WhatsApp Support
                     </button>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* --- OVERLAYS --- */}
        {showGuestPass && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
             <div className="absolute inset-0 bg-luvia-dark-blue/95 backdrop-blur-2xl" onClick={() => setShowGuestPass(false)}></div>
             <div className="relative glass bg-white p-16 max-w-sm w-full text-center space-y-10 rounded-sm animate-grow border-4 border-luvia-rich-blue shadow-[0_0_100px_rgba(0,51,102,0.4)]">
                <QrCode size={180} className="mx-auto text-luvia-rich-blue" />
                <div className="space-y-4">
                  <h3 className="text-3xl font-heading text-luvia-rich-blue uppercase tracking-widest">Institutional Key</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Valid for 24 Hours • PH Hub GRA-2</p>
                </div>
                <button onClick={() => setShowGuestPass(false)} className="w-full py-5 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-luvia-dark-blue transition-all">Dispatch to Operator</button>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
