
import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EscrowPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-luvia-dark-blue">
      {/* Hero */}
      <section className="py-24 bg-luvia-rich-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://picsum.photos/1920/1080?random=50" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-heading text-white uppercase">The 70/30 Security Model</h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              We bridge the trust gap in the Nigerian service market. By restructuring how payments are released, we guarantee professional accountability for every job.
            </p>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 flex items-center justify-center font-heading text-2xl text-luvia-rich-blue dark:text-luvia-fair-blue">01</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold dark:text-white">Secure Deposit</h3>
                <p className="text-sm text-gray-500 font-light">The client pays 100% upfront. The funds are immediately secured in the LUVIA Trust Vault.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 flex items-center justify-center font-heading text-2xl text-luvia-rich-blue dark:text-luvia-fair-blue">02</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold dark:text-white">70% Start Release</h3>
                <p className="text-sm text-gray-500 font-light">Upon the provider arriving on-site and initiating the digital SOP, 70% is released to cover operational costs.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-luvia-slate dark:bg-white/5 border dark:border-white/10 flex items-center justify-center font-heading text-2xl text-luvia-rich-blue dark:text-luvia-fair-blue">03</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold dark:text-white">30% Verification Hold</h3>
                <p className="text-sm text-gray-500 font-light">The final 30% remains locked until the client approves the "After" photos and clinical SOP evidence.</p>
              </div>
            </div>
          </div>
          <div className="glass p-12 space-y-8 border-l-8 border-luvia-rich-blue">
            <ShieldCheck size={48} className="text-luvia-rich-blue dark:text-luvia-fair-blue" />
            <h2 className="text-3xl font-heading dark:text-white uppercase">Eliminate Substandard Service</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-luvia-light-green mt-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Guarantee results before final payment.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-luvia-light-green mt-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Professional vetting for all technicians.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-luvia-light-green mt-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Automated dispute arbitration via Admin.</p>
              </div>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-4 bg-luvia-rich-blue text-white font-bold flex items-center justify-center gap-2">
              Book a Secured Service <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-luvia-slate dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-8 flex items-center gap-6 text-gray-500">
          <AlertCircle size={24} className="flex-shrink-0" />
          <p className="text-xs italic leading-relaxed">
            The 70/30 model is a strict LUVIA standard. Providers who fail to meet SOP requirements or provide valid photographic evidence will be flagged for manual arbitration, and escrowed funds may be returned to the client.
          </p>
        </div>
      </section>
    </div>
  );
}
