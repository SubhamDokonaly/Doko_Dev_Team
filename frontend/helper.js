/**Add your frontend common function here */

const idMatchLoop = (data, id) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i] === id) { 
          return [data[i]]
        }
    }
    return ""
}