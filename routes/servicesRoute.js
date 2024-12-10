import express from 'express';
import serviceController from '../controllers/servicesController.js';
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post('/services/postgraduate/upload-files/:email',authenticateJWT, serviceController.postGraduate);

router.post('/services/undergraduate/upload-files/:email', (req, res, next) => {
    console.log(`Received upload request for email: ${req.params.email}`);
    next();
}, serviceController.undergraduate);

router.post('/services/schengen-tourist/upload-files/:email', authenticateJWT, serviceController.schengenTourist);
router.post('/services/turkey-tourist/upload-files/:email', authenticateJWT, serviceController.turkeyTourist);
router.post('/services/south-africa-tourist/upload-files/:email', authenticateJWT, serviceController.southAfricaTourist);
router.post('/services/east-africa/upload-files/:email', authenticateJWT, serviceController.eastAfrica);
router.post('/services/morocco-visa/upload-files/:email', authenticateJWT, serviceController.moroccoVisa);




export default router;
