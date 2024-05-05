import db from "../models/index"
import { Buffer } from 'buffer';
import _ from 'lodash';
const createBlogContent = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.title || !data.contentHTML || !data.contentMarkdown || !data.avatar) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                await db.Blog.create({
                    title: data.title,
                    avatar: data.avatar,
                    author: data.author,
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    advisor: data.advisor,
                    inspector: data.inspector
                })
                resolve({
                    errorCode: 0,
                    errorMessage: "Save blog content succeed!"
                })
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getBlogInfo = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let blogInfo = await db.Blog.findAll()
            if (blogInfo) {
                let blogList = []
                blogList = blogInfo.map(item => {
                    let imageBase64 = new Buffer(item.avatar, 'base64').toString('binary')
                    item.avatar = imageBase64
                    return item
                })
                resolve({
                    errorCode: 0,
                    errorMessage: "Oke",
                    data: blogList
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Can't find blog information"
                })
            }

        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}

const getBlogById = (blogId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!blogId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing required parameter"
                })
            } else {
                let blogDetail = await db.Blog.findOne({
                    where: { id: blogId },
                })
                if (blogDetail) {
                    blogDetail.avatar = new Buffer(blogDetail.avatar, 'base64').toString('binary')
                    resolve({
                        errorCode: 0,
                        errorMessage: "Oke",
                        data: blogDetail
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
    createBlogContent: createBlogContent,
    getBlogInfo: getBlogInfo,
    getBlogById: getBlogById
}