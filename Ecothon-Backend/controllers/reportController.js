import Reports from '../models/reportModel.js';
import getImageUrl from '../utils/getImageURL.js';
import validateImage from '../utils/validateImage.js';

export const submitReport = async (req, res) => {
    try {
        const imageUrl = await getImageUrl(req.file);
        const newReport = new Reports({
            locationName: req.body.locationName,
            name: req.body.name,
            coords: req.body.coords,
            imageUrl: imageUrl,
            healthScore: req.body.healthScore,
            status: 'verified',
            coverage: req.body.coverage
        });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting report', error });
    }
}

export const getAllReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
}

export const getReportById = async (req, res) => {
    try {
        const report = await Reports.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
}

export const verifyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;
    const base64Image = imageBuffer.toString("base64");

    const response = await validateImage(mimeType, base64Image);

    res.status(200).json({
      message: "Image received successfully",
      response: response,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error verifying image",
      error: error.message,
    });
  }
};
