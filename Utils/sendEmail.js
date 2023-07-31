import nodeMailer from "nodemailer";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  // service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

//   const mailOptions = {
//     from: process.env.SMPT_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

const sendEmail = async (options) => {
  console.log(options);
  await transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export default sendEmail;

// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// // console.log(process.env.SENDGRID_API_KEY)
// const sendEmail = async (options) => {
//     sgMail.send(options)

// }
// export default sendEmail
