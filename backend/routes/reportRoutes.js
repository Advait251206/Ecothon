const express = require('express');
const router = express.Router();
const multer = require('multer');
const reportController = require('../controllers/reportController');

// Configure Multer (Memory Storage for easy AI/Cloud processing)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.get('/', reportController.getAllReports);
router.post('/', upload.single('image'), reportController.createReport);
router.delete('/:id', reportController.deleteReport);
router.put('/:id', reportController.updateReport);
router.post('/check-image', upload.single('image'), reportController.checkImage);

module.exports = router;
