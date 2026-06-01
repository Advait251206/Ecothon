const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: String, // from simple backend
  locationName: String, // from advanced backend
  name: String, // submitter name
  healthScore: Number,
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
  submitterName: String,
  lakeName: String,
  imageUrl: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  coords: { // generic object to support advanced backend format if needed
      latitude: Number,
      longitude: Number
  },
  coverage: Number, // User reported coverage (optional)
  aiCoverage: Number, // Python AI calculated coverage
  aiAnalysis: { // Output from Python AI
      mask: String, // Hex string or URL if we save it
      overlay: String
  },
  aiVerified: Boolean // From Gemini
});

// Normalize data before saving if needed (e.g. map coords to coordinates)
reportSchema.pre('save', function() {
    if (this.locationName && !this.location) this.location = this.locationName;
    if (this.name && !this.submitterName) this.submitterName = this.name;
});

module.exports = mongoose.model('Report', reportSchema);
