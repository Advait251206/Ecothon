import React from 'react';
import MapView from '../components/map/MapView';
import { Card } from '../components/common/Card';

const MapPage: React.FC = () => {
  return (
    <div className="space-y-4 container mx-auto px-4 py-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eichhornia Map</h1>
          <p className="text-gray-500">Live community reports of water hyacinth spread.</p>
        </div>
      </div>
      
      <MapView />
      
      <div className="grid grid-cols-3 gap-2">
         {/* Legend */}
         <Card className="py-2 px-3 text-center flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-nature-500 mb-1" />
            <span className="text-xs text-gray-600">Healthy</span>
         </Card>
         <Card className="py-2 px-3 text-center flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mb-1" />
            <span className="text-xs text-gray-600">Warning</span>
         </Card>
         <Card className="py-2 px-3 text-center flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mb-1" />
            <span className="text-xs text-gray-600">Critical</span>
         </Card>
      </div>
    </div>
  );
};

export default MapPage;
