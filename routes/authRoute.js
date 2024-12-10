//authRoute.js
import express from "express";
import authController from "../controllers/authController.js";




const router = express.Router();

// Welcome message
router.get("/", (req, res) => {
  res.json({ message: "Welcome phylee backend json file" });
});


// Logout route
router.post("/auth/logout", authController.logout);


// Registration and login routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/verify/:userId", authController.verify);






export default router;
