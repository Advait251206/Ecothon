import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ImageUpload } from '../components/reporting/ImageUpload';
import { LocationDisplay } from '../components/reporting/LocationDisplay';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Report: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitterName, setSubmitterName] = useState('');
  const [lakeName, setLakeName] = useState('');
  const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [apiError, setApiError] = useState('');
  const [reportData, setReportData] = useState<any>(null);

  const handleImageSelect = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setSubmitterName('');
    setLakeName('');
    setCoords(null);
    setApiError('');
    setReportData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !submitterName || !lakeName) return;

    setIsSubmitting(true);
    setApiError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', submitterName);
    formData.append('locationName', lakeName);
    // Send coverage as default for now, or add slider later
    formData.append('coverage', '50'); 
    
    if (coords) {
        formData.append('coords', JSON.stringify({ latitude: coords.lat, longitude: coords.lng }));
        formData.append('coordinates', JSON.stringify({ lat: coords.lat, lng: coords.lng }));
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setReportData(data.data); // Store the full report object from backend
        setIsSuccess(true);
      } else {
        setApiError(data.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setApiError('Network error. Is the backend running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && reportData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-6 max-w-lg mx-auto">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-20 h-20 bg-nature-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-nature-600" />
        </motion.div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Report Submitted!</h2>
          <p className="text-gray-500 mt-2">Your report has been received and is pending admin approval.</p>
        </div>

        {/* Report Details Card */}
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Report Summary</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200">
                    Pending Review
                </span>
            </div>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500 block">Location</span>
                        <span className="font-medium text-gray-900">{reportData.locationName || reportData.location}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block">Submitted By</span>
                        <span className="font-medium text-gray-900">{reportData.submitterName || reportData.name}</span>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span>🤖 AI Analysis</span>
                        {reportData.aiVerified ? (
                            <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded border border-green-100">Verified</span>
                        ) : (
                            <span className="text-amber-600 text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Unverified</span>
                        )}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-nature-50 rounded-lg border border-nature-100">
                            <span className="text-xs text-nature-600 block mb-1">Detected Coverage</span>
                            <span className="text-xl font-bold text-nature-800">
                                {reportData.aiCoverage !== undefined && reportData.aiCoverage !== null 
                                  ? `${reportData.aiCoverage.toFixed(1)}%` 
                                  : 'N/A'}
                            </span>
                        </div>
                        {reportData.aiAnalysis?.mask && (
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img 
                                  src={`data:image/png;base64,${reportData.aiAnalysis.mask}`} 
                                  alt="AI Mask" 
                                  className="w-full h-full object-cover opacity-80" 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <Button onClick={() => { setIsSuccess(false); clearImage(); setReportData(null); }} variant="outline" className="w-full">
           Submit Another Report
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto py-8 mb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">New Report</h1>
        <p className="text-gray-500">Take a photo of the water hyacinth coverage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Your Name</label>
            <input 
              type="text"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none"
              required
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Lake/Water Body Name</label>
             <input 
               type="text"
               value={lakeName}
               onChange={(e) => setLakeName(e.target.value)}
               placeholder="e.g. Powai Lake"
               className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none"
               required
             />
          </div>

          <div className="border-t border-gray-100 pt-4">
             <LocationDisplay onLocationSelect={setCoords} />
          </div>
          <div className="border-t border-gray-100 pt-6">
             <ImageUpload
               onImageSelect={handleImageSelect}
               onClear={clearImage}
               previewUrl={preview}
             />
          </div>

          {apiError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
               {apiError}
            </div>
          )}
        </Card>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Please ensure you are at a safe distance from the water edge while taking photos.
          </p>
        </div>

        <Button
          type="submit"
          disabled={!file || !submitterName || !lakeName || isSubmitting}
          className="w-full h-14 text-lg shadow-xl shadow-nature-500/20 disabled:opacity-70"
        >
          {isSubmitting ? (
             <>
               <Loader2 className="w-5 h-5 mr-2 animate-spin" />
               Verifying with AI...
             </>
          ) : (
             <>
               <Send className="w-5 h-5 mr-2" />
               Submit Report
             </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Report;
