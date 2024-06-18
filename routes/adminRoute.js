import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

// Update routes
router.put('/postgraduates', adminController.updateAllPostgraduates);
router.put('/undergraduates', adminController.updateAllUndergraduates);
router.put('/schengen-tourists', adminController.updateAllSchengenTourists);
router.put('/turkey-tourists', adminController.updateAllTurkeyTourists);
router.put('/south-africa-tourists', adminController.updateAllSouthAfricaTourists);
router.put('/east-africa-visas', adminController.updateAllEastAfricaVisas);
router.put('/morocco-visas', adminController.updateAllMoroccoVisas);

// Get routes
router.get('/postgraduate/:email', adminController.getPostgraduateByEmail);
router.get('/undergraduate/:email', adminController.getUndergraduateByEmail);
router.get('/schengen-tourist/:email', adminController.getSchengenTouristByEmail);
router.get('/turkey-tourist/:email', adminController.getTurkeyTouristByEmail);
router.get('/south-africa-tourist/:email', adminController.getSouthAfricaTouristByEmail);
router.get('/east-africa/:email', adminController.getEastAfricaVisaByEmail);
router.get('/morocco/:email', adminController.getMoroccoVisaByEmail);

// Get routes...
router.get('/postgraduates', adminController.getAllPostgraduates);
router.get('/undergraduates', adminController.getAllUndergraduates);
router.get('/schengen-tourists', adminController.getAllSchengenTourists);
router.get('/turkey-tourists', adminController.getAllTurkeyTourists);
router.get('/south-africa-tourists', adminController.getAllSouthAfricaTourists);
router.get('/east-africa-visas', adminController.getAllEastAfricaVisas);
router.get('/morocco-visas', adminController.getAllMoroccoVisas);

export default router;
