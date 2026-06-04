import { useState, useEffect } from 'react';
// import { mockReports } from '../../data/mockData'; // Removed mock data
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Filter, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Report {
  id: string;
  locationName: string;
  imageUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  timestamp: string;
  healthScore?: number;
  coverage: number;
  aiCoverage?: number;
}

export const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'critical'>('verified'); // Default to verified for public view? Or all? User asked why "verified" wasn't showing, implying they expect verified. Let's show all for now but default filter to 'verified' maybe? Or 'all'. Let's stick to 'all' to be safe, or 'verified' if it's "Government Data". Let's default to 'all' so they see their submission. Actually, user said "Not showing, despite verified", so they looked for it.
  // Actually, usually public dashboards show VERIFIED data. Let's default to 'verified' purely for quality, but the user wants to see their report.
  // Let's set default filter to 'all' so they can see everything, or 'verified' and ensure the verified one shows.
  // The user said "Not showing, despite verified", meaning they expect it to show.
  
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'health'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`);
      const data = await res.json();
      if (data.success) {
        setReports(data.data);
      } else {
        setError('Failed to load reports');
      }
    } catch (err) {
      setError('Network error loading reports');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(r => {
    // If healthScore is missing, calculate it roughly: 100 - coverage
    const effectiveHealth = r.healthScore ?? (100 - (r.coverage || 0));
    
    let matchesFilter = true;
    if (filter === 'critical') matchesFilter = effectiveHealth <= 30;
    if (filter === 'verified') matchesFilter = r.status === 'verified'; 
    // If filter is 'all', show everything? Or 'all' means 'verified + pending'?
    // Let's make 'all' show everything for now so they can debug.
    
    const matchesSearch = (r.locationName || 'Unknown Location').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    const healthA = a.healthScore ?? (100 - (a.coverage || 0));
    const healthB = b.healthScore ?? (100 - (b.coverage || 0));
    
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = (a.locationName || '').localeCompare(b.locationName || '');
        break;
      case 'health':
        comparison = healthA - healthB;
        break;
      case 'date':
      default:
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (loading) return <div className="p-8 text-center text-gray-500"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />Loading Data...</div>;
  if (error) return <div className="p-8 text-center text-red-500"><AlertCircle className="w-8 h-8 mx-auto mb-2" />{error}</div>;

  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-lg text-gray-900">Recent Reports</h3>
          <div className="flex w-full sm:w-auto gap-2">
            <input 
              type="text" 
              placeholder="Search location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 sm:w-64 px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-nature-500"
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                  if (filter === 'all') setFilter('verified');
                  else if (filter === 'verified') setFilter('critical');
                  else setFilter('all');
              }}
              className={filter !== 'all' ? 'bg-nature-50 text-nature-600' : ''}
            >
              <Filter className="w-4 h-4 mr-1" />
              {filter === 'all' ? 'Show Verified' : filter === 'verified' ? 'Show Critical' : 'Show All'}
            </Button>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-3 text-sm border-t border-gray-100 pt-3">
           <span className="text-gray-500 font-medium">Sort by:</span>
           <select 
             value={sortBy} 
             onChange={(e) => setSortBy(e.target.value as any)}
             className="px-2 py-1 border border-gray-200 rounded-md outline-none focus:border-nature-500 bg-white"
           >
             <option value="date">Date</option>
             <option value="name">Name (A-Z)</option>
             <option value="health">Health Score</option>
           </select>
           
           <button 
             onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
             className="px-2 py-1 text-nature-600 hover:bg-nature-50 rounded-md transition-colors font-medium ml-auto sm:ml-0"
           >
             {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
           </button>
           
           <div className="text-xs text-gray-400 ml-auto hidden sm:block">
             {filteredReports.length} results found
           </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredReports.map((report) => (
          <div key={report.id} className="p-4 border border-gray-100 rounded-xl hover:bg-white/50 transition-colors flex gap-4 items-start">
            <img src={report.imageUrl} alt={report.locationName} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
               <div className="flex justify-between">
                 <h4 className="font-semibold text-gray-800">{report.locationName}</h4>
                 <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    report.status === 'verified' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                 )}>
                    {report.status}
                 </span>
               </div>
               <p className="text-xs text-gray-500 mb-2">{new Date(report.timestamp).toLocaleDateString()}</p>
               <div className="flex items-center gap-4">
                 <div className="text-xs">
                    <span className="text-gray-500">Health: </span>
                    <span className={cn(
                        "font-bold", 
                        (report.healthScore ?? (100 - report.coverage)) > 70 ? "text-nature-600" : (report.healthScore ?? (100 - report.coverage)) > 30 ? "text-amber-500" : "text-red-500"
                    )}>{report.healthScore ?? (100 - report.coverage)}</span>
                 </div>
                 <div className="text-xs">
                    <span className="text-gray-500">Coverage: </span>
                    <span className="font-bold">
                        {report.aiCoverage !== undefined && report.aiCoverage !== null 
                            ? report.aiCoverage.toFixed(1) 
                            : report.coverage}%
                    </span>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
