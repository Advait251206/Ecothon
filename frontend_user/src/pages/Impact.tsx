import { motion } from 'framer-motion';
import { AlertTriangle, Fish, Sun, DollarSign } from 'lucide-react';
import { Card } from '../components/common/Card';

const Impact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/10 text-red-600 text-sm font-medium border border-red-200">
            <AlertTriangle className="w-4 h-4" />
            Ecological Threat Level: Critical
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-nature-900">Why Water Hyacinth is Harmful</h1>
          <p className="text-xl text-nature-700 max-w-2xl mx-auto">
            The "World's Worst Aquatic Weed" suffocates lakes, kills biodiversity, and destroys local economies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ImpactCard 
            icon={<Fish className="w-8 h-8 text-blue-500" />}
            title="Aquatic Life Suffocation"
            desc="Dense mats block oxygen exchange at the water surface, leading to fish kills and destruction of underwater ecosystems."
          />
          <ImpactCard 
            icon={<Sun className="w-8 h-8 text-amber-500" />}
            title="Blocks Sunlight"
            desc="Prevents sunlight from reaching native aquatic plants and algae, disrupting the base of the food web."
          />
          <ImpactCard 
            icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
            title="Mosquito Breeding Ground"
            desc="Stagnant water trapped by the weed creates ideal breeding conditions for mosquitoes, increasing disease risk."
          />
          <ImpactCard 
            icon={<DollarSign className="w-8 h-8 text-green-600" />}
            title="Economic Damage"
            desc="Hinders fishing, blocks transportation routes, and clogs hydroelectric power plant intakes, costing millions annually."
          />
        </div>

        <div className="bg-nature-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nature-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Did You Know?</h2>
            <p className="text-lg text-nature-200 leading-relaxed">
              Water hyacinth can double its biomass in just <span className="text-nature-400 font-bold">two weeks</span>. 
              A single plant can produce thousands of seeds that remain viable for up to 30 years, making eradication extremely difficult without sustained effort.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ImpactCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <Card className="p-6 border-nature-200 bg-white/50 hover:border-nature-300 transition-colors">
    <div className="bg-nature-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-nature-900 mb-2">{title}</h3>
    <p className="text-nature-600 leading-relaxed">{desc}</p>
  </Card>
);

export default Impact;
