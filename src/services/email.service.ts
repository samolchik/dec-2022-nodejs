import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { configs } from "../configs";
import { allTemplates } from "../constants/email.constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No replay",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailActions: EEmailActions,
    context: Record<string, string | number>
  ) {
    const { subject, templateName } = allTemplates[emailActions];

    context.frontUrl = configs.FRONT_URL;

    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
