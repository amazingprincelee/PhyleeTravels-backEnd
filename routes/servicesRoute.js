import express from 'express';
import serviceController from '../controllers/servicesController.js';

const router = express.Router();

router.post('/postgraduate/upload-files/:email', serviceController.postGraduate);
router.post('/undergraduate/upload-files/:email', (req, res, next) => {
    console.log(`Received upload request for email: ${req.params.email}`);
    next();
}, serviceController.undergraduate);

router.post('/schengen-tourist/upload-files/:email', serviceController.schengenTourist);
router.post('/turkey-tourist/upload-files/:email', serviceController.turkeyTourist);
router.post('/south-africa-tourist/upload-files/:email', serviceController.southAfricaTourist);
router.post('/east-africa/upload-files/:email', serviceController.eastAfrica);
router.post('/morocco-visa/upload-files/:email', serviceController.moroccoVisa);




export default router;
