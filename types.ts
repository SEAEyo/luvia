
export enum UserRole {
  CLIENT = 'CLIENT',
  HANDYPERSON = 'HANDYPERSON',
  CLEANER = 'CLEANER',
  ADMIN = 'ADMIN'
}

export enum SubscriptionTier {
  SEEDLING = 'SEEDLING',
  SPROUT = 'SPROUT',
  SAPLING = 'SAPLING',
  FOREST = 'FOREST'
}

export interface InventoryItem {
  id: string;
  name: string;
  level: number; // 0-100
  lastRefill: string;
}

export interface SubUser {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  carbonPoints: number;
  level?: string; // Trainee, Apprentice, Specialist, Master of Clean
  streak?: number;
  totalJobs?: number;
  isVetted?: boolean;
  specialization?: string;
  location?: string;
  avatar?: string;
  idProofUrl?: string;
  tier?: SubscriptionTier;
  sessionsCount?: number;
  inventory?: InventoryItem[];
  subUsers?: SubUser[];
}

export enum JobStatus {
  PENDING = 'PENDING',
  EN_ROUTE = 'EN_ROUTE',
  ON_SITE = 'ON_SITE',
  WORK_IN_PROGRESS = 'WORK_IN_PROGRESS',
  COMPLETED = 'COMPLETED', // Ready for Client Review
  VERIFIED = 'VERIFIED'    // Escrow Released
}

export interface SOPItem {
  id: string;
  task: string;
  category: 'Safety' | 'Scientific' | 'Task' | 'Chemical' | 'Evidence' | 'Security' | 'Escrow' | 'Assessment' | 'Logic' | 'Final';
  isCompleted: boolean;
  isMandatory: boolean;
  evidenceUrl?: string; 
  value?: string | number; // For ATP readings, Voltage, etc.
  unit?: string;
  description: string;
  timerSeconds?: number;
}

export interface SOPModule {
  id: string;
  name: string;
  category: string;
  tasks: SOPItem[];
}

export interface Job {
  id: string;
  serviceName: string;
  clientName: string;
  clientId: string;
  providerId?: string;
  providerName?: string;
  status: JobStatus;
  totalAmount: number;
  escrowAmount: number; // 30%
  releasedAmount: number; // 70%
  date: string;
  sopList: SOPItem[];
  location: string;
  tier?: SubscriptionTier;
  atpReadingBefore?: number;
  atpReadingAfter?: number;
  type: 'cleaning' | 'technical';
  propertyType?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  killList?: string[];
  carbonOffset: string;
  category: 'Liquids' | 'Specialty' | 'Tools';
  image: string;
  isSubscription?: boolean;
  sustainabilityProof: string;
  isSyncEligible: boolean;
  size?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}
