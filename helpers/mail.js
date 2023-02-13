const nodemailer = require("nodemailer");
const { template } = require("../mail/requestRegister");

const config = () => {
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};
// const config = () => {
//   return nodemailer.createTransport({
//     host: process.env.HOST,
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
// };

config()
  .verify()
  .then(() => {
    console.log("Ready for send emails");
  });

const mail = async ({ data, image }) => {
  try {
    // console.log("data", data);
    // console.log("image", image);
    const { email } = data;
    let transporter = config();
    let attachments = [];
    attachments.push({
      filename: "voucher.jpg",
      content: image.data,
    });

    await transporter.sendMail({
      from: "notification@alinticoin.green",
      to: [
        email,
        "marco.esparza@alinticoin.green",
        "richard.romero@alinticoin.green",
      ],
      subject: "Solicitud de compra de ALITS",
      html: template(data),
      attachments,
    });

    return {
      ok: true,
      msg: "Datos enviados correctamente",
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
      msg: "Error, contact Admin",
    };
  }
};

module.exports = { mail };
