/**expect mongose function other function added here */

//Valid Post Request Body
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

//Valid ObjectId
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

//Compare Password - comparePassword(currentpassword,bodypassword)
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
 
//Return Response Function - returnFunction(1, 'Data Found', responseData)
function returnFunction (statusData, responseMsg, responseData) {
    return res.send({status: statusData, response: responseMsg, data: responseData})
}

//Schedule Calculation - scheduleCalculation(lclschedulesData, finalHolidayList)
const scheduleCalculation = (lclschedulesData, finalHolidayList) => {

    let CFSCutOff, PickCutOff, BookingCutOff,
        CFSCutOffDate, PickCutOffDate, BookingCutOffDate, EtdDate,
        CfsCutOffHoliday, PickCutOffHoliday, CfsCutOffWeekend, PickCutOffWeekend, primeDisparity;

    CFSCutOff = CONFIG1.lcldatecalculation['CFS Cut off'];
    PickCutOff = CONFIG1.lcldatecalculation['Pick Cut Off'];
    BookingCutOff = CONFIG1.lcldatecalculation['Booking Cut off'];

    do {
        primeDisparity = PickCutOff - CFSCutOff

        CFSCutOffDate = moment(lclschedulesData.cSheduleETD).subtract(CFSCutOff, "days").format("DD-MM-YYYY");
        lclschedulesData.cCfsDate = CFSCutOffDate;

        CfsCutOffHoliday = finalHolidayList.includes(CFSCutOffDate)
        const CfsCutOffObject = moment(CFSCutOffDate, 'DD-MM-YYYY').toDate().getDay()
        CfsCutOffWeekend = CfsCutOffObject === 0

        if (CfsCutOffHoliday === true || CfsCutOffWeekend === true) {
            CFSCutOff = CFSCutOff + 1;
        }

        if (primeDisparity !== 1 && !PickCutOffHoliday && !PickCutOffWeekend) {
            PickCutOff = PickCutOff + 1;
            BookingCutOff = BookingCutOff + 1;
        }

        PickCutOffDate = moment(lclschedulesData.cSheduleETD).subtract(PickCutOff, "days").format("DD-MM-YYYY");
        lclschedulesData.cPickDate = PickCutOffDate;

        BookingCutOffDate = moment(lclschedulesData.cSheduleETD).subtract(BookingCutOff, "days").format("DD-MM-YYYY");
        lclschedulesData.cBookDate = BookingCutOffDate;
        lclschedulesData.cBookDateISO = moment(BookingCutOffDate, 'DD-MM-YYYY').toDate()

        PickCutOffHoliday = finalHolidayList.includes(PickCutOffDate)
        const PickCutOffObject = moment(PickCutOffDate, 'DD-MM-YYYY').toDate().getDay()
        PickCutOffWeekend = PickCutOffObject === 6 || PickCutOffObject === 0

        if (PickCutOffHoliday === true || PickCutOffWeekend === true) {
            PickCutOff = PickCutOff + 1;
            BookingCutOff = BookingCutOff + 1;
        }

    } while (CfsCutOffHoliday || CfsCutOffWeekend || PickCutOffHoliday || PickCutOffWeekend)

    return lclschedulesData
}

//Azure File Share Upload - uploadFileAzure(filePath, lclbookingId, fileNamePath)
const { ShareServiceClient } = require("@azure/storage-file-share");
var CONFIG1 = require('../../config/config.json')
async function uploadFileAzure(filePath, lclbookingId, fileNamePath) {
    let serviceClient, shareName, shareClient, shareExists,
    fileHierarchy, directoryName, directoryClient, directoryExists,
    fileName, fileClient

    const azureConnectionString = CONFIG.AZURECONNECTIONSTRING
    if (!azureConnectionString) throw Error('Azure Storage ConnectionString not found');

    try {
      serviceClient = ShareServiceClient.fromConnectionString(azureConnectionString)

      //Azure File Share
      shareName = CONFIG1.azureFilePath.shareName
      shareClient = serviceClient.getShareClient(shareName);
      shareExists = await shareClient.exists()
      // await shareClient.create();

      if (shareExists) {
        fileHierarchy = filePath.includes('quotation') ? true : false

        //Azure File Share Directory
        if (fileHierarchy) {
          directoryName = CONFIG1.azureFilePath.directory + '/LCLBooking/Quotation'
        }
        else {
          directoryName = CONFIG1.azureFilePath.directory + `/LCLBooking/Milestones/${lclbookingId}`
        }

        directoryClient = shareClient.getDirectoryClient(directoryName)
        directoryExists = await directoryClient.exists()

        if (!directoryExists) { await directoryClient.create() }

        //Azure File Share File
        fileName = fileNamePath
        fileClient = directoryClient.getFileClient(fileName)
        await fileClient.uploadFile(filePath)
      }
    }
    catch (error) {
      logger.error('Error in Azure File Share Connection: ' + error.message + '');
      data.response = error.message;
      res.send(data);
    }
}

//Azure File Share Download - downloadFileAzure(lclbookingId)
const { ShareServiceClient } = require("@azure/storage-file-share");
var CONFIG1 = require('../../config/config.json')
async function downloadFileAzure(lclbookingId) {
    let serviceClient, shareName, shareClient, shareExists,
    directoryName, directoryClient, directoryExists,
    fileName, fileClient, fileUploadsPath, filePath,
    fileDownloadBuffer

    fileUploadsPath = path.resolve(__dirname, '../../fileuploads')
    filePath = `${fileUploadsPath}/${lclbookingId}/`
    await fs.mkdir(filePath, { recursive: true }, (err) => {
      if (err) throw err;
    })

    const azureConnectionString = CONFIG.AZURECONNECTIONSTRING
    if (!azureConnectionString) throw Error('Azure Storage ConnectionString not found');

    try {
      serviceClient = ShareServiceClient.fromConnectionString(azureConnectionString)
      
      //Azure File Share
      shareName = CONFIG1.azureFilePath.shareName
      shareClient = serviceClient.getShareClient(shareName);
      shareExists = await shareClient.exists()
      // await shareClient.create();

      //Azure File Share Directory
      if (shareExists) {
        directoryName = CONFIG1.azureFilePath.directory + `/LCLBooking/Milestones/${lclbookingId}`
        directoryClient = shareClient.getDirectoryClient(directoryName)
        directoryExists = await directoryClient.exists()
        
        if(directoryExists) {
          const dirIter = directoryClient.listFilesAndDirectories() 
          let i = 1;
          for await (const item of dirIter) {
            if (item.kind === "directory") {
              console.log(`${i} - directory\t: ${item.name}`);
            } else {
              //Azure File Share File Download to Server
              // console.log(`${i} - file\t: ${item.name}`);
              fileName = item.name
              fileClient = directoryClient.getFileClient(fileName)
              fileDownloadBuffer = await fileClient.downloadToBuffer()
              await fs.writeFile(`${filePath}/${fileName}`, fileDownloadBuffer)
            }
            i++;
          } 
        }
      }
    }
    catch (error) {
      logger.error('Error in Azure File Share Connection: ' + error.message + '');
      data.response = error.message;
      res.send(data);
    }
}

//Create Milestone Directory - createDir(fileuploadpath)
const createDir = async (path) => {
    await fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

//Create Milestone File - createMilestoneFile(`${filePath}/${lclbookingId}/${fileName}`, base64Pdf, 'base64')
const createMilestoneFile = async (filePath, fileData, fileEncoding) => {
    await fs.writeFile(filePath, fileData, { encoding: fileEncoding })
}

