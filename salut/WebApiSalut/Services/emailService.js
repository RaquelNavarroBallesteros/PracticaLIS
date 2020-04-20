var mailer = require('nodemailer');

var configuration = require('../Configuration.js');


class EmailService{
    constructor(){
        this.config = new configuration();
        var configMail =this.config.getGmail(); 
        this.transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: configMail.user,
                pass: configMail.user.pass
            }
        });
    }
    sendEmail(To, Subject,Text,callback)
    {
        var mailOptions={
            from: configMail.user,
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