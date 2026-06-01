import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] bg-nature-950 overflow-hidden flex items-center justify-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-radial-[at_top_right] from-nature-900 via-nature-950 to-nature-950 opacity-80" />
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-nature-800/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-nature-600/10 rounded-full blur-[100px]" />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nature-900/50 border border-nature-700/50 text-nature-300 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-nature-400 animate-pulse" />
              Community-Driven Environmental Protection
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Restore Our <span className="text-nature-400">Waters</span>: <br/> 
              Track, Monitor, Clear.
            </h1>
            
            <p className="text-lg md:text-xl text-nature-100/70 max-w-2xl mx-auto leading-relaxed">
              Join the movement to reclaim our lakes from invasive water hyacinth. 
              Real-time tracking powered by citizen science and municipal action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/report" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-nature-400 text-nature-950 hover:bg-nature-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] border-none">
                  Start Reporting
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/map" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-nature-700 text-nature-100 hover:bg-nature-800/50 hover:text-white hover:border-nature-500 backdrop-blur-sm">
                  View Live Map
                  <Globe className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-nature-500/50"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats/Feature Grid */}
      <section className="relative py-20 bg-nature-50 -mt-8 rounded-t-[2.5rem] z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 -mt-32 mb-16 relative z-30">
             <StatsCard 
               icon={<Activity className="w-6 h-6 text-nature-400" />}
               value="1,240"
               label="Reports Verified"
               trend="+12% this week"
             />
             <StatsCard 
               icon={<ShieldCheck className="w-6 h-6 text-nature-400" />}
               value="98%"
               label="Accuracy Rate"
               trend="AI Validated"
             />
             <StatsCard 
               icon={<Globe className="w-6 h-6 text-nature-400" />}
               value="12"
               label="Lakes Monitored"
               trend="Active Zones"
             />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-nature-950 mb-4">Why Water Hyacinth is a Silent Threat</h2>
            <p className="text-nature-700/80">
              Unmanaged growth kills aquatic life, blocks sunlight, and breeds mosquitoes. 
              Our platform uses civic data to target cleanup efforts effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <FeatureRow 
                title="Predictive Growth Modeling"
                desc="Early alerts based on coverage trends prevent massive spread events before they happen."
              />
              <FeatureRow 
                title="Real-time Community Tracking"
                desc="GPS-tagged reports from citizens create a living map of water health."
              />
              <FeatureRow 
                title="Municipal Action Dashboard"
                desc="Authorities get prioritized heatmaps to deploy cleaners where they are needed most."
              />
            </div>
            <div className="h-[400px] w-full bg-nature-200 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" 
                alt="Clean Lake" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nature-950/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-nature-300">Success Story</span>
                  <h3 className="text-xl font-bold mt-1">Powai Lake Restoration</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatsCard = ({ icon, value, label, trend }: { icon: any, value: string, label: string, trend: string }) => (
  <Card className="bg-nature-900 border-nature-800 p-6 flex items-start gap-4 shadow-xl hover:-translate-y-1 transition-transform">
    <div className="p-3 bg-nature-800 rounded-xl">{icon}</div>
    <div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="text-nature-300 font-medium text-sm">{label}</p>
      <p className="text-nature-500 text-xs mt-1">{trend}</p>
    </div>
  </Card>
);

const FeatureRow = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors">
    <div className="w-1 h-full min-h-[50px] bg-nature-300 rounded-full" />
    <div>
      <h3 className="text-xl font-bold text-nature-900">{title}</h3>
      <p className="text-nature-700/80 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Home;
