import Mailgen from 'mailgen'


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


export { emailVerificationMailgenContent, passwordResetMailgenContent }