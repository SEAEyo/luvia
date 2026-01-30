
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShieldCheck, Users, Wallet, 
  History as HistoryIcon, AlertTriangle, CheckCircle, Search, 
  BarChart3, Settings, LogOut, ArrowUpRight,
  TrendingUp, Globe as GlobeIcon, Activity as ActivityIcon, Moon, Sun, Filter, UserX,
  ArrowLeft, Map as MapIcon, DollarSign, Camera, Download, Layers as LayersIcon,
  ShoppingBag, Sparkles, Database as DatabaseIcon, FileText, Plus, X, ListChecks,
  ChevronRight, Building2, FlaskConical, Wrench, Trash2
} from 'lucide-react';
import { useApp } from '../../App';
import { JobStatus, Job, SOPItem, SOPModule } from '../../types';

// SOP MODULES LIBRARY
const MODULES_LIBRARY: SOPModule[] = [
  {
    id: 'mod-kitchen',
    name: 'Kitchen Clinical Module',
    category: 'cleaning',
    tasks: [
      { id: 'k1', task: 'Degrease Extractor Hood', category: 'Task', isCompleted: false, isMandatory: true, description: 'Industrial solvent application.' },
      { id: 'k2', task: 'ATP Baseline (Countertops)', category: 'Scientific', isCompleted: false, isMandatory: true, description: 'Pre-service reading.' }
    ]
  },
  {
    id: 'mod-hvac',
    name: 'HVAC Technical Module',
    category: 'technical',
    tasks: [
      { id: 'h1', task: 'Refrigerant Pressure Audit', category: 'Assessment', isCompleted: false, isMandatory: true, description: 'Record PSI levels.' },
      { id: 'h2', task: 'Antimicrobial Coil Flush', category: 'Logic', isCompleted: false, isMandatory: true, description: 'LUVIA Blue-Label solvent.' }
    ]
  },
  {
    id: 'mod-security',
    name: 'Site Integrity Module',
    category: 'Safety',
    tasks: [
      { id: 's1', task: 'Hazmat Baseline Check', category: 'Safety', isCompleted: false, isMandatory: true, description: 'Verify safe entry conditions.' }
    ]
  }
];

export default function AdminDashboard() {
  const { user, setUser, theme, toggleTheme, jobs, setJobs } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'heatmap' | 'arbiter' | 'marketplace' | 'carbon' | 'sop_builder'>('overview');
  const [pricingFactor, setPricingFactor] = useState(1.0);
  
  // SOP Builder State
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [customTasks, setCustomTasks] = useState<{task: string, mandatory: boolean}[]>([]);
  const [newTaskInput, setNewTaskInput] = useState("");

  const handleLogout = () => { setUser(null); navigate('/'); };

  const handleInjectSOP = () => {
    if (!selectedJobId) return;
    
    const selectedModulesTasks = MODULES_LIBRARY
      .filter(m => activeModules.includes(m.id))
      .flatMap(m => m.tasks);
      
    const injectedCustomTasks: SOPItem[] = customTasks.map((ct, idx) => ({
      id: `custom-${idx}`,
      task: ct.task,
      category: 'Task',
      isCompleted: false,
      isMandatory: ct.mandatory,
      description: 'Custom site-specific injection.'
    }));

    const finalSop = [...selectedModulesTasks, ...injectedCustomTasks];

    setJobs(prev => prev.map(j => 
      j.id === selectedJobId 
      ? { ...j, sopList: finalSop, status: JobStatus.WORK_IN_PROGRESS } 
      : j
    ));
    
    alert("SOP Logic Injected. Provider notified via Field Engine.");
    setSelectedJobId(null);
    setActiveTab('overview');
  };

  const selectedJob = useMemo(() => jobs.find(j => j.id === selectedJobId), [selectedJobId, jobs]);

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue' : 'bg-luvia-slate'}`}>
      
      {/* SIDEBAR */}
      <aside className="w-72 glass border-r dark:border-white/10 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 space-y-2">
          <span className="text-3xl font-heading tracking-widest text-luvia-rich-blue dark:text-luvia-fair-blue">LUVIA</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Command Center V4.0</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'System Overview' },
            { id: 'sop_builder', icon: <ListChecks size={18} />, label: 'SOP Architect' },
            { id: 'pricing', icon: <DollarSign size={18} />, label: 'Pricing Engine' },
            { id: 'heatmap', icon: <MapIcon size={18} />, label: 'Trust Heatmap' },
            { id: 'arbiter', icon: <ShieldCheck size={18} />, label: 'Escrow Arbiter' },
            { id: 'carbon', icon: <GlobeIcon size={18} />, label: 'Carbon Ledger' }
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

        <div className="p-8 border-t dark:border-white/10 space-y-4">
          <button onClick={() => navigate(-1)} className="w-full py-4 border border-luvia-rich-blue text-luvia-rich-blue dark:text-luvia-fair-blue text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
             <ArrowLeft size={14}/> Client View
          </button>
          <button onClick={handleLogout} className="w-full py-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest">Terminate Session</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        <header className="sticky top-0 z-40 glass px-12 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b dark:border-white/10">
           <div className="space-y-1">
              <h1 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider">Root Operational Hub</h1>
              <p className="text-sm text-gray-500 font-light">SOP Control: <span className="text-luvia-light-green font-bold">READY</span></p>
           </div>
           <div className="flex items-center gap-6">
              <button onClick={toggleTheme} className="p-5 glass rounded-sm dark:text-white shadow-xl hover:scale-110 transition-transform">
                {theme === 'light' ? <Moon size={24}/> : <Sun size={24}/>}
              </button>
           </div>
        </header>

        <div className="p-12 overflow-y-auto">
          
          {/* OVERVIEW (LIVE OVERSIGHT) */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {jobs.map(job => {
                   const progress = Math.round((job.sopList.filter(s => s.isCompleted).length / job.sopList.length) * 100);
                   return (
                     <div key={job.id} className="glass p-8 space-y-6 bg-white dark:bg-white/5 border-t-4 border-luvia-rich-blue">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job ID: {job.id}</p>
                              <h4 className="font-bold dark:text-white uppercase">{job.serviceName}</h4>
                           </div>
                           <span className="text-[10px] font-bold px-2 py-1 bg-luvia-yellow text-luvia-dark-blue rounded-sm">{progress}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-luvia-rich-blue transition-all" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                           <p className="text-[10px] text-gray-400 font-bold uppercase">{job.clientName} • {job.location}</p>
                           {job.status === JobStatus.PENDING && (
                             <button onClick={() => { setSelectedJobId(job.id); setActiveTab('sop_builder'); }} className="text-[9px] font-bold text-luvia-rich-blue hover:underline uppercase">Build SOP</button>
                           )}
                        </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          )}

          {/* SOP BUILDER (THE ARCHITECT) */}
          {activeTab === 'sop_builder' && (
            <div className="max-w-6xl mx-auto space-y-12 animate-grow">
               {!selectedJobId ? (
                 <div className="text-center py-20 space-y-4">
                   <ListChecks className="mx-auto text-gray-200" size={64}/>
                   <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">Select a Pending Job from Overview to Architect SOP</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   {/* Left: Module Library */}
                   <div className="lg:col-span-4 space-y-8">
                      <div className="glass p-8 space-y-6 bg-white dark:bg-luvia-dark-blue">
                         <h3 className="text-xl font-heading dark:text-white uppercase tracking-widest">Module Library</h3>
                         <div className="space-y-4">
                            {MODULES_LIBRARY.map(mod => (
                              <button 
                                key={mod.id} 
                                onClick={() => setActiveModules(prev => prev.includes(mod.id) ? prev.filter(i => i !== mod.id) : [...prev, mod.id])}
                                className={`w-full p-6 border-2 text-left transition-all flex items-center justify-between ${activeModules.includes(mod.id) ? 'border-luvia-rich-blue bg-luvia-rich-blue/5' : 'border-gray-100 dark:border-white/5'}`}
                              >
                                 <div className="flex items-center gap-4">
                                    {mod.category === 'cleaning' ? <FlaskConical size={20}/> : <Wrench size={20}/>}
                                    <span className="text-xs font-bold dark:text-white uppercase">{mod.name}</span>
                                 </div>
                                 <Plus size={16} className={activeModules.includes(mod.id) ? 'rotate-45 transition-transform' : ''} />
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Right: Custom Injection & Preview */}
                   <div className="lg:col-span-8 space-y-8">
                      <div className="glass p-10 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-rich-blue space-y-10">
                         <div className="flex justify-between items-center border-b dark:border-white/10 pb-6">
                            <h3 className="text-3xl font-heading dark:text-white uppercase tracking-widest">SOP Architect: {selectedJob?.id}</h3>
                            <button onClick={() => setSelectedJobId(null)}><X className="text-gray-400"/></button>
                         </div>

                         {/* Custom Injection */}
                         <div className="space-y-6">
                            <h4 className="text-xs font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2"><Sparkles size={14}/> Custom site injection</h4>
                            <div className="flex gap-4">
                               <input 
                                 type="text" 
                                 value={newTaskInput}
                                 onChange={(e) => setNewTaskInput(e.target.value)}
                                 placeholder="e.g. Special Care: Clean antique brass handles..." 
                                 className="flex-1 p-4 glass dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 outline-none focus:border-luvia-rich-blue text-sm" 
                               />
                               <button 
                                 onClick={() => { if(newTaskInput) { setCustomTasks([...customTasks, {task: newTaskInput, mandatory: true}]); setNewTaskInput(""); } }}
                                 className="px-8 py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest"
                               >Add Task</button>
                            </div>
                         </div>

                         {/* Preview List */}
                         <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase text-gray-400 tracking-widest">Pipeline Preview</h4>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                               {MODULES_LIBRARY.filter(m => activeModules.includes(m.id)).flatMap(m => m.tasks).map((t, i) => (
                                 <div key={i} className="p-4 bg-luvia-slate dark:bg-white/5 flex justify-between items-center border dark:border-white/10">
                                    <span className="text-[11px] font-bold dark:text-white uppercase">{t.task}</span>
                                    <span className="text-[8px] px-2 py-1 bg-luvia-rich-blue text-white uppercase rounded-sm">Module</span>
                                 </div>
                               ))}
                               {customTasks.map((ct, i) => (
                                 <div key={i} className="p-4 bg-luvia-rich-blue/5 flex justify-between items-center border border-luvia-rich-blue/20">
                                    <span className="text-[11px] font-bold dark:text-white uppercase">{ct.task}</span>
                                    <div className="flex items-center gap-3">
                                       <span className="text-[8px] px-2 py-1 bg-luvia-yellow text-luvia-dark-blue uppercase rounded-sm">Custom</span>
                                       <button onClick={() => setCustomTasks(customTasks.filter((_, idx) => idx !== i))}><Trash2 size={14} className="text-red-500"/></button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <button 
                           onClick={handleInjectSOP}
                           disabled={activeModules.length === 0 && customTasks.length === 0}
                           className="w-full py-6 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl disabled:opacity-50"
                         >Deploy Dynamic SOP Grid</button>
                      </div>
                   </div>
                 </div>
               )}
            </div>
          )}

          {/* DYNAMIC PRICING ENGINE */}
          {activeTab === 'pricing' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-grow">
               <div className="glass p-12 bg-white dark:bg-luvia-dark-blue border-t-8 border-luvia-yellow space-y-10 shadow-2xl">
                  <h3 className="text-3xl font-heading dark:text-white uppercase tracking-widest">Algorithm Tuning</h3>
                  <div className="space-y-8">
                     <div className="p-8 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                           <span>Global Demand Multiplier (Peak Mode)</span>
                           <span className="text-luvia-rich-blue text-lg">x{pricingFactor.toFixed(2)}</span>
                        </div>
                        <input type="range" min="1.0" max="3.0" step="0.1" value={pricingFactor} onChange={(e) => setPricingFactor(parseFloat(e.target.value))} className="w-full h-3 bg-gray-200 rounded-full appearance-none accent-luvia-rich-blue" />
                     </div>
                     <button className="w-full py-6 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl">Apply Global Adjustment</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
