import { Router } from 'express';
import verifyJWT from '../middlewares/authMiddleware.js';
import * as authController from '../controllers/authController.js';
const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', verifyJWT, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
})
router.post('/logout', verifyJWT, authController.logout);
router.get('/getuser', verifyJWT, authController.getUserId);

export default router;