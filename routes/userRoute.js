import express from "express";
import userController from "../controllers/userController.js";


const router = express.Router();

// Welcome message
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Phylee backend user route" });
});




//get users profile
router.get("/profile/:userId", userController.getProfile);


router.put("/updateProfile/:userId",  userController.upDateprofile);

router.post("/reset-password/:userId", userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPasswordWithToken);





export default router;
