// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const mongoose= require("mongoose")

const clgSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    logoLink:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
module.exports= mongoose.model("college",clgSchema)