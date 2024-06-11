import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.post('/submit', contactController.submitContactForm);
router.get('/all_contacts', contactController.getAllContacts);
router.delete('/delete_contact/:contactId', contactController.deleteContact);

export default router;
