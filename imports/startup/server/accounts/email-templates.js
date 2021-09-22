
// import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const name = 'Carvcon';
const email = '<no-reply@freegrapik.com>';
const from = `${name} ${email}`;
const { emailTemplates } = Accounts;

emailTemplates.siteName = name;
emailTemplates.from = from;

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return `[${name}] Verify Your Email Address`;
  },
  text(user, url) {
    const emailAddress = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');
    const supportEmail = 'info@carvcon.com';
    const emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  },
};

Accounts.emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Reset Your Password`;
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    const supportEmail = 'info@carvcon.com';
    const emailBody = `To reset your password visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
    return emailBody;
  },
};
