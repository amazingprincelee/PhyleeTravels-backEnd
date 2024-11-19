import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  preferredStudyDestination: { type: String, required: true },
  whenPlanYourJourney: { type: String, required: true },
  kindOfJourney: { type: String, required: true },
  preferredStudyLevel: { type: String},
  agreeToTerms: { type: Boolean, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const ContactForm = mongoose.model("ContactForm", contactSchema);

export default ContactForm;
