import SpecialtyService from '../services/SpecialtyService'


const handleCreateSpecialtyInfo = async(req, res) => {
    try {
        let result = await SpecialtyService.createSpecialtyInfo(req.body)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}
const handleGetSpecialtyInfo = async(req, res) => {
    try {
        let result = await SpecialtyService.getSpecialtyInfo()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetSpecialById = async(req, res) => {
    try {
        let result = await SpecialtyService.getSpecialtyById(req.query.specialtyId)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}


const handleGetDoctorBySpecialty = async(req, res) => {
    try {
        let result = await SpecialtyService.getDoctorBySpecialty(req.query.specialtyId)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleCreateClinicInfo = async(req, res) => {
    try {
        let result = await SpecialtyService.createClinicInfo(req.body)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetClinicInfo = async(req, res) => {
    try {
        let result = await SpecialtyService.getClinicInfo()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetClinicById = async(req, res) => {
    try {
        let result = await SpecialtyService.getClinicById(req.query.clinicId)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}


module.exports = {
    handleCreateSpecialtyInfo: handleCreateSpecialtyInfo,
    handleGetSpecialtyInfo: handleGetSpecialtyInfo,
    handleGetSpecialById: handleGetSpecialById,
    handleGetDoctorBySpecialty: handleGetDoctorBySpecialty,
    handleCreateClinicInfo: handleCreateClinicInfo,
    handleGetClinicInfo: handleGetClinicInfo,
    handleGetClinicById: handleGetClinicById
}