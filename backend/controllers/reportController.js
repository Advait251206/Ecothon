const Report = require('../models/Report');
const getImageUrl = require('../utils/getImageUrl');
const analyzeImage = require('../utils/analyzeImage');
const validateImage = require('../utils/validateImage');

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    // Backward compatibility mapping
    const formattedReports = reports.map(r => ({ 
        ...r._doc, 
        id: r._id,
        locationName: r.location || r.locationName 
    }));
    res.json({ success: true, data: formattedReports }); // Frontend expects { success: true, data: [] }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Submit a new report (with optional AI and Image Upload)
exports.createReport = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;
    let aiValidation = { valid: true }; // Default to valid if no image to check
    let aiAnalysisData = { coverage: null, analysis: null };

    // If file uploaded via Multer
    if (req.file) {
        // 1. AI Validation (Gemini - Is it Hyacinth?)
        try {
            const b64 = req.file.buffer.toString("base64");
            const mime = req.file.mimetype;
            aiValidation = await validateImage(mime, b64);
            
            if (!aiValidation.valid) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Image rejected by AI: Not a valid water hyacinth image.",
                    aiResponse: aiValidation 
                });
            }
        } catch (e) {
            console.warn("AI Validation failed, proceeding anyway:", e);
        }

        // 2. AI Analysis (Python - How much coverage?)
        try {
            const analysisResult = await analyzeImage(req.file.buffer, req.file.originalname);
            if (analysisResult.success) {
                aiAnalysisData = {
                    coverage: analysisResult.data.coverage_percent,
                    analysis: {
                        mask: analysisResult.data.mask_base64,
                        overlay: analysisResult.data.overlay_base64
                    }
                };
            }
        } catch (e) {
            console.warn("Python AI Analysis failed:", e);
        }

        // 3. Upload to Cloud (ImgBB)
        try {
            imageUrl = await getImageUrl(req.file);
        } catch (e) {
            console.error("Image Upload failed:", e);
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }
    }

    const newReport = await Report.create({
        ...req.body,
        imageUrl: imageUrl,
        status: 'pending', // Default status
        aiVerified: aiValidation.valid,
        aiCoverage: aiAnalysisData.coverage,
        aiAnalysis: aiAnalysisData.analysis,
        // Use AI coverage if user didn't provide one, or override?
        // Let's keep user coverage as 'claimed' and AI as 'verified'
    });

    res.json({ success: true, data: { ...newReport._doc, id: newReport._id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Report
exports.updateReport = async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedReport) {
      res.json({ success: true, data: { ...updatedReport._doc, id: updatedReport._id } });
    } else {
      res.status(404).json({ success: false, message: 'Not Found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating report' });
  }
};

// Delete Report
exports.deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting report' });
  }
};

// AI Check Endpoint (Specific)
exports.checkImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No image uploaded" });
        const b64 = req.file.buffer.toString("base64");
        const mime = req.file.mimetype;
        const result = await validateImage(mime, b64);
        res.json({ success: true, result });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};
