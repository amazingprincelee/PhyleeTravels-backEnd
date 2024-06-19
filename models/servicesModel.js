// servicesModel.js

import mongoose from "mongoose";

const postgraduateSchema = new mongoose.Schema({
    email: { type: String, required: true },
    waecNeco: { type: String, default: null },  // WAEC/NECO
    degreeCertificate: { type: String, default: null },
    degreeTranscript: { type: String, default: null },
    curriculumVitae: { type: String, default: null },
    birthDocument: { type: String, default: null },  // Birth certificate/affidavit
    internationalPassport: { type: String, default: null },
    recommendationLetters: [{ type: String, default: null }],  // Array for multiple letters
    personalStatement: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    ielts: { type: String, default: "200,000" },
    serviceCharge: { type: String, default: "200,000" },
    balance: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 }
});

const undergraduateSchema = new mongoose.Schema({
    email: { type: String, required: true },
    waecNeco: { type: String, default: null },  // WAEC/NECO
    curriculumVitae: { type: String, default: null },
    birthDocument: { type: String, default: null },  // Birth certificate
    passportDataPage: { type: String, default: null },  // Data page of International Passport
    recommendationLetters: [{ type: String, default: null }],
    proofOfPayment: { type: String, default: null },
    ielts: { type: String, default: "200,000" },
    serviceCharge: { type: String, default: "200,000" },
    balance: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 }
});

const schengenTouristSchema = new mongoose.Schema({
    email: { type: String, required: true },
    internationalPassport: { type: String, default: null },
    bankStatement: { type: String, default: null },
    workDetails: { type: String, default: null },
    introductionLetter: { type: String, default: null },
    cacDocuments: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    visaDuration: String,
    fees: {
        processingFee: { type: String, default: "200,000" },
        appointmentFee: { type: String, default: "200,000" },
        insuranceFee: { type: String, default: "200,000" },
        applicationFee: { type: String, default: "200,000" }
    },
    processingTime: {
        embassy: { type: String, default: null },
        phyleeTravels: { type: String, default: null }
    }
});

const turkeyTouristSchema = new mongoose.Schema({
    email: { type: String, required: true },
    internationalPassport: { type: String, default: null},
    bankStatement: { type: String, default: null },
    workDetails: { type: String, default: null },
    introductionLetter: { type: String, default: null },
    cacDocuments: { type: String, default: null },
    taxClearance: { type: String, default: null },
    proofOfAccommodation: { type: String, default: null },
    returnTicket: { type: String, default: null },
    passportPhotos: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    fees: {
        processingFee: { type: String, default: "200,000" },
        applicationFee: { type: String, default: "200,000" },
        healthInsurance: { type: String, default: "200,000" },
        biometricAppointment: { type: String, default: "200,000" }
    },
    visaDuration: String,
    processingTime: {
        embassy: { type: String, default: null },
        phyleeTravels: { type: String, default: null }
    }
});

const southAfricaTouristSchema = new mongoose.Schema({
    email: { type: String, required: true },
    internationalPassport: { type: String, default: null },
    bankStatement: { type: String, default: null },
    workDetails: { type: String, default: null },
    introductionLetter: { type: String, default: null },
    cacDocuments: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    fees: {
        processingFee: { type: String, default: "200,000" },
        childFee: { type: String, default: "200,000" },
        applicationFee: { type: String, default: "200,000" },
        vsfAppointmentFee: { type: String, default: "200,000" }
    },
    visaDuration: String,
    processingTime: {
        embassy: { type: String, default: null },
        phyleeTravels: { type: String, default: null }
    }
});

const eastAfricaVisaSchema = new mongoose.Schema({
    email: { type: String, required: true },
    internationalPassport: { type: String, default: null },
    passportPhoto: { type: String, default: null },
    yellowFeverCard: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    fee: { type: Number, required: true, default: 250000 },
    visaDuration: { type: String, default: '90 days Visa' },
    approvalDuration: { type: String, default: '7 days'}
});

const moroccoVisaSchema = new mongoose.Schema({
    email: { type: String, required: true },
    internationalPassport: { type: String, default: null },
    bankStatement: { type: String, default: null },
    introductionLetter: { type: String, default: null },
    yellowFeverCard: { type: String, default: null },
    travelInsurance: { type: String, default: null },
    ninSlip: { type: String, default: null },
    birthCertificateOrAffidavit: { type: String, default: null },
    marriageCertificate: { type: String, default: null },
    proofOfPayment: { type: String, default: null },
    fee: { type: Number, required: true, default: 250000 },
    visaDuration: { type: String, default: '90 days Visa' },
    approvalDuration: { type: String, default: '7 days'}
});

const Postgraduate = mongoose.model("Postgraduate", postgraduateSchema);
const Undergraduate = mongoose.model("Undergraduate", undergraduateSchema);
const SchengenTourist = mongoose.model("SchengenTourist", schengenTouristSchema);
const TurkeyTourist = mongoose.model("TurkeyTourist", turkeyTouristSchema);
const SouthAfricaTourist = mongoose.model("SouthAfricaTourist", southAfricaTouristSchema);
const EastAfrica = mongoose.model("EastAfrica", eastAfricaVisaSchema);
const MoroccoVisa = mongoose.model("MoroccoVisa", moroccoVisaSchema);

export { Postgraduate, Undergraduate, SchengenTourist, TurkeyTourist, SouthAfricaTourist, EastAfrica, MoroccoVisa };
