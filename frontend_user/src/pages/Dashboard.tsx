import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { ReportList } from '../components/dashboard/ReportList';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Municipal Dashboard</h1>
        <p className="text-gray-500">Monitor water body health and citizen reports.</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatsGrid />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ReportList />
      </motion.div>
    </div>
  );
};

export default Dashboard;
