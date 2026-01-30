
import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-luvia-dark-blue">
      {/* Hero */}
      <section className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue/80">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-heading text-luvia-rich-blue dark:text-white uppercase">Direct Access</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Have a complex project or a corporate inquiry? Our team is available for technical consultations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 space-y-4">
                <p className="text-[10px] font-bold text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-[0.2em]">Official Support</p>
                <div className="flex items-center gap-3 dark:text-white">
                  <Mail size={18} />
                  <span className="text-sm font-medium">luviacleans@gmail.com</span>
                </div>
              </div>
              <div className="glass p-8 space-y-4">
                <p className="text-[10px] font-bold text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-[0.2em]">Live Support</p>
                <div className="flex items-center gap-3 dark:text-white">
                  <MessageSquare size={18} />
                  <span className="text-sm font-medium">+234 902 286 1230</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-heading dark:text-white">Physical Hub</h3>
              <div className="flex items-start gap-4 text-gray-500">
                <MapPin size={24} className="text-luvia-rich-blue dark:text-luvia-fair-blue" />
                <p className="text-sm font-light leading-relaxed">
                  LUVIA Maintenance HQ<br/>
                  Elelenwo Road, GRA Phase 2<br/>
                  Port Harcourt, Rivers State, Nigeria
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-heading dark:text-white">Follow the Science</h3>
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-luvia-rich-blue transition-colors">
                  <Instagram size={18} /> @luviacleans
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-luvia-rich-blue transition-colors">
                  <Facebook size={18} /> Luvia Cleans
                </button>
              </div>
            </div>
          </div>

          {/* Corporate Inquiry Form */}
          <div className="glass p-12 space-y-8">
            <h3 className="text-3xl font-heading dark:text-white uppercase">Corporate Inquiry</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input type="text" className="w-full bg-luvia-slate dark:bg-white/5 border dark:border-white/10 p-4 outline-none focus:border-luvia-fair-blue transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Organization</label>
                  <input type="text" className="w-full bg-luvia-slate dark:bg-white/5 border dark:border-white/10 p-4 outline-none focus:border-luvia-fair-blue transition-all" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nature of Inquiry</label>
                <select className="w-full bg-luvia-slate dark:bg-white/5 border dark:border-white/10 p-4 outline-none focus:border-luvia-fair-blue transition-all">
                  <option>Facility Management</option>
                  <option>Janitorial Partnership</option>
                  <option>Marketplace Bulk Orders</option>
                  <option>Artisan Network Onboarding</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Details</label>
                <textarea rows={4} className="w-full bg-luvia-slate dark:bg-white/5 border dark:border-white/10 p-4 outline-none focus:border-luvia-fair-blue transition-all"></textarea>
              </div>
              <button className="w-full py-4 bg-luvia-rich-blue text-white font-bold flex items-center justify-center gap-2">
                Submit Consultation Request <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
