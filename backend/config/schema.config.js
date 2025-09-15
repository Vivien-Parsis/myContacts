import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    lastName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, minLength: 6, maxLength: 30, trim: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date }
}, { versionKey: false })

const contactSchema = new mongoose.Schema({
    contactOf: { type: mongoose.Schema.Types.ObjectId, require: true },
    lastName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, minLength: 6, maxLength: 30, trim: true },
    telephone: { type: String, required: true, minLength: 10, maxLength: 10 }
}, { versionKey: false })

export { userSchema, contactSchema }