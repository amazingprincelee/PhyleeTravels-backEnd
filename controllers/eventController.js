import Event from "../models/event.js";
import EventRegistration from "../models/eventRegistration.js";
import moment from "moment";

const eventController = {

  

  createEvent: async (req, res) => {
    try {
      console.log("Request Body:", req.body); 
      const { eventName, location, date } = req.body;
  
      // Validation
      if (!eventName || !location || !date) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Parse datetime to ISO format
      const parsedDate = moment(date, "MM/DD/YYYY hh:mm A").toDate();
      if (!parsedDate || isNaN(parsedDate)) {
        return res.status(400).json({ error: "Invalid datetime format. Use MM/DD/YYYY HH:mm AM/PM." });
      }
  
      const newEvent = new Event({ eventName, location, date: parsedDate });
      const savedEvent = await newEvent.save();
  
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
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

      // Check if the event exists and its status
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      if (event.status === "closed") {
        return res.status(400).json({ error: 'Registration for this event is closed' });
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
  },

  getAllRegistrationsForEvent: async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      const registrations = await EventRegistration.find({ eventId });
      res.status(200).json(registrations);
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      res.status(500).json({ error: 'Failed to fetch event registrations' });
    }
  },
};

export default eventController;
