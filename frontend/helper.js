/**Add your frontend common function here */
// ---------- Check Duplicates Function ------------ //
const CheckDuplicates = (array) => {
  if (typeof array !== 'object') {
    return 'Should be an Array or Object'
  }
  const removeDuplicates = [...new Set(array.map((e) => JSON.stringify(e)))].map((e) => JSON.parse(e))
  return removeDuplicates
};
// ---------- Open File New Window Function ------------ //
const OpenFileNewWindow = (fileData) => {
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

const idMatchLoop = (data, key, value) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i][key] === value) {
      return [data[i]];
    }
  }
  return "";
};

/**      File Reader Function         */
const fileReaderFunction = (event, fileType, fileSize, errorMessage) => {
  let fileDatas = {};
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  if (event.target.files.length > 0) {
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (!file) {
          reject(errorMessage.NoFileError);
        } else if (!fileType.includes(file.type)) {
          reject(`Upload only ${fileType}`);
        } else if (file.size > fileSize) {
          reject(`Upload file under ${fileSize} MB`);
        }
        fileDatas.fileData = event.target.result;
        fileDatas.fileName = file.name;
        fileDatas.fileSize = file.size;
        fileDatas.fileType = file.type;
        resolve(fileDatas);
      };
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
async function fetchData({ url, method = "GET", headers = {} } = {}, data) {
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
