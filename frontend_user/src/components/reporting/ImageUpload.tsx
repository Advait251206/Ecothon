import React, { useCallback, useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  previewUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onClear, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-8 transition-colors text-center",
              isDragging ? "border-nature-500 bg-nature-50" : "border-gray-300 hover:border-nature-400"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-nature-100 rounded-full">
                <Camera className="w-8 h-8 text-nature-600" />
              </div>
              <div>
                 <h3 className="font-semibold text-lg text-gray-900">Upload Photo</h3>
                 <p className="text-sm text-gray-500 mt-1">Take a picture or choose from gallery</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="relative">
                   <input
                     type="file"
                     accept="image/*"
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     onChange={handleFileChange}
                   />
                   <Button variant="primary" className="w-full">
                     <Upload className="w-4 h-4 mr-2" />
                     Upload Image
                   </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black"
          >
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
