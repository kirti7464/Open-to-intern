const internModel= require('../model/internModel')
const collegeModel= require('../model/collegeModel')
const {isValid, isValidRequestBody, isValidEmail,isValidObjectId ,isValidMobileNum}= require("../util/validation")

const createIntern = async function (req,res){
    try{
        let input = req.body
    let { name, mobile, email, collegeName}= input
    if (!isValidRequestBody(input))
          return res.status(400).send({
              status: false,
              message: "Please provide data for creating intern",
            });

    //checking name format
    if(!name) return res.status(400).send({status: false,message: "Please provide intern name"})
    if(!isValid(name)) return res.status(400).send({ status: false, message: "Please provide name in correct format" });

    //checking mobile number format
    if(!mobile) return res.status(400).send({status: false,message: "Please provide intern mobile number"})
    if(!isValidMobileNum(mobile)) return res.status(400).send({ status: false, message: "Please provide valid mobile number" });
    
    //checking email format
    if(!email) return res.status(400).send({status: false,message: "Please provide intern email"})
    if(!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please provide valid email" });

    //checking college name format
    if(!collegeName) return res.status(400).send({status: false,message: "Please provide college name"})
    if(!isValid(collegeName)) return res.status(400).send({status: false,message: "Please provide valid college name"})

    //checking whether college already exists
    let college = await collegeModel.findOne({name:collegeName})
    if(!college) return res.status(404).send({status: false,message: "there is no college with this name"})

    //checking whether email already exists
    const isEmail = await internModel.findOne({ email: email });
        if (isEmail) {
            return res.status(400).send({ status: false, message: "Email address is already registered" });
        }

    //checking whether mobile number already exists
    const isMobileNum = await internModel.findOne({ mobile: mobile });
        if (isMobileNum) {
            return res.status(400).send({ status: false, message: "Mobile NUmber is already registered" });
        }
    let data = await internModel.create({name,mobile,email,collegeId:college._id})
    return res.status(201).send({status: true,data:data})
    }
    catch(error){
        return res.status(500).send({status: false,
            message: error.message})
    }
} 


module.exports.createIntern =createIntern
// Create a document for an intern.

// Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}

// Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this

// Return HTTP status 400 for an invalid request with a response body like this