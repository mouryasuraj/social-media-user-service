import mongoose, { Schema, model } from 'mongoose'


const userSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        required:true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
    },
    about: {
        type: String,
        trim: true
    },
    photoUrl: {
        type: String,
        trim: true
    },

}, {
    timestamps: true
})

export const User = model('User', userSchema)

