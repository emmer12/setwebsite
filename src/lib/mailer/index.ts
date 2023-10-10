import nodemailer from "nodemailer";
import { generatePasswordResetLink, generateRequestLink } from "../utils";
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const assets = {
  host: process.env.BASE_URL,
};

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: [
      path.join(__dirname, "./src/lib/mailer/templates/"),
      path.join(__dirname, "./src/lib/mailer/templates/partials"),
    ],
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/lib/mailer/templates/"),
  extName: ".hbs",
};

const transporter = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  // secure: false,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    domain: 'setevents.co'
  },
  // tls: {
  //   ciphers: "SSLv3",
  // },
  //   tls: { rejectUnauthorized: false },
});
transporter.use("compile", hbs(handlebarOptions));

export const sendBackdropPurchaseEmail = async (data: any) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
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

export const sendQuoteRequestEmail = async (data: any) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
    to: data.company_email,
    subject: `New Quote Requests`,
    // @ts-ignore-next-line
    template: "quote_request", //
    context: {
      ...assets,
      company_name: data.company_name,
      message:
        "You have a new quote request. A user is seeking a quote for a specific service. Kindly access your account to review the details of the request and offer a competitive quote that aligns with the user's requirements. Your prompt response will contribute to a positive experience for our users. Thank you for your dedication to providing quality service through our platform.",
    },
  });

  return true;
};

export const sendEventQuoteRequestEmail = async (data: any, id: string) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
    to: data.company_email,
    subject: `Event Quote Request`,
    // @ts-ignore-next-line
    template: "event_quote_request", //
    context: {
      ...assets,
      company_name: data.company_name,
      link: generateRequestLink(id, "ppp"),
      message: "You have a new event quote request",
    },
  });

  return true;
};

export const sendTestEmail = async () => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
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

export const sendAdminNotification = async () => {
  try {
    await transporter.sendMail({
      from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Vendor Notification`,
      // @ts-ignore-next-line
      template: "new.vendor", //
      context: {
        ...assets,
        message:
          "A new vendor has just registered. Please be informed that a new vendor has joined our platform and may require verification and approval. Kindly review their registration details and proceed with the necessary steps. Thank you.",
      },
    });
    return true;
  } catch (err) {
    console.log(err, 'Error')
    return true
  }

};

export const testNotification = async () => {
  try {
    await transporter.sendMail({
      from: `SetEvents <info@setevents.co>`,
      to: 'info@setevents.co',
      subject: `New Vendor Notification`,
      // @ts-ignore-next-line
      template: "new.vendor", //
      context: {
        ...assets,
        message:
          "A new vendor has just registered. Please be informed that a new vendor has joined our platform and may require verification and approval. Kindly review their registration details and proceed with the necessary steps. Thank you.",
      },
    });
    return true;
  } catch (err) {
    console.log(err, 'Error')
    return true
  }

};

export const sendQuoteNotification = async (data: any) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
    to: data.email,
    subject: `New Quote Notification`,
    // @ts-ignore-next-line
    template: "new.quote", //
    context: {
      ...assets,
      company_name: data.company_name,
      username: data.username,
      link: generateRequestLink(data.quote.id, data.rid),
      quote: data.quote,
    },
  });

  return true;
};

export const sendResetPasswordEmail = async (data: any, token: string) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
    to: data.email,
    subject: `Reset Password Notification`,
    // @ts-ignore-next-line
    template: "password.reset", //
    context: {
      ...assets,
      link: generatePasswordResetLink(token),
    },
  });

  return true;
};


export const sendSetEmail = async (data: any) => {
  await transporter.sendMail({
    from: `SetEvents <${process.env.ADMIN_EMAIL}>`,
    to: data.email,
    subject: `Set and Forget Notification`,
    // @ts-ignore-next-line
    template: "saf", //
    context: {
      ...assets,
      message: "You have a new text request",
      ...data
    },
  });

  return true;
};
