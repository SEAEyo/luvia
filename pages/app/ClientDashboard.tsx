import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Calendar, Wallet, ShoppingCart, Zap, HelpCircle, 
  ArrowLeft, ChevronRight, Moon, Sun, ShieldCheck, ShieldAlert,
  Activity, Clock, MapPin, CheckCircle2, QrCode, Key, Users, 
  TrendingUp, Leaf, Smartphone, Package, Info, Trash2, Camera,
  RotateCcw, Gamepad2, Gift, Award, Upload, PieChart, Timer, 
  AlertCircle, Search, Filter, Hammer, MessageSquare, Phone, 
  User as UserIcon, Star, Download, LogOut, X, MousePointer2,
  Sparkles, FlaskConical, BadgeCheck, Microscope, Share2,
  Trophy, Image as ImageIcon, Target, Flame, Globe, Droplets, Lock,
  Plus, Minus, CreditCard, Box, Layout, ArrowUpRight, Layers, PenTool
} from 'lucide-react';
import { useApp } from '../../App';
import { JobStatus, Job, SubscriptionTier, SOPItem, UserRole } from '../../types';

// --- CONSTANTS ---
const SP_CONVERSION = 0.01; // 100 SP = 1 Naira
const TIER_DATA = {
  [SubscriptionTier.SEEDLING]: { label: 'Seedling (One-Off)', icon: <Leaf size={16}/>, sessions: 1, discount: 0, desc: "Single professional deep clean or fix." },
  [SubscriptionTier.SPROUT]: { label: 'Sprout (Bronze)', icon: <Zap size={16}/>, sessions: 4, discount: 0.1, desc: "1 session/week. 10th session is 50% OFF." },
  [SubscriptionTier.SAPLING]: { label: 'Sapling (Silver)', icon: <Activity size={16}/>, sessions: 8, discount: 0.15, desc: "2 sessions/week. Priority dispatch." },
  [SubscriptionTier.FOREST]: { label: 'Forest (Gold)', icon: <Globe size={16}/>, sessions: 12, discount: 0.25, desc: "3 sessions/week. 24/7 VIP Access." },
};

export default function ClientDashboard() {
  const { user, theme, toggleTheme, jobs, setJobs, setUser } = useApp();
  const navigate = useNavigate();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'vault' | 'gamification' | 'support' | 'verification'>('home');
  const [bookingStep, setBookingStep] = useState(1);
  const [gamificationSubTab, setGamificationSubTab] = useState<'dashboard' | 'games' | 'engagement'>('dashboard');
  const [gamesCategory, setGamesCategory] = useState<'eco' | 'habit' | 'tech'>('eco');

  // Booking Engine State
  const [bookingData, setBookingData] = useState({
    service: 'CLEANING',
    tier: SubscriptionTier.SEEDLING,
    size: 'Medium (3-4 Rooms)',
    usePoints: false
  });

  // Escrow Engine State
  const [selectedJobForAudit, setSelectedJobForAudit] = useState<Job | null>(null);

  // --- LOGIC ---
  const currentPricing = useMemo(() => {
    const base = bookingData.service === 'TECHNICAL' ? 25000 : 15000;
    const sizeMult = bookingData.size.includes('Small') ? 0.8 : bookingData.size.includes('Large') ? 1.5 : 1.0;
    const tier = TIER_DATA[bookingData.tier as SubscriptionTier];
    const subtotal = base * tier.sessions * sizeMult * (1 - tier.discount);
    const pointsValue = bookingData.usePoints ? (user?.carbonPoints || 0) * SP_CONVERSION : 0;
    const total = Math.max(0, subtotal - pointsValue);
    return { total, released: total * 0.7, escrow: total * 0.3 };
  }, [bookingData, user]);

  const handleBookingExecution = () => {
    const newJob: Job = {
      id: `LUV-${Math.floor(Math.random() * 9000 + 1000)}`,
      serviceName: bookingData.service === 'TECHNICAL' ? 'Technical Network Intervention' : 'Scientific Janitorial Restoration',
      clientName: user?.name || 'Client',
      clientId: user?.id || '',
      status: JobStatus.PENDING,
      totalAmount: currentPricing.total,
      releasedAmount: currentPricing.released,
      escrowAmount: currentPricing.escrow,
      date: new Date().toISOString().split('T')[0],
      location: user?.location || 'Port Harcourt',
      type: bookingData.service === 'TECHNICAL' ? 'technical' : 'cleaning',
      sopList: [
        { id: 's1', task: 'ATP Baseline Test', category: 'Scientific', isCompleted: false, isMandatory: true, description: 'Microbial load verification.' },
        { id: 's2', task: 'Macro Evidence: Faucets & Key Surfaces', category: 'Evidence', isCompleted: false, isMandatory: true, description: 'Photo proof of restoration.' }
      ]
    };
    setJobs([newJob, ...jobs]);
    if (bookingData.usePoints) setUser({ ...user!, carbonPoints: 0 });
    setActiveTab('home');
    setBookingStep(1);
    alert("Project Lodged. 70% Released to Pro, 30% locked in LUVIA Trust-Escrow.");
  };

  const handleEscrowRelease = (jobId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: JobStatus.VERIFIED } : j));
    setActiveTab('vault');
    setSelectedJobForAudit(null);
    alert("30% Project Escrow Released to Provider. Transaction Finalized.");
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue text-white' : 'bg-luvia-slate text-luvia-dark-blue'}`}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 glass border-r dark:border-white/10 hidden lg:flex flex-col fixed h-full z-[60]">
        <div className="p-8">
          <span className="text-3xl font-heading tracking-widest text-luvia-rich-blue dark:text-luvia-fair-blue">LUVIA</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Institutional Hub</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'home', icon: <Home size={18}/>, label: 'Control Center' },
            { id: 'booking', icon: <Calendar size={18}/>, label: 'Bookings' },
            { id: 'vault', icon: <Wallet size={18}/>, label: 'LUVIA Vault' },
            { id: 'marketplace', icon: <ShoppingCart size={18}/>, label: 'Marketplace' },
            { id: 'gamification', icon: <Zap size={18}/>, label: 'Gamification' },
            { id: 'support', icon: <HelpCircle size={18}/>, label: 'Support' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === 'marketplace' ? navigate('/app/marketplace') : setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all ${
                activeTab === item.id 
                ? 'bg-luvia-rich-blue text-white shadow-xl scale-[1.02]' 
                : 'text-gray-500 hover:text-luvia-rich-blue dark:hover:text-white'
              }`}
            >
              {item.icon} <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t dark:border-white/10">
          <div className="flex items-center gap-3 mb-6 px-2">
             <div className="w-10 h-10 bg-luvia-rich-blue rounded-full flex items-center justify-center text-white font-bold">{user?.name?.charAt(0)}</div>
             <div>
                <p className="text-xs font-bold uppercase">{user?.name}</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{user?.level}</p>
             </div>
          </div>
          <button onClick={() => { setUser(null); navigate('/'); }} className="w-full py-4 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Log Out</button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[55] glass px-8 py-4 flex items-center justify-between border-b dark:border-white/10">
          <div className="flex items-center gap-6">
            {activeTab !== 'home' && (
              <button onClick={() => setActiveTab('home')} className="p-2 glass rounded-full hover:bg-luvia-rich-blue hover:text-white transition-all">
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-2xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest leading-none">
              {activeTab === 'gamification' ? 'Gamification & S-Points' : activeTab.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">S-Point Ledger</p>
              <p className="text-sm font-bold font-mono text-luvia-rich-blue dark:text-white">{user?.carbonPoints?.toLocaleString()} SP</p>
            </div>
            <button onClick={toggleTheme} className="p-3 glass rounded-sm dark:text-white hover:scale-110 transition-transform">
              {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
            </button>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA */}
        <div className="p-8 lg:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* --- HOME: CONTROL CENTER --- */}
            {activeTab === 'home' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="glass p-10 border-t-8 border-luvia-rich-blue space-y-10 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck size={200}/></div>
                      <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest leading-none">Institutional Oversight</h3>
                      
                      {jobs.filter(j => j.status !== JobStatus.VERIFIED).map(job => (
                        <div key={job.id} className="p-8 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 rounded-sm space-y-8">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="text-xl font-bold uppercase dark:text-white">{job.serviceName}</h4>
                                <p className="text-[10px] text-gray-400 font-bold font-mono uppercase tracking-widest">Hash ID: {job.id}</p>
                              </div>
                              <span className={`px-4 py-1 text-[10px] font-bold uppercase rounded-sm ${job.status === JobStatus.COMPLETED ? 'bg-luvia-light-green text-luvia-rich-blue animate-pulse' : 'bg-luvia-yellow text-luvia-dark-blue'}`}>
                                {job.status}
                              </span>
                           </div>
                           
                           {job.status === JobStatus.COMPLETED && (
                             <button 
                                onClick={() => { setSelectedJobForAudit(job); setActiveTab('verification'); }}
                                className="w-full py-5 bg-luvia-rich-blue text-white font-bold uppercase tracking-[0.2em] text-xs shadow-2xl flex items-center justify-center gap-3 animate-pulse-yellow hover:scale-[1.01] transition-all"
                             >
                               <ImageIcon size={18}/> Review Evidence & Release 30% Payment
                             </button>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="glass p-8 bg-luvia-dark-blue text-white space-y-8 shadow-2xl border-t-4 border-red-500 relative overflow-hidden">
                       <div className="absolute right-0 top-0 p-4 opacity-10"><Microscope size={120}/></div>
                       <h4 className="text-lg font-heading uppercase tracking-widest text-luvia-fair-blue">Predictive Health</h4>
                       <div className="space-y-6">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400 mb-1">
                                <span>Microbial Load (Kitchen)</span>
                                <span className="text-red-400">Critical</span>
                             </div>
                             <p className="text-xl font-bold font-mono tracking-tighter">1,240 RLU</p>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400 mb-1">
                                <span>HVAC Efficiency</span>
                                <span className="text-luvia-light-green">Optimal</span>
                             </div>
                             <p className="text-xl font-bold font-mono tracking-tighter">88% Flow</p>
                          </div>
                       </div>
                       <button onClick={() => setActiveTab('booking')} className="w-full py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:bg-white hover:text-luvia-dark-blue transition-all shadow-xl">Remediate Cycle</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- BOOKING ENGINE: MULTI-STEP --- */}
            {activeTab === 'booking' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
                 <div className="flex items-center justify-between">
                    <button onClick={() => bookingStep > 1 ? setBookingStep(bookingStep-1) : setActiveTab('home')} className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-luvia-rich-blue transition-all">
                       <ArrowLeft size={16}/> Return / Escape
                    </button>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Step {bookingStep}/4</p>
                 </div>

                 <div className="glass p-12 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue space-y-12 shadow-2xl">
                    {bookingStep === 1 && (
                      <div className="space-y-10 animate-grow">
                         <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Select Protocol</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <button onClick={() => { setBookingData({...bookingData, service: 'CLEANING'}); setBookingStep(2); }} className={`p-10 border-2 text-left space-y-4 group transition-all ${bookingData.service === 'CLEANING' ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-fair-blue'}`}>
                               <FlaskConical size={40} className="text-gray-400 group-hover:text-luvia-rich-blue" />
                               <h4 className="text-xl font-bold dark:text-white uppercase">Scientific Janitorial</h4>
                               <p className="text-xs text-gray-500 uppercase font-bold">Medical-grade biological decontamination.</p>
                            </button>
                            <button onClick={() => { setBookingData({...bookingData, service: 'TECHNICAL'}); setBookingStep(2); }} className={`p-10 border-2 text-left space-y-4 group transition-all ${bookingData.service === 'TECHNICAL' ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-fair-blue'}`}>
                               <Hammer size={40} className="text-gray-400 group-hover:text-luvia-rich-blue" />
                               <h4 className="text-xl font-bold dark:text-white uppercase">Technical Network</h4>
                               <p className="text-xs text-gray-500 uppercase font-bold">Escrow-backed artisan maintenance.</p>
                            </button>
                         </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-10 animate-grow">
                         <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Eco-Friendly Hierarchy</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(TIER_DATA).map(([key, tier]) => (
                              <button key={key} onClick={() => { setBookingData({...bookingData, tier: key as SubscriptionTier}); setBookingStep(3); }} className={`p-8 border-2 text-left space-y-2 group transition-all ${bookingData.tier === key ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5 hover:border-luvia-rich-blue'}`}>
                                 <div className="flex justify-between items-center text-gray-400 group-hover:text-luvia-rich-blue">
                                    {tier.icon}
                                    <span className="text-[9px] font-bold uppercase">{tier.sessions} Cycles</span>
                                 </div>
                                 <h4 className="text-xl font-bold dark:text-white uppercase">{tier.label}</h4>
                                 <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{tier.desc}</p>
                              </button>
                            ))}
                         </div>
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-10 animate-grow">
                         <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Property Matrix</h3>
                         <div className="grid grid-cols-2 gap-6">
                            {['Small (1-2 Rooms)', 'Medium (3-4 Rooms)', 'Large (5+ Rooms)', 'Estate Hub'].map(size => (
                              <button key={size} onClick={() => { setBookingData({...bookingData, size}); setBookingStep(4); }} className={`p-8 border-2 text-left font-bold uppercase text-xs dark:text-white hover:border-luvia-rich-blue transition-all ${bookingData.size === size ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5'}`}>
                                 {size}
                              </button>
                            ))}
                         </div>
                      </div>
                    )}

                    {bookingStep === 4 && (
                      <div className="space-y-12 animate-grow">
                         <h3 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Financial Audit</h3>
                         <div className="p-10 border-2 border-luvia-rich-blue bg-luvia-rich-blue/5 space-y-10 rounded-sm shadow-inner">
                            <div className="flex justify-between items-end border-b dark:border-white/10 pb-8">
                               <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Investment</p>
                                  <p className="text-6xl font-bold dark:text-white font-mono tracking-tighter">₦{currentPricing.total.toLocaleString()}</p>
                               </div>
                               <div className="text-right">
                                  <div className="px-4 py-2 bg-luvia-yellow text-luvia-dark-blue text-[10px] font-bold uppercase tracking-widest shadow-lg">70/30 Split Active</div>
                               </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-12">
                               <div className="space-y-2">
                                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Start Payout (70%)</p>
                                  <p className="text-3xl font-bold text-luvia-light-green font-mono">₦{currentPricing.released.toLocaleString()}</p>
                                  <p className="text-[9px] text-gray-500 uppercase font-bold">Released on-site initiation.</p>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Project Escrow (30%)</p>
                                  <p className="text-3xl font-bold text-luvia-yellow font-mono">₦{currentPricing.escrow.toLocaleString()}</p>
                                  <p className="text-[9px] text-gray-500 uppercase font-bold">Locked until SOP approval.</p>
                               </div>
                            </div>
                         </div>
                         <button onClick={handleBookingExecution} className="w-full py-8 bg-luvia-rich-blue text-white font-bold uppercase tracking-[0.3em] text-sm shadow-2xl hover:scale-[1.01] transition-all">Secure Institutional Booking</button>
                      </div>
                    )}
                 </div>
              </motion.div>
            )}

            {/* --- VERIFICATION TERMINAL (TRUST-ESCROW ENGINE) --- */}
            {activeTab === 'verification' && selectedJobForAudit && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-12 pb-24">
                 <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-yellow/20 text-luvia-yellow text-[10px] font-bold uppercase tracking-widest border border-luvia-yellow/30">
                       <ShieldCheck size={14}/> Mandatory Binary Audit
                    </div>
                    <h3 className="text-5xl font-heading dark:text-white uppercase tracking-widest leading-none">Trust Release Portal</h3>
                    <p className="text-sm text-gray-500 font-light uppercase tracking-widest">Project Hash ID: {selectedJobForAudit.id}</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 glass p-10 space-y-8 bg-white dark:bg-luvia-dark-blue shadow-2xl">
                       <h4 className="text-xl font-heading dark:text-white uppercase flex items-center gap-3 border-b dark:border-white/10 pb-4"><Camera size={24} className="text-luvia-rich-blue"/> Proof Matrix</h4>
                       <div className="grid grid-cols-2 gap-6">
                          {selectedJobForAudit.sopList.filter(s => s.evidenceUrl).map((s, idx) => (
                            <div key={idx} className="space-y-3 group cursor-pointer relative overflow-hidden">
                               <div className="aspect-video bg-luvia-slate dark:bg-white/5 rounded-sm overflow-hidden border dark:border-white/10 shadow-lg">
                                  <img src={s.evidenceUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                               </div>
                               <div className="flex justify-between items-center px-1">
                                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.task}</p>
                                  <BadgeCheck size={14} className="text-luvia-light-green"/>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                       <div className="glass p-10 bg-luvia-rich-blue text-white space-y-12 relative overflow-hidden shadow-2xl">
                          <div className="absolute -top-12 -right-12 opacity-5"><ShieldCheck size={300}/></div>
                          <h4 className="text-xl font-heading uppercase tracking-widest relative z-10 text-luvia-yellow">Escrow Liquidation</h4>
                          <div className="space-y-4 pt-8 border-t border-white/10 relative z-10">
                             <div className="flex justify-between items-end mb-4">
                                <div className="space-y-1">
                                   <span className="text-[10px] font-bold uppercase opacity-60 tracking-[0.2em]">Locked Vault Hold</span>
                                   <p className="text-xs font-bold uppercase text-luvia-yellow opacity-80">30% Project Buffer</p>
                                </div>
                                <span className="text-5xl font-bold font-mono text-luvia-yellow tracking-tighter">₦{selectedJobForAudit.escrowAmount.toLocaleString()}</span>
                             </div>
                             <button 
                               onClick={() => handleEscrowRelease(selectedJobForAudit.id)}
                               className="w-full py-8 bg-luvia-light-green text-luvia-rich-blue font-bold uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-[1.02] transition-all animate-pulse-yellow"
                             >Verify & Release 30% Payment</button>
                             <div className="flex items-center justify-center gap-2 opacity-40">
                                <Lock size={10}/>
                                <p className="text-[8px] text-center uppercase tracking-widest font-bold">Encrypted via LUVIA Vault Protocol</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* --- GAMIFICATION CENTER --- */}
            {activeTab === 'gamification' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-12 pb-24">
                 <div className="flex gap-10 border-b dark:border-white/10 pb-4 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'dashboard', label: 'Overall Stats', icon: <PieChart size={14}/> },
                      { id: 'games', label: 'Interactive Games', icon: <Gamepad2 size={14}/> },
                      { id: 'engagement', label: 'Rewards Hub', icon: <Trophy size={14}/> }
                    ].map(t => (
                      <button key={t.id} onClick={() => setGamificationSubTab(t.id as any)} className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all relative py-2 ${gamificationSubTab === t.id ? 'text-luvia-rich-blue dark:text-luvia-fair-blue' : 'text-gray-400'}`}>
                        {t.icon} {t.label}
                        {gamificationSubTab === t.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-luvia-rich-blue dark:bg-luvia-fair-blue animate-grow" />}
                      </button>
                    ))}
                 </div>

                 {gamificationSubTab === 'dashboard' && (
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-grow">
                      <div className="lg:col-span-4 glass p-12 text-center bg-luvia-dark-blue text-white space-y-6 shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 opacity-10"><Activity size={200}/></div>
                         <div className="relative z-10 space-y-6">
                            <div className="w-40 h-40 mx-auto rounded-full border-8 border-luvia-light-green flex items-center justify-center relative">
                               <p className="text-4xl font-heading tracking-tighter">{(jobs.length * 2.5).toFixed(1)}</p>
                               <div className="absolute -bottom-2 bg-luvia-light-green text-luvia-rich-blue px-3 py-1 text-[10px] font-bold uppercase rounded-sm">kg CO2 Offset</div>
                            </div>
                            <h4 className="text-2xl font-heading uppercase tracking-widest">Sustainability Rank</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{user?.level}</p>
                         </div>
                      </div>
                      <div className="lg:col-span-8 glass p-12 space-y-10 bg-white dark:bg-white/5 border-t-8 border-luvia-rich-blue shadow-2xl">
                         <div className="flex justify-between items-end">
                            <div className="space-y-1">
                               <h4 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Apprentice Clean</h4>
                               <p className="text-[10px] text-gray-400 font-bold uppercase">Next Tier: Specialist</p>
                            </div>
                            <p className="text-sm font-bold dark:text-white uppercase font-mono">{user?.carbonPoints?.toLocaleString()} / 25,000 SP</p>
                         </div>
                         <div className="h-6 w-full bg-luvia-slate dark:bg-white/10 rounded-full overflow-hidden p-1 shadow-inner border dark:border-white/5">
                            <div className="h-full bg-luvia-rich-blue rounded-full transition-all duration-[2s]" style={{ width: '47%' }}></div>
                         </div>
                      </div>
                   </div>
                 )}

                 {gamificationSubTab === 'games' && (
                   <div className="space-y-12 animate-grow">
                      <div className="flex gap-6 mb-8">
                        {['eco', 'habit', 'tech'].map(cat => (
                          <button key={cat} onClick={() => setGamesCategory(cat as any)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${gamesCategory === cat ? 'bg-luvia-rich-blue text-white shadow-lg' : 'bg-white dark:bg-white/5 text-gray-500'}`}>{cat === 'eco' ? 'Eco-Action' : cat === 'habit' ? 'Daily Habits' : 'Tech-Service'}</button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {gamesCategory === 'eco' && (
                           <>
                             <div className="glass p-10 space-y-6 bg-white dark:bg-white/5 border-l-4 border-luvia-fair-blue group hover:border-luvia-rich-blue transition-all shadow-xl">
                                <Camera size={40} className="text-luvia-rich-blue" />
                                <h4 className="text-xl font-heading dark:text-white uppercase tracking-widest">Pick-a-Litter Snap</h4>
                                <p className="text-xs text-gray-500 leading-relaxed italic">"Submit Before & After photos of local eco-actions. LUVIA AI validates within 2 mins for +200 SP."</p>
                                <button className="w-full py-3 bg-luvia-rich-blue text-white text-[9px] font-bold uppercase tracking-widest shadow-xl">Launch AI Camera</button>
                             </div>
                             <div className="glass p-10 space-y-6 bg-white dark:bg-white/5 border-l-4 border-luvia-light-green group hover:border-luvia-rich-blue transition-all shadow-xl">
                                <Layers size={40} className="text-luvia-light-green" />
                                <h4 className="text-xl font-heading dark:text-white uppercase tracking-widest">Waste Sorter</h4>
                                <p className="text-xs text-gray-500 leading-relaxed italic">"Rapid drag-and-drop game. Sort Plastic, Organic, and Glass correctly. Reward: Marketplace Token."</p>
                                <button className="w-full py-3 bg-luvia-light-green text-luvia-dark-blue text-[9px] font-bold uppercase tracking-widest shadow-xl">Play Game</button>
                             </div>
                             <div className="glass p-10 space-y-6 bg-white dark:bg-white/5 border-l-4 border-luvia-yellow group hover:border-luvia-rich-blue transition-all shadow-xl">
                                <PenTool size={40} className="text-luvia-yellow" />
                                <h4 className="text-xl font-heading dark:text-white uppercase tracking-widest">Green Pledge Wall</h4>
                                <p className="text-xs text-gray-500 leading-relaxed italic">"Sign your digital commitment to non-toxic property standards. Unlock 'Green Guardian' Badge."</p>
                                <button className="w-full py-3 bg-luvia-yellow text-luvia-dark-blue text-[9px] font-bold uppercase tracking-widest shadow-xl">Sign Pledge</button>
                             </div>
                           </>
                         )}
                         {gamesCategory === 'habit' && (
                           <div className="glass p-10 space-y-6 bg-white dark:bg-white/5 border-l-4 border-orange-500 shadow-xl col-span-full text-center">
                              <Calendar size={64} className="mx-auto text-orange-500 mb-4" />
                              <h4 className="text-3xl font-heading dark:text-white uppercase">7-Day Clean Streak</h4>
                              <div className="flex justify-center gap-4 mt-8">
                                {[1,2,3,4,5,6,7].map(d => <div key={d} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold ${d <= (user?.streak || 0) ? 'bg-luvia-light-green border-luvia-light-green text-luvia-rich-blue' : 'border-gray-200 text-gray-300'}`}>{d}</div>)}
                              </div>
                              <p className="text-sm text-gray-400 mt-6 uppercase font-bold tracking-widest">Maintain your streak for 500 bonus points.</p>
                           </div>
                         )}
                      </div>
                   </div>
                 )}
              </motion.div>
            )}

            {/* --- SUPPORT CONCIERGE --- */}
            {activeTab === 'support' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
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
                                     <span className="text-[10px] font-bold text-gray-400 uppercase">{fixer.jobs} Ops</span>
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
                       <p className="text-sm font-light leading-relaxed opacity-70 relative z-10">Direct access to LUVIA Technical Managers in Port Harcourt.</p>
                       <button onClick={() => window.open('https://wa.me/2349022861230', '_blank')} className="w-full py-6 bg-luvia-fair-blue text-luvia-dark-blue font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 relative z-10 shadow-2xl hover:scale-105 transition-all">
                          <Phone size={20}/> Live WhatsApp Support
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}