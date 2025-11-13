import { getMailOptions, transport } from "./nodemailer"

type mailparams = {
    userEmail: string;
    userName: string;
    token: string;
}
export const sendConfirmationMail = async ({ userEmail, userName, token }: mailparams) => {
    const mailoptions = getMailOptions(userEmail, userName, token)
    try {
        await transport.sendMail(mailoptions)
    } catch (error: any) {
        console.error("Email sending failed:", error.message);
    }

}