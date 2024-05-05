import db from "../models/index"
import { Buffer } from 'buffer';
require('dotenv').config();
var _ = require('lodash');
const MAX_SCHEDULE_NUMBER = process.env.MAX_SCHEDULE_NUMBER

const getTopDoctor = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            let res = await db.User.findAll({
                limit: limitInput,
                order: [
                    ["createdAt", "DESC"]
                ],
                where: { roleId: "R2" },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            if (res) {
                resolve({
                    errorCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
const getAllDoctor = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_Infor,
                        attributes: ['specialtyId'],
                        include: [{
                            model: db.Specialty,
                            attributes: ['name', 'id']
                        }]
                    }
                ],
                raw: true,
                nest: true


            })
            if (doctors) {
                let doctorList = [];
                doctorList = doctors.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })

                resolve({
                    errorCode: 0,
                    data: doctorList
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Can't find users"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
const saveDoctorInfo = (dataInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(dataInput);
            if (!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown || !dataInput.action) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                if (dataInput.action === "CREATE") {
                    let res = await db.Markdown.create({
                            contentHTML: dataInput.contentHTML,
                            contentMarkdown: dataInput.contentMarkdown,
                            description: dataInput.description,
                            doctorId: dataInput.doctorId
                        })
                        // resolve({
                        //     errorCode: 0,
                        //     errorMessage: "Create doctor info successfully"
                        // })
                }
                if (dataInput.action === "EDIT") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: dataInput.doctorId }
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = dataInput.contentHTML;
                        doctorMarkdown.contentMarkdown = dataInput.contentMarkdown;
                        doctorMarkdown.description = dataInput.description;

                        await doctorMarkdown.save()
                    }
                    // resolve({
                    //     errorCode: 0,
                    //     errorMessage: "Save doctor info successfully"
                    // })
                }
                let doctorInfo = await db.Doctor_Infor.findOne({
                    where: { doctorId: dataInput.doctorId }
                })
                console.log("doctor infor:", doctorInfo)
                if (doctorInfo) {
                    doctorInfo.priceId = dataInput.price;
                    doctorInfo.paymentId = dataInput.payment;
                    doctorInfo.provinceId = dataInput.province;
                    doctorInfo.addressClinic = dataInput.clinicAddress;
                    doctorInfo.nameClinic = dataInput.clinicName;
                    doctorInfo.note = dataInput.note;
                    doctorInfo.specialtyId = dataInput.specialtyId
                    await doctorInfo.save()

                } else {
                    let res = await db.Doctor_Infor.create({
                        doctorId: dataInput.doctorId,
                        priceId: dataInput.price,
                        paymentId: dataInput.payment,
                        provinceId: dataInput.province,
                        addressClinic: dataInput.clinicAddress,
                        nameClinic: dataInput.clinicName,
                        note: dataInput.note,
                        specialtyId: dataInput.specialtyId
                    })


                }
                resolve({
                    errorCode: 0,
                    errorMessage: "Save doctor info successfully"
                })

            }

        } catch (error) {
            reject(error);
        }
    })
}
const getDoctorDetail = (doctorId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let doctorDetail = await db.User.findOne({
                where: { id: doctorId },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                    { model: db.Allcode, as: 'positionData' }
                ],
                raw: true,
                nest: true

            })
            if (doctorDetail && !_.isEmpty(doctorDetail) && doctorDetail.image) {
                let imageBase64 = new Buffer(doctorDetail.image, 'base64').toString('binary')
                doctorDetail.image = imageBase64;

                resolve({
                    errorCode: 0,
                    data: doctorDetail
                })
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: "Doctor not found"
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
const saveDoctorSchedule = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Thêm field maxNumber
            let arrSchedule = []
            if (data.schedules && data.schedules.length > 0) {
                arrSchedule = data.schedules.map((item) => {
                    item.maxNumber = +MAX_SCHEDULE_NUMBER
                    return item
                })
            }

            // Lấy giá trị trên DB
            const oldArr = await db.Schedule.findAll({
                where: { doctorId: data.doctorId, date: data.date },
                attributes: ["doctorId", "date", "timeType", "maxNumber"],
                raw: true
            })


            console.log("arrSchedule:", arrSchedule)
            console.log("oldArr:", oldArr)

            const newSchedule = _.differenceWith(arrSchedule, oldArr, (obj1, obj2) => {
                return (obj1.date === +obj2.date &&
                    obj1.timeType === obj2.timeType);
            });
            console.log("new schedule:", newSchedule)
            if (newSchedule && newSchedule.length > 0) {
                await db.Schedule.bulkCreate(newSchedule)
                resolve({
                    errorCode: 0,
                    errorMessage: "Oke"
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const getDoctorSchedule = (doctorId, date) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter!"
                })
            } else {
                let schedules = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData' }
                    ],
                    raw: true,
                    nest: true
                })
                if (!schedules) data = []
                resolve({
                    errorCode: 0,
                    data: schedules
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const getExtraDoctorInfo = (doctorId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: { doctorId: doctorId },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                    ],
                    nest: true
                })
                if (!data) data = {}
                resolve({
                    errorCode: 0,
                    data: data
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    saveDoctorInfo: saveDoctorInfo,
    getDoctorDetail: getDoctorDetail,
    saveDoctorSchedule: saveDoctorSchedule,
    getDoctorSchedule: getDoctorSchedule,
    getExtraDoctorInfo: getExtraDoctorInfo,
}