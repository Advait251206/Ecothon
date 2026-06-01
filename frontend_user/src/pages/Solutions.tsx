import { motion } from 'framer-motion';
import { Sprout, Recycle, Zap, Users } from 'lucide-react';

const Solutions = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-nature-900">Turning a Problem into a Solution</h1>
          <p className="text-xl text-nature-700 max-w-2xl mx-auto">
            From removal to resource recovery: How we can manage the spread and utilize the biomass.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <SolutionMethod 
             title="Mechanical Removal"
             desc="Using specialized harvesters to clear large infestations efficiently."
             icon={<Recycle className="w-6 h-6" />} 
          />
          <SolutionMethod 
             title="Biological Control"
             desc="Introducing natural enemies like Weevils to reduce plant vigor."
             icon={<Sprout className="w-6 h-6" />} 
          />
          <SolutionMethod 
             title="Community Action"
             desc="Organized manual cleanup drives in sensitive shoreline areas."
             icon={<Users className="w-6 h-6" />} 
          />
        </div>

        {/* Usage Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-nature-900 text-center">Value from Waste</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-nature-100 to-white p-8 rounded-3xl border border-nature-200">
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-nature-200 rounded-full"><Sprout className="w-6 h-6 text-nature-700" /></div>
                 <h3 className="text-2xl font-bold text-nature-800">Organic Compost</h3>
               </div>
               <p className="text-nature-600">
                 Water hyacinth is rich in nitrogen and phosphorous. When composted, it becomes an excellent organic fertilizer for agriculture, reducing the need for chemical alternatives.
               </p>
            </div>
            <div className="bg-gradient-to-br from-nature-100 to-white p-8 rounded-3xl border border-nature-200">
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-nature-200 rounded-full"><Zap className="w-6 h-6 text-nature-700" /></div>
                 <h3 className="text-2xl font-bold text-nature-800">Biofuel Energy</h3>
               </div>
               <p className="text-nature-600">
                 Dried biomass can be used to produce biogas or briquettes for fuel. This provides a renewable energy source while managing the weed population.
               </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SolutionMethod = ({ title, desc, icon }: { title: string, desc: string, icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-nature-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-nature-50 rounded-full flex items-center justify-center text-nature-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-nature-900 mb-2">{title}</h3>
    <p className="text-nature-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Solutions;
