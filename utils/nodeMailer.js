//utils/nodeMailer.js
import 'dotenv/config.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'newagecoin.cash',
  port: 465,  
  auth: {
    user: 'noreply@newagecoin.cash',
    pass: 'J]2X8Ouu8&^h', // Password set directly here
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
