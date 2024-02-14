const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    city: { type: String, required: true },
    company: { type: String, required: true },
    userId:{type:Number ,required: true }

}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }