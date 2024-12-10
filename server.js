import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { connect } from "./config/connectionState.js";
import authRoute from "./routes/authRoute.js";
import userRouter from './routes/userRoute.js';
import eventRoutes from './routes/eventRoute.js';
import contactRoutes from './routes/contactRoute.js';
import servicesRoutes from './routes/servicesRoute.js';
import adminRoute from './routes/adminRoute.js';


const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.use(
    fileUpload({
      useTempFiles: true
    })
);

connect();

app.use("/api", authRoute);
app.use("/api", userRouter);
app.use('/api', eventRoutes);
app.use('/api', contactRoutes);
app.use('/api', servicesRoutes);
app.use('/api', adminRoute);



app.get("/api", (req, res) => {
    res.json({ message: "Welcome to /api" });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to phylee journeys" });
});





app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});

