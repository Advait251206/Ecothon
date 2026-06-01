
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure CSS is loaded
import L from 'leaflet';
import { mockReports } from '../../data/mockData';
import { HealthCard } from '../dashboard/HealthCard';

// Fix for default marker icon in React Leaflet
// Using DivIcon with Lucide icon would be better but requires more setup. 
// For now, using a simple colored circle div icon for "Environment" theme.
const createIcon = (healthScore: number) => {
  const color = healthScore > 70 ? '#22c55e' : healthScore > 30 ? '#f59e0b' : '#ef4444';
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const MapView: React.FC = () => {
  // Center roughly on Mumbai/Mock coords
  const center: [number, number] = [19.1296, 72.9157]; 

  return (
    <div className="h-[calc(100vh-160px)] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
      <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mockReports.map((report) => (
          <Marker 
            key={report.id} 
            position={report.coords}
            icon={createIcon(report.healthScore)}
          >
            <Popup className="glass-popup">
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-2">{report.locationName}</h3>
                <img src={report.imageUrl} alt="Site" className="w-full h-24 object-cover rounded-lg mb-2" />
                <HealthCard score={report.healthScore} title="Current Status" />
                <p className="text-xs text-gray-500 mt-2">Last reported: {new Date(report.timestamp).toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
