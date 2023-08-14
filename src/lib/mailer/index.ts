import nodemailer from "nodemailer";
import { generateRequestLink } from "../utils";
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const assets = {
  host: process.env.BASE_URL,
};

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

export const sendQuoteRequestEmail = async (data: any, id: string) => {
  await transporter.sendMail({
    from: `${"SetEvents"} ${"set@mail.com"}`,
    to: data.company_email,
    subject: `Backdrop Quote Requests`,
    // @ts-ignore-next-line
    template: "quote_request", //
    context: {
      company_name: data.company_name,
      link: generateRequestLink(id),
      requestId: id,
      message: "You have a new backdrop quote request",
    },
  });

  return true;
};

export const sendEventQuoteRequestEmail = async (data: any, id: string) => {
  await transporter.sendMail({
    from: `${"SetEvents"} ${"set@mail.com"}`,
    to: data.company_email,
    subject: `Event Quote Request`,
    // @ts-ignore-next-line
    template: "event_quote_request", //
    context: {
      company_name: data.company_name,
      link: generateRequestLink(id),
      message: "You have a new event quote request",
    },
  });

  return true;
};

export const sendTestEmail = async () => {
  await transporter.sendMail({
    from: `${"SetEvents"}`,
    to: "example@mail.com",
    subject: `Email test `,
    // @ts-ignore-next-line
    template: "test", //
    context: {
      ...assets,
      message: "You have a new text request",
    },
  });

  return true;
};
