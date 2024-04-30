require('dotenv').config();
const nodemailer = require("nodemailer");
const sendBookingEmail = async(dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: '"Thu Nguyen dev 👻" <nguyenthithu25122001@gmail.com>', // sender address
        to: dataSend.recieverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên website BookingHospital.com</p>
        <p> Thông tin đặt lịch khám bệnh:</p>
        <h4>Thời gian:  ${dataSend.time}</h4>
        <h4>Bác sĩ:  ${dataSend.doctorName}</h4>
        <p> Nếu thông tin trên là đúng sự thật vui lòng click vào đường ink bên dưới để hoàn tất quy trình đặt lịch</p>
        <div> <a href=${dataSend.redirectLink} target="_blank"> Click here! </a> </div>
        `, // html body
    });

}
module.exports = {
    sendBookingEmail: sendBookingEmail
}