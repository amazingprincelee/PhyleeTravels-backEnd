import Contact from "../models/contactForm.js";

const contactController = {
  submitContactForm: async (req, res) => {
    try {
      const {
        fullName, email, phoneNumber, preferredStudyDestination,
        whenPlanYourJourney, kindOfJourney, preferredStudyLevel,
        agreeToTerms, message
      } = req.body;

      if (!fullName  || !email || !phoneNumber || !preferredStudyDestination ||
        !whenPlanYourJourney || !kindOfJourney || !message || !preferredStudyLevel ||
        agreeToTerms === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newContact = new Contact({
        fullName, 
        email, 
        phoneNumber, 
        preferredStudyDestination,
        whenPlanYourJourney, 
        kindOfJourney, 
        preferredStudyLevel,
        agreeToTerms, 
        message
      });

      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  },

  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ error: 'Failed to get contacts' });
    }
  },

  deleteContact: async (req, res) => {
    try {
      const { contactId } = req.params;
      const deletedContact = await Contact.findByIdAndDelete(contactId);

      if (!deletedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  }
};

export default contactController;
