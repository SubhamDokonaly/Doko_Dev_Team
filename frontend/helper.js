/**Add your frontend common function here */
// ---------- Check Duplicates Function ------------ //
const checkDuplicates = (array) => {
  if (typeof array !== 'object') {
    return 'Should be an Array or Object'
  }
  const removeDuplicates = [...new Set(array.map((e) => JSON.stringify(e)))].map((e) => JSON.parse(e))
  return removeDuplicates
};
// ---------- Open File New Window Function ------------ //
const openFileNewWindow = (fileData) => {
  if (typeof fileData !== 'string') {
    return 'Uploaded File is Not a String';
  };
  if (!fileData.includes('base64')) {
    return 'Uploaded File is Not Base64 file';
  };
  let win = window.open();
  win.document.write(
    '<iframe src="' +
    fileData +
    '" frameborder="0" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" allowfullscreen></iframe>'
  );
};
//Suggestions - Check if string, check if base64 encoding, handle other scenarios

const idMatchLoop = (data, key, value) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i][key] === value) {
      return [data[i]];
    }
  }
  return "";
};

/**      File Reader Function         */
const fileReaderFunction = (file, fileType, fileSize, errorMessage) => {
  let fileDatas = {};
  let file = file.target.files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  if (file.target.files.length > 0) {
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        { (!event || !fileType || !fileSize || !errorMessage) && reject("Some arguments are missing") }
        { typeof fileType !== 'string' && reject("fileType should be a String") }
        { typeof fileSize !== 'number' && reject("fileSize should be a Number") }
        { typeof errorMessage !== "object" && reject("errorMessage should be an Object") }
        { (!errorMessage.NoFileError || !errorMessage.fileTypeErr || !errorMessage.fileSizeErr) && reject("Some Keys of errorMessage Object is missing") }
        { !file && reject(errorMessage.NoFileError) }
        { !fileType.includes(file.type) && reject(errorMessage.fileTypeErr) }
        { file.size > fileSize && reject(errorMessage.fileSizeErr) }
        fileDatas.fileData = event.target.result;
        fileDatas.fileName = file.name;
        fileDatas.fileSize = file.size;
        fileDatas.fileType = file.type;
        resolve(fileDatas);
      }
    });
  }
};

/**      File Reader Function Calling format and handling the output      */

// const handleFile = (e) => {
//   let errorMessage={
//     NoFileError:`Upload file first`,
//     fileTypeErr:`Upload only Pdf`,
//     fileSizeErr:`Upload file under 3 MB`,
//   }
//   fileReaderFunction(e,fileType,fileSize,errorMessage).then((data) => {
//       Get the resolved output
//   }).catch((error) => {
//        Get the rejected ouput
//   });
// };

/**  fetchFunction for fetching Data */
const fetchData = async ({ url, method = "GET", headers = {} } = {}, data) => {
  if (typeof url !== "string") {
    return { result: false, data: "URL is null / undefined" };
  }
  headers["Content-Type"] = "application/json";
  let fetchObject = {
    method: method,
    headers: headers,
  };
  if (method === "POST") {
    if (data === null || data === undefined) {
      return { result: false, data: "Data is not given for post call" };
    } else {
      fetchObject.headers.body = JSON.stringify(data);
    }
  }
  try {
    let response = await fetch(url, fetchObject);
    let responseData = await response.json();
    if (responseData.status === 1 || responseData.status === true) {
      if (typeof responseData.response === "string") {
        return { result: true, data: JSON.parse(responseData.response) };
      } else {
        return { result: true, data: responseData.response };
      }
    } else {
      return { result: false, data: responseData.response };
    }
  } catch (error) {
    return { result: false, data: error };
  }
}


export {
  checkDuplicates,
  openFileNewWindow,
  idMatchLoop,
  fileReaderFunction,
  fetchData
}
