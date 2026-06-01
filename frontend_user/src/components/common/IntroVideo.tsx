import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        src="/Opening.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={onComplete}
      />
      
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all font-light tracking-wider text-sm z-50 uppercase"
      >
        Skip <X size={14} />
      </button>
    </motion.div>
  );
};

export default IntroVideo;
