const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = (socket) => {
    socket.on('volunteer', (data) => {
        let name = "Volunteer Logo";
        let globalImageHolder = data.globalImageHolder;
        // console.log(globalImageHolder);
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
        to: 'info@vickiesfoundation.org',
        subject: 'Volunteer Form Entry',
        attachments: [
            {   // file on disk as an attachment
                filename: '' + originalFileName,
                path: 'model/controllers/../../stuff/uploads/' + originalFileName // stream this file
            },
        ],
        html: `
        <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office" nighteye="disabled">
      
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <style type="text/css">
          @media screen {
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 400;
              src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 400;
              src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 500;
              src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 500;
              src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 700;
              src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 700;
              src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 800;
              src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
      
            @font-face {
              font-family: 'Fira Sans';
              font-style: normal;
              font-weight: 800;
              src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
          }
        </style>
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
      
          .ReadMsgBody,
          .ExternalClass {
            width: 100%;
          }
      
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass td,
          .ExternalClass div,
          .ExternalClass span,
          .ExternalClass font {
            line-height: 100%;
          }
      
          div[style*="margin: 14px 0"],
          div[style*="margin: 16px 0"] {
            margin: 0 !important;
          }
      
          table,
          td {
            mso-table-lspace: 0;
            mso-table-rspace: 0;
          }
      
          table,
          tr,
          td {
            border-collapse: collapse;
          }
      
          body,
          td,
          th,
          p,
          div,
          li,
          a,
          span {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            mso-line-height-rule: exactly;
          }
      
          img {
            border: 0;
            outline: none;
            line-height: 100%;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
          }
      
          body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-font-smoothing: antialiased;
          }
      
          .pc-gmail-fix {
            display: none;
            display: none !important;
          }
      
          @media screen and (min-width: 621px) {
            .pc-email-container {
              width: 620px !important;
            }
          }
        </style>
        <style type="text/css">
          @media screen and (max-width:620px) {
            .pc-sm-p-20 {
              padding: 20px !important
            }
      
            .pc-sm-p-35-10-15 {
              padding: 35px 10px 15px !important
            }
      
            .pc-sm-mw-50pc {
              max-width: 50% !important
            }
      
            .pc-sm-p-30-20 {
              padding: 30px 20px !important
            }
      
            .pc-sm-fs-30 {
              font-size: 30px !important
            }
      
            .pc-sm-fs-18 {
              font-size: 18px !important
            }
      
            .pc-sm-p-21-10-14 {
              padding: 21px 10px 14px !important
            }
      
            .pc-sm-h-20 {
              height: 20px !important
            }
      
            .pc-sm-mw-100pc {
              max-width: 100% !important
            }
          }
        </style>
        <style type="text/css">
          @media screen and (max-width:525px) {
            .pc-xs-p-10 {
              padding: 10px !important
            }
      
            .pc-xs-p-25-0-5 {
              padding: 25px 0 5px !important
            }
      
            .pc-xs-mw-100pc {
              max-width: 100% !important
            }
      
            .pc-xs-br-disabled br {
              display: none !important
            }
      
            .pc-xs-p-25-10 {
              padding: 25px 10px !important
            }
      
            .pc-xs-fs-16 {
              font-size: 16px !important
            }
      
            .pc-xs-p-5-0 {
              padding: 5px 0 !important
            }
          }
        </style>
        <!--[if mso]>
          <style type="text/css">
              .pc-fb-font {
                  font-family: Helvetica, Arial, sans-serif !important;
              }
          </style>
          <![endif]-->
        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      </head>
      
      <body
        style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4"
        class="">
        <div
          style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">
          This is preheader text. Some clients will show this text as a preview.</div>
        <div
          style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
          ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        </div>
        <table class="pc-email-body" role="presentation" style="table-layout: fixed;" width="100%" cellspacing="0"
          cellpadding="0" border="0" bgcolor="#f4f4f4">
          <tbody>
            <tr>
              <td class="pc-email-body-inner" valign="top" align="center">
                <!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" src="" color="#f4f4f4"/>
                  </v:background>
                  <![endif]-->
                <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
                <table class="pc-email-container" role="presentation" style="margin: 0 auto; max-width: 620px;" width="100%"
                  cellspacing="0" cellpadding="0" border="0" align="center">
                  <tbody>
                    <tr>
                      <td style="padding: 0 10px;" valign="top" align="left">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 1px; line-height: 1px;" height="20">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- BEGIN MODULE: Menu 1 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td class="pc-sm-p-20 pc-xs-p-10"
                                style="padding: 25px 30px; background-color: #9cd08e; border-radius: 8px" valign="top"
                                bgcolor="#9cd08e">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="padding: 10px;" valign="top" align="center">
                                        <a href="https://vickiesfoundation.org/" style="text-decoration: none;"><img
                                            src="https://vickiesfoundation.org/assets/img/logo_2.png" alt="Vickies Foundation"
                                            style="height: auto; max-width: 100%; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff; font-size: 14px;"
                                            width="113" height=""></a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="top" align="center">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                          <tbody>
                                            <tr>
                                              <td style="padding: 10px;" valign="middle">
                                                <a href="https://facebook.com/VickiesFoundation"
                                                  style="text-decoration: none;"><img
                                                    src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-square2-128.png"
                                                    alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                    width="15" height="15"></a>
                                              </td>
                                              <td style="padding: 10px;" valign="middle">
                                                <a href="https://twitter.com/VickiesFoundatn"
                                                  style="text-decoration: none;"><img
                                                    src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-128.png"
                                                    alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                    width="16" height="14"></a>
                                              </td>
                                              <td style="padding: 10px;" valign="middle">
                                                <a href="https://instagram.com/vickiesfoundation"
                                                  style="text-decoration: none;"><img
                                                    src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-128.png"
                                                    alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                    width="16" height="15"></a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- END MODULE: Menu 1 -->
                        <!-- BEGIN MODULE: Transactional 1 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 1px; line-height: 1px;" height="8">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td class="pc-sm-p-30-20 pc-xs-p-25-10"
                                style="padding: 40px 30px; background: #ffffff; border-radius: 8px;" valign="top"
                                bgcolor="#ffffff">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="pc-sm-fs-30 pc-fb-font"
                                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;"
                                        valign="top">A Volunteer Form was submitted</td>
                                    </tr>
                                    <tr>
                                      <td style="line-height: 1px; font-size: 1px;" height="15">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font"
                                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px"
                                        valign="top">Hi Admin!  ${data.nameFirst} submitted a volunteer form.Attached is an
                                        uploaded image as well.<br>
                                        <div id="tap-translate">&nbsp;</div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="line-height: 1px; font-size: 1px;" height="25">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td style="padding: 5px 10px;" valign="top">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td
                                                style="text-align: center; padding: 14px 19px; background-color: #9cd08e; border-radius: 12px"
                                                valign="top" bgcolor="#9cd08e" align="center">
                                                <a class="pc-fb-font" href="https://vickiesfoundation.org/"
                                                  style="text-decoration: none; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; word-break: break-word; display: block;">Visit
                                                  website</a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 1px; font-size: 1px;" height="25">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td style="padding: 0 10px;" valign="top">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                          <tbody>
                                          </tbody>
                                          <tbody>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; font-size: 16px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515; padding: 0 0 4px 0;"
                                                                          valign="top">
                                                                          First Name
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.nameFirst}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Last Name
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.nameLast}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Email
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.email}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Phone
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.phone}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Whatsapp number
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.whatsapp}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Address Line 1
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.addressl1}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          State 
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.state}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Country
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.country}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Gender 
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.gender}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Age
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.age}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Which team would you like to join?
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.team}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Please provide one of your active social media accounts (Facebook, Twitter, Instagram, LinkedIn) and indicate which 
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.social_media}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Occupation
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.occupation}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Institution || Occupation
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.job_title}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Course || Job Description 
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.job_desc}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Reason(s) for Volunteering with Vickies Foundation
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.reason}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          How can you support the Foundation in achieving its plan?
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.support}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="padding: 20px 10px 20px 0; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                  border="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size: 0;" valign="top">
                                                        <!--[if (gte mso 9)|(IE)]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="400"><tr><td width="120" style="vertical-align:top" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 120px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 0 20px 0 0;" valign="top">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                                        <div
                                                          style="display: inline-block; max-width: 280px; vertical-align: top;">
                                                          <table role="presentation" width="100%" cellspacing="0"
                                                            cellpadding="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding: 9px 0 0;" valign="top">
                                                                  <table role="presentation" width="100%" cellspacing="0"
                                                                    cellpadding="0" border="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td class="pc-fb-font"
                                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; letter-spacing: -0.3px; line-height: 28px; font-weight: 500; font-size: 18px; color: #151515;"
                                                                          valign="top">
                                                                          Any question(s) or suggestion(s)?
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td style="font-size: 1px; line-height: 1px;"
                                                                          height="4">&nbsp;</td>
                                                                      </tr>
                                                                    </tbody>
                                                                    <tbody>
                                                                      <tr>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 10px 20px 0; color: #9B9B9B; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5;"
                                                valign="top" align="right"></td>
                                              <td class="pc-fb-font"
                                                style="padding: 29px 0 20px; letter-spacing: -0.2px; line-height: 26px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; border-bottom: 1px solid #E5E5E5; color: #151515;"
                                                valign="top" align="right">
                                                ${data.question}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- END MODULE: Transactional 1 -->
                        <!-- BEGIN MODULE: Footer 1 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 1px; line-height: 1px;" height="8">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td class="pc-sm-p-21-10-14 pc-xs-p-5-0"
                                style="padding: 21px 20px 14px 20px; background-color: #1B1B1B; border-radius: 8px;"
                                role="presentation" valign="top" bgcolor="#1B1B1B">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-size: 0;" valign="top">
                                        <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
                                        <div class="pc-sm-mw-100pc"
                                          style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding: 20px;" valign="top">
                                                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                    border="0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="pc-fb-font"
                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                                          valign="top">
                                                          Follow Us.
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="line-height: 1px; font-size: 1px;" height="11">&nbsp;</td>
                                                      </tr>
                                                    </tbody>
                                                    <tbody>
                                                      <tr>
                                                        <td class="pc-fb-font"
                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;"
                                                          valign="top">We rise by lifting others.<br>
                                                          <div id="tap-translate">&nbsp;</div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td class="pc-sm-h-20" style="line-height: 1px; font-size: 1px;"
                                                          height="56">&nbsp;</td>
                                                      </tr>
                                                    </tbody>
                                                    <tbody>
                                                      <tr>
                                                        <td style="font-family: Arial, sans-serif; font-size: 19px;"
                                                          valign="top">
                                                          <a href="https://facebook.com/VickiesFoundation"
                                                            style="text-decoration: none;"><img
                                                              src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-square2-128.png"
                                                              alt="vickiesfoundation"
                                                              style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                              width="20" height="20"></a>
                                                          <span>&nbsp;&nbsp;</span>
                                                          <a href="https://twitter.com/VickiesFoundatn"
                                                            style="text-decoration: none;"><img
                                                              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-128.png"
                                                              alt="vickiesfoundation"
                                                              style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                              width="20" height="18"></a>
                                                          <span>&nbsp;&nbsp;</span>
                                                          <a href="https://instagram.com/vickiesfoundation"
                                                            style="text-decoration: none;"><img
                                                              src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-128.png"
                                                              alt="vickiesfoundation"
                                                              style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"
                                                              width="21" height="20"></a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                        <div class="pc-sm-mw-100pc"
                                          style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                              <tr>
                                                <td style="padding: 20px;" valign="top">
                                                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                    border="0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="pc-fb-font"
                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                                          valign="top">
                                                          Contact us.
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="line-height: 1px; font-size: 1px;" height="11">&nbsp;</td>
                                                      </tr>
                                                    </tbody>
                                                    <tbody>
                                                      <tr>
                                                        <td class="pc-fb-font"
                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;"
                                                          valign="top">6 Boorepo Street,<br>Aboru, Iyana-Ipaja,
                                                          Lagos-State,<br>Nigeria
                                                          <div id="tap-translate">&nbsp;</div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td class="pc-sm-h-20" style="line-height: 1px; font-size: 1px;"
                                                          height="45">&nbsp;</td>
                                                      </tr>
                                                    </tbody>
                                                    <tbody>
                                                      <tr>
                                                        <td class="pc-fb-font"
                                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; line-height: 24px;"
                                                          valign="top">
                                                          <a href="mailto:info@vickiesfoundation.org"
                                                            style="text-decoration: none; color: #9cd08e">info@vickiesfoundation.org</a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- END MODULE: Footer 1 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 1px; line-height: 1px;" height="20">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Fix for Gmail on iOS -->
        <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
      </body>
      
      </html>
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
