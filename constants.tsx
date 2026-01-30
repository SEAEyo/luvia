
import React from 'react';
import { TeamMember, Product, UserRole } from './types';

export const COLORS = {
  richBlue: '#003366',
  fairBlue: '#B0C4DE',
  darkBlue: '#001A33',
  lightGreen: '#90EE90',
  yellow: '#FFD700',
};

export const TEAM: TeamMember[] = [
  {
    name: "Eunice Eyo Oku",
    role: "Founder & CEO",
    description: "The Visionary & Communications Lead. A Communications professional with 11+ years of experience in storytelling and impact strategy.",
    image: "https://picsum.photos/400/400?random=1"
  },
  {
    name: "Fredrick Omoke",
    role: "Chief Technology Officer (CTO)",
    description: "The Systems Architect. Veteran builder and developer with a deep pedigree in Web3 and decentralized systems.",
    image: "https://picsum.photos/400/400?random=2"
  },
  {
    name: "Blessing Bob",
    role: "Head of Health & Safety (HSE)",
    description: "The Bio-Science Expert. Anatomist and seasoned Health Practitioner ensuring 'Scientific Clean' standards.",
    image: "https://picsum.photos/400/400?random=3"
  },
  {
    name: "Glory Samuel",
    role: "Head of Growth & Marketing",
    description: "The Aggressive Market Strategist. Specializes in consumer behavior and high-conversion sales strategies.",
    image: "https://picsum.photos/400/400?random=4"
  },
  {
    name: "Engr. Ako Oku",
    role: "Director of Humanitarian & Global Impact",
    description: "The Scale & Partnership Lead. Computer Engineer ensuring mission alignment with global sustainability goals.",
    image: "https://picsum.photos/400/400?random=5"
  },
  {
    name: "Erica Eyo",
    role: "Head of Finance & Operations",
    description: "The Financial Gatekeeper. Professional Accountant managing the Escrow vault with institutional-grade precision.",
    image: "https://picsum.photos/400/400?random=6"
  },
  {
    name: "Exalt Eyo",
    role: "Lead Scientist & Technical Operations",
    description: "The Biochemistry & Sourcing Lead. Responsible for verifying chemical compositions and technical skill vetting.",
    image: "https://picsum.photos/400/400?random=7"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'LUVIA Signature Fragrance',
    price: 4500,
    description: 'Eco-certified long-lasting signature scent infusion.',
    ingredients: ['Natural Essences', 'Bio-ethanol', 'Purified Water'],
    carbonOffset: '0.5kg CO2',
    // Fixed: 'Fragrance' is not assignable to 'Liquids' | 'Specialty' | 'Tools'. Using 'Specialty'.
    category: 'Specialty',
    image: 'https://picsum.photos/300/300?random=10',
    // Fixed: Adding missing required properties from Product interface
    sustainabilityProof: '100% Biodegradable',
    isSyncEligible: true
  },
  {
    id: 'p2',
    name: 'Eco-Green Descaler',
    price: 3200,
    description: 'Non-toxic descaler for bathroom and kitchen faucets.',
    ingredients: ['Citric Acid', 'Plant-based Surfactants'],
    carbonOffset: '1.2kg CO2',
    // Fixed: 'Cleaning Agent' is not assignable to 'Liquids' | 'Specialty' | 'Tools'. Using 'Liquids'.
    category: 'Liquids',
    image: 'https://picsum.photos/300/300?random=11',
    // Fixed: Adding missing required properties from Product interface
    sustainabilityProof: 'Phosphate Free',
    isSyncEligible: true
  },
  {
    id: 'p3',
    name: 'Multi-Surface Bio-Clean',
    price: 5000,
    description: 'Medical-grade multi-surface cleaner with zero toxins.',
    ingredients: ['Coconut Oil Derivatives', 'Enzymatic Complex'],
    carbonOffset: '2kg CO2',
    // Fixed: 'Cleaning Agent' is not assignable to 'Liquids' | 'Specialty' | 'Tools'. Using 'Liquids'.
    category: 'Liquids',
    image: 'https://picsum.photos/300/300?random=12',
    // Fixed: Adding missing required properties from Product interface
    sustainabilityProof: 'Cruelty Free',
    isSyncEligible: true
  }
];
