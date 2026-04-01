// Color constants
export const COLORS = {
  primary: {
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
  },
  accent: {
    emerald: '#10b981',
    blue: '#3b82f6',
    amber: '#fbbf24',
    red: '#ef4444',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    500: '#64748b',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

// Status constants
export const STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

// Case type constants
export const CASE_TYPES = [
  { id: 'family', label: 'Family Law' },
  { id: 'criminal', label: 'Criminal Law' },
  { id: 'corporate', label: 'Corporate Law' },
  { id: 'property', label: 'Property Law' },
  { id: 'civil', label: 'Civil Law' },
  { id: 'consumer', label: 'Consumer Law' },
];

// Urgency levels
export const URGENCY_LEVELS = [
  { id: 'flexible', label: 'Flexible' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'urgent', label: 'Urgent' },
];

// Consultation types
export const CONSULTATION_TYPES = [
  { id: 'call', label: 'Call Consultation', icon: 'Phone' },
  { id: 'video', label: 'Video Consultation', icon: 'Video' },
  { id: 'chat', label: 'Chat Consultation', icon: 'MessageSquare' },
  { id: 'inperson', label: 'In-Person Meeting', icon: 'Users' },
];

// Pricing plans
export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    duration: '3 months',
    price: 2999,
    features: [
      'Up to 10 consultations',
      'Basic client matching',
      'Standard support',
      'Commission: 20%',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    duration: '6 months',
    price: 5999,
    features: [
      'Up to 40 consultations',
      'Advanced client matching',
      'Priority support',
      'Commission: 15%',
      'Performance analytics',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    duration: '12 months',
    price: 10999,
    features: [
      'Unlimited consultations',
      'Premium client matching',
      '24/7 dedicated support',
      'Commission: 10%',
      'Advanced analytics',
      'Personal account manager',
    ],
  },
];

// Mock data for demo
export const MOCK_BOOKINGS = [
  {
    id: 1,
    clientName: 'Rajesh Kumar',
    caseType: 'Family Law',
    location: 'Mumbai, Maharashtra',
    language: 'Hindi',
    urgency: 'Moderate',
    description: 'Need legal help for divorce proceedings',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    clientName: 'Priya Patel',
    caseType: 'Corporate Law',
    location: 'Bangalore, Karnataka',
    language: 'English',
    urgency: 'Urgent',
    description: 'Contract review for business partnership',
    status: 'accepted',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    clientName: 'Amit Singh',
    caseType: 'Property Law',
    location: 'Delhi, Delhi',
    language: 'English',
    urgency: 'Flexible',
    description: 'Property dispute resolution',
    status: 'ongoing',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];
