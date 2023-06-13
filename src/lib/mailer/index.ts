import nodemailer from "nodemailer";
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(__dirname, "./src/lib/mailer/templates/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/lib/mailer/templates/"),
  extName: ".hbs",
};

const transporter = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  secure: false,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
  //   tls: { rejectUnauthorized: false },
});
transporter.use("compile", hbs(handlebarOptions));

export const sendBackdropPurchaseEmail = async (data: any) => {
  await transporter.sendMail({
    from: `${"SetEvents"} ${"set@mail.com"}`,
    to: data.email,
    subject: `Backdrop Purchase  File`,
    // @ts-ignore-next-line
    template: "backdrop", //
    context: {
      full_name: data.full_name,
      message:
        "Thanks for buying a backdrop you can find the purchased file in  the attachment below",
    },
    attachments: data.attachments,
  });

  return true;
};
