import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true }, // Combined date and time
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open", // Default status when the event is created
  },
});

// Middleware to automatically set the status based on the event datetime
eventSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.status = this.datetime < currentDate ? "closed" : "open"; // Compare datetime with the current date
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
