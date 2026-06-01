import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LocationDisplayProps {
  onLocationSelect?: (coords: { lat: number, lng: number }) => void;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ onLocationSelect }) => {
  const [status, setStatus] = useState<'idle' | 'locating' | 'found' | 'error'>('idle');
  const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocation not supported');
      return;
    }

    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setStatus('found');
        if (onLocationSelect) {
          onLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      },
      (error) => {
        setStatus('error');
        setErrorMsg(error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            status === 'locating' ? "bg-amber-100 text-amber-600 animate-pulse" : 
            status === 'found' ? "bg-nature-100 text-nature-600" : 
            status === 'error' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
          )}>
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {status === 'locating' ? 'Acquiring GPS...' : 
               status === 'found' ? 'Location Verified' : 
               status === 'error' ? 'Location Error' : 'Location Required'}
            </p>
            {status === 'found' && coords && (
              <p className="text-xs text-gray-500 font-mono">
                {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-500">{errorMsg}</p>
            )}
          </div>
        </div>
        
        {status !== 'locating' && (
           <button 
             onClick={getLocation}
             type="button"
             className="text-xs font-medium text-nature-600 hover:text-nature-700 bg-nature-50 hover:bg-nature-100 px-3 py-1.5 rounded-lg transition-colors"
           >
             {status === 'found' ? 'Refresh' : 'Retry'}
           </button>
        )}
      </div>
    </div>
  );
};
