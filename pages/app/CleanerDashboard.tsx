
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ClipboardList, Wallet, User as UserIcon, LogOut, Activity as ActivityIcon, Camera, 
  MapPin, FlaskConical, CheckCircle2, Zap, Moon, Sun, Package, TrendingUp, 
  AlertTriangle, Timer, Info, ArrowLeft, Microscope, Droplets, Target, ShieldCheck, X,
  Check, ArrowRight, ChevronRight, LayoutDashboard, Lock, Upload, Smartphone
} from 'lucide-react';
import { useApp } from '../../App';
import { JobStatus, Job, SOPItem } from '../../types';

export default function CleanerDashboard() {
  const { user, setUser, theme, toggleTheme, jobs, setJobs } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'board' | 'task' | 'wallet' | 'vetting'>('board');
  const [showScienceGuide, setShowScienceGuide] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);

  // --- DERIVED ---
  const currentJob = useMemo(() => jobs.find(j => j.status === JobStatus.WORK_IN_PROGRESS || j.status === JobStatus.ON_SITE) || jobs[0], [jobs]);
  
  const handleLogout = () => { setUser(null); navigate('/'); };

  const handleTaskCheck = (taskId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === currentJob.id) {
        return {
          ...j,
          sopList: j.sopList.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
        };
      }
      return j;
    }));
  };

  const handleScientificInput = (taskId: string, val: string) => {
     setJobs(prev => prev.map(j => {
      if (j.id === currentJob.id) {
        return {
          ...j,
          sopList: j.sopList.map(t => t.id === taskId ? { ...t, value: val, isCompleted: !!val } : t)
        };
      }
      return j;
    }));
  };

  const handleCaptureEvidence = (taskId: string) => {
    // Mimic camera upload
    setJobs(prev => prev.map(j => {
      if (j.id === currentJob.id) {
        return {
          ...j,
          sopList: j.sopList.map(t => t.id === taskId ? { ...t, isCompleted: true, evidenceUrl: 'https://picsum.photos/400/400?random=' + Math.random() } : t)
        };
      }
      return j;
    }));
  };

  const nextMandatoryTaskId = useMemo(() => {
    return currentJob.sopList.find(t => t.isMandatory && !t.isCompleted)?.id;
  }, [currentJob]);

  const allMandatoryDone = useMemo(() => {
    return currentJob.sopList.filter(t => t.isMandatory).every(t => t.isCompleted);
  }, [currentJob]);

  const progressPercent = useMemo(() => {
    return Math.round((currentJob.sopList.filter(t => t.isCompleted).length / currentJob.sopList.length) * 100);
  }, [currentJob]);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark bg-[#001A33]' : 'bg-[#B0C4DE]'}`}>
      
      {/* STATUS BAR */}
      <header className="p-6 bg-[#001A33] text-white flex justify-between items-center shadow-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2 glass rounded-full"><ArrowLeft size={18}/></button>
           <div>
             <h1 className="text-xl font-heading tracking-widest text-luvia-fair-blue uppercase">Janitor Hub</h1>
             <p className="text-[9px] font-bold text-luvia-light-green uppercase">Shift: {currentJob.id} • {progressPercent}%</p>
           </div>
        </div>
        <button onClick={() => setIsSOSActive(true)} className="p-4 bg-red-600 rounded-sm animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]">
           <AlertTriangle size={24}/>
        </button>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-6 pb-32 overflow-y-auto">
        
        {/* TAB: ACTIVE SOP (EXECUTION VIEW) */}
        {activeTab === 'task' && (
          <div className="space-y-8 animate-grow">
             {/* Site Directive */}
             <div className="p-6 bg-luvia-yellow text-luvia-dark-blue border-l-8 border-luvia-rich-blue shadow-xl rounded-sm flex items-start gap-4">
                <Info size={24} className="flex-shrink-0" />
                <div>
                   <h4 className="font-bold uppercase text-[10px] tracking-widest">Site Safety Directive</h4>
                   <p className="text-[11px] font-medium leading-relaxed italic">"Handle antique brass in study with organic dry-wipe agents only."</p>
                </div>
             </div>

             {/* Dynamic SOP List */}
             <div className="space-y-6">
                {currentJob.sopList.map((t) => {
                  const isNext = t.id === nextMandatoryTaskId;
                  return (
                    <div 
                      key={t.id} 
                      className={`glass p-8 transition-all relative overflow-hidden flex flex-col gap-6 ${isNext ? 'border-2 border-luvia-yellow animate-pulse-yellow' : 'border dark:border-white/5'} ${t.isCompleted ? 'bg-luvia-light-green/10 opacity-70' : 'bg-white dark:bg-luvia-dark-blue/80'}`}
                    >
                       {isNext && <div className="absolute top-0 right-0 px-3 py-1 bg-luvia-yellow text-luvia-dark-blue text-[8px] font-bold uppercase tracking-widest">Next Mandatory</div>}
                       
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                             <button 
                              onClick={() => handleTaskCheck(t.id)}
                              className={`w-12 h-12 rounded-sm border-4 flex items-center justify-center transition-all ${t.isCompleted ? 'bg-luvia-light-green border-luvia-light-green' : 'border-gray-200 dark:border-white/10'}`}
                             >
                                {t.isCompleted && <Check size={28} className="text-luvia-rich-blue" />}
                             </button>
                             <div>
                                <p className="text-lg font-bold dark:text-white uppercase leading-none mb-1">{t.task}</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{t.category} • {t.isMandatory ? 'Mandatory' : 'Optional'}</p>
                             </div>
                          </div>
                          
                          {/* Evidence Icon / Camera Trigger */}
                          <button 
                            onClick={() => handleCaptureEvidence(t.id)}
                            className={`p-5 rounded-sm transition-all ${t.evidenceUrl ? 'bg-luvia-light-green text-luvia-rich-blue' : 'bg-luvia-rich-blue text-white'}`}
                          >
                             <Camera size={24} />
                          </button>
                       </div>

                       {/* Context-Specific Inputs */}
                       {t.category === 'Scientific' && (
                         <div className="pl-[4.5rem] flex flex-col gap-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Input Microbial RLU</label>
                            <input 
                              type="number"
                              value={t.value || ""}
                              onChange={(e) => handleScientificInput(t.id, e.target.value)}
                              placeholder="e.g. 12" 
                              className="w-full p-5 text-3xl font-bold font-mono bg-luvia-slate dark:bg-white/5 border-2 dark:border-white/10 outline-none focus:border-luvia-rich-blue dark:text-white"
                            />
                         </div>
                       )}

                       {t.evidenceUrl && (
                         <div className="pl-[4.5rem]">
                            <div className="aspect-video w-48 rounded-sm overflow-hidden border-2 border-luvia-light-green">
                               <img src={t.evidenceUrl} className="w-full h-full object-cover" />
                            </div>
                         </div>
                       )}
                    </div>
                  );
                })}
             </div>

             {/* Safety Gate Trigger */}
             <div className="pt-8">
                <button 
                  disabled={!allMandatoryDone}
                  onClick={() => {
                    setJobs(prev => prev.map(j => j.id === currentJob.id ? { ...j, status: JobStatus.COMPLETED } : j));
                    alert("Shift Data Transmitted. Awaiting Client Verification.");
                  }}
                  className={`w-full py-10 font-bold uppercase tracking-[0.2em] text-lg shadow-2xl flex items-center justify-center gap-6 transition-all ${
                    allMandatoryDone 
                    ? 'bg-luvia-rich-blue text-white animate-grow' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'
                  }`}
                >
                   {allMandatoryDone ? <CheckCircle2 size={32}/> : <Lock size={28}/>}
                   {allMandatoryDone ? 'Submit Job for Review' : 'Mandatory Tasks Pending'}
                </button>
             </div>
          </div>
        )}

        {/* TAB: BOARD */}
        {activeTab === 'board' && (
          <div className="space-y-6 animate-grow">
             <div className="p-8 glass bg-luvia-dark-blue text-white rounded-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12"><Smartphone size={100}/></div>
                <h4 className="text-2xl font-heading uppercase tracking-widest text-luvia-fair-blue">Dispatch Grid</h4>
                <div className="space-y-4">
                   <div className="p-6 border border-white/10 bg-white/5 rounded-sm flex justify-between items-center group">
                      <div className="space-y-1">
                         <p className="text-sm font-bold uppercase tracking-widest">{currentJob.clientName} • {currentJob.location}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase">Yield: ₦{currentJob.releasedAmount.toLocaleString()}</p>
                      </div>
                      <button onClick={() => setActiveTab('task')} className="p-5 bg-luvia-fair-blue text-luvia-dark-blue rounded-full shadow-2xl group-hover:scale-110 transition-transform"><ArrowRight/></button>
                   </div>
                </div>
             </div>
          </div>
        )}

      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#001A33] border-t border-white/10 px-4 py-4 flex justify-around items-center z-[100] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {[
          { id: 'board', Icon: LayoutDashboard, label: 'Shift Grid' },
          { id: 'task', Icon: Target, label: 'Execution' },
          { id: 'wallet', Icon: Wallet, label: 'Vault' },
          { id: 'vetting', Icon: ShieldCheck, label: 'Badge' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex flex-col items-center gap-1 p-4 transition-all ${activeTab === item.id ? 'text-luvia-fair-blue scale-110' : 'text-gray-500'}`}
          >
            <item.Icon size={28} />
            <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      {isSOSActive && (
        <div className="fixed inset-0 z-[300] bg-red-600 flex flex-col items-center justify-center p-8 text-center text-white">
           <AlertTriangle size={120} className="animate-bounce mb-8" />
           <h2 className="text-5xl font-heading uppercase tracking-widest mb-4">Emergency Active</h2>
           <p className="text-xl font-light max-w-md mb-12">LUVIA HQ notified. Responder status: DEPLOYED.</p>
           <button onClick={() => setIsSOSActive(false)} className="px-12 py-5 bg-white text-red-600 font-bold uppercase tracking-widest shadow-2xl rounded-sm">Cancel Signal</button>
        </div>
      )}
    </div>
  );
}
