// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const mongoose= require("mongoose")

const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate:{

        // }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        // validate:{

        // }
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"college"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports= mongoose.model("interns",internSchema)