/**Add your frontend common function here */

/**      File Reader Function         */
const fileReaderFunction = (file,fileType,fileSize) =>{
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