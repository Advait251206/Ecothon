import { Router } from 'express';
import verifyJWT from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import * as reportController from '../controllers/reportController.js';

const router = Router();

router.post('/submit', upload.single('image'), reportController.submitReport);
router.post('/verify-image', upload.single('image'), reportController.verifyImage);
router.get('/all', reportController.getAllReports);
router.get('/:id', verifyJWT, reportController.getReportById);

export default router;