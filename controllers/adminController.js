// adminController.js
import User from "../models/user.js";
import {
    Postgraduate,
    Undergraduate,
    SchengenTourist,
    TurkeyTourist,
    SouthAfricaTourist,
    EastAfrica,
    MoroccoVisa
} from '../models/applicationModel.js';

const adminController = {


     // Create a new staff user
     createAdmin: async (req, res) => {
        const { firstName, lastName, email, phone, password } = req.body;
    
        // Ensure the requesting user is a superadmin
        if (!req.user || req.user.role !== 'superadmin') {
            return res.status(403).json({ error: 'Forbidden: Only superadmins can create admins' });
        }
    
        // Validate input fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields (firstName, lastName, email, password) are required' });
        }
    
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
    
            // Create the admin user
            const newAdmin = new User({
                firstName,
                lastName,
                email,
                phone,
                password, // Password hashing handled in pre-save middleware
                role: 'admin', // Assign the 'admin' role
            });
    
            await newAdmin.save();
    
            res.status(201).json({
                message: 'Admin created successfully',
                admin: {
                    id: newAdmin._id,
                    firstName: newAdmin.firstName,
                    lastName: newAdmin.lastName,
                    email: newAdmin.email,
                    phone: newAdmin.phone,
                    role: newAdmin.role,
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    assignToStaff: async (req, res) => {
        
        const { email, serviceType, staffId } = req.body;
      
        const models = {
          postgraduate: Postgraduate,
          undergraduate: Undergraduate,
          schengenTourist: SchengenTourist,
        };
      
        const Model = models[serviceType];
        if (!Model) {
          return res.status(400).json({ message: "Invalid service type." });
        }
      
        try {
          const userFiles = await Model.findOneAndUpdate(
            { email },
            { assignedTo: staffId },
            { new: true }
          );
          if (!userFiles) {
            return res.status(404).json({ message: "Files not found for the user." });
          }
          res.status(200).json({ message: "Files assigned successfully.", files: userFiles });
        } catch (error) {
          console.error("Error assigning files to staff:", error);
          res.status(500).json({ message: "Error assigning files to staff." });
        }
      },
    
    // Update all Postgraduate documents
    updateAllPostgraduates: async (req, res) => {
        const { ielts, serviceCharge, balance, amountPaid } = req.body;

        try {
            const updatedPostgraduates = await Postgraduate.updateMany(
                {},
                { $set: { ielts, serviceCharge, balance, amountPaid } },
                { new: true }
            );
            res.json(updatedPostgraduates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all Undergraduate documents
    updateAllUndergraduates: async (req, res) => {
        const { ielts, serviceCharge, balance, amountPaid } = req.body;

        try {
            const updatedUndergraduates = await Undergraduate.updateMany(
                {},
                { $set: { ielts, serviceCharge, balance, amountPaid } },
                { new: true }
            );
            res.json(updatedUndergraduates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all Schengen Tourist documents
    updateAllSchengenTourists: async (req, res) => {
        const { visaDuration, processingFee, appointmentFee, insuranceFee, applicationFee, embassy, phyleeTravels } = req.body;

        try {
            const updatedSchengenTourists = await SchengenTourist.updateMany(
                {},
                {
                    $set: {
                        visaDuration,
                        'fees.processingFee': processingFee,
                        'fees.appointmentFee': appointmentFee,
                        'fees.insuranceFee': insuranceFee,
                        'fees.applicationFee': applicationFee,
                        'processingTime.embassy': embassy,
                        'processingTime.phyleeTravels': phyleeTravels
                    }
                },
                { new: true }
            );
            res.json(updatedSchengenTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all Turkey Tourist documents
    updateAllTurkeyTourists: async (req, res) => {
        const { visaDuration, processingFee, applicationFee, healthInsurance, biometricAppointment, embassy, phyleeTravels } = req.body;

        try {
            const updatedTurkeyTourists = await TurkeyTourist.updateMany(
                {},
                {
                    $set: {
                        visaDuration,
                        'fees.processingFee': processingFee,
                        'fees.applicationFee': applicationFee,
                        'fees.healthInsurance': healthInsurance,
                        'fees.biometricAppointment': biometricAppointment,
                        'processingTime.embassy': embassy,
                        'processingTime.phyleeTravels': phyleeTravels
                    }
                },
                { new: true }
            );
            res.json(updatedTurkeyTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all South Africa Tourist documents
    updateAllSouthAfricaTourists: async (req, res) => {
        const { visaDuration, processingFee, childFee, applicationFee, vsfAppointmentFee, embassy, phyleeTravels } = req.body;

        try {
            const updatedSouthAfricaTourists = await SouthAfricaTourist.updateMany(
                {},
                {
                    $set: {
                        visaDuration,
                        'fees.processingFee': processingFee,
                        'fees.childFee': childFee,
                        'fees.applicationFee': applicationFee,
                        'fees.vsfAppointmentFee': vsfAppointmentFee,
                        'processingTime.embassy': embassy,
                        'processingTime.phyleeTravels': phyleeTravels
                    }
                },
                { new: true }
            );
            res.json(updatedSouthAfricaTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all East Africa Visa documents
    updateAllEastAfricaVisas: async (req, res) => {
        const { fee, visaDuration, approvalDuration } = req.body;

        try {
            const updatedEastAfricaVisas = await EastAfrica.updateMany(
                {},
                { $set: { fee, visaDuration, approvalDuration } },
                { new: true }
            );
            res.json(updatedEastAfricaVisas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update all Morocco Visa documents
    updateAllMoroccoVisas: async (req, res) => {
        const { fee, visaDuration, approvalDuration } = req.body;

        try {
            const updatedMoroccoVisas = await MoroccoVisa.updateMany(
                {},
                { $set: { fee, visaDuration, approvalDuration } },
                { new: true }
            );
            res.json(updatedMoroccoVisas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    

     // Get Postgraduate by email
     getPostgraduateByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const postgraduate = await Postgraduate.findOne({ email });
            if (!postgraduate) {
                return res.status(404).json({ error: 'Postgraduate not found' });
            }
            res.json(postgraduate);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get Undergraduate by email
    getUndergraduateByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const undergraduate = await Undergraduate.findOne({ email });
            if (!undergraduate) {
                return res.status(404).json({ error: 'Undergraduate not found' });
            }
            res.json(undergraduate);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get Schengen Tourist by email
    getSchengenTouristByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const schengenTourist = await SchengenTourist.findOne({ email });
            if (!schengenTourist) {
                return res.status(404).json({ error: 'Schengen Tourist not found' });
            }
            res.json(schengenTourist);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get Turkey Tourist by email
    getTurkeyTouristByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const turkeyTourist = await TurkeyTourist.findOne({ email });
            if (!turkeyTourist) {
                return res.status(404).json({ error: 'Turkey Tourist not found' });
            }
            res.json(turkeyTourist);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get South Africa Tourist by email
    getSouthAfricaTouristByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const southAfricaTourist = await SouthAfricaTourist.findOne({ email });
            if (!southAfricaTourist) {
                return res.status(404).json({ error: 'South Africa Tourist not found' });
            }
            res.json(southAfricaTourist);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get East Africa Visa by email
    getEastAfricaVisaByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const eastAfricaVisa = await EastAfrica.findOne({ email });
            if (!eastAfricaVisa) {
                return res.status(404).json({ error: 'East Africa Visa not found' });
            }
            res.json(eastAfricaVisa);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get Morocco Visa by email
    getMoroccoVisaByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const moroccoVisa = await MoroccoVisa.findOne({ email });
            if (!moroccoVisa) {
                return res.status(404).json({ error: 'Morocco Visa not found' });
            }
            res.json(moroccoVisa);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all Postgraduates
    getAllPostgraduates: async (req, res) => {
        try {
            const postgraduates = await Postgraduate.find();
            res.json(postgraduates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all Undergraduates
    getAllUndergraduates: async (req, res) => {
        try {
            const undergraduates = await Undergraduate.find();
            res.json(undergraduates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all Schengen Tourists
    getAllSchengenTourists: async (req, res) => {
        try {
            const schengenTourists = await SchengenTourist.find();
            res.json(schengenTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all Turkey Tourists
    getAllTurkeyTourists: async (req, res) => {
        try {
            const turkeyTourists = await TurkeyTourist.find();
            res.json(turkeyTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all South Africa Tourists
    getAllSouthAfricaTourists: async (req, res) => {
        try {
            const southAfricaTourists = await SouthAfricaTourist.find();
            res.json(southAfricaTourists);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all East Africa Visas
    getAllEastAfricaVisas: async (req, res) => {
        try {
            const eastAfricaVisas = await EastAfrica.find();
            res.json(eastAfricaVisas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all Morocco Visas
    getAllMoroccoVisas: async (req, res) => {
        try {
            const moroccoVisas = await MoroccoVisa.find();
            res.json(moroccoVisas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
};

export default adminController;
