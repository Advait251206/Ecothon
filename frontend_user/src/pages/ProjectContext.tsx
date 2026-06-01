import { motion } from 'framer-motion';
import { Crosshair, Database, Cpu, Layers } from 'lucide-react';

const ProjectContext = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nature-900/10 text-nature-700 text-sm font-medium border border-nature-200">
            <Cpu className="w-4 h-4" />
            Technical Architecture
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-nature-900">Project Context & Utility</h1>
          <p className="text-xl text-nature-700 max-w-2xl mx-auto">
            Leveraging AI and Citizen Science to create a high-precision detection grid for invasive aquatic species.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <ContextCard 
             icon={<Crosshair className="w-8 h-8 text-red-500" />}
             title="Precision Detection Tools"
             desc="Our platform utilizes deep learning models trained on thousands of aerial and ground-level samples to identify Water Hyacinth with 98% accuracy."
           />
           <ContextCard 
             icon={<Database className="w-8 h-8 text-blue-500" />}
             title="Real-time Data Grid"
             desc="Incoming reports are instantly geocoded and aggregated into a municipal database, allowing authorities to track spread velocity."
           />
           <ContextCard 
             icon={<Layers className="w-8 h-8 text-amber-500" />}
             title="Predictive Modeling"
             desc="By analyzing historical growth patterns and seasonal weather data, we forecast potential bloom zones before they become critical."
           />
           <ContextCard 
             icon={<Cpu className="w-8 h-8 text-nature-600" />}
             title="Scalable Infrastructure"
             desc="Built on a cloud-native architecture capable of handling nationwide data streams from millions of citizen reporters."
           />
        </div>

        <div className="bg-nature-50 p-8 rounded-3xl border border-nature-100">
          <h2 className="text-2xl font-bold text-nature-900 mb-4">Why This Matters</h2>
          <p className="text-nature-700 leading-relaxed mb-6">
            Traditional monitoring relies on sporadic manual surveys which are costly and slow. 
            <strong>HyacinthWatch</strong> democratizes data collection, turning every smartphone into a sensor. 
            This provides environmental agencies with the granular, real-time intelligence needed to deploy mechanical harvesters effectively, saving millions in operational costs and preserving biodiversity.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const ContextCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-nature-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-nature-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-nature-900 mb-2">{title}</h3>
    <p className="text-nature-600 leading-relaxed">{desc}</p>
  </div>
);

export default ProjectContext;
