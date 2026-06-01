import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-nature-950 text-white pt-16 pb-8 border-t border-nature-900 z-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Context */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-nature-900 p-2 rounded-xl group-hover:bg-nature-800 transition-colors border border-nature-800">
                <Leaf className="w-6 h-6 text-nature-400" />
              </div>
              <div>
                <span className="text-xl font-bold block leading-none">HyacinthWatch</span>
                <span className="text-xs text-nature-400 font-medium tracking-wide">Ecothon 2026</span>
              </div>
            </Link>
            <p className="text-nature-400/80 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of environmental protectors through AI-driven monitoring, real-time data analysis, and community-led action. Together, we can restore balance to our water ecosystems by tackling the invasive water hyacinth crisis head-on.
            </p>

          </div>

          {/* Column 2: Quick Links */}
          <div className="md:px-8">
            <h4 className="text-nature-400 font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm text-nature-100/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/map" className="hover:text-white transition-colors">Live Map</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">Submit Report</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Trust & Legal</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-nature-400 font-semibold mb-6 text-lg">Resources</h4>
            <ul className="space-y-4 text-sm text-nature-100/70">
              <li><Link to="/context" className="hover:text-white transition-colors">Project Context & Utility</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors">Ecological Impact</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Removal Solutions</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Learning & Identification</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-nature-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-nature-500">
          <p>© 2026 HyacinthWatch. Built by <span className="text-nature-400">Team Aerobats</span>.</p>
          <p>Designed for Ecothon 2026</p>
        </div>
      </div>
    </footer>
  );
};


