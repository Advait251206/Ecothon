
import { Card } from '../common/Card';
import { mockStats } from '../../data/mockData';
import { AlertCircle, Activity, FileText } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card hover className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <FileText size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Reports</p>
          <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalReports}</h3>
        </div>
      </Card>

      <Card hover className="flex items-center gap-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-full">
          <AlertCircle size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Critical Zones</p>
          <h3 className="text-2xl font-bold text-gray-900">{mockStats.criticalZones}</h3>
        </div>
      </Card>

      <Card hover className="flex items-center gap-4">
        <div className="p-3 bg-nature-100 text-nature-600 rounded-full">
          <Activity size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Health Score</p>
          <h3 className="text-2xl font-bold text-gray-900">{mockStats.averageHealth}</h3>
        </div>
      </Card>
    </div>
  );
};
