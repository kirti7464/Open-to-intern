const collegeModel= require('../model/collegeModel')
const internModel = require('../model/internModel')
const validUrl = require("valid-url")
const {isValid, isValidRequestBody, isValidEmail,isValidObjectId ,isValidMobileNum}= require("../util/validation")

const createCollege = async function (req,res){
    try{
        let input = req.body;
        let { name, fullName, logoLink } = input;
        if (!isValidRequestBody(input))
          return res.status(400).send({
              status: false,
              message: "Please provide data for creating college",
            });
        if (!name)
          return res.status(400).send({ status: false, message: "Please provide name" });
        //format of name
        if(!isValid(name)) return res.status(400).send({ status: false, message: "Please provide name in correct format" });
         
        if (!fullName)
          return res.status(400).send({ status: false, message: "Please provide full name" });
          //format of fullName
          if(!isValid(fullName)) return res.status(400).send({ status: false, message: "Please provide fullname in correct format" });
        if (!logoLink)
          return res.status(400).send({ status: false, message: "Please provide logo" });

          //valid link
        if(!validUrl.isWebUri(logoLink)) return res.status(400).send({ status: false, message: "Please provide valid logo link" });
         //findone name -unique
         let nameExist =await collegeModel.findOne(name)
         if(nameExist) return res.status(400).send({status:false,message:"This college already exists"})
           
        let data = await collegeModel.create(input);
        // let {name,fullName,logoLink,isDeleted }=data
        return res.status(201).send({ status: true, data: data });
    }
    catch(error){
        return res.status(500).send({status: false,
            message: error.message})
    }
}

const getCollege = async function (req,res){
    try{
        let collegeName= req.query.collegeName
        
        if(!collegeName){
            return res.status(400).send({status:false,message:"Please provide college name for creating college"})
        } 

        let data = await collegeModel.findOne({name:collegeName,isDeleted: false}).select({name:1,fullName:1,logoLink:1,_id:1})  
        if(!data) {
            return res.status(404).send({status:false,message:"There is no college with this name or already deleted"})
        }
    
        let {_id, ...restData}=data._doc;
        

        let intern= await internModel.find({collegeId:data._id,isDeleted: false}).select({_id:1,name:1,email:1,mobile:1})
        restData.interns=intern
        if(intern.length==0) {
            return res.status(200).send({status: true,data:{name:data.name,fullName:data.fullName,logoLink:data.logoLink,interns:"there is no intern in this college"}})
        }
        
        return res.status(200).send({status: true,data:restData})
    }
    catch(error){
        return res.status(500).send({status: false,
            message: error.message})
    }

}


module.exports.getCollege =getCollege
module.exports.createCollege = createCollege