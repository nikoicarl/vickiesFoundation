const nodemailer = require('nodemailer');


module.exports = (socket)=>{
    socket.on('volunteer', (data)=>{
        //Check for empty
        if (data.nameFirst === '' || data.nameLast === '' || data.email === '' || data.phone === '' || data.addressl1 === '' || data.state === '' || data.country === '' || data.gender === '' || data.age === '' || data.occupation === '' || data.job_title === '' || data.job_desc === '' || data.reason === '') {
            socket.emit('_volunteer', {
                type: 'error',
                message: 'Some fields are required'
            });
        } else if (data.nameFirst === undefined || data.nameLast === undefined || data.email === undefined || data.phone === undefined || data.addressl1 === undefined || data.state === undefined || data.country === undefined || data.gender === undefined || data.age === undefined || data.occupation === undefined || data.job_title === undefined || data.job_desc === undefined || data.reason === undefined) {
            socket.emit('_volunteer', {
                type: 'error',
                message: 'Some fields are required'
            });
        } else {
            let send = sendMail(data);
            socket.emit('_volunteer', {
                type: 'success',
                message: 'Thanks for filling out the form!'
            });
        }
    });
}


async function sendMail(data) {
    let transporter = nodemailer.createTransport({
        host: "vickiesfoundation.org",
        port: 465,
        secure: true,
        auth: {
            user: "noreply@vickiesfoundation.org",
            pass: "noreply@@2020",
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<noreply@vickiesfoundation.org>',
        to: 'noreply@vickiesfoundation.org',
        subject: 'Volunteer Form Entry',
        html: `
            <p>Name of Person: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>
            <p>Country: ${data.country}</p>
            <p>Business: ${(data.business) ? data.business : 'No'}</p>
            <p>Domestic: ${(data.domestic) ? data.domestic : 'No'}</p>
            <p>Personal: ${(data.personal) ? data.personal : 'No'}</p>
            <p>Comment: ${data.comment}</p>
        `,
    });

    if (info.messageId) {
        console.log("Message sent: %s", info.messageId);
        return true;
    } else {
        return false;
    }
}
