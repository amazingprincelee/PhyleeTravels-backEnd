//authcontroller
import passport from "passport";
import User from "../models/user.js";
import { sendVerificationEmail } from "../utils/nodeMailer.js";
import { generateVerificationCode } from "../utils/verficationCodeGenerator.js";




const authController = {

  register: async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;
  
      // Generate verification code
      const verificationcode = generateVerificationCode();
  
      // Create a new user instance
      const newUser = new User({
        username,
        email,
        phone,
        verificationcode,
      });
  
      // Register the user
      await User.register(newUser, password, async (err, user) => {
        if (err) {
          // Handle registration errors
          console.error(err);
          if (err.name === 'UserExistsError') {
            return res.status(400).json({ message: 'User already registered' });
          } else {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        }
  
        // Send verification code via email
        try {
          await sendVerificationEmail(user.email, verificationcode);
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          // Handle email sending error
          return res.status(500).json({ message: 'Error sending verification email' });
        }
  
        // Authentication after registration
      passport.authenticate('local')(req, res, () => {
        // Redirect to verify route
        res.status(200).json({ 
          message: `Verification code sent to ${user.email}`, 
          redirectTo: "/verify",
          userId: user._id // Return user ID
        });
      });
    });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Unexpected error during registration' });
    }
  },
  



  login: async (req, res) => {


    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      req.logIn(user, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        // Prepare the response data
        const responseData = {
          message: 'Successfully logged in',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: { status: user.isVerified, message: "Alabo, this one na for email verification o" },
          },
        };
        res.status(201).json(responseData);
      });
    })(req, res);
  },

  checkAuth: async (req, res) => {
    if (req.user) {
      res.status(201).json({ loggedIn: true, user: req.user });
    } else {
      res.status(201).json({ loggedIn: false });
    }
  },
  
  


  logout: async function (req, res) {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Logout the user
      req.logout((err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: "Successfully logged out" });
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },



  // Verify 
 // Verify 
 verify: async (req, res) => {
  try {
    const verifyCode = req.body.verifyCode;


    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user is already verified
    if (req.user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    console.log(req.user.verificationcode, verifyCode);
    // Check if the verification code matches the one in the database
    if (req.user.verificationcode !== verifyCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }



    // Update user's verification status
    req.user.isVerified = true;
    req.user.verificationcode = null; //clear the code after successful verification
    await req.user.save();

    // Return information to populate dashboard
    return res.status(201).json({
      message: 'Email Verified Successfully, you can login into your account now'

    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unexpected error during verification' });
  }
},






};

export default authController;