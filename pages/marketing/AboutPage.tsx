
import React from 'react';
import { TEAM } from '../../constants';
import { Target, ShieldCheck, Activity as ActivityIcon, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-luvia-dark-blue">
      {/* Institution Hero */}
      <section className="relative py-32 bg-luvia-slate dark:bg-luvia-dark-blue/80 overflow-hidden">
         <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl space-y-6">
               <h1 className="text-5xl md:text-7xl font-heading text-luvia-rich-blue dark:text-white">The Institution</h1>
               <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  LUVIA is not a cleaning agency. We are a multidisciplinary maintenance technology firm redefining Africa's green infrastructure through scientific hygiene and decentralized trust.
               </p>
            </div>
         </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 border-y dark:border-white/10">
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-6">
               <Target className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={40} />
               <h3 className="text-3xl font-heading dark:text-white">Mission</h3>
               <p className="text-gray-500 dark:text-gray-400 font-light">
                  Elevating the standard of living through systematic, data-verified hygiene and financial security for property owners.
               </p>
            </div>
            <div className="space-y-6">
               <Globe className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={40} />
               <h3 className="text-3xl font-heading dark:text-white">Global Impact</h3>
               <p className="text-gray-500 dark:text-gray-400 font-light">
                  Directly aligned with UN SDG Goals 3, 8, 12, and 13. We measure our success in liters of toxins avoided and tons of carbon offset.
               </p>
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider">Mission-Driven & Multidisciplinary</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm font-light">Led by experts spanning Environmental Science, Blockchain Technology, Finance, and Global Communications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {TEAM.map((member, i) => (
              <div key={i} className="glass flex flex-col hover:translate-y-[-5px] transition-transform">
                <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold dark:text-white">{member.name}</h4>
                    <p className="text-[10px] font-bold text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest">{member.role}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed italic line-clamp-4">"{member.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
