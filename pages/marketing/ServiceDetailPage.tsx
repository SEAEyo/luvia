
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity, FlaskConical, CheckCircle2, ArrowRight, Camera, Zap, HeartPulse, Building2, Droplets, Smartphone, ShieldAlert, Info } from 'lucide-react';

interface SOPStep {
  task: string;
  desc: string;
}

interface ServiceData {
  title: string;
  tagline: string;
  logic: string;
  heroImage: string;
  equipment: string;
  sop: SOPStep[];
  gallery: string[];
}

const SERVICE_DATA: Record<string, ServiceData> = {
  'scientific-janitorial': {
    title: 'Scientific Janitorial',
    tagline: 'Medical-Grade Decontamination',
    logic: 'Our cleaning logic is built on molecular verification. We don’t just move dirt around; we eliminate microbial life using industrial-grade extractors and HEPA-filtered tools.',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=2000',
    equipment: 'Industrial steam extractors, HEPA vacuums, and ATP baseline monitoring systems.',
    sop: [
      { task: 'Cross-contamination check', desc: 'Ensure color-coded microfiber cloths are separated by zone.' },
      { task: 'ATP Bioluminescence Test (Baseline)', desc: 'Record initial microbial reading on high-touch surfaces.' },
      { task: 'HEPA particulate extraction', desc: 'Removal of particulates from air and fabrics using high-efficiency filters.' },
      { task: 'LUVIA Agent Application', desc: 'Application of non-toxic descalers with 5-minute dwell time.' },
      { task: 'ATP Verification (Post-Clean)', desc: 'Final audit recording. Target microbial reading: <30 RLU.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=500'
    ]
  },
  'maintenance-network': {
    title: 'Maintenance Network',
    tagline: 'Escrow-Backed Technical Care',
    logic: 'High-precision technical maintenance for premium assets. Every job is governed by a 70/30 escrow model, ensuring payment is only finalized upon visual SOP approval.',
    heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000',
    equipment: 'Professional thermal imaging, high-precision multi-meters, and non-toxic technical solvents.',
    sop: [
      { task: 'Pre-service Technical Audit', desc: 'Record amperage, voltage, and baseline mechanical performance.' },
      { task: 'Filter Decontamination', desc: 'Wash and disinfect using non-toxic antimicrobial spray.' },
      { task: 'Evaporator Coil Flush', desc: 'Flush with LUVIA Green Coil Cleaner for optimal HVAC health.' },
      { task: 'Photo-SOP Evidence Capture', desc: 'Provider uploads macro photos of all repaired components.' },
      { task: 'Escrow Trigger', desc: 'Client releases final 30% after verifying digital evidence.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1558383331-f520f2888351?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=500'
    ]
  }
};

const LuviaClipboardIcon = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <path d="M12 11h4"></path>
    <path d="M12 16h4"></path>
    <path d="M8 11h.01"></path>
    <path d="M8 16h.01"></path>
  </svg>
);

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = id && SERVICE_DATA[id] ? SERVICE_DATA[id] : SERVICE_DATA['scientific-janitorial'];

  return (
    <div className="bg-white dark:bg-luvia-dark-blue">
      <section className="relative h-[65vh] flex items-center overflow-hidden bg-luvia-rich-blue">
        <div className="absolute inset-0 opacity-40">
           <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luvia-rich-blue via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
           <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-fair-blue/20 text-luvia-fair-blue text-[10px] font-bold uppercase tracking-[0.3em]">
                {data.tagline}
              </div>
              <h1 className="text-5xl md:text-8xl font-heading text-white uppercase leading-tight">{data.title}</h1>
           </div>
        </div>
      </section>

      <section className="py-24">
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
               <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
                    <Activity className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={24} />
                    <h3 className="text-2xl font-heading dark:text-white uppercase tracking-wider">Scientific Logic</h3>
                  </div>
                  <p className="text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed">{data.logic}</p>
               </div>
               
               <div className="glass p-10 border-l-8 border-luvia-rich-blue space-y-6 shadow-xl">
                  <div className="flex items-center gap-3 text-luvia-rich-blue dark:text-luvia-fair-blue">
                     <Zap size={24} />
                     <h4 className="text-xs font-bold uppercase tracking-widest">Medical-Grade Equipment Specifications</h4>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed font-medium">{data.equipment}</p>
               </div>

               <div className="space-y-12">
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
                    <LuviaClipboardIcon className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={24} />
                    <h3 className="text-2xl font-heading dark:text-white uppercase tracking-wider">SOP Pipeline</h3>
                  </div>
                  <div className="space-y-8">
                     {data.sop.map((item: SOPStep, i: number) => (
                        <div key={i} className="flex gap-8 items-start group">
                           <div className="w-10 h-10 rounded-sm bg-luvia-rich-blue text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg group-hover:bg-luvia-fair-blue group-hover:text-luvia-rich-blue transition-all">{i+1}</div>
                           <div className="space-y-2">
                              <h5 className="font-bold dark:text-white text-base uppercase tracking-widest">{item.task}</h5>
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-16">
               <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
                    <Camera className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={24} />
                    <h3 className="text-2xl font-heading dark:text-white uppercase tracking-wider">Clinical Standards Gallery</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     {data.gallery.map((img: string, i: number) => (
                        <div key={i} className={`rounded-sm overflow-hidden border-2 dark:border-white/10 group cursor-pointer shadow-xl ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                           <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Clinical cleaning standard" />
                        </div>
                     ))}
                  </div>
                  <div className="flex items-center gap-4 p-4 glass text-[10px] font-bold uppercase tracking-widest text-gray-400 border-l-2 border-luvia-fair-blue">
                     <Info size={16} className="text-luvia-fair-blue" /> These visual assets represent verified clinical benchmarks for this service plan.
                  </div>
               </div>
               
               <div className="glass p-12 text-center space-y-10 relative overflow-hidden bg-luvia-slate/50 dark:bg-luvia-rich-blue/5 border-2 border-dashed dark:border-white/10">
                  <ShieldCheck size={72} className="mx-auto text-luvia-rich-blue dark:text-luvia-fair-blue" />
                  <div className="space-y-4">
                    <h4 className="text-3xl font-heading dark:text-white uppercase tracking-widest">Escrow-Backed Intervention</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">Secure your property's biological slate. Your 30% hold is only triggered upon your approval of the digital SOP evidence grid.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigate('/login')} className="w-full py-5 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-luvia-dark-blue transition-all">
                       Book Verified Session <ArrowRight size={20} />
                    </button>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official WhatsApp Inquiry: +234 902 286 1230</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
