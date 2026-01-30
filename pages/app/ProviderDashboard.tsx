
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isPanicActive, setIsPanicActive] = useState(false);

  // --- DERIVED ---
  const activeJob = useMemo(() => jobs[0], [jobs]);
  const isSOPComplete = useMemo(() => {
    const mandatory = activeJob.sopList.filter(s => s.isMandatory);
    return mandatory.length > 0 && mandatory.every(s => s.isCompleted && s.evidenceUrl);
  }, [activeJob]);

  // --- ACTIONS ---
  const handleLogout = () => { setUser(null); navigate('/'); };

  const handleCaptureEvidence = (taskId: string) => {
    setJobs(prev => prev.map(j => ({
      ...j,
      sopList: j.sopList.map(s => s.id === taskId ? { 
        ...s, 
        isCompleted: true, 
        evidenceUrl: `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300&random=${Math.random()}` 
      } : s)
    })));
  };

  const handleCompleteJob = () => {
     if (!isSOPComplete) return;
     setJobs(jobs.map(j => j.id === activeJob.id ? { ...j, status: JobStatus.COMPLETED } : j));
     alert("Work Submitted. 30% Hold is now visible for Client Verification.");
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue' : 'bg-luvia-slate'}`}>
      
      {/* SIDEBAR */}
      <aside className="w-72 glass border-r dark:border-white/10 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <span className="text-3xl font-heading tracking-widest text-luvia-rich-blue dark:text-luvia-fair-blue">LUVIA</span>
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
                ? 'bg-luvia-rich-blue text-white shadow-lg' 
                : 'text-gray-500 hover:bg-white/5 hover:text-luvia-rich-blue dark:hover:text-white'
              }`}
            >
              {item.icon} <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t dark:border-white/10 space-y-4">
          <button onClick={() => setIsPanicActive(true)} className="w-full py-4 bg-red-600/10 text-red-600 border border-red-600/20 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all">
             <LifeBuoy size={14}/> SOS Signal
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        
        <header className="sticky top-0 z-40 glass px-8 py-4 flex items-center justify-between border-b dark:border-white/10">
           <div className="flex items-center gap-6">
              <h2 className="text-2xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest">
                {activeTab.toUpperCase()}
              </h2>
           </div>
           <button onClick={toggleTheme} className="p-3 glass rounded-sm dark:text-white hover:scale-110 transition-transform">
             {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
           </button>
        </header>

        <div className="p-8 lg:p-12 overflow-y-auto">
          
          {activeTab === 'board' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-grow">
               <div className="lg:col-span-8 space-y-8">
                  <div className="glass p-8 space-y-6 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue shadow-xl">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Active Assignment</p>
                           <h4 className="text-2xl font-heading dark:text-white uppercase">{activeJob.serviceName}</h4>
                           <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase mt-2">
                              <MapPin size={14}/> {activeJob.location}
                           </div>
                        </div>
                        <span className="px-3 py-1 bg-luvia-yellow text-luvia-dark-blue text-[10px] font-bold uppercase rounded-sm">{activeJob.status}</span>
                     </div>
                     <div className="grid grid-cols-2 gap-8 border-y dark:border-white/10 py-6">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">70% Release Ready</p>
                           <p className="text-2xl font-bold text-luvia-light-green font-mono">₦{activeJob.releasedAmount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">30% Escrow Hold</p>
                           <p className="text-2xl font-bold text-luvia-yellow font-mono">₦{activeJob.escrowAmount.toLocaleString()}</p>
                        </div>
                     </div>
                     <button onClick={() => setActiveTab('engine')} className="w-full py-5 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl">Open SOP Engine <ArrowRight size={16}/></button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'engine' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-grow">
               <div className="glass p-10 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue space-y-8 shadow-2xl">
                  <div className="flex justify-between items-center border-b dark:border-white/10 pb-6">
                    <h3 className="text-2xl font-heading dark:text-white uppercase tracking-widest">Digital SOP Pipeline</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Mandatory: {activeJob.sopList.filter(s => s.isMandatory).length}</p>
                  </div>
                  <div className="space-y-6">
                    {activeJob.sopList.map((task) => (
                      <div key={task.id} className={`p-6 border-2 transition-all flex items-center justify-between ${task.evidenceUrl ? 'border-luvia-light-green bg-luvia-light-green/5' : 'border-gray-100 dark:border-white/5'}`}>
                         <div className="flex items-center gap-6">
                            <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${task.isCompleted ? 'bg-luvia-light-green text-luvia-rich-blue' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                               {task.isCompleted ? <Check size={20}/> : <ActivityIcon size={18}/>}
                            </div>
                            <div>
                               <p className="text-xs font-bold uppercase dark:text-white">{task.task} {task.isMandatory && <span className="text-red-500 font-bold ml-1">*</span>}</p>
                               <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">{task.category}</p>
                            </div>
                         </div>
                         <button onClick={() => handleCaptureEvidence(task.id)} className={`px-6 py-3 rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg ${task.evidenceUrl ? 'bg-luvia-light-green text-luvia-rich-blue' : 'bg-luvia-rich-blue text-white'}`}>
                            <Camera size={14}/> {task.evidenceUrl ? 'Verification Captured' : 'Upload Proof'}
                         </button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10 border-t dark:border-white/10">
                     <button 
                        disabled={!isSOPComplete}
                        onClick={handleCompleteJob}
                        className={`w-full py-8 font-bold uppercase tracking-[0.2em] text-sm shadow-2xl flex items-center justify-center gap-3 transition-all ${isSOPComplete ? 'bg-luvia-rich-blue text-white' : 'bg-gray-200 text-gray-400 grayscale cursor-not-allowed'}`}
                     >
                        {isSOPComplete ? <ShieldCheck size={20}/> : <Lock size={20}/>}
                        {isSOPComplete ? 'Finalize & Request 30% Release' : 'Mandatory Evidence Missing'}
                     </button>
                     <p className="text-center text-[8px] text-gray-400 uppercase font-bold tracking-widest mt-4">Verification gate: All mandatory items (*) must have photo evidence.</p>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* SOS OVERLAY */}
        {isPanicActive && (
          <div className="fixed inset-0 z-[500] bg-red-600/95 backdrop-blur-2xl flex items-center justify-center p-8">
             <div className="glass bg-white p-12 max-w-lg w-full text-center space-y-10 rounded-sm animate-grow border-4 border-red-700 shadow-[0_0_100px_rgba(255,0,0,0.4)]">
                <AlertTriangle className="mx-auto text-red-600 animate-pulse" size={100} />
                <h2 className="text-5xl font-heading text-red-600 uppercase tracking-widest leading-tight">Emergency Active</h2>
                <button onClick={() => setIsPanicActive(false)} className="w-full py-6 bg-luvia-dark-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl">Cancel Signal</button>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
