import DoctorService from '../services/DoctorService'

let handleGetTopDoctor = async(req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await DoctorService.getTopDoctor(+limit);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}
const handleGetAllDoctor = async(req, res) => {
    try {
        let doctors = await DoctorService.getAllDoctor()
        return res.status(200).json(doctors)

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleSaveDoctorInfo = async(req, res) => {
    try {
        let doctorInfo = await DoctorService.saveDoctorInfo(req.body)
        return res.status(200).json(doctorInfo)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetDoctorDetail = async(req, res) => {
    try {
        let doctorId = req.query.doctorId;
        if (!doctorId) {
            return res.status(200).json({
                errorCode: 1,
                errorMessage: "Missing required parameter"
            })
        } else {
            let doctorDetail = await DoctorService.getDoctorDetail(doctorId)
            return res.status(200).json(doctorDetail)
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}
const handleSaveDoctorSchedule = async(req, res) => {
    try {
        let result = await DoctorService.saveDoctorSchedule(req.body)
        return res.status(200).json(result)

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetDoctorSchedule = async(req, res) => {
    try {
        let schedules = await DoctorService.getDoctorSchedule(req.query.doctorId, req.query.date)
        return res.status(200).json(schedules)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetExtraDoctorInfo = async(req, res) => {
    try {
        let extraDoctorInfo = await DoctorService.getExtraDoctorInfo(req.query.doctorId)
        return res.status(200).json(extraDoctorInfo)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}
module.exports = {
    handleGetTopDoctor: handleGetTopDoctor,
    handleGetAllDoctor: handleGetAllDoctor,
    handleSaveDoctorInfo: handleSaveDoctorInfo,
    handleGetDoctorDetail: handleGetDoctorDetail,
    handleSaveDoctorSchedule: handleSaveDoctorSchedule,
    handleGetDoctorSchedule: handleGetDoctorSchedule,
    handleGetExtraDoctorInfo: handleGetExtraDoctorInfo
}