import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  preferredStudyDestination: { type: String, required: true },
  whenPlanToStudy: { type: String, required: true },
  nearestPhyleeJourneysOffice: { type: String, required: true },
  preferredStudyLevel: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  receiveUpdates: { type: Boolean, required: true },
  contactByPhone: { type: Boolean, required: true },
  contactByEmail: { type: Boolean, required: true },
  contactBySMS: { type: Boolean, required: true },
}, { timestamps: true });

const ContactForm = mongoose.model("ContactForm", contactSchema);

export default ContactForm;
