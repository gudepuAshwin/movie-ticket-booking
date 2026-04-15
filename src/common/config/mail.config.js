import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

export const sendBookingEmail = async (email, name, seatId) => {
  await sendEmail(
    email,
    "Ticket Booking Confirmation",
    `
    <h2>Hi ${name},</h2>
    <p>Your seat has been successfully booked!</p>
    
    <p><strong>Seat Number:</strong> ${seatId}</p>
    
    <p>Enjoy your movie</p>
    `,
  );
};
