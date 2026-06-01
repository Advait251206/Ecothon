export interface Report {
  id: string;
  locationName: string;
  coords: [number, number]; // lat, lng
  timestamp: string;
  imageUrl: string;
  status: 'pending' | 'verified';
  healthScore: number; // 0-100
  coverage: number; // 0-100%
}

export const mockReports: Report[] = [
  {
    id: '1',
    locationName: 'Powai Lake, North Bank',
    coords: [19.1296, 72.9157],
    timestamp: '2025-01-26T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1549807577-f2736a3075c3?q=80&w=1000&auto=format&fit=crop', // Lake with plants
    status: 'verified',
    healthScore: 45,
    coverage: 60,
  },
  {
    id: '2',
    locationName: 'Vihar Lake',
    coords: [19.1678, 72.9056],
    timestamp: '2025-01-25T14:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1463996720875-19760773d705?q=80&w=1000&auto=format&fit=crop',
    status: 'verified',
    healthScore: 80,
    coverage: 15,
  },
  {
    id: '3',
    locationName: 'Pashan Lake',
    coords: [18.5362, 73.7925],
    timestamp: '2025-01-24T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1572099351052-b8832a81387d?q=80&w=1000&auto=format&fit=crop',
    status: 'pending',
    healthScore: 30,
    coverage: 85,
  }
];

export const mockStats = {
  totalReports: 1240,
  criticalZones: 12,
  averageHealth: 68,
  recentActivity: [
    { date: 'Jan 20', reports: 45 },
    { date: 'Jan 21', reports: 52 },
    { date: 'Jan 22', reports: 38 },
    { date: 'Jan 23', reports: 60 },
    { date: 'Jan 24', reports: 55 },
    { date: 'Jan 25', reports: 48 },
    { date: 'Jan 26', reports: 22 }, // Today
  ]
};
