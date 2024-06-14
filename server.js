import 'dotenv/config';
import express from "express";
import session from 'express-session';
import passport from 'passport';
import bodyParser from "body-parser";
import cors from 'cors';
import { connect } from "./config/connectionState.js";
import authRoute from "./routes/authRoute.js";
import userRouter from './routes/userRoute.js';
import eventRoutes from './routes/eventRoute.js';
import contactRoutes from './routes/contactRoute.js';

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight request handling

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This should be express.json() instead, but works similarly

app.use(session({
    secret: process.env.SESSION_SECRET || "Monkey loves to eat banana",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
        httpOnly: true, // Helps to prevent attacks such as XSS
    }
}));

app.use(passport.initialize());
app.use(passport.session());

connect();

app.use("/api/auth", authRoute);
app.use("/api/user", userRouter);
app.use('/api/events', eventRoutes);
app.use('/api/contacts', contactRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to /api" });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to phylee journeys" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
