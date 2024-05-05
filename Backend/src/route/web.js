import express from "express"
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import blogController from "../controllers/blogController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomPage);

    router.get('/get-users', userController.handleGetUsers)
    router.post('/create-user', userController.handleCreateUser)
    router.put('/update-user', userController.handleUpdateUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    router.get('/allcodes', userController.handleGetAllCodes)

    router.post('/login', userController.handleLogin)
    router.get('/get-top-doctor', doctorController.handleGetTopDoctor)
    router.get('/get-all-doctor', doctorController.handleGetAllDoctor)
    router.post('/save-doctor-detail-info', doctorController.handleSaveDoctorInfo)
    router.get('/get-doctor-detail', doctorController.handleGetDoctorDetail)

    router.post('/save-doctor-schedule', doctorController.handleSaveDoctorSchedule)
    router.get('/get-doctor-schedule', doctorController.handleGetDoctorSchedule)
    router.get('/get-extra-doctor-info', doctorController.handleGetExtraDoctorInfo)
    router.post('/post-booking-appointment', patientController.handlePostBookingAppointment)
    router.post('/post-verify-booking', patientController.handlePostVerifyBooking)
    router.post('/create-specialty-info', specialtyController.handleCreateSpecialtyInfo)
    router.get('/get-specialty-info', specialtyController.handleGetSpecialtyInfo)
    router.get('/get-specialty-by-id', specialtyController.handleGetSpecialById)
    router.get('/get-doctor-by-specialty', specialtyController.handleGetDoctorBySpecialty)
    router.post('/create-clinic-info', specialtyController.handleCreateClinicInfo)
    router.get('/get-clinic-info', specialtyController.handleGetClinicInfo)
    router.get('/get-clinic-by-id', specialtyController.handleGetClinicById)
    router.post('/create-blog-content', blogController.handleCreateBlogContent)
    router.get('/get-blog-info', blogController.handleGetBlogInfo)
    router.get('/get-blog-by-id', blogController.handleGetBlogById)
    router.get('')
    return app.use("/", router)
}
module.exports = initWebRoutes