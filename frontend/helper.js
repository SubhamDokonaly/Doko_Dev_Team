/**Add your frontend common function here */

export function CheckDuplicates(array) {
    const removeDuplicates = [...new Set(array.map((e) => JSON.stringify(e)))].map((e) => JSON.parse(e))
    return removeDuplicates
};

export function viewFile(file) {
    let win = window.open();
    win.document.write(
        '<iframe src="' +
        file +
        '" frameborder="0" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" allowfullscreen></iframe>'
    )
};

const idMatchLoop = (data, key, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i][key] === value) { 
          return [data[i]]
        }
    }
    return ""
  }

  // idMatchLoop(originData.origin, '_id', e.pol)

/**      File Reader Function         */
export const fileReaderFunction = (file,fileType,fileSize) =>{
    let fileDatas = {}
    let file = file.target.files[0];
    let reader = new FileReader ();
    reader.readAsArrayBuffer(file)
    if (e.target.files.length > 0) {
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          if (!file) {
            reject("Upload file first"); 
          } else if (!fileType.includes(file.type)) {
            reject(`Upload only ${fileType}`);
          } else if (file.size > fileSize) {
            reject(`Upload file under ${fileSize} MB`);
          }
          fileDatas.fileData = e.target.result
          fileDatas.fileName = file.name
          resolve(fileDatas)
        }
      })
    }
  }

/**      File Reader Function Calling format and handling the output      */
//   const handleFile =  (e) => {
//     fileReaderFunction(e,fileType,fileSize)
//     .then((data) => { 
//         Get the resolved output
//     })
//     .catch((error) => { 
//         Get the rejected ouput
//     }); 
//   };