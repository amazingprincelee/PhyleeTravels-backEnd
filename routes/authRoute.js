//authRoute.js

import passport from "passport";
import express from "express";
import authController from "../controllers/authController.js";




const router = express.Router();

// Welcome message
router.get("/", (req, res) => {
  res.json({ message: "Welcome Newage coin json file" });
});

router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ loggedIn: true, user: req.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});




// Logout route
router.get("/logout", authController.logout);


// Registration and login routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", authController.verify);





export default router;
