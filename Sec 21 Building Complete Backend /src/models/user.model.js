import { lowerCase } from 'lodash'
import mongoose, {model, Schema, schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    avatar:{
        type:{
            url: String,
            localPath: String,
        },
        default:{
            url: "https://gravatar.com/exactlytiger261b29b745",
            localPath: "",
        }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullNmae:{
        type:String,
        required:true,
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
        
    this.password = await bcrypt.hash(this.password,12);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}


userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString('Hex')

    const hashedToken = crypto.createdHash('sha256').update(unHashedToken).digest('Hex')

    const tokenExpiry = Date.now() + 20*60*1000 //20mins

    return {unHashedToken, hashedToken, tokenExpiry}
}

export const User = mongoose.model('User', userSchema)