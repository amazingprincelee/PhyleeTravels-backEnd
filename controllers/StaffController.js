// src/controllers/staffController.js
import User from "../models/user.js";

const staffController = {
    createStaff: async (req, res) => {
        const { firstName, lastName, email, phone, password, role, status } = req.body;
    
        // Check if the user is an admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    
        // Validate the role (ensure it's one of the allowed roles)
        const validRoles = ['user', 'admin', 'staff', 'Tour Agent', 'Admission Officer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
    
        try {
            // Check if the email is already in use
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
    
            // Create a new staff member
            const newStaff = new User({
                firstName,
                lastName,
                email,
                phone,
                password,
                role,
                status: status || 'active',
            });
    
            // Save the new staff member to the database
            await newStaff.save();
            res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating staff' });
        }
    },
    

    getStaff: async (req, res) => {
        try {
            const staff = await User.find({ role: { $in: ['staff', 'Tour Agent', 'Admission Officer'] } });
            res.status(200).json({ staff });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving staff' });
        }
    },
    

    updateStaff: async (req, res) => {
        const { staffId } = req.params;
        const { firstName, lastName, phone, role, status } = req.body;
    
        const validRoles = ['staff', 'Tour Agent', 'Admission Officer'];
    
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
    
        try {
            const staff = await User.findById(staffId);
            if (!staff || !validRoles.includes(staff.role)) {
                return res.status(404).json({ message: 'Staff not found' });
            }
    
            staff.firstName = firstName || staff.firstName;
            staff.lastName = lastName || staff.lastName;
            staff.phone = phone || staff.phone;
            staff.role = role || staff.role;
            staff.status = status || staff.status;
    
            await staff.save();
            res.status(200).json({ message: 'Staff updated successfully', staff });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating staff' });
        }
    },
    
    deleteStaff: async (req, res) => {
        const { staffId } = req.params;

        try {
            const staff = await User.findById(staffId);
            if (!staff || staff.role !== 'staff') {
                return res.status(404).json({ message: 'Staff not found' });
            }

            await staff.remove();
            res.status(200).json({ message: 'Staff deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting staff' });
        }
    },
};

export default staffController;
