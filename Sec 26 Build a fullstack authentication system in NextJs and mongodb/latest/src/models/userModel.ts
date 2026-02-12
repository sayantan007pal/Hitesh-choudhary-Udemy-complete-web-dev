import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is Required"],
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:[true, "Email is Required"],
        unique:true,
        trim:true
    },
    fullNmae:{
        type:String,
        required:[true, "Full Name is Required" ],
        trim:true
    },
    password:{
        type:String,
        required: [true, "Password is Required"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String,
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiry:{
        type:Date,
    },
    emailVerificationToken:{
        type:String,
    },
    emailVerificationExpiry:{
        type:Date,
    }
},
{
    timestamps:true
})


const User = mongoose.model('users', userSchema)
export default User