import express from 'express';
import applicationFileUpload from '../controllers/applicationFileUpload.js';
import { authenticateJWT } from "../middleware/auth.js";
import { verifyPayment } from "../middleware/validatePayment.js";

const router = express.Router();

router.post('/services/postgraduate/upload-files/:email',authenticateJWT, applicationFileUpload.postGraduate);

router.post('/services/undergraduate/upload-files/:email', (req, res, next) => {
    console.log(`Received upload request for email: ${req.params.email}`);
    next();
}, applicationFileUpload.undergraduate);

router.post('/services/schengen-tourist/upload-files/:email', authenticateJWT, verifyPayment, applicationFileUpload.schengenTourist);
router.post('/services/turkey-tourist/upload-files/:email', authenticateJWT, verifyPayment, applicationFileUpload.turkeyTourist);
router.post('/services/south-africa-tourist/upload-files/:email', authenticateJWT, verifyPayment, applicationFileUpload.southAfricaTourist);
router.post('/services/east-africa/upload-files/:email', authenticateJWT, verifyPayment, applicationFileUpload.eastAfrica);
router.post('/services/morocco-visa/upload-files/:email', authenticateJWT,verifyPayment, applicationFileUpload.moroccoVisa);




export default router;
