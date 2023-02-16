/**Add your frontend common function here */

const idMatchLoop = (data, key, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i][key] === value) { 
          return [data[i]]
        }
    }
    return ""
  }

  // idMatchLoop(originData.origin, '_id', e.pol)