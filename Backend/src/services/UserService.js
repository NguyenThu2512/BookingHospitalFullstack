import db from "../models/index"
import bcrypt from 'bcryptjs'


var salt = bcrypt.genSaltSync(10);

const getUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll();
            if (users) {
                resolve({
                    errorCode: 0,
                    errorMessage: "OK",
                    data: users
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Can't find user",
                    data: []
                })
            }
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const createUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let isExist = await checkEmail(data.email)
            if (isExist) {
                resolve({
                    errorCode: 2,
                    errorMessage: "This email is already exist"
                })
            } else {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    phone: data.phone,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar

                })
                resolve({
                    errorCode: 0,
                    message: "Ok"
                })

            }
        } catch (error) {
            reject(error);
        }
    })
}
const hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}
const checkEmail = (user_email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: user_email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const updateUser = (user_edit) => {
    return new Promise(async(resolve, reject) => {
        try {
            let dataUserEdit = await db.User.findOne({
                where: { id: user_edit.id }
            });
            if (dataUserEdit) {
                dataUserEdit.firstName = user_edit.firstName,
                    dataUserEdit.lastName = user_edit.lastName,
                    dataUserEdit.address = user_edit.address,
                    dataUserEdit.phone = user_edit.phone,
                    dataUserEdit.roleId = user_edit.role,
                    dataUserEdit.gender = user_edit.gender,
                    dataUserEdit.positionId = user_edit.position,
                    dataUserEdit.image = user_edit.avatar,
                    await dataUserEdit.save();
                resolve({
                    errorCode: 0,
                    errorMessage: "user is update successful"
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing require input"
                })
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required input"
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: userId }
                })
                if (!user) {
                    resolve({
                        errorCode: 2,
                        errorMessage: "Can't not found user"
                    })
                } else {
                    await db.User.destroy({
                        where: { id: userId }
                    })
                    resolve({
                        errorCode: 0,
                        errorMessage: "user deleted successfully"
                    })
                }
            }
        } catch (error) {
            resolve(error)
            reject(error)
        }
    })
}

const getAllCode = (userType) => {
    return new Promise(async(resolve, reject) => {
        try {
            let allcodes = await db.Allcode.findAll({
                where: { type: userType }
            })
            if (allcodes) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Ok",
                    data: allcodes
                })
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: "Can't find code'"
                })
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
                raw: true
            })
            if (user) {
                let checkPassword = await bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    let result = {};
                    result.errorCode = 0;
                    result.errorMessage = "Ok";
                    delete user.password;
                    result.userInfo = user;
                    resolve(result)

                } else {
                    resolve({
                        errorCode: 3,
                        errorMessage: "Password is incorrect"
                    })
                }
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: "This email does not exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode,
    handleUserLogin: handleUserLogin,

}