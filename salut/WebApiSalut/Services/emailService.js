var mailer = require('nodemailer');
var configuration = require('../Configuration.js');


class EmailService{
    constructor(){
        this.config = new configuration();
        this.configMail =this.config.getGmail();
        console.log(this.configMail);
        var informatio = {
            service: 'gmail',
            auth: {
                user: this.configMail.user,
                pass: this.configMail.pass
            }
        }
        this.transporter = mailer.createTransport(informatio);
    }
    sendEmail(To, Subject,Text,callback)
    {
        console.log(To)
        var mailOptions={
            from: this.configMail.user,
            to: To,
            subject: Subject,
            text: Text
        }
        console.log(mailer)
        var response = null;
        this.transporter.sendMail(mailOptions, function (err,info) {
            if (err) {
              console.log(err);
              
              response = {
                serverStatus: 200,
                correuEnviat: false,
                msg: 'There was an error sending the email'
              }
              callback (response);
              return;
            }
            console.log("correcte: " + info.response);
            response = {
                serverStatus: 200,
                correuEnviat: true,
                msg: 'The email send'
            }
              callback (response);
          });
    }
}
module.exports = EmailService