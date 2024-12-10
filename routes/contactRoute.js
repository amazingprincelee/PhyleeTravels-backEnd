import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.post('/contact/submit', contactController.submitContactForm);
router.get('/contact/all_contacts', contactController.getAllContacts);
router.delete('/contact/delete_contact/:contactId', contactController.deleteContact);

export default router;
