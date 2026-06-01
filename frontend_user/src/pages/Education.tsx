import { motion } from 'framer-motion';
import { BookOpen, Search, Info } from 'lucide-react';

const Education = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 bg-nature-900 text-white p-8 rounded-3xl">
          <div className="space-y-4 flex-1">
             <div className="flex items-center gap-2 text-nature-300 text-sm font-medium uppercase tracking-wider">
               <BookOpen className="w-4 h-4" />
               Knowledge Base
             </div>
             <h1 className="text-4xl font-bold">What is Water Hyacinth?</h1>
             <p className="text-nature-200 leading-relaxed">
               <i>Pontederia crassipes</i> is a free-floating perennial aquatic plant native to South America. 
               It is known for its beautiful lavender flowers but feared for its aggressive growth rate.
             </p>
          </div>
          <div className="w-48 h-48 rounded-full bg-nature-800 border-4 border-nature-700 overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1685387431228-567a57c152a2?q=80&w=600&auto=format&fit=crop" 
              alt="Water Hyacinth Flower" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <div className="space-y-6">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-nature-100 rounded-lg text-nature-700">
                  <Search className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-bold text-nature-900">Identification</h2>
             </div>
             <ul className="space-y-4">
               <FeaturePoint label="Leaves" desc="Thick, glossy, waterproof, and ovate or rounded. They act as sails for wind dispersal." />
               <FeaturePoint label="Stems" desc="Spongy, bulbous stalks filled with air that keep the plant afloat." />
               <FeaturePoint label="Roots" desc="Feathery, black/purple submerged roots that trap sediment and provide fish habitat (in small moderation)." />
               <FeaturePoint label="Flowers" desc="Striking 6-petaled purple/blue flowers with a yellow spot on the upper petal." />
             </ul>
           </div>

           <div className="bg-nature-50 p-8 rounded-3xl border border-nature-100">
              <h3 className="text-xl font-bold text-nature-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-nature-500" />
                Fast Facts
              </h3>
              <div className="space-y-6">
                <Fact label="Growth Speed" value="It can double in 5-15 days." />
                <Fact label="Seed Longevity" value="Seeds last up to 30 years." />
                <Fact label="Water Loss" value="Increases evaporation by 3x." />
                <Fact label="Global Spread" value="Present in >50 countries." />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeaturePoint = ({ label, desc }: { label: string, desc: string }) => (
  <div className="flex gap-4">
    <span className="font-bold text-nature-800 min-w-[80px]">{label}</span>
    <span className="text-nature-600 leading-relaxed">{desc}</span>
  </div>
);

const Fact = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center border-b border-nature-200 pb-2 last:border-0 last:pb-0">
    <span className="text-nature-600">{label}</span>
    <span className="font-bold text-nature-900">{value}</span>
  </div>
);

export default Education;
