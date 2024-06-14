//utils/nodeMailer.js
import 'dotenv/config.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAIL_HOST,
  port: 465,  
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PWDS, 
  },
});




  // Verify SMTP configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP configuration error:');
    console.error(error);
  } else {
    console.log("SMTP configuration is correct. Server is ready to take our messages.");
  }
});

export const sendVerificationEmail = async (to, code) => {
  const mailOptions = {
    from: 'noreply@newAgeCoin.cash',
    to,
    subject: 'Phylee verification Code',
    text: `Dear User,\n\nYour verification code is: ${code}\n\nThank you for choosing Phylee Journeys.\n\nBest regards,\nPhylee journeys Team`,
  };

  return transporter.sendMail(mailOptions);
};
