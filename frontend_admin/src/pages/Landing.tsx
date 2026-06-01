import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Leaf, Activity, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, delay }: { icon: any, title: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 flex flex-col items-center gap-2 text-center"
  >
    <div className="p-2 bg-nature-100/50 rounded-lg text-nature-700">
      <Icon size={24} />
    </div>
    <span className="text-sm font-semibold text-nature-900">{title}</span>
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nature-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-nature-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-nature-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-nature-200 text-nature-800 text-sm font-medium"
            >
              <ShieldCheck size={16} />
              <span>Authorized Personnel Only</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-nature-950 leading-tight"
            >
              Hyacinth<span className="text-nature-600">Watch</span> <br/>
              <span className="text-3xl md:text-4xl text-gray-500 font-medium">Admin Portal</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Central command for monitoring lake health, managing community reports, and coordinating ecological preservation efforts.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
               <button 
                onClick={() => navigate('/login')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-nature-900 text-white rounded-2xl font-semibold text-lg hover:bg-nature-800 transition-all shadow-xl shadow-nature-900/20 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Access Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="flex-1 relative hidden md:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative z-10"
            >
              <div className="glass-card p-6 rounded-3xl border border-white shadow-2xl bg-white/40 backdrop-blur-xl md:rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6 border-b border-black/5 pb-4">
                  <div className="w-12 h-12 bg-nature-100 rounded-xl flex items-center justify-center text-nature-600">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">System Status</h3>
                    <p className="text-sm text-green-600 flex items-center gap-1">● Operational</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard icon={Activity} title="Real-time Analytics" delay={0.5} />
                  <FeatureCard icon={Users} title="Community Reports" delay={0.6} />
                  <FeatureCard icon={Globe} title="Geospatial Data" delay={0.7} />
                  <FeatureCard icon={ShieldCheck} title="Secure Access" delay={0.8} />
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements behind */}
            <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-nature-300 w-24 h-24 rounded-full blur-xl opacity-40 z-0" 
            />
             <motion.div 
               animate={{ y: [10, -10, 10] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-5 -left-5 bg-blue-300 w-32 h-32 rounded-full blur-xl opacity-30 z-0" 
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-center w-full text-nature-900/40 text-sm font-medium">
        © 2026 HyacinthWatch &bull; Administrative Access Only
      </div>
    </div>
  );
};

export default Landing;
