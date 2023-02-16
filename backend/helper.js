/**expect mongose function other function added here */


function removeSpaces(x){
    return x.split(" ").filter((y)=> y).join(" ");
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}