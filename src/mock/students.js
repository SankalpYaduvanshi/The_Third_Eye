export const mockStudents = [
  {
    id: 's1',
    name: 'Arjun Mehta',
    email: 'arjun@student.vit.ac.in',
    password: 'student123',
    phone: '+91 99887 76655',
    college: 'VIT Vellore',
    collegeId: 'VIT2024001',
    isVerified: true,
    profilePhoto: null,
    loyaltyPoints: 450,
    loyaltyTier: 'Silver',
    referralCode: 'ARJUN2024',
    totalTrips: 12,
    totalSpent: 4800,
    joinedDate: '2024-08-20',
  },
  {
    id: 's2',
    name: 'Meera Iyer',
    email: 'meera@student.srm.ac.in',
    password: 'student123',
    phone: '+91 88776 65544',
    college: 'SRM University',
    collegeId: 'SRM2024015',
    isVerified: true,
    profilePhoto: null,
    loyaltyPoints: 780,
    loyaltyTier: 'Gold',
    referralCode: 'MEERA2024',
    totalTrips: 23,
    totalSpent: 9200,
    joinedDate: '2024-05-10',
  },
  {
    id: 's3',
    name: 'Rohan Singh',
    email: 'rohan@student.bits.ac.in',
    password: 'student123',
    phone: '+91 77665 54433',
    college: 'BITS Pilani',
    collegeId: 'BITS2024032',
    isVerified: false,
    profilePhoto: null,
    loyaltyPoints: 120,
    loyaltyTier: 'Bronze',
    referralCode: 'ROHAN2024',
    totalTrips: 4,
    totalSpent: 1600,
    joinedDate: '2025-01-15',
  },
];

export const colleges = [
  'VIT Vellore',
  'SRM University',
  'BITS Pilani',
  'IIT Bombay',
  'IIT Delhi',
  'NIT Trichy',
  'IIIT Hyderabad',
  'Manipal University',
  'Amity University',
  'Christ University',
];

export const getLoyaltyTier = (points) => {
  if (points >= 1000) return { tier: 'Platinum', color: '#A78BFA', next: null, progress: 100 };
  if (points >= 500) return { tier: 'Gold', color: '#F59E0B', next: 1000, progress: ((points - 500) / 500) * 100 };
  if (points >= 200) return { tier: 'Silver', color: '#94A3B8', next: 500, progress: ((points - 200) / 300) * 100 };
  return { tier: 'Bronze', color: '#CD7F32', next: 200, progress: (points / 200) * 100 };
};
