
import React from 'react';
import { ShieldCheck, Zap, Building2, Home, ArrowRight, Factory, Droplets, FlaskConical, Sparkles, Activity as ActivityIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  tech: string;
  status: 'Available' | 'Corporate Only' | 'Coming Soon';
}

interface ServiceGroup {
  category: string;
  specialization: string;
  icon: React.ReactNode;
  items: ServiceItem[];
}

const SERVICES: ServiceGroup[] = [
  {
    category: "Residential/Home Cleanings",
    specialization: "Tier 1: Personal Space Decontamination",
    icon: <Home size={24} />,
    items: [
      { id: 'routine-cleaning', name: "Routine Cleaning", desc: "Systematic upkeep of biological hygiene standards.", tech: "Bio-Enzymatic Agents", status: 'Available' },
      { id: 'deep-cleaning', name: "Deep Cleaning", desc: "Intensive clinical restoration of living environments.", tech: "Steam Extraction", status: 'Available' },
      { id: 'move-in-out', name: "Move In/Out Cleaning", desc: "Certified decontamination for residential transitions.", tech: "HEPA Filtration", status: 'Available' },
      { id: 'upholstery-washing', name: "Upholstery/Carpet Washing", desc: "Scientific removal of pathogens from fabrics.", tech: "Hot-Water Extraction", status: 'Available' },
      { id: 'restocking-supplies', name: "Restocking Supplies", desc: "Digital inventory sync and automated refilling.", tech: "QR Inventory Tracking", status: 'Available' }
    ]
  },
  {
    category: "Commercial/Office Cleanings",
    specialization: "Tier 2: High-Traffic Hygiene Management",
    icon: <Building2 size={24} />,
    items: [
      { id: 'office-sanitation', name: "Commercial Office Cleaning", desc: "Decontamination of high-frequency touchpoints.", tech: "Electrostatic Spraying", status: 'Available' },
      { id: 'after-event-cleanup', name: "After Event Clean-Ups", desc: "Rapid clinical restoration post-corporate events.", tech: "Rapid Response Units", status: 'Available' },
      { id: 'renovation-cleanup', name: "Renovation/Post-Construction", desc: "Industrial-grade particulate removal.", tech: "Industrial Air Scrubbers", status: 'Available' },
      { id: 'server-room', name: "Server Room Precision", desc: "Static-controlled dust-free environments.", tech: "Anti-Static Tech", status: 'Corporate Only' }
    ]
  },
  {
    category: "Industrial/Specialized Cleanings",
    specialization: "Tier 3: Hazard & Structural Restoration",
    icon: <Factory size={24} />,
    items: [
      { id: 'pressure-washing', name: "Pressure Washing", desc: "Structural aesthetic restoration.", tech: "High-PSI Extraction", status: 'Available' },
      { id: 'disaster-restoration', name: "Disaster Restoration", desc: "Recovery from floods, leaks, or disasters.", tech: "Moisture Mapping", status: 'Corporate Only' },
      { id: 'hoarder-cleanup', name: "Hoarder Clean Up", desc: "Professional, sensitive environmental reclamation.", tech: "Full-Scale Decon", status: 'Available' },
      { id: 'industrial-decon', name: "Industrial Decontamination", desc: "Large scale biological sanitization.", tech: "ULV Fogging", status: 'Coming Soon' }
    ]
  }
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-luvia-dark-blue">
      {/* Hero */}
      <section className="py-24 bg-luvia-slate dark:bg-luvia-dark-blue/80 border-b dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luvia-rich-blue/10 text-luvia-rich-blue dark:text-luvia-fair-blue text-[10px] font-bold uppercase tracking-widest">
              LUVIA Ecosystem
            </div>
            <h1 className="text-5xl md:text-8xl font-heading text-luvia-rich-blue dark:text-white uppercase leading-none">The Science of <br/><span className="text-luvia-fair-blue">SOP Maintenance.</span></h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              We operate as a clinical maintenance hub. Every service plan is a structured procedure verified through biological testing and escrow security.
            </p>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 space-y-32">
          {SERVICES.map((group, i) => (
            <div key={i} className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 dark:border-white/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-luvia-rich-blue text-white flex items-center justify-center rounded-sm shadow-xl">
                    {group.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading dark:text-white uppercase tracking-wider">{group.category}</h2>
                    <p className="text-[10px] font-bold text-luvia-fair-blue uppercase tracking-[0.3em]">{group.specialization}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((item, j) => (
                  <div key={j} className="glass p-10 flex flex-col space-y-8 group hover:border-luvia-fair-blue transition-all relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <span className={`text-[8px] font-bold px-2 py-1 uppercase tracking-widest ${
                        item.status === 'Available' ? 'bg-luvia-light-green/20 text-luvia-rich-blue' : 
                        item.status === 'Corporate Only' ? 'bg-luvia-rich-blue text-white' : 
                        'bg-luvia-slate text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-heading dark:text-white uppercase tracking-tight">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-auto pt-8 border-t dark:border-white/5 space-y-6">
                      <div className="flex items-center gap-3">
                        <Zap size={14} className="text-luvia-fair-blue" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logic: {item.tech}</span>
                      </div>
                      <button 
                        onClick={() => navigate(`/services/${item.id}`)}
                        className="w-full py-4 border border-luvia-rich-blue dark:border-luvia-fair-blue text-luvia-rich-blue dark:text-luvia-fair-blue text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-luvia-rich-blue group-hover:text-white transition-all"
                      >
                        Scientific Deep Dive <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-luvia-dark-blue text-white">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
          <ActivityIcon size={64} className="mx-auto text-luvia-light-green" />
          <div className="space-y-4">
            <h2 className="text-5xl font-heading uppercase tracking-widest">Biological Verification as Standard</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">
              Ready to experience property care defined by empirical proof? Launch the app to book your verified session.
            </p>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-12 py-5 bg-luvia-fair-blue text-luvia-dark-blue font-bold uppercase tracking-widest text-xs shadow-2xl"
          >
            Launch LUVIA Hub
          </button>
        </div>
      </section>
    </div>
  );
}
