import React from 'react';
import { motion } from 'framer-motion';

interface CoverageMeterProps {
  percentage: number;
}

export const CoverageMeter: React.FC<CoverageMeterProps> = ({ percentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-gray-600">Water Surface Coverage</span>
        <span className="text-nature-700">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-nature-400 to-nature-600 rounded-full"
        />
      </div>
    </div>
  );
};
