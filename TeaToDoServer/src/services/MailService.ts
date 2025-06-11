import nodemailer from "nodemailer";
import { SMTP } from "../config/constants";

class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: SMTP.SMTP_HOST,
            port: SMTP.SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP.SMTP_USER,
                pass: SMTP.SMTP_PASSWORD
            }
        });
    }

    async sendActivationLink(link: string, to: string) {
        this.transporter.sendMail({
           from: "Tea ToDo",
           to,
           subject: "Activate account on Tea ToDo",
           html: `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic" rel="stylesheet" />
                    <title>Activate account on Tea ToDo</title>
                </head>

                <body>
                    <div class="wrap" style="background-color: #d8d8d8; width: 100vw; height: 100vh; display: flex; font-family: "Inter"; align-items: center; justify-content: center;">
                        <div class="mail" style="background-color: #fff; border-radius: 5px; padding: 30px; width: 400px; height: 350px;">
                            <h1 class="mail__title" style="margin-bottom: 20px; font-size: 25px; font-weight: 600; color:#3c3c3c;">Welcome to Tea ToDo</h1>
                            <p class="mail__text" style="margin-bottom: 30px; font-weight: 400; color: #3c3c3c;">
                                Thank you for registering on our website! To complete the account creation process, please activate it by clicking 
                                the button below. After activation, you will be able to log into your account and take advantage of all available 
                                features. If you have any questions or issues, please feel free to contact our support team.
                            </p>
                            <div class="mail__button" style="transition: all 0.2s linear; cursor: pointer; background-color: #3c3c3c; display: inline-block; padding: 15px 30px; border-radius: 5px;">
                                <a href="${link}" class="mail__link" style="color: #fff; text-decoration: none;">Activate account</a>
                            </div>
                        </div>
                    </div>
                </body>

                </html>
            `
        });
    }
};

export default new MailService();