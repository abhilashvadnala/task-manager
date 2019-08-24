const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = `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`

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: `abhivadnala@gmail.com`,
        subject: `Welcome to Task App!!`,
        text: `Hello ${name}, \nIt is very nice to see you here. We hope you achieve all of your created task and be productive. \n \n- Abhilash Vadnala.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'abhivadnala@gmail.com',
        subject: 'Farewell, from Task App',
        text: `Farewell ${name}, sorry to see you go.\n For the betterment of App, can you please tell what made you leave?\n Replay your response to this email.\n \n Abhilash Vadnala.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}