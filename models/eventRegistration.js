import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  preferredStudyDestination: { type: String, required: true },
  nearestPhyleeJourneysOffice: { type: String, required: true },
  preferredStudyLevel: { type: String, required: true },
  howDidYouHearAboutPhyleeJourneys: { type: String, required: true },
  lastEducationalQualification: { type: String, required: true },
  educationFund: { type: String, required: true },
});

const EventRegistration = mongoose.model("EventRegistration", registrationSchema);

export default EventRegistration;
