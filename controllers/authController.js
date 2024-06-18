// authController.js
import passport from "passport";
import User from "../models/user.js";
import { sendVerificationEmail } from "../utils/nodeMailer.js";
import { generateVerificationCode } from "../utils/verficationCodeGenerator.js";
import {
  Postgraduate,
  Undergraduate,
  SchengenTourist,
  TurkeyTourist,
  SouthAfricaTourist,
  EastAfrica,
  MoroccoVisa
} from "../models/servicesModel.js";



// Generate verification code
const verificationCode = generateVerificationCode();

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;

      // Generate verification code
      const verificationCode = generateVerificationCode();

      // Create a new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        verificationCode,
      });

      // Register the user
      await User.register(newUser, password, async (err, user) => {
        if (err) {
          console.error(err);
          if (err.name === 'UserExistsError') {
            return res.status(400).json({ message: 'User already registered' });
          } else {
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        }

        // Create related documents and associate them with the user
        try {
          const postgraduate = await Postgraduate.create({ email: user.email });
          const undergraduate = await Undergraduate.create({ email: user.email });
          const schengenTourist = await SchengenTourist.create({ email: user.email });
          const turkeyTourist = await TurkeyTourist.create({ email: user.email });
          const southAfricaTourist = await SouthAfricaTourist.create({ email: user.email });
          const eastAfrica = await EastAfrica.create({ email: user.email });
          const moroccoVisa = await MoroccoVisa.create({ email: user.email });

          // Associate the created documents with the user
          user.postgraduate = postgraduate._id;
          user.undergraduate = undergraduate._id;
          user.schengenTourist = schengenTourist._id;
          user.turkeyTourist = turkeyTourist._id;
          user.southAfricaTourist = southAfricaTourist._id;
          user.eastAfrica = eastAfrica._id;
          user.moroccoVisa = moroccoVisa._id;

          // Save the user with the associated document IDs
          await user.save();

          // Send verification code via email
          await sendVerificationEmail(user.email, verificationCode);

          // Redirect to verify route
          res.status(200).json({
            message: `Verification code sent to ${user.email}`,
            redirectTo: "/verify",
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id, // Return user ID
            email: user.email // Return user email
          });
        } catch (error) {
          console.error('Error creating related documents:', error);
          return res.status(500).json({ message: 'Error creating related documents' });
        }
      });

    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Unexpected error during registration' });
    }
  },
  

  login: async (req, res) => {
    const user = new User({
      username: req.body.email,
      password: req.body.password
    });

    req.login(user, async (err) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
          }

          req.logIn(user, async (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: 'Internal Server Error' });
            }

            // Prepare the response data
            const responseData = {
              message: 'Successfully logged in',
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isVerified: { status: user.isVerified, message: "check verification" },
              },
            };

            res.status(201).json(responseData);
          });
        })(req, res);
      }
    });
  },

  logout: async (req, res) => {
    
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

  verify: async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from request params
      const { verifyCode } = req.body; // Extract verification code from request body

      // Find the user by userId
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user is already verified
      if (user.isVerified) {
        return res.status(400).json({ message: 'User is already verified' });
      }

      // Check if the verification code matches the one in the database
      if (user.verificationcode !== verifyCode) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Update user's verification status
      user.isVerified = true;
      user.verificationcode = null; //clear the code after successful verification
      await user.save();

      // Return success response
      return res.status(201).json({
        message: 'Email Verified Successfully, you can login into your account now'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during verification' });
    }
  },

  checkAuth: async (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(200).json({ loggedIn: false });
    }
  },
};

export default authController;
