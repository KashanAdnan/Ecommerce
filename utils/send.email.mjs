import nodemailer from "nodemailer";

const sendEmail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTHENTICATION_HOST,
    port: process.env.AUTHENTICATION_PORT,
    service: process.env.AUTHENTICATION_SERVICE,
    auth: {
      user: process.env.AUTHENTICATION_USER,
      pass: process.env.AUTHENTICATION_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.AUTHENTICATION_USER,
    to: email,
    subject,
    html,
  });
};

export default sendEmail;
