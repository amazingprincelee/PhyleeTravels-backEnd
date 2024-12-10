import express from 'express';
import adminController from '../controllers/adminController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Route to create an admin (only accessible to superadmins)
router.post('/admin/create-admin', authenticateJWT, adminController.createAdmin);

// Update routes
router.put('/admin/postgraduates', authenticateJWT, adminController.updateAllPostgraduates);
router.put('/admin/undergraduates', authenticateJWT, adminController.updateAllUndergraduates);
router.put('/admin/schengen-tourists', authenticateJWT, adminController.updateAllSchengenTourists);
router.put('/admin/turkey-tourists', authenticateJWT, adminController.updateAllTurkeyTourists);
router.put('/admin/south-africa-tourists', authenticateJWT, adminController.updateAllSouthAfricaTourists);
router.put('/admin/east-africa-visas', authenticateJWT, adminController.updateAllEastAfricaVisas);
router.put('/admin/morocco-visas', authenticateJWT, adminController.updateAllMoroccoVisas);

// Get routes
router.get('/admin/postgraduate/:email', adminController.getPostgraduateByEmail);
router.get('/admin/undergraduate/:email', adminController.getUndergraduateByEmail);
router.get('/admin/schengen-tourist/:email', adminController.getSchengenTouristByEmail);
router.get('/admin/turkey-tourist/:email', adminController.getTurkeyTouristByEmail);
router.get('/admin/south-africa-tourist/:email', adminController.getSouthAfricaTouristByEmail);
router.get('/admin/east-africa/:email', adminController.getEastAfricaVisaByEmail);
router.get('/admin/morocco/:email', adminController.getMoroccoVisaByEmail);

// Get routes...
router.get('/admin/postgraduates', adminController.getAllPostgraduates);
router.get('/admin/undergraduates', adminController.getAllUndergraduates);
router.get('/admin/schengen-tourists', adminController.getAllSchengenTourists);
router.get('/admin/turkey-tourists', adminController.getAllTurkeyTourists);
router.get('/admin/south-africa-tourists', adminController.getAllSouthAfricaTourists);
router.get('/admin/east-africa-visas', adminController.getAllEastAfricaVisas);
router.get('/admin/morocco-visas', adminController.getAllMoroccoVisas);

export default router;
