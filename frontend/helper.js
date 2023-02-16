/**Add your frontend common function here */

const idMatchLoop = (data, id, method) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i][method] === id) { 
          return [data[i]]
        }
    }
    return ""
}