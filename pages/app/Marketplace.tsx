
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, RefreshCw, Leaf, Search, Filter, ShoppingCart, 
  ArrowLeft, Zap, Info, ShieldCheck, CheckCircle, Package, X, 
  FlaskConical, TrendingUp, QrCode, Camera, Minus, Plus, 
  ChevronRight, Trash2, CreditCard, Sparkles, Droplets, Target,
  Star, BadgeCheck, Microscope, Layers, ArrowRight, BookOpen,
  Waves, Wind, Thermometer, ShieldAlert, Award
} from 'lucide-react';
import { useApp } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Product, JobStatus } from '../../types';

// --- BUSINESS LOGIC ---
const SP_TO_NAIRA = 0.01; // 100 SP = ₦1

const MARKET_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'LUVIA Signature Fragrance',
    price: 4500,
    description: 'Eco-certified atmospheric infusion. Molecularly engineered to neutralize VOCs and common pathogens while leaving a premium, non-toxic clinical scent.',
    ingredients: ['Natural Essences', 'Bio-ethanol', 'Linalool', 'Purified Water'],
    killList: ['Odor Particulates', 'Aerosol Contaminants'],
    carbonOffset: '0.5kg CO2',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    sustainabilityProof: '100% Biodegradable',
    isSyncEligible: true,
    size: '500ml'
  },
  {
    id: 'p2',
    name: 'Eco-Green Descaler',
    price: 3200,
    description: 'Food-safe descaling agent. Dissolves calcium and mineral deposits on premium fixtures without eroding delicate metallic coatings.',
    ingredients: ['Citric Acid', 'Plant-based Surfactants', 'Lemon Peel Extract'],
    killList: ['Mineral Deposits', 'Calcium Buildup', '99.9% Bacteria'],
    carbonOffset: '1.2kg CO2',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600',
    sustainabilityProof: 'Phosphate Free',
    isSyncEligible: true,
    size: '1L'
  },
  {
    id: 'p3',
    name: 'Multi-Surface Bio-Clean',
    price: 5000,
    description: 'Enzymatic decontamination agent. Medical-grade performance on all hard surfaces. Zero toxic residue, safe for infant-contact zones.',
    ingredients: ['Coconut Oil Surfactants', 'Enzymatic Complex', 'Aloe Extract'],
    killList: ['E. coli', 'Salmonella', 'SARS-CoV-2', 'Listeria'],
    carbonOffset: '2.0kg CO2',
    category: 'Liquids',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    sustainabilityProof: 'Cruelty Free',
    isSyncEligible: true,
    size: '2L'
  },
  {
    id: 'p4',
    name: 'Reclamation Hero Kit',
    price: 18500,
    description: 'Comprehensive high-accumulation kit for hoarder restoration or industrial particulate removal. Includes heavy-duty bio-agents and HEPA filters.',
    ingredients: ['Industrial Enzymes', 'Micro-particulate binders'],
    killList: ['Fungal Spores', 'Heavy Particulates', 'Pathogenic Biofilms'],
    carbonOffset: '5.5kg CO2',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=600',
    sustainabilityProof: 'Recyclable Packaging',
    isSyncEligible: false,
    size: 'Bulk Set'
  }
];

export default function Marketplace() {
  const { theme, user, setUser, jobs } = useApp();
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'shop' | 'subscriptions' | 'closet'>('shop');
  const [category, setCategory] = useState<'All' | 'Liquids' | 'Specialty' | 'Tools'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{product: Product, quantity: number, isSub: boolean}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [spDiscount, setSpDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- COMPUTED ---
  const activeJob = useMemo(() => jobs.find(j => j.status !== JobStatus.VERIFIED), [jobs]);
  
  const filtered = useMemo(() => 
    category === 'All' ? MARKET_PRODUCTS : MARKET_PRODUCTS.filter(p => p.category === category)
  , [category]);

  const cartStats = useMemo(() => {
    const subtotal = cart.reduce((acc, curr) => {
      const p = curr.isSub ? curr.product.price * 0.9 : curr.product.price;
      return acc + (p * curr.quantity);
    }, 0);
    const discount = spDiscount * SP_TO_NAIRA;
    const total = Math.max(0, subtotal - discount);
    const spEarned = Math.floor(total / 100);
    return { subtotal, discount, total, spEarned };
  }, [cart, spDiscount]);

  // --- ACTIONS ---
  const addToCart = (product: Product, isSub = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.isSub === isSub);
      if (existing) {
        return prev.map(i => (i.product.id === product.id && i.isSub === isSub) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1, isSub }];
    });
    if (!selectedProduct) setIsCartOpen(true);
  };

  const handleCheckout = async () => {
    if (!user) return;
    setIsProcessing(true);
    // Simulate payment gateway
    await new Promise(r => setTimeout(r, 2000));
    
    const finalPoints = (user.carbonPoints || 0) - spDiscount + cartStats.spEarned;
    setUser({ ...user, carbonPoints: finalPoints });
    
    setIsProcessing(false);
    setIsCartOpen(false);
    setCart([]);
    setSpDiscount(0);
    alert(`Institutional Order Finalized. ${syncEnabled ? `Synced to session ${activeJob?.id || 'LUV-NEXT'}.` : 'Priority shipping initiated.'} +${cartStats.spEarned} SP Earned.`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-luvia-dark-blue' : 'bg-luvia-slate'} transition-colors duration-500`}>
      
      {/* HEADER: CLINICAL RETAIL HUB */}
      <header className="glass sticky top-0 z-[60] px-8 py-6 flex items-center justify-between border-b dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/dashboard/client')} className="p-3 glass rounded-full hover:bg-luvia-rich-blue hover:text-white transition-all group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-heading text-luvia-rich-blue dark:text-luvia-fair-blue uppercase tracking-widest leading-none">Marketplace</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Eco-System Supply Chain</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-luvia-slate dark:bg-white/5 p-1 rounded-sm border dark:border-white/10">
          {[
            { id: 'shop', label: 'Storefront', icon: <ShoppingBag size={14}/> },
            { id: 'subscriptions', label: 'Automations', icon: <RefreshCw size={14}/> },
            { id: 'closet', label: 'My Closet', icon: <Package size={14}/> }
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`flex items-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === t.id ? 'bg-luvia-rich-blue text-white shadow-lg' : 'text-gray-500 hover:text-luvia-rich-blue dark:hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Available Credit</span>
             <span className="text-sm font-bold dark:text-white font-mono">{user?.carbonPoints?.toLocaleString()} SP</span>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-luvia-rich-blue text-white rounded-sm shadow-xl hover:scale-105 transition-transform">
             <ShoppingCart size={22} />
             {cart.length > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 bg-luvia-yellow text-luvia-dark-blue text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-luvia-dark-blue animate-grow">{cart.reduce((a,c) => a+c.quantity,0)}</span>}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 lg:p-12 animate-grow">
        
        {/* SHOP TAB */}
        {activeTab === 'shop' && (
          <div className="space-y-12">
            {/* AI Refill Intelligence Banner */}
            <div className="glass p-10 border-l-8 border-luvia-yellow bg-gradient-to-r from-white to-luvia-slate dark:from-white/5 dark:to-transparent flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
               <div className="absolute -right-12 -top-12 opacity-5 text-luvia-rich-blue group-hover:rotate-12 transition-transform duration-1000"><RefreshCw size={300} /></div>
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-luvia-yellow/20 text-luvia-dark-blue rounded-sm flex items-center justify-center"><Thermometer size={40} /></div>
                  <div>
                     <h4 className="text-2xl font-heading dark:text-white uppercase tracking-wider">Replenishment Logic</h4>
                     <p className="text-sm text-gray-500 font-medium max-w-md">Predictive Analysis: Your 'Multi-Surface Bio-Clean' is at <span className="text-red-500 font-bold">18% capacity</span>. Schedule LUVIA-Sync delivery to avoid clinical downtime.</p>
                  </div>
               </div>
               <button onClick={() => addToCart(MARKET_PRODUCTS[2], true)} className="relative z-10 px-10 py-4 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-luvia-yellow hover:text-luvia-dark-blue transition-all">Schedule Sync Auto-Refill</button>
            </div>

            {/* Category Filters */}
            <div className="flex items-center justify-between border-b dark:border-white/10 pb-6 overflow-x-auto no-scrollbar gap-8">
               <div className="flex items-center gap-10">
                  {['All', 'Liquids', 'Specialty', 'Tools'].map(c => (
                    <button key={c} onClick={() => setCategory(c as any)} className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative py-2 ${category === c ? 'text-luvia-rich-blue dark:text-luvia-fair-blue' : 'text-gray-400 hover:text-gray-600'}`}>
                      {c}
                      {category === c && <div className="absolute bottom-0 left-0 w-full h-1 bg-luvia-rich-blue dark:bg-luvia-fair-blue animate-grow" />}
                    </button>
                  ))}
               </div>
               <div className="flex items-center gap-4 glass px-6 py-3 rounded-full border dark:border-white/5">
                  <Search size={14} className="text-gray-400" />
                  <input type="text" placeholder="Search Agents..." className="bg-transparent text-[10px] font-bold uppercase outline-none w-48" />
               </div>
            </div>

            {/* Product Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
               {filtered.map(p => (
                 <div key={p.id} className="glass group overflow-hidden flex flex-col bg-white dark:bg-white/5 border-2 border-transparent hover:border-luvia-fair-blue transition-all duration-500 shadow-lg">
                    <div className="aspect-[3/4] relative overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(p)}>
                       <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms]" alt={p.name} />
                       <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className="px-3 py-1 bg-luvia-light-green text-luvia-rich-blue text-[8px] font-bold uppercase tracking-widest shadow-xl">{p.sustainabilityProof}</span>
                          {p.isSyncEligible && <span className="px-3 py-1 bg-luvia-rich-blue text-white text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xl"><RefreshCw size={8}/> LUVIA Sync</span>}
                       </div>
                    </div>
                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                       <div className="space-y-1">
                          <p className="text-[9px] font-bold text-luvia-fair-blue uppercase tracking-widest">{p.category}</p>
                          <h3 className="text-xl font-bold dark:text-white uppercase leading-tight truncate">{p.name}</h3>
                       </div>
                       <p className="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed">{p.description}</p>
                       <div className="pt-6 border-t dark:border-white/5 mt-auto flex items-center justify-between">
                          <div>
                             <p className="text-2xl font-bold dark:text-white font-mono tracking-tighter">₦{p.price.toLocaleString()}</p>
                             <p className="text-[8px] text-gray-400 font-bold uppercase">+{Math.floor(p.price/100)} S-Points</p>
                          </div>
                          <button onClick={() => addToCart(p)} className="p-4 bg-luvia-rich-blue text-white rounded-sm hover:bg-luvia-light-green hover:text-luvia-rich-blue transition-all shadow-xl group-hover:scale-110">
                             <ShoppingCart size={20} />
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* CLOSET TAB */}
        {activeTab === 'closet' && (
          <div className="space-y-12">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                   <h2 className="text-4xl font-heading dark:text-white uppercase tracking-widest">Digital Closet</h2>
                   <p className="text-sm text-gray-500 font-light">Biological inventory management and asset tracking.</p>
                </div>
                <button className="px-10 py-5 bg-luvia-yellow text-luvia-dark-blue font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl">
                   <QrCode size={18} /> Link New Asset Tag
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MARKET_PRODUCTS.slice(0,3).map((p, i) => (
                  <div key={i} className="glass p-10 space-y-8 border-l-4 border-luvia-fair-blue bg-white dark:bg-white/5 relative overflow-hidden group">
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-luvia-slate dark:bg-white/10 p-2 border dark:border-white/10 rounded-sm">
                           <img src={p.image} className="w-full h-full object-cover grayscale opacity-50" />
                        </div>
                        <div className="space-y-2 flex-1">
                           <h4 className="text-lg font-bold dark:text-white uppercase leading-none">{p.name}</h4>
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Institutional Stock</span>
                              <span className={`text-sm font-bold font-mono ${i===2 ? 'text-red-500' : 'text-luvia-light-green'}`}>{i===2 ? '18%' : '85%'}</span>
                           </div>
                           <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${i===2 ? 'bg-red-500' : 'bg-luvia-light-green'}`} style={{ width: i===2 ? '18%' : '85%' }}></div>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 pt-4">
                        <button className="py-3 border dark:border-white/10 text-[9px] font-bold uppercase tracking-widest dark:text-gray-400 hover:text-luvia-rich-blue transition-all flex items-center justify-center gap-2">
                           <Microscope size={12}/> Scientific Guide
                        </button>
                        <button onClick={() => addToCart(p)} className="py-3 bg-luvia-rich-blue text-white text-[9px] font-bold uppercase tracking-widest shadow-lg">Refill Now</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </main>

      {/* MODAL: SCIENTIFIC DEEP DIVE */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-grow">
           <div className="absolute inset-0 bg-luvia-dark-blue/98 backdrop-blur-3xl" onClick={() => setSelectedProduct(null)}></div>
           <div className="relative glass bg-white dark:bg-luvia-dark-blue w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row border-2 border-white/10 shadow-[0_60px_150px_rgba(0,0,0,0.8)]">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 z-10 text-gray-400 hover:text-red-500 transition-all"><X size={40}/></button>
              
              <div className="lg:w-[45%] bg-white p-12 flex items-center justify-center border-r dark:border-white/10 relative">
                 <img src={selectedProduct.image} className="max-w-full max-h-[60vh] object-contain grayscale hover:grayscale-0 transition-all duration-1000" />
                 <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                    <div className="glass px-8 py-4 bg-luvia-light-green/10 border-luvia-light-green/20 rounded-sm flex items-center gap-4">
                       <Leaf size={32} className="text-luvia-light-green" />
                       <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-luvia-rich-blue">Carbon Offset Logic</p>
                          <p className="text-3xl font-bold text-luvia-rich-blue font-mono">{selectedProduct.carbonOffset}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex-1 p-12 lg:p-20 overflow-y-auto space-y-16 custom-scrollbar">
                 <div className="space-y-6">
                    <p className="text-[12px] font-bold text-luvia-fair-blue uppercase tracking-[0.5em]">{selectedProduct.category}</p>
                    <h2 className="text-6xl font-heading dark:text-white uppercase leading-none">{selectedProduct.name}</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl">{selectedProduct.description}</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10 pb-4 flex items-center gap-3"><Droplets size={16}/> Biological Kill List</h4>
                       <div className="space-y-4">
                          {selectedProduct.killList?.map(k => (
                            <div key={k} className="flex items-center gap-4 text-sm font-medium dark:text-gray-300 bg-luvia-slate dark:bg-white/5 p-3 rounded-sm">
                               <CheckCircle size={18} className="text-luvia-light-green" /> {k}
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-8">
                       <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10 pb-4 flex items-center gap-3"><FlaskConical size={16}/> Chemical Integrity</h4>
                       <div className="flex flex-wrap gap-3">
                          {selectedProduct.ingredients.map(i => (
                            <span key={i} className="px-4 py-2 border dark:border-white/20 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-sm">{i}</span>
                          ))}
                       </div>
                       <div className="p-6 bg-luvia-rich-blue/5 border border-luvia-rich-blue/20 rounded-sm">
                          <p className="text-[10px] font-bold text-luvia-rich-blue dark:text-luvia-fair-blue uppercase mb-2">Scientific Note:</p>
                          <p className="text-[11px] text-gray-500 italic">"LUVIA agents are derived from organic citrus and coconut bases, ensuring zero VOC emission post-application."</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-12 border-t dark:border-white/10 flex flex-col sm:flex-row items-center gap-10">
                    <div className="text-5xl font-bold dark:text-white font-mono tracking-tighter">₦{selectedProduct.price.toLocaleString()}</div>
                    <div className="flex flex-1 gap-4 w-full">
                       <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="flex-1 py-6 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center gap-4">Add to Collection <ShoppingCart size={20}/></button>
                       <button onClick={() => { addToCart(selectedProduct, true); setSelectedProduct(null); }} className="flex-1 py-6 border-2 border-luvia-rich-blue dark:border-luvia-fair-blue text-luvia-rich-blue dark:text-luvia-fair-blue font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-4">Activate Auto-Sync <RefreshCw size={20}/></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CART SIDEBAR: INSTITUTIONAL LOGISTICS */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[150] overflow-hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
           <div className="absolute inset-y-0 right-0 max-w-md w-full glass bg-white dark:bg-luvia-dark-blue shadow-2xl flex flex-col animate-slide-in">
              <div className="p-10 border-b dark:border-white/10 flex items-center justify-between bg-luvia-rich-blue text-white">
                 <div className="flex items-center gap-4">
                    <ShoppingBag />
                    <h3 className="text-2xl font-heading uppercase tracking-[0.2em]">Institutional Order</h3>
                 </div>
                 <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform duration-500"><X size={32}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                 {cart.length > 0 ? (
                   cart.map((item, idx) => (
                     <div key={idx} className="flex gap-8 group">
                        <div className="w-24 h-24 bg-luvia-slate dark:bg-white/5 p-2 rounded-sm border dark:border-white/10 group-hover:border-luvia-fair-blue transition-all">
                           <img src={item.product.image} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1 space-y-2">
                           <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold uppercase dark:text-white leading-tight">{item.product.name}</h4>
                              <button onClick={() => setCart(prev => prev.filter((_,i)=>i!==idx))} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                           </div>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.isSub ? 'Auto-Refill Loop (10% OFF)' : 'Manual Purchase'}</p>
                           <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center gap-6 bg-luvia-slate dark:bg-white/5 rounded-full px-6 py-2">
                                 <button onClick={() => { if(item.quantity>1) setCart(prev => prev.map((it,i)=>i===idx?{...it,quantity:it.quantity-1}:it))}} className="text-gray-500 hover:text-luvia-rich-blue"><Minus size={14}/></button>
                                 <span className="text-sm font-bold dark:text-white font-mono">{item.quantity}</span>
                                 <button onClick={() => setCart(prev => prev.map((it,i)=>i===idx?{...it,quantity:it.quantity+1}:it))} className="text-gray-500 hover:text-luvia-rich-blue"><Plus size={14}/></button>
                              </div>
                              <p className="text-base font-bold dark:text-white font-mono">₦{((item.isSub ? item.product.price*0.9 : item.product.price) * item.quantity).toLocaleString()}</p>
                           </div>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                      <ShoppingBag size={100} className="text-gray-100 dark:text-white/5" />
                      <div className="space-y-2">
                         <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Selection Ledger Empty</p>
                         <p className="text-gray-500 text-[10px] font-medium uppercase tracking-[0.2em]">Clinical Inventory Unassigned</p>
                      </div>
                      <button onClick={() => setIsCartOpen(false)} className="px-10 py-4 bg-luvia-rich-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">Establish Selection</button>
                   </div>
                 )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 border-t dark:border-white/10 space-y-10 bg-luvia-slate/30 dark:bg-white/5">
                   
                   {/* Sync Engine Integration */}
                   <div className="p-6 bg-white dark:bg-luvia-dark-blue border-2 border-luvia-rich-blue rounded-sm flex items-center justify-between gap-8">
                      <div className="flex items-center gap-5">
                         <RefreshCw className={`text-luvia-rich-blue ${syncEnabled ? 'animate-spin-slow' : ''}`} size={32} />
                         <div>
                            <h5 className="text-[11px] font-bold uppercase text-luvia-rich-blue">LUVIA Sync Delivery</h5>
                            <p className="text-[9px] text-gray-500 font-medium">Auto-dispatch with next session on {activeJob?.date || 'Scheduled'}</p>
                         </div>
                      </div>
                      <div onClick={() => setSyncEnabled(!syncEnabled)} className={`w-14 h-7 rounded-full relative cursor-pointer transition-all ${syncEnabled ? 'bg-luvia-light-green shadow-inner' : 'bg-gray-300'}`}>
                         <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${syncEnabled ? 'left-8' : 'left-1'}`}></div>
                      </div>
                   </div>

                   {/* S-Point Redemption Control */}
                   <div className="space-y-6">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-gray-400">Apply S-Points Ledger</span>
                         <span className="text-luvia-rich-blue font-mono">₦{(spDiscount * SP_TO_NAIRA).toLocaleString()} Credits</span>
                      </div>
                      <input type="range" min="0" max={user?.carbonPoints || 0} step="100" value={spDiscount} onChange={(e)=>setSpDiscount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-luvia-rich-blue" />
                      <p className="text-[8px] text-center text-gray-400 uppercase tracking-[0.3em] font-bold">Scientific Credit Rate: 100 SP = ₦1</p>
                   </div>

                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Investment</span>
                         <span className="text-4xl font-bold dark:text-white tracking-tighter font-mono">₦{cartStats.total.toLocaleString()}</span>
                      </div>
                      <button onClick={handleCheckout} disabled={isProcessing} className="w-full py-8 bg-luvia-rich-blue text-white font-bold uppercase tracking-widest text-sm shadow-[0_30px_60px_rgba(0,51,102,0.4)] flex items-center justify-center gap-5 hover:scale-[1.02] transition-all disabled:opacity-50">
                         {isProcessing ? <RefreshCw className="animate-spin" size={24}/> : <>Execute Order Allocation <ArrowRight size={20}/></>}
                      </button>
                      <div className="flex items-center justify-center gap-3 opacity-60">
                         <BadgeCheck size={14} className="text-luvia-light-green" />
                         <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Every purchase offsets your property carbon footprint.</p>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

    </div>
  );
}
