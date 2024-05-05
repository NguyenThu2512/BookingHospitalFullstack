import db from "../models/index"
import { Buffer } from 'buffer';
import _ from 'lodash';


const createSpecialtyInfo = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing require parameter"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errorCode: 0,
                    errorMessage: "Create specialty information successfully"
                })
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const getSpecialtyInfo = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let specialtyInfo = await db.Specialty.findAll()
            console.log("check db:", specialtyInfo)
            if (specialtyInfo) {
                let specialtyArr = []
                specialtyArr = specialtyInfo.map(item => {
                    let imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                    item.image = imageBase64
                    return item
                })
                console.log("check db2", specialtyArr)
                resolve({
                    errorCode: 0,
                    errorMessage: "Oke",
                    data: specialtyArr
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Can't find specialty information"
                })
            }

        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}

const getSpecialtyById = (specialtyId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!specialtyId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                let specialtyDetail = await db.Specialty.findOne({
                    where: { id: specialtyId },
                    attributes: ['descriptionMarkdown', 'descriptionHTML']
                })
                if (specialtyDetail && !_.isEmpty(specialtyDetail)) {
                    resolve({
                        errorCode: 0,
                        errorMessage: "ok",
                        data: specialtyDetail
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "Can't find specialty info"
                    })
                }
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const getDoctorBySpecialty = (specialtyIdInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!specialtyIdInput) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing require parameter"
                })
            } else {
                let doctor = await db.Doctor_Infor.findAll({
                    where: { specialtyId: specialtyIdInput },
                    attributes: ["doctorId"]
                })
                if (doctor && !_.isEmpty(doctor)) {
                    resolve({
                        errorCode: 0,
                        errorMessage: "oke",
                        data: doctor
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "Can't find doctor",
                        data: []
                    })
                }

            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const createClinicInfo = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionMarkdown || !data.descriptionHTML || !data.address) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.image,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errorCode: 0,
                    errorMessage: "Create clinic information successfully"
                })
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getClinicInfo = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let clinicInfo = await db.Clinic.findAll()
            console.log("check db:", clinicInfo)
            if (clinicInfo) {
                let clinicArr = []
                clinicArr = clinicInfo.map(item => {
                    let imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                    item.image = imageBase64
                    return item
                })
                resolve({
                    errorCode: 0,
                    errorMessage: "Oke",
                    data: clinicArr
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Can't find clinic information"
                })
            }

        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}

const getClinicById = (clinicId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                let clinicDetail = await db.Clinic.findOne({
                    where: { id: clinicId },
                })
                if (clinicDetail) {
                    clinicDetail.image = new Buffer(clinicDetail.image, 'base64').toString('binary')
                    resolve({
                        errorCode: 0,
                        errorMessage: "Oke",
                        data: clinicDetail
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "Can't find specialty info"
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
    createSpecialtyInfo: createSpecialtyInfo,
    getSpecialtyInfo: getSpecialtyInfo,
    getSpecialtyById: getSpecialtyById,
    getDoctorBySpecialty: getDoctorBySpecialty,
    createClinicInfo: createClinicInfo,
    getClinicInfo: getClinicInfo,
    getClinicById: getClinicById,
}