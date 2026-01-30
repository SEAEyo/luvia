
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity as ActivityIcon, ShoppingBag, ArrowRight, Zap, Target, Leaf, CheckCircle, Smartphone, MapPin, Award, HeartPulse, Building2, Droplets, FlaskConical, MousePointer2, Phone, Camera } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [atpReading, setAtpReading] = useState(false); // For Interactive Proof Slider

  const scrollToWhatWeDo = () => {
    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative h-[95vh] flex items-center overflow-hidden bg-luvia-dark-blue">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=2000" 
            alt="LUVIA Professional using ATP tester in premium interior" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-luvia-dark-blue via-luvia-dark-blue/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-fair-blue/20 border border-luvia-fair-blue/30 text-luvia-fair-blue text-[10px] uppercase tracking-[0.2em] font-bold">
              <Zap size={14} /> Technology Defined Hygiene
            </div>
            <h1 className="text-6xl md:text-8xl font-heading text-white leading-[0.9]">
              Property Maintenance Defined by <span className="text-luvia-fair-blue">Precision and Science.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg font-light leading-relaxed">
              Medical-grade janitorial standards, escrow-backed technical services, and carbon-negative operations for premium interiors in Port Harcourt and beyond.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-luvia-rich-blue text-white font-bold hover:bg-white hover:text-luvia-dark-blue transition-all flex items-center gap-2 shadow-2xl"
              >
                Launch Web App <Zap size={18} />
              </button>
              <button 
                onClick={scrollToWhatWeDo}
                className="px-8 py-4 border border-white/30 text-white font-bold hover:bg-white hover:text-luvia-dark-blue transition-all"
              >
                Explore Services
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-luvia-fair-blue font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Corporate Partnerships
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Narrative Logic Transition */}
      <section className="py-20 bg-luvia-rich-blue text-white">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <p className="text-2xl md:text-4xl font-light italic leading-relaxed">
            “Most cleaning is just moving dirt around. <br/>
            <span className="text-luvia-fair-blue font-bold">LUVIA</span> uses science to verify hygiene and escrow to protect your money. <br/>
            Book a service, track your pro, and earn carbon rewards. <br/>
            <span className="uppercase tracking-widest text-sm font-bold opacity-70">The future of home management is here.</span>”
          </p>
        </div>
      </section>

      {/* 3. The "Proof" Slider: Interactive ATP Readings */}
      <section className="py-24 bg-white dark:bg-luvia-dark-blue overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider">Scientific Validation</h2>
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                We don't just "look" clean. We verify the biological safety of your environment using ATP bioluminescence testing. Click the interaction to see the LUVIA standard.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setAtpReading(false)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${!atpReading ? 'bg-luvia-rich-blue text-white border-luvia-rich-blue' : 'text-gray-400 border-gray-200'}`}
                >
                  Baseline
                </button>
                <button 
                  onClick={() => setAtpReading(true)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${atpReading ? 'bg-luvia-light-green text-luvia-rich-blue border-luvia-light-green' : 'text-gray-400 border-gray-200'}`}
                >
                  Post-LUVIA
                </button>
              </div>
            </div>
            <div className="relative group cursor-pointer" onClick={() => setAtpReading(!atpReading)}>
              <div className="aspect-video bg-luvia-slate dark:bg-white/5 rounded-sm overflow-hidden border dark:border-white/10 shadow-2xl relative">
                 <img 
                  src={atpReading ? "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000"} 
                  className="w-full h-full object-cover transition-all duration-700"
                  alt="Microbial reading comparison"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
              </div>
              <div className={`absolute -bottom-6 -right-6 glass p-8 shadow-2xl min-w-[200px] transition-all duration-500 ${atpReading ? 'border-l-8 border-luvia-light-green' : 'border-l-8 border-red-500'}`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ATP Microbial Reading</p>
                <p className={`text-5xl font-heading ${atpReading ? 'text-luvia-light-green' : 'text-red-500'}`}>
                  {atpReading ? '12 RLU' : '1,240 RLU'}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{atpReading ? 'Clinically Validated' : 'Pathogen Hazard'}</p>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-lg">
                <MousePointer2 size={12} className="text-luvia-rich-blue" />
                <span className="text-[10px] font-bold text-luvia-rich-blue uppercase tracking-widest">Interactive Proof</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. App-First Section */}
      <section className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue border-b dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider">Your Property, Managed Digitally.</h2>
            <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              LUVIA is both a medical-grade service provider and a sophisticated digital platform. We briefly explain that LUVIA operates as a hybrid of scientific service and tech-management hub.
            </p>
            <div className="space-y-6">
              {[
                { title: "Track", desc: "Real-time progress of your cleaners and fixers via GPS and live SOP updates.", icon: <ActivityIcon size={20} /> },
                { title: "Verify", desc: "View photo SOPs and baseline ATP readings before you pay.", icon: <ShieldCheck size={20} /> },
                { title: "Earn", desc: "Accumulate Carbon Points for every green service and eco-product purchase.", icon: <Leaf size={20} /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-luvia-rich-blue text-white flex items-center justify-center rounded-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white uppercase tracking-widest text-xs">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-luvia-rich-blue dark:text-luvia-fair-blue font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
              Launch Control Hub <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-white dark:bg-white/5 border dark:border-white/10 p-4 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" 
                  alt="LUVIA App interface showing job in progress" 
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass p-8 rounded-xl w-64 shadow-2xl text-center space-y-4">
                   <Smartphone className="mx-auto text-luvia-rich-blue dark:text-luvia-fair-blue" size={32} />
                   <p className="text-xs font-bold dark:text-white uppercase tracking-widest">Job in Progress</p>
                   <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-luvia-rich-blue w-2/3 animate-pulse"></div>
                   </div>
                   <p className="text-[10px] text-gray-400 uppercase font-bold">Scientific Janitorial (GRA PH)</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. About Snapshot */}
      <section className="py-24 bg-white dark:bg-luvia-dark-blue">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-rich-blue/10 text-luvia-rich-blue dark:text-luvia-fair-blue text-[10px] font-bold uppercase tracking-widest">
                The Institution
              </div>
              <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase">A Tech-First Maintenance Firm</h2>
              <div className="space-y-6">
                 <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    LUVIA is a tech-first property maintenance firm. Our philosophy is rooted in <strong>Asset Health</strong>—preserving the long-term value of your property through routine, structured, and verifiable care.
                 </p>
                 <div className="space-y-4 pt-4 border-t dark:border-white/5">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-[0.2em] mb-4">Professional Positioning</p>
                    <div className="flex items-center gap-4">
                       <CheckCircle size={18} className="text-luvia-light-green" />
                       <span className="text-sm font-bold dark:text-white">Structured Workflows</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle size={18} className="text-luvia-light-green" />
                       <span className="text-sm font-bold dark:text-white">Reliable Artisan Network</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle size={18} className="text-luvia-light-green" />
                       <span className="text-sm font-bold dark:text-white">Verifiable Biological Hygiene</span>
                    </div>
                 </div>
              </div>
           </div>
           <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] bg-luvia-slate dark:bg-white/5 rounded-sm overflow-hidden border dark:border-white/10 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass p-10 text-center space-y-2">
                 <Award className="text-luvia-rich-blue dark:text-luvia-fair-blue mx-auto mb-4" size={32} />
                 <h4 className="text-xl font-heading dark:text-white">LUVIA-Certified</h4>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest">Asset Health Management</p>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Featured Service Portfolio & 7. What We Do */}
      <section id="what-we-do" className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue/50">
        <div className="max-w-7xl mx-auto px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider">Service Categories</h2>
              <p className="text-gray-500 max-w-xl font-light leading-relaxed">Medical-grade standards. Vetted professionals. Escrow-backed security.</p>
            </div>
            <button onClick={() => navigate('/services')} className="flex items-center gap-2 text-luvia-rich-blue dark:text-luvia-fair-blue font-bold uppercase text-xs tracking-widest group">
              Explore Portfolio <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Scientific Janitorial */}
            <div className="glass p-10 space-y-8 hover:border-luvia-fair-blue transition-all group overflow-hidden relative flex flex-col">
               <div className="absolute -top-12 -right-12 w-40 h-40 bg-luvia-rich-blue/5 rounded-full"></div>
               <div className="relative z-10 space-y-6 flex-1">
                  <div className="w-16 h-16 bg-white dark:bg-white/10 flex items-center justify-center rounded-sm shadow-sm">
                    <FlaskConical className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={32} />
                  </div>
                  <h3 className="text-3xl font-heading dark:text-white">Scientific Janitorial</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Medical-grade cleaning for Residential and Commercial properties. We use specialized steam extractors and HEPA-filtered tools to ensure biological hygiene.</p>
               </div>
               <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2">
                     <Zap size={12} className="text-luvia-fair-blue" />
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialized Tools Used</span>
                  </div>
                  <button onClick={() => navigate('/services/scientific-janitorial')} className="text-xs font-bold text-luvia-rich-blue dark:text-luvia-fair-blue flex items-center gap-2 hover:gap-3 transition-all">
                     View Deep Dive <ArrowRight size={14} />
                  </button>
               </div>
            </div>
            
            {/* Maintenance Network */}
            <div className="glass p-10 space-y-8 hover:border-luvia-fair-blue transition-all group overflow-hidden relative flex flex-col">
               <div className="absolute -top-12 -right-12 w-40 h-40 bg-luvia-rich-blue/5 rounded-full"></div>
               <div className="relative z-10 space-y-6 flex-1">
                  <div className="w-16 h-16 bg-white dark:bg-white/10 flex items-center justify-center rounded-sm shadow-sm">
                    <ShieldCheck className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={32} />
                  </div>
                  <h3 className="text-3xl font-heading dark:text-white">Maintenance Network</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Escrow-backed technical pros for HVAC, mechanical, electrical, and plumbing. Our 70/30 security model ensures total artisan accountability.</p>
               </div>
               <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2">
                     <Zap size={12} className="text-luvia-fair-blue" />
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vetted Fixer Pool</span>
                  </div>
                  <button onClick={() => navigate('/services/maintenance-network')} className="text-xs font-bold text-luvia-rich-blue dark:text-luvia-fair-blue flex items-center gap-2 hover:gap-3 transition-all">
                     View Deep Dive <ArrowRight size={14} />
                  </button>
               </div>
            </div>

            {/* Eco-Marketplace */}
            <div className="glass p-10 space-y-8 hover:border-luvia-fair-blue transition-all group overflow-hidden relative flex flex-col">
               <div className="absolute -top-12 -right-12 w-40 h-40 bg-luvia-rich-blue/5 rounded-full"></div>
               <div className="relative z-10 space-y-6 flex-1">
                  <div className="w-16 h-16 bg-white dark:bg-white/10 flex items-center justify-center rounded-sm shadow-sm">
                    <ShoppingBag className="text-luvia-rich-blue dark:text-luvia-fair-blue" size={32} />
                  </div>
                  <h3 className="text-3xl font-heading dark:text-white">Eco-Marketplace</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Subscription-based distribution of LUVIA non-toxic agents. Medical-grade formulas manufactured for the Nigerian climate.</p>
               </div>
               <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2">
                     <Zap size={12} className="text-luvia-fair-blue" />
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sustainability Retail</span>
                  </div>
                  <button onClick={() => navigate('/app/marketplace')} className="text-xs font-bold text-luvia-rich-blue dark:text-luvia-fair-blue flex items-center gap-2 hover:gap-3 transition-all">
                     Browse Shop <ArrowRight size={14} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Immediate Proof Section (The LUVIA Standard) */}
      <section className="py-24 bg-white dark:bg-luvia-dark-blue">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-light-green/20 text-luvia-rich-blue dark:text-luvia-light-green text-[10px] font-bold uppercase tracking-widest">
                <Award size={14} /> The LUVIA Standard
              </div>
              <h2 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase">Port Harcourt's Hygiene Hub</h2>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Serving GRA Phase 1 & 2, Peter Odili, and major residential hubs in Port Harcourt. We provide <strong>Scientific Verification</strong> through medical-grade ATP testing protocols as standard.
              </p>
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <MapPin className="text-luvia-rich-blue dark:text-luvia-fair-blue flex-shrink-0 mt-1" size={18} />
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Location Focus: Rivers State Hubs</p>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-5 glass border-l-4 border-luvia-fair-blue space-y-2">
                       <h5 className="text-xs font-bold dark:text-white uppercase tracking-widest">Vetted Professionals</h5>
                       <p className="text-[10px] text-gray-400 leading-relaxed">Strict ID and skill vetting for all artisan network members.</p>
                    </div>
                    <div className="p-5 glass border-l-4 border-luvia-fair-blue space-y-2">
                       <h5 className="text-xs font-bold dark:text-white uppercase tracking-widest">Medical Equipment</h5>
                       <p className="text-[10px] text-gray-400 leading-relaxed">Industrial-grade extractors and biological monitoring tools.</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="flex-1">
                <div className="aspect-video bg-gray-200 dark:bg-white/5 rounded-sm overflow-hidden border dark:border-white/10 shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&get=80&w=1000" alt="ATP Testing Protocol" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-luvia-rich-blue/20"></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Escrow Visual (70/30 Model) */}
      <section className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue/50 border-y dark:border-white/5">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-widest">The 70/30 Trust Hold</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-light">
              Simple. Secure. Systematic. How we guarantee professional results for your property.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-6 glass p-8">
              <div className="text-6xl font-heading text-luvia-fair-blue/20">01</div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Deposit 100%</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">LUVIA Vault secures the full payment upon booking.</p>
            </div>
            <div className="space-y-6 glass p-8">
              <div className="text-6xl font-heading text-luvia-fair-blue/20">02</div>
              <h4 className="font-bold uppercase tracking-widest text-xs">70% Start Payout</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">Funds are released to the pro once work is verified on-site.</p>
            </div>
            <div className="space-y-6 glass p-8 border-t-4 border-luvia-rich-blue">
              <div className="text-6xl font-heading text-luvia-fair-blue/20">03</div>
              <h4 className="font-bold uppercase tracking-widest text-xs">30% Approval Hold</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">Held until YOU approve the digital photo SOP evidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Why Trust LUVIA? */}
      <section className="py-24 bg-white dark:bg-luvia-dark-blue">
         <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <h2 className="text-5xl font-heading uppercase tracking-wider text-luvia-rich-blue dark:text-white">Why Trust LUVIA?</h2>
                  <div className="space-y-10">
                     {[
                        { title: "Verified Process", desc: "Photo-SOPs required for every job before funds are released.", icon: <Camera size={24} /> },
                        { title: "Financial Security", desc: "The 70/30 Escrow-hold model protecting your funds from substandard work.", icon: <ShieldCheck size={24} /> },
                        { title: "Health First", desc: "100% Eco-certified non-toxic agents safe for families and medical settings.", icon: <HeartPulse size={24} /> },
                     ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 items-start">
                           <div className="w-12 h-12 bg-luvia-slate dark:bg-white/5 flex items-center justify-center rounded-sm flex-shrink-0 text-luvia-rich-blue dark:text-luvia-fair-blue">
                              {item.icon}
                           </div>
                           <div className="space-y-1">
                              <h4 className="font-bold text-xl dark:text-white uppercase tracking-tight">{item.title}</h4>
                              <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative group">
                  <div className="aspect-square bg-luvia-rich-blue flex items-center justify-center p-12 text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&get=80&w=1000" className="w-full h-full object-cover" />
                     </div>
                     <div className="relative z-10 space-y-6">
                        <ShieldCheck size={64} className="mx-auto text-luvia-fair-blue" />
                        <h3 className="text-4xl font-heading uppercase tracking-widest">Asset Safety Net</h3>
                        <p className="text-sm font-light leading-relaxed opacity-70 italic">"We bridge the gap between premium property ownership and reliable technical management."</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 11. Final Call to Action */}
      <section className="py-24 bg-luvia-dark-blue text-white">
         <div className="max-w-4xl mx-auto px-8 text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-heading uppercase tracking-wider">Book a Verified Service</h2>
            <p className="text-gray-400 font-light text-lg">
               Launch the web app for direct booking, or contact our support team for specialized corporate consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button 
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-12 py-5 bg-luvia-fair-blue text-luvia-dark-blue font-bold uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3"
               >
                  Launch App Hub <Zap size={18} />
               </button>
               <button 
                  onClick={() => window.open('https://wa.me/2349022861230', '_blank')}
                  className="w-full sm:w-auto px-12 py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-luvia-dark-blue transition-all"
               >
                  WhatsApp Support <Phone size={18} />
               </button>
            </div>
            <div className="pt-8 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
               <p className="text-[10px] font-bold uppercase tracking-widest">Official Support: +234 902 286 1230</p>
            </div>
         </div>
      </section>
    </div>
  );
}
