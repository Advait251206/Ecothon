
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Card } from '../common/Card';
import { cn } from '../../lib/utils';

interface HealthCardProps {
  score: number; // 0-100
  title?: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({ score, title = "Water Body Health" }) => {
  // 0-30: Critical (Red), 31-70: Warning (Yellow), 71-100: Healthy (Green)
  const status = score > 70 ? 'healthy' : score > 30 ? 'warning' : 'critical';
  const color = status === 'healthy' ? 'text-nature-600' : status === 'warning' ? 'text-amber-500' : 'text-red-500';

  const label = status === 'healthy' ? 'Healthy' : status === 'warning' ? 'Moderate Risk' : 'Critical';

  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Activity className={cn("w-4 h-4", color)} />
          <span className={cn("text-lg font-bold", color)}>{label}</span>
        </div>
      </div>
      
      <div className="relative w-16 h-16 flex items-center justify-center">
         {/* Simple circular mock - could be SVG */}
         <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
            <motion.circle 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="32" cy="32" r="28" 
              stroke="currentColor" 
              strokeWidth="6" 
              fill="transparent" 
              strokeLinecap="round"
              className={color}
              strokeDasharray="1 1"
            />
         </svg>
         <span className="absolute text-sm font-bold text-gray-700">{score}%</span>
      </div>
    </Card>
  );
};
