import express from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";


const router = express.Router();

// Welcome message
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Phylee backend user route" });
});




//get users profile
router.get("/user/profile/:userId", authenticateJWT, userController.getProfile);


router.put("/user/updateProfile/:userId", authenticateJWT,  userController.upDateprofile);

router.post("/user/reset-password/:userId", userController.resetPassword);
router.post('/user/forgot-password', userController.forgotPassword);
router.post('/user/reset-password', userController.resetPasswordWithToken);





export default router;
