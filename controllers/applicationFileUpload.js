//controller/applicationFileUpload
import { Postgraduate, Undergraduate, SchengenTourist, TurkeyTourist, SouthAfricaTourist, EastAfrica, MoroccoVisa } from '../models/applicationModel.js';
import { upload as cloudinaryUpload } from '../config/cloudinary.js';

const applicationFileUpload = {
    postGraduate: async (req, res) => {
        await handleFileUploads(req, res, Postgraduate);
    },
    undergraduate: async (req, res) => {
        console.log('Undergraduate file upload endpoint hit');
        await handleFileUploads(req, res, Undergraduate);
    },
    schengenTourist: async (req, res) => {
        await handleFileUploads(req, res, SchengenTourist);
    },
    turkeyTourist: async (req, res) => {
        await handleFileUploads(req, res, TurkeyTourist);
    },
    southAfricaTourist: async (req, res) => {
        await handleFileUploads(req, res, SouthAfricaTourist);
    },
    eastAfrica: async (req, res) => {
        await handleFileUploads(req, res, EastAfrica);
    },
    moroccoVisa: async (req, res) => {
        await handleFileUploads(req, res, MoroccoVisa);
    }
};

const handleFileUploads = async (req, res, Model) => {
    try {
        const email = req.params.email;
        const updateQueries = {};
        const uploadedFiles = [];

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, error: 'No files were uploaded' });
        }

        for (const key in req.files) {
            const file = req.files[key];
            const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            const maxSizeKB = 1024;

            if (!allowedFileTypes.includes(file.mimetype)) {
                return res.status(400).json({ success: false, error: 'Supported formats: JPG, PNG, JPEG, PDF' });
            }

            if (file.size / 1024 > maxSizeKB) {
                return res.status(400).json({ success: false, error: `File size should be less than ${maxSizeKB} KB` });
            }

            try {
                // Upload to Cloudinary
                const cloudFile = await cloudinaryUpload(file.tempFilePath, email); // Using email instead of userId
                uploadedFiles.push({ [key]: cloudFile.url });
                updateQueries[key] = cloudFile.url;
            } catch (uploadError) {
                return res.status(500).json({ success: false, error: 'Error uploading file to Cloudinary', errorMessage: uploadError.message });
            }
        }

        // Update the database with the Cloudinary URLs
        const updatedData = await Model.findOneAndUpdate({ email: email }, { $set: updateQueries }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }

        res.status(201).json({
            success: true,
            message: 'Files uploaded successfully',
            updatedData: updatedData,
            fileUrls: uploadedFiles,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: 'Error updating profile', errorMessage: error.message });
    }
};

export default applicationFileUpload;
