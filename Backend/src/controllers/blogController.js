import BlogService from '../services/BlogService'


const handleCreateBlogContent = async(req, res) => {
    try {
        let blogContent = await BlogService.createBlogContent(req.body)
        return res.status(200).json(blogContent)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetBlogInfo = async(req, res) => {
    try {
        let result = await BlogService.getBlogInfo()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Error from server..."
        })
    }
}

const handleGetBlogById = async(req, res) => {
    try {
        let result = await BlogService.getBlogById(req.query.blogId)
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
    handleCreateBlogContent: handleCreateBlogContent,
    handleGetBlogInfo: handleGetBlogInfo,
    handleGetBlogById: handleGetBlogById
}