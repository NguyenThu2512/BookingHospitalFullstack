import PatientService from '../services/PatientService'


const handlePostBookingAppointment = async(req, res) => {
    try {
        let result = await PatientService.postBookingAppointment(req.body)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}
const handlePostVerifyBooking = async(req, res) => {
    try {
        let result = await PatientService.postVerifyBooking(req.body)
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
    handlePostBookingAppointment: handlePostBookingAppointment,
    handlePostVerifyBooking: handlePostVerifyBooking
}