// import nodeMailer from "nodemailer"

// const sendEmail = async (options) => {
//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMPT_HOST,
//         port: process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth: {
//             user: process.env.SMPT_MAIL,
//             pass: process.env.SMPT_PASSWORD,
//         },
//     });
//     // console.log(process.env.SMPT_PORT)
//     // console.log(process.env.SMPT_MAIL)
//     // console.log(process.env.SMPT_PASSWORD)
//     //console.log(transporter)

//     const mailOptions = {
//         from: process.env.SMPT_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };

//     await transporter.sendMail(mailOptions);
// };
// export default sendEmail;
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// console.log(process.env.SENDGRID_API_KEY)
const sendEmail = async (options) => {
    sgMail.send(options)


}
export default sendEmail
