
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, User as UserIcon, Hammer, ChevronRight, 
  Mail, Lock, ArrowLeft, MapPin, Briefcase, FileText, 
  Sparkles, CheckCircle, Globe, Zap, Upload, Fingerprint,
  Chrome, Wrench, Shield, Home
} from 'lucide-react';
import { useApp } from '../../App';
import { UserRole } from '../../types';

const NEIGHBORHOODS = ["GRA Phase 1", "GRA Phase 2", "Elelenwa", "Peter Odili", "Trans Amadi", "Ada George"];
const SPECIALIZATIONS = ["Technical Plumber", "HVAC Engineer", "Certified Electrician", "Structural Mason", "Interior Painter", "Mover"];

// Custom Spinner Component
const LuviaLoader = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 bg-luvia-yellow rounded-full animate-pulse shadow-[0_0_20px_rgba(255,215,0,0.6)]"></div>
  </div>
);

// Floating Label Input Component
const FloatingInput = ({ label, icon: Icon, type, value, onChange, placeholder, required = true, options }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value && value.length > 0;
  
  return (
    <div className="relative mb-6 group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${isFocused ? 'text-luvia-rich-blue' : 'text-gray-400'}`}>
        <Icon size={18} />
      </div>
      
      {type === 'select' ? (
        <select
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border rounded-sm outline-none transition-all appearance-none text-sm
            ${isFocused ? 'border-luvia-fair-blue ring-4 ring-luvia-fair-blue/20' : 'border-[#CBD5E1] dark:border-white/10'}
          `}
        >
          <option value="" disabled hidden></option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          required={required}
          type={type} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border rounded-sm outline-none transition-all text-sm
            ${isFocused ? 'border-luvia-fair-blue ring-4 ring-luvia-fair-blue/20' : 'border-[#CBD5E1] dark:border-white/10'}
          `}
        />
      )}

      <label 
        className={`absolute left-12 transition-all pointer-events-none duration-200
          ${isFocused || isFilled 
            ? '-top-2.5 left-4 bg-white dark:bg-luvia-dark-blue px-2 text-[10px] font-bold text-luvia-rich-blue uppercase tracking-widest' 
            : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default function AuthGateway() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'choice' | 'login' | 'signup' | 'welcome'>('choice');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useApp();

  // Handle Role Selection from Choice route
  const handleChoice = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('login');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // REDIRECT ENGINE LOGIC
    setTimeout(() => {
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || email.split('@')[0],
        email: email,
        role: role,
        carbonPoints: view === 'signup' ? 50 : 50,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=003366&color=fff`,
        location,
        specialization
      };

      if (view === 'signup') {
        setView('welcome');
        setTimeout(() => {
          setUser(mockUser);
          redirectByRole(role);
        }, 4000);
      } else {
        setUser(mockUser);
        redirectByRole(role);
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const redirectByRole = (role: UserRole) => {
    if (role === UserRole.CLIENT) navigate('/dashboard/client');
    else if (role === UserRole.HANDYPERSON) navigate('/dashboard/handyperson');
    else if (role === UserRole.CLEANER) navigate('/dashboard/cleaner');
    else if (role === UserRole.ADMIN) navigate('/dashboard/admin');
  };

  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-luvia-dark-blue flex items-center justify-center p-8 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center space-y-10 max-w-md animate-grow">
          <div className="relative w-32 h-32 mx-auto">
             <div className="absolute inset-0 bg-luvia-light-green/20 rounded-full animate-ping"></div>
             <div className="relative w-32 h-32 bg-luvia-light-green text-luvia-rich-blue rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <LeafGrowthAnimation />
             </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-white uppercase tracking-widest">Eco-Welcome!</h2>
            <p className="text-gray-300 font-light italic">Your sprout has appeared. Earned 50 Carbon Points.</p>
          </div>
          <div className="glass p-6 border-luvia-light-green/30 inline-block bg-white/5 rounded-xl">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-luvia-light-green text-luvia-rich-blue flex items-center justify-center rounded-lg font-bold text-xl shadow-lg">
                  +50
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Seed Points</p>
                  <p className="text-[10px] text-luvia-fair-blue font-semibold">SUSTAINABILITY TRACKER ONLINE</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-luvia-dark-blue overflow-hidden">
      {/* LEFT Branding Panel (Split-Screen Desktop) */}
      <div className="hidden lg:flex flex-[1.4] relative items-center justify-center p-20 overflow-hidden bg-luvia-rich-blue">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=2000" 
            alt="LUVIA Architectural Space" 
            className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-105" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-luvia-rich-blue/70 via-luvia-rich-blue/40 to-luvia-rich-blue"></div>
        <div className="relative z-10 text-white max-w-lg space-y-12 text-left">
          <div className="space-y-4">
            <span className="text-7xl font-heading tracking-widest block leading-none">LUVIA</span>
            <div className="h-1.5 w-32 bg-luvia-fair-blue"></div>
          </div>
          <h2 className="text-5xl font-light italic leading-tight opacity-90">
            "Science-Backed Care. <br/>
            <span className="text-luvia-fair-blue font-bold">Escrow-Protected Trust.</span>"
          </h2>
          
          <div className="grid grid-cols-2 gap-10 pt-12 border-t border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-luvia-fair-blue">
                <Globe size={24} />
                <h4 className="text-[11px] font-bold uppercase tracking-widest">ESG Aligned</h4>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">Systematic carbon tracking for every maintenance job.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-luvia-fair-blue">
                <ShieldCheck size={24} />
                <h4 className="text-[11px] font-bold uppercase tracking-widest">Security First</h4>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">Encrypted data vaults and 70/30 escrow safeguards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT Auth Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 space-y-10 overflow-y-auto min-h-screen lg:min-h-0 bg-white dark:bg-luvia-dark-blue border-l dark:border-white/5">
        <div className="w-full max-w-md flex flex-col">
          <button 
            onClick={() => {
              if (view === 'login' || view === 'signup') setView('choice');
              else navigate('/');
            }} 
            className="self-start flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-luvia-rich-blue transition-colors mb-10 group"
          >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {view === 'choice' ? 'Home' : 'Back to Identity'}
          </button>

          {view === 'choice' ? (
            <div className="space-y-8 animate-grow">
              <div className="space-y-2">
                <h3 className="text-4xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider leading-none">Who Are You?</h3>
                <p className="text-sm text-gray-500 font-light">Identify your profile within the LUVIA ecosystem.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { r: UserRole.CLIENT, label: "Client", desc: "Property Owner / Manager", icon: <Home /> },
                  { r: UserRole.HANDYPERSON, label: "Handyperson", desc: "Skilled Artisan (Plumber, Tech, etc.)", icon: <Wrench /> },
                  { r: UserRole.CLEANER, label: "Cleaning Staff", desc: "Part of the LUVIA janitorial team", icon: <Sparkles /> }
                ].map((card) => (
                  <button 
                    key={card.r}
                    onClick={() => handleChoice(card.r)}
                    className="flex items-center gap-6 p-6 border-2 border-[#F1F5F9] dark:border-white/5 hover:border-luvia-fair-blue bg-luvia-slate dark:bg-white/5 transition-all group rounded-sm text-left"
                  >
                    <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-sm flex items-center justify-center text-luvia-rich-blue dark:text-luvia-fair-blue group-hover:bg-luvia-rich-blue group-hover:text-white transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-luvia-rich-blue dark:text-white uppercase tracking-tight">{card.label}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{card.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => handleChoice(UserRole.ADMIN)} className="w-full py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-luvia-rich-blue transition-colors text-center">
                System Admin Access
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-8 animate-grow">
              <div className="space-y-3">
                <h3 className="text-5xl font-heading text-luvia-rich-blue dark:text-white uppercase tracking-wider leading-none">
                  {view === 'login' ? 'Access' : 'Entry'}
                </h3>
                <p className="text-sm text-gray-500 font-light">
                  {view === 'login' ? `Authenticate as ${role.toLowerCase()}.` : `Establish identity: ${role.toLowerCase()}.`}
                </p>
              </div>

              {/* SOCIAL / MAGIC LOGIN */}
              {view === 'login' && (
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center gap-2 py-4 border border-[#E2E8F0] dark:border-white/10 rounded-sm hover:bg-luvia-slate transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Chrome size={16} /> Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-4 border border-[#E2E8F0] dark:border-white/10 rounded-sm hover:bg-luvia-slate transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Mail size={16} /> Magic Link
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {view === 'signup' && (
                  <FloatingInput label="Full Name" icon={UserIcon} type="text" value={name} onChange={setName} />
                )}
                <FloatingInput label="Email Address" icon={Mail} type="email" value={email} onChange={setEmail} />
                
                {view === 'signup' && role === UserRole.CLIENT && (
                  <FloatingInput label="Port Harcourt Neighborhood" icon={MapPin} type="select" value={location} onChange={setLocation} options={NEIGHBORHOODS} />
                )}

                {view === 'signup' && (role === UserRole.HANDYPERSON || role === UserRole.CLEANER) && (
                  <>
                    <FloatingInput label="Specialization" icon={Briefcase} type="select" value={specialization} onChange={setSpecialization} options={SPECIALIZATIONS} />
                    <div className="relative mb-6">
                      <div className="flex items-center gap-4 p-5 bg-luvia-slate dark:bg-white/5 border-2 border-dashed border-[#CBD5E1] dark:border-white/20 rounded-sm cursor-pointer hover:bg-luvia-fair-blue/10 transition-all">
                        <Upload size={20} className="text-gray-400" />
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-luvia-rich-blue dark:text-luvia-fair-blue">ID/Cert Validation</p>
                          <p className="text-[9px] text-gray-400 font-medium">JPG/PDF (Max 5MB)</p>
                        </div>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </>
                )}

                <FloatingInput label="LUVIA Access Password" icon={Lock} type="password" value={password} onChange={setPassword} />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-luvia-rich-blue text-white font-bold rounded-sm shadow-xl flex items-center justify-center gap-3 hover:bg-luvia-dark-blue transition-all disabled:opacity-50"
              >
                {isSubmitting ? <LuviaLoader /> : <>{view === 'login' ? 'Authenticate' : 'Establish Sprout'}<ChevronRight size={18} /></>}
              </button>

              <div className="pt-6 flex flex-col items-center gap-6 border-t border-gray-100 dark:border-white/5">
                <button type="button" onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-luvia-rich-blue">
                  {view === 'login' ? 'No session? Start Onboarding' : 'Existing associate? Log In'}
                </button>
                
                {/* SECURITY BADGES */}
                <div className="flex gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-luvia-rich-blue dark:text-luvia-fair-blue" />
                    <span className="text-[9px] font-bold uppercase">SSL SECURED</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={18} className="text-luvia-rich-blue dark:text-luvia-fair-blue" />
                    <span className="text-[9px] font-bold uppercase">DATA ENCRYPTED</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const LeafGrowthAnimation = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-grow">
    <path className="animate-pulse" d="M12 22v-8" />
    <path className="animate-[grow_1.5s_ease-out_forwards]" d="M12 14c-4-4-4-9 0-11 4 2 4 7 0 11Z" />
    <path className="animate-[grow_2s_ease-out_forwards] delay-100" d="m12 14-4-4" />
    <path className="animate-[grow_2s_ease-out_forwards] delay-300" d="m12 10 4-4" />
  </svg>
);
