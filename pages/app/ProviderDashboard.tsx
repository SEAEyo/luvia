import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ClipboardList, Wallet, Activity as ActivityIcon, Camera, 
  MapPin, Clock, CheckCircle2, AlertTriangle, ArrowRight,
  ShieldCheck, Zap, Moon, Sun, Award, Navigation as NavigationIcon, 
  LifeBuoy, X, FlaskConical, Check, Lock, ArrowLeft, TrendingUp, 
  MessageSquare, Map as MapIcon, Star, Filter, Smartphone
} from 'lucide-react';
import { useApp } from '../../App';
import { JobStatus, Job, SOPItem } from '../../types';

export default function ProviderDashboard() {
  const { user, setUser, theme, toggleTheme, jobs, setJobs } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'board' | 'engine' | 'wallet'>('board');
  
  const activeJob = useMemo(() => jobs[0], [jobs]);
  
  // THE VERIFICATION GATE Logic: strictly enforced photos for mandatory items
  const gateLogic = useMemo(() => {
    const mandatory = activeJob.sopList.filter(s => s.isMandatory);
    const completeWithEvidence = mandatory.every(s => s.isCompleted && s.evidenceUrl);
    return { isGateOpen: completeWithEvidence, missingCount: mandatory.length - mandatory.filter(s => s.evidenceUrl).length };
  }, [activeJob]);

  const handleCaptureEvidence = (taskId: string) => {
    setJobs(prev => prev.map(j => ({
      ...j,
      sopList: j.sopList.map(s => s.id === taskId ? { 
        ...s, 
        isCompleted: true, 
        evidenceUrl: `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300&random=${taskId}` 
      } : s)
    })));
  };

  const handleCompleteJob = () => {
     if (!gateLogic.isGateOpen) return;
     setJobs(jobs.map(j => j.id === activeJob.id ? { ...j, status: JobStatus.COMPLETED } : j));
     alert("Evidence Transmitted. 30% Trust Hold is now visible to Client for audit.");
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue text-white' : 'bg-luvia-slate text-luvia-dark-blue'}`}>
      
      {/* SIDEBAR */}
      <aside className="w-72 glass border-r dark:border-white/10 hidden lg:flex flex-col fixed h-full z-50">
        <div className="p-8">
          <span className="text-3xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue tracking-widest">LUVIA</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Field Engine V2.1</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'board', icon: <MapIcon size={18}/>, label: 'Shift Grid' },
            { id: 'engine', icon: <ClipboardList size={18}/>, label: 'Active SOP' },
            { id: 'wallet', icon: <Wallet size={18}/>, label: 'Earnings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all ${
                activeTab === item.id 
                ? 'bg-luvia-rich-blue text-white shadow-xl' 
                : 'text-gray-500 hover:bg-white/5 hover:text-luvia-rich-blue dark:hover:text-white'
              }`}
            >
              {item.icon} <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t dark:border-white/10">
           <button className="w-full py-4 bg-red-600/10 text-red-600 border border-red-600/20 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
             <LifeBuoy size={14}/> SOS Hub Signal
           </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 glass px-8 py-4 flex items-center justify-between border-b dark:border-white/10">
           <h2 className="text-2xl font-heading dark:text-luvia-fair-blue uppercase tracking-widest">{activeTab}</h2>
           <button onClick={toggleTheme} className="p-3 glass rounded-sm dark:text-white">
             {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
           </button>
        </header>

        <div className="p-8 lg:p-12 overflow-y-auto">
          {activeTab === 'engine' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
               <div className="glass p-10 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue space-y-8 shadow-2xl">
                  <div className="flex justify-between items-center border-b dark:border-white/10 pb-6">
                    <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest leading-none">Digital SOP Pipeline</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mandatory Proofs Needed: {gateLogic.missingCount}</p>
                  </div>
                  <div className="space-y-6">
                    {activeJob.sopList.map((task) => (
                      <div key={task.id} className={`p-6 border-2 transition-all flex items-center justify-between ${task.evidenceUrl ? 'border-luvia-light-green bg-luvia-light-green/5' : 'border-gray-100 dark:border-white/5'}`}>
                         <div className="flex items-center gap-6">
                            <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${task.isCompleted ? 'bg-luvia-light-green text-luvia-rich-blue' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                               {task.isCompleted ? <Check size={20}/> : <ActivityIcon size={18}/>}
                            </div>
                            <div>
                               <p className="text-[11px] font-bold uppercase dark:text-white leading-none mb-1">{task.task} {task.isMandatory && <span className="text-red-500 font-bold ml-1">*</span>}</p>
                               <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">{task.category}</p>
                            </div>
                         </div>
                         <button onClick={() => handleCaptureEvidence(task.id)} className={`px-6 py-3 rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg ${task.evidenceUrl ? 'bg-luvia-light-green text-luvia-rich-blue' : 'bg-luvia-rich-blue text-white'}`}>
                            <Camera size={14}/> {task.evidenceUrl ? 'Proof Captured' : 'Upload Evidence'}
                         </button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10 border-t dark:border-white/10">
                     <button 
                        disabled={!gateLogic.isGateOpen}
                        onClick={handleCompleteJob}
                        className={`w-full py-8 font-bold uppercase tracking-[0.2em] text-sm shadow-2xl flex items-center justify-center gap-3 transition-all ${gateLogic.isGateOpen ? 'bg-luvia-rich-blue text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'}`}
                     >
                        {gateLogic.isGateOpen ? <ShieldCheck size={20}/> : <Lock size={20}/>}
                        {gateLogic.isGateOpen ? 'Finalize & Request 30% Release' : `Proof Missing (${gateLogic.missingCount} items)`}
                     </button>
                     <p className="text-center text-[8px] text-gray-400 uppercase font-bold tracking-widest mt-4">Verification gate: All mandatory items (*) must have photo evidence uploaded.</p>
                  </div>
               </div>
            </motion.div>
          )}
          
          {activeTab === 'wallet' && (
             <div className="max-w-4xl mx-auto space-y-12">
                <div className="grid grid-cols-2 gap-8">
                   <div className="glass p-12 space-y-4 border-t-8 border-luvia-light-green bg-white dark:bg-white/5 shadow-2xl relative overflow-hidden">
                      <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Available for Payout (70%)</p>
                      <p className="text-5xl font-bold dark:text-white font-mono tracking-tighter">₦{activeJob.releasedAmount.toLocaleString()}</p>
                      <button className="w-full py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">Withdraw to Bank</button>
                   </div>
                   <div className="glass p-12 space-y-4 border-t-8 border-luvia-yellow bg-white dark:bg-white/5 shadow-2xl opacity-80">
                      <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Locked in Escrow (30%)</p>
                      <p className="text-5xl font-bold text-luvia-yellow font-mono tracking-tighter">₦{activeJob.escrowAmount.toLocaleString()}</p>
                      <p className="text-[9px] font-bold uppercase text-gray-500">Awaiting Client Photo Audit</p>
                   </div>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}