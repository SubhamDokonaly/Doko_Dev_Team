/**expect mongose function other function added here */


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

function returnFunction (statusData, responseMsg, responseData) {
    return res.send({status: statusData, response: responseMsg, data: responseData})
}