var mailer = require('nodemailer');


class EmailService{
    constructor(){
        this.transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seguisalut@gmail.com',
                pass: 'lis7salut'
            }
        });
    }
    sendEmail(To, Subject,Text,callback)
    {
        var mailOptions={
            from: 'seguisalut@gmail.com',
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