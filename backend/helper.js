/**expect mongose function other function added here */


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

function forgotPasswordMail(toData, tofname, tolname, objId, url) {  //function for sending forgotpassword mail
    var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        pool: true,
        auth: {
            user: 'noreply@dokonaly.com',
            pass: 'doko2020!',
        },
    })

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    }

    transporter.use('compile', hbs(handlebarOptions))

    var mailOptions = {
        from: 'noreply@dokonaly.com',
        to: toData,
        subject: 'Reset Password Request Mail From Dokonaly',
        template: 'forgotpasswordmail',
        context: {
            email: toData,
            firstname: tofname, // replace {{name}} with Adebola
            lastname: tolname,
            ObjId: objId,
            url: url,
        },
    }

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: ' + info.response)
    })
}

const bcrypt = require('bcrypt');
function comparePassword(currentpassword,bodypassword) {
    bcrypt.compare(currentpassword, bodypassword, function (err, result) {
        if(err){
            console.log(err)
        }else if(result===false){
            return result.send({status:0,message:"Current Password is Wrong"})
        }else{
            password = bcrypt.hashSync(bodypassword, 10)
            return password;
        }
    })
}
 
comparePassword(currentpassword,bodypassword)





function returnFunction (statusData, responseMsg, responseData) {
    return res.send({status: statusData, response: responseMsg, data: responseData})
}