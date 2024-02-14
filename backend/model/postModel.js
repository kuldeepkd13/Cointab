const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },

}, {
    versionKey: false
})

const PostModel = mongoose.model("post", postSchema)

module.exports = { PostModel }