import { raw } from "body-parser";
import db from "../models/index"
import EmailService from "./EmailService";
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

const buildUrlVerifyBooking = (token, doctorId) => {
    let link = "";

    link = `${process.env.REACT_LINK}/verify-booking?token=${token}&doctorId=${doctorId}`
    return link

}

const postBookingAppointment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                });
            } else {
                let token = uuidv4();
                await EmailService.sendBookingEmail({
                        recieverEmail: data.email,
                        patientName: data.fullName,
                        time: data.time,
                        doctorName: data.doctorName,
                        redirectLink: buildUrlVerifyBooking(token, data.doctorId)
                    })
                    //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        address: data.address,
                        phone: data.phoneNumber,
                        gender: data.gender,
                        roleId: 'R3',
                    },
                    raw: true
                });
                console.log('check user:', user[0]);

                // create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    data: user,
                    errorCode: 0,
                    errorMessage: "Save booking info succeed"
                })


            }

        } catch (error) {
            reject(error);
        }
    })
}
const postVerifyBooking = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.doctorId && !data.token) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing require parameter"
                })
            } else {
                let bookingInfo = await db.Booking.findOne({
                    where: { doctorId: data.doctorId, token: data.token, statusId: "S1" },
                    raw: false
                })
                if (bookingInfo) {
                    bookingInfo.statusId = "S2",
                        await bookingInfo.save()
                    resolve({
                        errorCode: 0,
                        errorMessage: "Update the appointment succeed"
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "Appointment has been activated or does not exist"
                    })

                }
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
module.exports = {
    postBookingAppointment: postBookingAppointment,
    postVerifyBooking: postVerifyBooking
}