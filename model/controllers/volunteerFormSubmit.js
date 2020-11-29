const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = (socket) => {
    socket.on('volunteer', (data) => {
        let name = "Volunteer Logo";
        let globalImageHolder = data.globalImageHolder;
        console.log(globalImageHolder);
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
            // IMAGE UPLOAD
            let filenewname = globalImageHolder[0].name;
            let fileExts = ['png', 'jpg', 'jpeg', 'gif'];
            let ext = globalImageHolder[0].name.split(/\.(?=[^\.]+$)/);
            ext = ext[ext.length - 1].toLowerCase();
            let isAllowedExt = fileExts.includes(ext);

            let fileExt = filenewname.substr(filenewname.lastIndexOf('.') + 1);
            let originalFileName = 'volunteer-form-img' + '.' + fileExt;
            let newpath = __dirname + '/../../stuff/uploads/' + originalFileName;
            // console.log(newpath);

            if (isAllowedExt) {
                fs.writeFile(newpath, globalImageHolder[0].data, function (error) {
                    if (error) {
                        jsonData = {
                            'type': 'error',
                            'message': 'Oops, something went wrong, try again later' + error
                        };
                        socketor.emit('_volunteer', jsonData);
                    } else {
                    }
                })

            }
            let send = sendMail(data, originalFileName);
            socket.emit('_volunteer', {
                type: 'success',
                message: 'Thanks for filling out the form!'
            });
        }
    });
}


async function sendMail(data, originalFileName) {
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
        attachments: [
            {   // file on disk as an attachment
                filename: '' + originalFileName,
                path: 'model/controllers/../../stuff/uploads/' + originalFileName // stream this file
            },
        ],
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


String.prototype.shuffle = function () {
    var a = this.split(""), n = a.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
