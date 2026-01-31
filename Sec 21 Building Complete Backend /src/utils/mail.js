import Mailgen from 'mailgen'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const sendMail = async (options){
    const mailGenerator = new MailGen({
        theme: 'default',
        product: {
            name: 'Our Application',
            link: 'https://ourapplication.com/'
        }
    })
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    
    const emailHTML = mailGenerator.generate(options.mailgenContent)

    const transporter= nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: '"Our Application" <no-reply@ourapplication.com>',
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}


const emailVerificationMailgenContent = (username, verificationUrl)=>{
        return {
    body: {
        name: username,
        intro: 'Welcome to Our Application! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with our application, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your email',
                link: verificationUrl
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'


        },
    }
}

const passwordResetMailgenContent = (username, passwordResetUrl)=>{
        return {
    body: {
        name: username,
        intro: 'We received a request to reset your password.',
        action: {
            instructions: 'To reset your password, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Reset your password',
                link: passwordResetUrl
            }
        },
        outro: 'If you did not request a password reset, please ignore this email or reply to let us know.'


        },
    }
}


export { emailVerificationMailgenContent, passwordResetMailgenContent, sendMail }