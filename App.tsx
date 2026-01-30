
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Sun, Moon, LogIn, ExternalLink, Menu, X, MessageSquare, ShieldCheck, Activity as ActivityIcon, ShoppingBag, User as UserIcon, LogOut, ArrowRight, Zap, Droplets, Info, Sparkles } from 'lucide-react';
import { User, UserRole, Job, JobStatus, SOPItem, SubscriptionTier } from './types';
import LandingPage from './pages/marketing/LandingPage';
import AboutPage from './pages/marketing/AboutPage';
import ServicesPage from './pages/marketing/ServicesPage';
import ServiceDetailPage from './pages/marketing/ServiceDetailPage';
import EscrowPage from './pages/marketing/EscrowPage';
import ContactPage from './pages/marketing/ContactPage';
import AuthGateway from './pages/app/AuthGateway';
import ClientDashboard from './pages/app/ClientDashboard';
import ProviderDashboard from './pages/app/ProviderDashboard'; 
import AdminDashboard from './pages/app/AdminDashboard';
import CleanerDashboard from './pages/app/CleanerDashboard';
import Marketplace from './pages/app/Marketplace';

// --- Contexts ---
interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

// --- Main Layout ---
const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, user } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue' : 'bg-white'}`}>
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b dark:border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-3xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue tracking-wider">LUVIA</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-luvia-rich-blue dark:text-gray-300">
          <button onClick={() => navigate('/')} className="hover:text-luvia-fair-blue transition-colors">Home</button>
          <button onClick={() => navigate('/about')} className="hover:text-luvia-fair-blue transition-colors">About</button>
          <button onClick={() => navigate('/services')} className="hover:text-luvia-fair-blue transition-colors">Services</button>
          <button onClick={() => navigate('/escrow')} className="hover:text-luvia-fair-blue transition-colors">The Escrow Model</button>
          <button onClick={() => navigate('/contact')} className="hover:text-luvia-fair-blue transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {user ? (
            <button 
              onClick={() => {
                if (user.role === UserRole.CLIENT) navigate('/dashboard/client');
                else if (user.role === UserRole.HANDYPERSON) navigate('/dashboard/handyperson');
                else if (user.role === UserRole.CLEANER) navigate('/dashboard/cleaner');
                else if (user.role === UserRole.ADMIN) navigate('/dashboard/admin');
              }}
              className="hidden md:flex items-center gap-2 px-6 py-2 bg-luvia-rich-blue text-white font-medium rounded-sm hover:bg-opacity-90 transition-all shadow-lg"
            >
              Go to Dashboard <ArrowRight size={16} />
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="hidden md:block text-sm font-semibold text-luvia-rich-blue dark:text-luvia-fair-blue">Login</button>
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:flex items-center gap-2 px-6 py-2 bg-luvia-rich-blue text-white font-medium rounded-sm hover:bg-opacity-90 transition-all shadow-lg"
              >
                Launch Web App <ExternalLink size={16} />
              </button>
            </>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-luvia-rich-blue text-white py-16 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="text-3xl font-heading tracking-widest">LUVIA</span>
            <p className="text-gray-300 text-sm leading-relaxed">
              Scientific Hygiene & Asset Management Hub. Based in Port Harcourt, serving Nigeria's modern property owners with clinical precision.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-luvia-fair-blue">Operations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Scientific Janitorial</li>
              <li>Maintenance Network</li>
              <li>Eco-Marketplace</li>
              <li>Escrow Security</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-luvia-fair-blue">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>luviacleans@gmail.com</li>
              <li>+234 902 286 1230</li>
              <li>Elelenwo Rd, GRA, Port Harcourt</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-luvia-fair-blue">Social</h4>
            <div className="flex gap-4">
              <span className="text-gray-400 hover:text-white cursor-pointer">Instagram</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">Facebook</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Luvia Bot ---
const LuviaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const isBubbleClosed = localStorage.getItem('luvia-bubble-closed');
    if (!isBubbleClosed) {
      const timer = setTimeout(() => setShowBubble(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
    localStorage.setItem('luvia-bubble-closed', 'true');
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-end gap-3 pointer-events-none">
      <div className="flex flex-col items-start pointer-events-auto">
        {showBubble && !isOpen && (
          <div className="bg-white dark:bg-luvia-rich-blue p-4 pr-10 rounded-xl shadow-2xl border dark:border-white/10 mb-4 animate-bounce relative max-w-[220px]">
            <p className="text-xs font-semibold text-luvia-rich-blue dark:text-white leading-relaxed">
              Hi. I'm Luvia. How can I help you today?
            </p>
            <button 
              onClick={closeBubble}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              aria-label="Close bot message"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-luvia-rich-blue dark:bg-luvia-fair-blue text-white dark:text-luvia-dark-blue rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-luvia-dark-blue hover:scale-105 transition-transform"
        >
          <ActivityIcon size={32} />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:left-8 md:w-96 h-[500px] bg-white dark:bg-luvia-dark-blue shadow-2xl rounded-2xl border dark:border-white/10 overflow-hidden flex flex-col pointer-events-auto">
          <div className="bg-luvia-rich-blue p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-luvia-fair-blue rounded-full flex items-center justify-center text-luvia-rich-blue">
                <ActivityIcon size={20} />
              </div>
              <div>
                <p className="font-bold">Luvia Bot</p>
                <p className="text-[10px] opacity-70 uppercase tracking-widest">Scientific Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
             <div className="p-3 bg-luvia-slate dark:bg-white/5 rounded-lg text-xs dark:text-gray-300">
               Welcome to LUVIA Support. I am context-aware and ready to assist you.
             </div>
             <button className="w-full text-left bg-gray-100 dark:bg-white/5 p-3 rounded-lg text-sm hover:bg-luvia-fair-blue/20 transition-all">
                How does the 70/30 Escrow work?
             </button>
             <button className="w-full text-left bg-gray-100 dark:bg-white/5 p-3 rounded-lg text-sm hover:bg-luvia-fair-blue/20 transition-all">
                Tell me about Scientific Janitorial.
             </button>
             <button className="w-full text-left bg-gray-100 dark:bg-white/5 p-3 rounded-lg text-sm hover:bg-luvia-fair-blue/20 transition-all">
                Book a maintenance professional.
             </button>
          </div>
          <div className="p-4 border-t dark:border-white/10">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              className="w-full px-4 py-2 rounded-sm border dark:border-white/20 bg-transparent text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // High-fidelity initial user state
  const [user, setUser] = useState<User | null>({
    id: "user-8812",
    name: "Sarah Premium",
    email: "sarah@luvia.com",
    role: UserRole.CLIENT,
    carbonPoints: 12450,
    streak: 5,
    level: "APPRENTICE",
    tier: SubscriptionTier.SAPLING,
    location: "GRA Phase 2, PH",
    avatar: "https://ui-avatars.com/api/?name=Sarah+P&background=003366&color=fff",
    subUsers: [
      { id: 'sub-1', name: 'Estate Manager', role: 'OPERATOR', permissions: ['VERIFY_JOBS', 'GUEST_ACCESS'] },
      { id: 'sub-2', name: 'Household Staff', role: 'VIEWER', permissions: ['VIEW_SOP'] }
    ]
  });

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "LUV-8842",
      serviceName: "Scientific Janitorial",
      clientName: "Sarah P.",
      clientId: "user-8812",
      providerId: "pro-1",
      providerName: "John T.",
      status: JobStatus.COMPLETED,
      totalAmount: 45000,
      escrowAmount: 13500,
      releasedAmount: 31500,
      date: "2025-05-24",
      location: "GRA Phase 2, Port Harcourt",
      type: 'cleaning',
      sopList: [
        { id: "s1", task: "ATP Baseline Test", category: "Scientific", isCompleted: true, isMandatory: true, value: 1240, unit: 'RLU', description: "Initial microbial load detection." },
        { id: "s2", task: "HEPA Air Scrubbing", category: "Task", isCompleted: true, isMandatory: true, description: "Particulate extraction from ceiling voids.", evidenceUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500" },
        { id: "s3", task: "Eco-Agent Application", category: "Chemical", isCompleted: true, isMandatory: true, description: "LUVIA non-toxic descaler dwell time: 5mins.", evidenceUrl: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=500" },
        { id: "s4", task: "Macro Evidence: Faucets", category: "Evidence", isCompleted: true, isMandatory: true, evidenceUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=500", description: "Photo proof of mineral removal." },
        { id: "s5", task: "ATP Post-Clean Reading", category: "Scientific", isCompleted: true, isMandatory: true, value: 14, unit: 'RLU', description: "Final clinical validation." }
      ]
    }
  ]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, jobs, setJobs }}>
      <Routes>
        <Route path="/" element={<MarketingLayout><LandingPage /></MarketingLayout>} />
        <Route path="/about" element={<MarketingLayout><AboutPage /></MarketingLayout>} />
        <Route path="/services" element={<MarketingLayout><ServicesPage /></MarketingLayout>} />
        <Route path="/services/:id" element={<MarketingLayout><ServiceDetailPage /></MarketingLayout>} />
        <Route path="/escrow" element={<MarketingLayout><EscrowPage /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
        <Route path="/login" element={<AuthGateway />} />
        
        <Route path="/app" element={
          user?.role === UserRole.CLIENT ? <Navigate to="/dashboard/client" /> : 
          user?.role === UserRole.HANDYPERSON ? <Navigate to="/dashboard/handyperson" /> : 
          user?.role === UserRole.CLEANER ? <Navigate to="/dashboard/cleaner" /> : 
          user?.role === UserRole.ADMIN ? <Navigate to="/dashboard/admin" /> : 
          <Navigate to="/login" replace />
        } />

        <Route path="/dashboard/client" element={user?.role === UserRole.CLIENT ? <ClientDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/handyperson" element={user?.role === UserRole.HANDYPERSON ? <ProviderDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/cleaner" element={user?.role === UserRole.CLEANER ? <CleanerDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/admin" element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} />
        
        <Route path="/app/marketplace" element={<Marketplace />} />
      </Routes>
      <LuviaBot />
    </AppContext.Provider>
  );
}
