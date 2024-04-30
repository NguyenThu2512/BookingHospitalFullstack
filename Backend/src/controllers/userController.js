import db from "../models/index"
import UserService from '../services/UserService'

const handleGetUsers = async(req, res) => {
    let allUsers = await UserService.getUser()
    return await res.status(200).json(allUsers)
}

const handleCreateUser = async(req, res) => {
    let new_user = req.body;
    if (!new_user) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing require input"
        })
    }
    let message = await UserService.createUser(new_user)
    console.log(message)
    return res.status(200).json(message)
}

const handleUpdateUser = async(req, res) => {
    let user_edit = req.body;
    if (!user_edit) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing require input"
        })
    }
    let message = await UserService.updateUser(user_edit)
    console.log(message)
    return res.status(200).json(message)

}

const handleDeleteUser = async(req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing require input"
        })
    }
    let message = await UserService.deleteUser(userId)
    console.log(message)
    return res.status(200).json(message)
}

const handleGetAllCodes = async(req, res) => {
    let userType = req.query.type;
    if (!userType) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing required parameter"
        })
    }
    let allcodes = await UserService.getAllCode(userType)
    return res.status(200).json(allcodes)
}

const handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Email/Password is missing"
        })
    }
    let message = await UserService.handleUserLogin(email, password)
    return res.status(200).json(message)

}
module.exports = {
    handleGetUsers: handleGetUsers,
    handleCreateUser: handleCreateUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCodes: handleGetAllCodes,
    handleLogin: handleLogin,

}