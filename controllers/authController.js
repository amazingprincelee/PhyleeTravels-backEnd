// authController.js
import User from "../models/user.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/nodeMailer.js";
import { generateVerificationCode } from "../utils/verficationCodeGenerator.js";



// Blacklist for invalidated tokens
export const tokenBlacklist = new Set();

// Cleanup function
const cleanupBlacklist = () => {
  tokenBlacklist.forEach(token => {
    const isExpired = checkTokenExpiration(token); // Implement checkTokenExpiration
    if (isExpired) tokenBlacklist.delete(token);
  });
};

// Periodically clean up the blacklist
setInterval(cleanupBlacklist, 3600000);

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;

      const verificationcode = generateVerificationCode();
      
      const newUser = new User({ firstName, lastName, email: email.toLowerCase(), phone, password, verificationcode });
      await newUser.save();

      await sendVerificationEmail(email, verificationcode);

      res.status(201).json({ message: "Registration successful. Verify your email to log in." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during registration" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("Login request received for email:", email);
  
      const user = await User.findOne({ email: email.toLowerCase() });
      console.log("User found:", user);
  
      if (!user) {
        console.log("User not found.");
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isPasswordValid = await user.comparePassword(password);
      console.log("Password validation result:", isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
  
      const token = generateToken({ id: user._id, name:user.firstName, role: user.role, emailVerification: user.isVerified });
      console.log("Token generated:", token);
  
      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    }
  },
  

  verify: async (req, res) => {
    try {
      const { userId, verifyCode } = req.body;
      const user = await User.findById(userId);

      if (!user || user.verificationcode !== verifyCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      user.isVerified = true;
      user.verificationcode = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during verification" });
    }
  },


  logout: (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      verifyToken(token); // Ensure token is valid
      tokenBlacklist.add(token); // Blacklist the token
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  },

};



export default authController;
