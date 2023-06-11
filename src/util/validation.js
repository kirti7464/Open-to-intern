const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };
  const isValidEmail = function (email) {
    return email.match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
  };
  const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };
  const isValidMobileNum = function (MobileNum) {
    if(MobileNum.length !== 10) {
        return false
    }
    return MobileNum.match(/^[0-9]+$/)
  };
  function validlogolink(logoLink){
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    return regex.test(logoLink)
}
  

module.exports = {isValid, isValidRequestBody, isValidEmail,isValidObjectId,validlogolink ,isValidMobileNum}