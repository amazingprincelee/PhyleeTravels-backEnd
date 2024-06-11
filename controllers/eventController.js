import Event from "../models/event.js";
import EventRegistration from "../models/eventRegistration.js";

const eventController = {
  createEvent: async (req, res) => {
    try {
      const { eventName, location, date, time } = req.body;

      if (!eventName || !location || !date || !time) {
        return res.status(400).json({ error: 'Event name, location, date, and time are required' });
      }

      const newEvent = new Event({ eventName, location, date, time });

      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  },

  registerForEvent: async (req, res) => {
    try {
      const {
        eventId, firstName, lastName, email, phoneNumber,
        preferredStudyDestination, nearestPhyleeJourneysOffice,
        preferredStudyLevel, howDidYouHearAboutPhyleeJourneys,
        lastEducationalQualification, educationFund
      } = req.body;

      if (!eventId || !firstName || !lastName || !email || !phoneNumber ||
        !preferredStudyDestination || !nearestPhyleeJourneysOffice ||
        !preferredStudyLevel || !howDidYouHearAboutPhyleeJourneys ||
        !lastEducationalQualification || !educationFund) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newRegistration = new EventRegistration({
        eventId,
        firstName,
        lastName,
        email,
        phoneNumber,
        preferredStudyDestination,
        nearestPhyleeJourneysOffice,
        preferredStudyLevel,
        howDidYouHearAboutPhyleeJourneys,
        lastEducationalQualification,
        educationFund
      });

      const savedRegistration = await newRegistration.save();
      res.status(201).json(savedRegistration);
    } catch (error) {
      console.error('Error registering for event:', error);
      res.status(500).json({ error: 'Failed to register for event' });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error getting events:', error);
      res.status(500).json({ error: 'Failed to get events' });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { eventId } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  }
};

export default eventController;
