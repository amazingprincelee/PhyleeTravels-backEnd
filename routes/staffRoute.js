import express from 'express';
import staffController from '../controllers/StaffController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/staff', authenticateJWT, isAdmin, staffController.createStaff);
router.get('/staff', authenticateJWT, isAdmin, staffController.getStaff);
router.put('/staff/:staffId', authenticateJWT, isAdmin, staffController.updateStaff);
router.delete('/staff/:staffId', authenticateJWT, isAdmin, staffController.deleteStaff);

export default router;
