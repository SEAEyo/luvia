
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

const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, user } = useApp();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue text-white' : 'bg-white text-luvia-dark-blue'}`}>
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b dark:border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-3xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue tracking-wider">LUVIA</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-luvia-rich-blue dark:text-gray-300">
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
            <button onClick={() => navigate('/app')} className="px-6 py-2 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">Hub <ArrowRight size={14} className="inline ml-1"/></button>
          ) : (
            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">Login</button>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState<User | null>({
    id: "luvia-usr-99",
    name: "Sarah Premium",
    email: "sarah@luvia.com",
    role: UserRole.CLIENT,
    carbonPoints: 14200,
    streak: 8,
    level: "APPRENTICE",
    tier: SubscriptionTier.SAPLING,
    location: "GRA Phase 2, PH",
    totalJobs: 14,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  });

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "LUV-8842",
      serviceName: "Scientific Janitorial",
      clientName: "Sarah Premium",
      clientId: "luvia-usr-99",
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
        { id: "s1", task: "ATP Baseline Test", category: "Scientific", isCompleted: true, isMandatory: true, value: 1240, description: "Initial reading." },
        { id: "s2", task: "Macro Evidence: Faucets", category: "Evidence", isCompleted: true, isMandatory: true, evidenceUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500", description: "Visual proof." },
        { id: "s3", task: "HEPA Particulate Extract", category: "Task", isCompleted: true, isMandatory: true, description: "Air scrubbing." }
      ]
    }
  ]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
    </AppContext.Provider>
  );
}
