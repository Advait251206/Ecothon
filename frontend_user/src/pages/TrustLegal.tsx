import { motion } from 'framer-motion';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

const TrustLegal = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-nature-900">Trust Center & Legal</h1>
          <p className="text-xl text-nature-700 max-w-2xl mx-auto">
            Commitment to data privacy, transparency, and ethical use of technology.
          </p>
        </div>

        <div className="space-y-8">
          <Section 
            icon={<Shield className="w-6 h-6 text-nature-600" />}
            title="Data Privacy Policy"
            content="We collect minimal personal data. Location data is anonymized and aggregated for environmental analysis. Users retain full ownership of their submitted media. We do not sell data to third parties."
          />
          
          <Section 
            icon={<Lock className="w-6 h-6 text-nature-600" />}
            title="Security Standards"
            content="All data transmission is encrypted using TLS 1.3. Our infrastructure aligns with ISO 27001 standards for information security management."
          />

          <Section 
            icon={<FileText className="w-6 h-6 text-nature-600" />}
            title="Terms of Service"
            content="By using HyacinthWatch, you agree to submit authentic reports to the best of your knowledge. Malicious spamming or deliberate falsification of environmental data may result in account suspension."
          />
        </div>

        <div className="bg-nature-900 text-white p-8 rounded-3xl flex items-center gap-6">
           <div className="p-4 bg-nature-800 rounded-full flex-shrink-0">
             <CheckCircle className="w-8 h-8 text-nature-400" />
           </div>
           <div>
             <h3 className="text-xl font-bold mb-2">Open Source Commitment</h3>
             <p className="text-nature-200">
               HyacinthWatch is an open-source initiative. Our codebase is available for audit and contribution by the developer community, ensuring transparency in how we process public data.
             </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const Section = ({ icon, title, content }: { icon: any, title: string, content: string }) => (
  <div className="flex gap-6 p-6 bg-white rounded-2xl border border-nature-100">
    <div className="flex-shrink-0 pt-1">
      <div className="p-2 bg-nature-50 rounded-lg">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-nature-900 mb-2">{title}</h3>
      <p className="text-nature-700 leading-relaxed">{content}</p>
    </div>
  </div>
);

export default TrustLegal;
